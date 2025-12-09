import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:hive/hive.dart';
import 'package:logger/logger.dart';
import '../config/constants.dart';
import '../models/position.dart';
import '../models/trade_signal.dart';
import '../services/binance_ed25519_service.dart';
import '../services/trading_strategy_service.dart';

class TradingProvider with ChangeNotifier {
  final Logger _logger = Logger();
  
  BinanceEd25519Service? _binanceService;
  TradingStrategyService? _strategyService;
  
  bool _isLiveMode = false;
  bool _isTradingActive = false;
  String _selectedSymbol = 'ETHUSDT';
  double _capital = TradingConfig.minCapital;
  double _riskPercent = TradingConfig.defaultRiskPercent;
  double _maxSlippagePct = TradingConfig.defaultMaxSlippagePct;
  
  double? _currentPrice;
  double? _ema9;
  double? _ema34;
  TradeSignal _currentSignal = TradeSignal.hold;
  
  Position? _activePosition;
  List<Position> _closedPositions = [];
  double _totalPnL = 0.0;
  double _availableBalance = 0.0;
  
  Timer? _priceUpdateTimer;
  
  // Getters
  bool get isLiveMode => _isLiveMode;
  bool get isTradingActive => _isTradingActive;
  String get selectedSymbol => _selectedSymbol;
  double get capital => _capital;
  double get riskPercent => _riskPercent;
  double get maxSlippagePct => _maxSlippagePct;
  double? get currentPrice => _currentPrice;
  double? get ema9 => _ema9;
  double? get ema34 => _ema34;
  TradeSignal get currentSignal => _currentSignal;
  Position? get activePosition => _activePosition;
  List<Position> get closedPositions => _closedPositions;
  double get totalPnL => _totalPnL;
  double get availableBalance => _availableBalance;

  // Initialize trading service
  Future<void> initialize({
    required String apiKeyId,
    required Uint8List privateKey,
    required bool isLiveMode,
  }) async {
    try {
      _isLiveMode = isLiveMode;
      
      _binanceService = BinanceEd25519Service(
        apiKeyId: apiKeyId,
        privateKey: privateKey,
        isTestnet: !isLiveMode,
      );
      
      _strategyService = TradingStrategyService(
        binanceService: _binanceService!,
        symbol: _selectedSymbol,
      );
      
      // Load persisted data
      await _loadPersistedData();
      
      // Get account info if live mode
      if (isLiveMode) {
        await _updateAccountInfo();
      }
      
      // Start price updates
      _startPriceUpdates();
      
      notifyListeners();
      _logger.i('Trading provider initialized (Live: $isLiveMode)');
    } catch (e) {
      _logger.e('Failed to initialize trading: $e');
      rethrow;
    }
  }

  // Update account information
  Future<void> _updateAccountInfo() async {
    try {
      if (_binanceService == null) return;
      
      final accountInfo = await _binanceService!.getAccountInfo();
      
      // Find balance for base currency (INR, EUR, USDT)
      final baseCurrency = _selectedSymbol.replaceAll('ETH', '');
      final balance = accountInfo.balances.firstWhere(
        (b) => b.asset == baseCurrency,
        orElse: () => accountInfo.balances.first,
      );
      
      _availableBalance = balance.free;
      notifyListeners();
    } catch (e) {
      _logger.e('Failed to update account info: $e');
    }
  }

  // Start real-time price updates
  void _startPriceUpdates() {
    _priceUpdateTimer?.cancel();
    
    // WebSocket for real-time prices
    _binanceService?.connectWebSocket(_selectedSymbol, (data) {
      _currentPrice = double.tryParse(data['p']?.toString() ?? '0');
      notifyListeners();
    });
    
    // Periodic EMA updates
    _priceUpdateTimer = Timer.periodic(const Duration(minutes: 5), (timer) async {
      await _updateEMAs();
    });
  }

  // Update EMAs and signal
  Future<void> _updateEMAs() async {
    try {
      if (_strategyService == null) return;
      
      await _strategyService!.updatePriceData();
      _ema9 = _strategyService!.ema9;
      _ema34 = _strategyService!.ema34;
      _currentSignal = _strategyService!.detectSignal();
      
      notifyListeners();
    } catch (e) {
      _logger.e('Failed to update EMAs: $e');
    }
  }

  // Set trading parameters
  void setCapital(double value) {
    if (value < TradingConfig.minCapital || value > TradingConfig.maxCapital) {
      throw Exception('Capital must be between ₹${TradingConfig.minCapital} and ₹${TradingConfig.maxCapital}');
    }
    _capital = value;
    notifyListeners();
  }

  void setRiskPercent(double value) {
    if (value < TradingConfig.minRiskPercent || value > TradingConfig.maxRiskPercent) {
      throw Exception('Risk must be between ${TradingConfig.minRiskPercent}% and ${TradingConfig.maxRiskPercent}%');
    }
    _riskPercent = value;
    notifyListeners();
  }

  void setMaxSlippage(double value) {
    _maxSlippagePct = value;
    notifyListeners();
  }

  void setSymbol(String symbol) {
    if (!BinanceConfig.allowedPairs.contains(symbol)) {
      throw Exception('Symbol $symbol is not allowed. Only ETH pairs permitted.');
    }
    _selectedSymbol = symbol;
    notifyListeners();
  }

  // Start automated trading
  Future<void> startTrading() async {
    try {
      if (_strategyService == null) {
        throw Exception('Trading service not initialized');
      }
      
      if (_isLiveMode && (_capital < TradingConfig.minCapital || _capital > TradingConfig.maxCapital)) {
        throw Exception('Capital validation failed for live trading');
      }
      
      _strategyService!.startAutomatedTrading(
        capital: _capital,
        riskPercent: _riskPercent,
        maxSlippagePct: _maxSlippagePct,
        isLiveMode: _isLiveMode,
        onPositionUpdate: (position) {
          if (position.isOpen) {
            _activePosition = position;
          } else {
            _closedPositions.add(position);
            _totalPnL += position.unrealizedPnL;
            _activePosition = null;
          }
          _persistData();
          notifyListeners();
        },
        onError: (error) {
          _logger.e('Trading error: $error');
        },
      );
      
      _isTradingActive = true;
      notifyListeners();
      _logger.i('Automated trading started');
    } catch (e) {
      _logger.e('Failed to start trading: $e');
      rethrow;
    }
  }

  // Stop automated trading
  void stopTrading() {
    _strategyService?.stopAutomatedTrading();
    _isTradingActive = false;
    notifyListeners();
    _logger.i('Automated trading stopped');
  }

  // Emergency stop
  Future<void> emergencyStop() async {
    try {
      await _strategyService?.emergencyStop();
      _isTradingActive = false;
      notifyListeners();
      _logger.w('🚨 EMERGENCY STOP EXECUTED');
    } catch (e) {
      _logger.e('Emergency stop failed: $e');
      rethrow;
    }
  }

  // Persist data to Hive
  Future<void> _persistData() async {
    try {
      final box = await Hive.openBox('trading_data');
      await box.put('active_position', _activePosition?.toJson());
      await box.put('closed_positions', _closedPositions.map((p) => p.toJson()).toList());
      await box.put('total_pnl', _totalPnL);
    } catch (e) {
      _logger.e('Failed to persist data: $e');
    }
  }

  // Load persisted data from Hive
  Future<void> _loadPersistedData() async {
    try {
      final box = await Hive.openBox('trading_data');
      
      final activePositionJson = box.get('active_position');
      if (activePositionJson != null) {
        _activePosition = Position.fromJson(Map<String, dynamic>.from(activePositionJson));
      }
      
      final closedPositionsJson = box.get('closed_positions');
      if (closedPositionsJson != null) {
        _closedPositions = (closedPositionsJson as List)
            .map((p) => Position.fromJson(Map<String, dynamic>.from(p)))
            .toList();
      }
      
      _totalPnL = box.get('total_pnl', defaultValue: 0.0);
    } catch (e) {
      _logger.e('Failed to load persisted data: $e');
    }
  }

  // Export trade history to CSV
  String exportTradesToCSV() {
    final buffer = StringBuffer();
    buffer.writeln('Symbol,Side,Entry Price,Exit Price,Quantity,Entry Time,Exit Time,PnL,PnL %');
    
    for (final position in _closedPositions) {
      buffer.writeln(
        '${position.symbol},${position.side},${position.entryPrice},${position.exitPrice},'
        '${position.quantity},${position.entryTime},${position.exitTime},'
        '${position.unrealizedPnL},${position.unrealizedPnLPercent}',
      );
    }
    
    return buffer.toString();
  }

  @override
  void dispose() {
    _priceUpdateTimer?.cancel();
    _binanceService?.dispose();
    _strategyService?.dispose();
    super.dispose();
  }
}
