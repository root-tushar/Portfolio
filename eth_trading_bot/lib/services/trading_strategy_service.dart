import 'dart:async';
import 'package:logger/logger.dart';
import '../config/constants.dart';
import '../models/position.dart';
import '../models/trade_signal.dart';
import 'binance_ed25519_service.dart';

class TradingStrategyService {
  final Logger _logger = Logger();
  final BinanceEd25519Service binanceService;
  final String symbol;
  
  List<double> _closePrices = [];
  double? _ema9;
  double? _ema34;
  TradeSignal _currentSignal = TradeSignal.hold;
  TradeSignal _previousSignal = TradeSignal.hold;
  
  Position? _currentPosition;
  Timer? _strategyTimer;
  
  TradingStrategyService({
    required this.binanceService,
    required this.symbol,
  });

  // Calculate EMA
  double _calculateEMA(List<double> prices, int period) {
    if (prices.length < period) {
      throw Exception('Not enough data for EMA calculation');
    }
    
    final multiplier = 2.0 / (period + 1);
    
    // Calculate initial SMA
    double sma = prices.sublist(0, period).reduce((a, b) => a + b) / period;
    double ema = sma;
    
    // Calculate EMA
    for (int i = period; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema;
    }
    
    return ema;
  }

  // Update price data and calculate EMAs
  Future<void> updatePriceData() async {
    try {
      // Get recent klines (5-minute candles)
      final klines = await binanceService.getKlines(
        symbol: symbol,
        interval: '5m',
        limit: 100,
      );
      
      // Extract close prices
      _closePrices = klines.map((k) => double.parse(k[4].toString())).toList();
      
      // Calculate EMAs
      if (_closePrices.length >= TradingConfig.emaSlowPeriod) {
        _ema9 = _calculateEMA(_closePrices, TradingConfig.emaFastPeriod);
        _ema34 = _calculateEMA(_closePrices, TradingConfig.emaSlowPeriod);
        
        _logger.i('EMAs updated - EMA9: $_ema9, EMA34: $_ema34');
      }
    } catch (e) {
      _logger.e('Failed to update price data: $e');
      rethrow;
    }
  }

  // Detect crossover signal
  TradeSignal detectSignal() {
    if (_ema9 == null || _ema34 == null) {
      return TradeSignal.hold;
    }
    
    // Store previous signal
    _previousSignal = _currentSignal;
    
    // Determine current signal based on EMA relationship
    if (_ema9! > _ema34!) {
      _currentSignal = TradeSignal.buy;
    } else if (_ema9! < _ema34!) {
      _currentSignal = TradeSignal.sell;
    } else {
      _currentSignal = TradeSignal.hold;
    }
    
    // Confirmed crossover logic
    if (_previousSignal == TradeSignal.sell && _currentSignal == TradeSignal.buy) {
      _logger.i('🟢 BULLISH CROSSOVER DETECTED - EMA9 crossed above EMA34');
      return TradeSignal.buy;
    } else if (_previousSignal == TradeSignal.buy && _currentSignal == TradeSignal.sell) {
      _logger.i('🔴 BEARISH CROSSOVER DETECTED - EMA9 crossed below EMA34');
      return TradeSignal.sell;
    }
    
    return TradeSignal.hold;
  }

  // Calculate position size based on risk
  double calculatePositionSize({
    required double capital,
    required double riskPercent,
    required double currentPrice,
  }) {
    final riskAmount = capital * (riskPercent / 100);
    final quantity = riskAmount / currentPrice;
    return quantity;
  }

  // Execute trade based on signal
  Future<Position?> executeTrade({
    required TradeSignal signal,
    required double capital,
    required double riskPercent,
    required double maxSlippagePct,
    required bool isLiveMode,
  }) async {
    try {
      if (signal == TradeSignal.hold) {
        return null;
      }
      
      // Check if we already have an open position
      if (_currentPosition != null && signal == TradeSignal.buy) {
        _logger.w('Already have an open position. Skipping buy signal.');
        return null;
      }
      
      if (_currentPosition == null && signal == TradeSignal.sell) {
        _logger.w('No open position to sell. Skipping sell signal.');
        return null;
      }
      
      final currentPrice = await binanceService.getCurrentPrice(symbol);
      
      if (signal == TradeSignal.buy) {
        // Calculate position size
        final quantity = calculatePositionSize(
          capital: capital,
          riskPercent: riskPercent,
          currentPrice: currentPrice,
        );
        
        if (isLiveMode) {
          // Place live order
          final order = await binanceService.placeMarketOrder(
            symbol: symbol,
            side: 'BUY',
            quantity: quantity,
          );
          
          // Verify fill and check slippage
          final filledPrice = double.parse(order.price);
          final slippage = ((filledPrice - currentPrice) / currentPrice).abs() * 100;
          
          if (slippage > maxSlippagePct) {
            _logger.e('Slippage exceeded: $slippage% > $maxSlippagePct%');
            // Cancel order if possible
            await binanceService.cancelOrder(symbol: symbol, orderId: order.orderId);
            throw Exception('Slippage protection triggered');
          }
          
          _currentPosition = Position(
            symbol: symbol,
            side: 'LONG',
            entryPrice: filledPrice,
            quantity: quantity,
            entryTime: DateTime.now(),
          );
          
          _logger.i('✅ BUY order executed: $quantity @ $filledPrice');
        } else {
          // Paper trading
          _currentPosition = Position(
            symbol: symbol,
            side: 'LONG',
            entryPrice: currentPrice,
            quantity: quantity,
            entryTime: DateTime.now(),
          );
          
          _logger.i('📝 PAPER BUY: $quantity @ $currentPrice');
        }
        
        return _currentPosition;
      } else if (signal == TradeSignal.sell && _currentPosition != null) {
        if (isLiveMode) {
          // Place live sell order
          final order = await binanceService.placeMarketOrder(
            symbol: symbol,
            side: 'SELL',
            quantity: _currentPosition!.quantity,
          );
          
          final filledPrice = double.parse(order.price);
          final slippage = ((filledPrice - currentPrice) / currentPrice).abs() * 100;
          
          if (slippage > maxSlippagePct) {
            _logger.e('Slippage exceeded: $slippage% > $maxSlippagePct%');
            await binanceService.cancelOrder(symbol: symbol, orderId: order.orderId);
            throw Exception('Slippage protection triggered');
          }
          
          _currentPosition!.exitPrice = filledPrice;
          _currentPosition!.exitTime = DateTime.now();
          
          _logger.i('✅ SELL order executed: ${_currentPosition!.quantity} @ $filledPrice');
        } else {
          // Paper trading
          _currentPosition!.exitPrice = currentPrice;
          _currentPosition!.exitTime = DateTime.now();
          
          _logger.i('📝 PAPER SELL: ${_currentPosition!.quantity} @ $currentPrice');
        }
        
        final closedPosition = _currentPosition;
        _currentPosition = null;
        return closedPosition;
      }
      
      return null;
    } catch (e) {
      _logger.e('Failed to execute trade: $e');
      rethrow;
    }
  }

  // Start automated trading
  void startAutomatedTrading({
    required double capital,
    required double riskPercent,
    required double maxSlippagePct,
    required bool isLiveMode,
    required Function(Position) onPositionUpdate,
    required Function(String) onError,
  }) {
    _strategyTimer?.cancel();
    
    _strategyTimer = Timer.periodic(const Duration(minutes: 5), (timer) async {
      try {
        await updatePriceData();
        final signal = detectSignal();
        
        if (signal != TradeSignal.hold) {
          final position = await executeTrade(
            signal: signal,
            capital: capital,
            riskPercent: riskPercent,
            maxSlippagePct: maxSlippagePct,
            isLiveMode: isLiveMode,
          );
          
          if (position != null) {
            onPositionUpdate(position);
          }
        }
      } catch (e) {
        _logger.e('Strategy execution error: $e');
        onError(e.toString());
      }
    });
    
    _logger.i('Automated trading started');
  }

  // Stop automated trading
  void stopAutomatedTrading() {
    _strategyTimer?.cancel();
    _strategyTimer = null;
    _logger.i('Automated trading stopped');
  }

  // Emergency stop - cancel all orders
  Future<void> emergencyStop() async {
    try {
      stopAutomatedTrading();
      await binanceService.cancelAllOrders(symbol: symbol);
      _logger.w('🚨 EMERGENCY STOP EXECUTED');
    } catch (e) {
      _logger.e('Emergency stop failed: $e');
      rethrow;
    }
  }

  // Get current position
  Position? get currentPosition => _currentPosition;
  
  // Get EMAs
  double? get ema9 => _ema9;
  double? get ema34 => _ema34;
  
  // Get current signal
  TradeSignal get currentSignal => _currentSignal;

  void dispose() {
    stopAutomatedTrading();
  }
}
