import 'dart:convert';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:cryptography/cryptography.dart';
import 'package:logger/logger.dart';
import '../config/constants.dart';
import '../models/order.dart';
import '../models/account_info.dart';

class BinanceEd25519Service {
  final Logger _logger = Logger();
  final String apiKeyId;
  final Uint8List privateKeyBytes;
  final bool isTestnet;
  
  late final String _baseUrl;
  late final String _wsBaseUrl;
  WebSocketChannel? _wsChannel;
  
  BinanceEd25519Service({
    required this.apiKeyId,
    required this.privateKeyBytes,
    this.isTestnet = false,
  }) {
    _baseUrl = isTestnet ? BinanceConfig.testnetBaseUrl : BinanceConfig.baseUrl;
    _wsBaseUrl = isTestnet ? BinanceConfig.testnetWsBaseUrl : BinanceConfig.wsBaseUrl;
  }

  // Ed25519 signature generation
  Future<String> _signRequest(String queryString) async {
    try {
      final algorithm = Ed25519();
      final keyPair = await algorithm.newKeyPairFromSeed(privateKeyBytes);
      
      final message = utf8.encode(queryString);
      final signature = await algorithm.sign(message, keyPair: keyPair);
      
      // Return hex-encoded signature
      return signature.bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join();
    } catch (e) {
      _logger.e('Ed25519 signing failed: $e');
      rethrow;
    }
  }

  // Build canonical query string
  String _buildQueryString(Map<String, dynamic> params) {
    final sortedKeys = params.keys.toList()..sort();
    return sortedKeys
        .map((key) => '$key=${Uri.encodeComponent(params[key].toString())}')
        .join('&');
  }

  // Make signed request
  Future<Map<String, dynamic>> _signedRequest(
    String endpoint,
    Map<String, dynamic> params, {
    String method = 'GET',
    Map<String, dynamic>? body,
  }) async {
    try {
      // Add timestamp
      params['timestamp'] = DateTime.now().millisecondsSinceEpoch;
      
      // Build query string
      final queryString = _buildQueryString(params);
      
      // Sign the query string
      final signature = await _signRequest(queryString);
      
      // Add signature to params
      final signedQueryString = '$queryString&signature=$signature';
      
      final url = Uri.parse('$_baseUrl$endpoint?$signedQueryString');
      
      final headers = {
        'X-MBX-APIKEY': apiKeyId,
        'Content-Type': 'application/json',
      };
      
      http.Response response;
      
      if (method == 'GET') {
        response = await http.get(url, headers: headers);
      } else if (method == 'POST') {
        response = await http.post(url, headers: headers, body: jsonEncode(body ?? {}));
      } else if (method == 'DELETE') {
        response = await http.delete(url, headers: headers);
      } else {
        throw Exception('Unsupported HTTP method: $method');
      }
      
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        _logger.e('API Error: ${response.statusCode} - ${response.body}');
        throw Exception('API request failed: ${response.body}');
      }
    } catch (e) {
      _logger.e('Signed request failed: $e');
      rethrow;
    }
  }

  // Get account information
  Future<AccountInfo> getAccountInfo() async {
    try {
      final response = await _signedRequest('/api/v3/account', {});
      return AccountInfo.fromJson(response);
    } catch (e) {
      _logger.e('Failed to get account info: $e');
      rethrow;
    }
  }

  // Place market order
  Future<Order> placeMarketOrder({
    required String symbol,
    required String side, // BUY or SELL
    required double quantity,
  }) async {
    try {
      // Validate symbol
      if (!BinanceConfig.allowedPairs.contains(symbol)) {
        throw Exception('Trading pair $symbol is not allowed. Only ETH pairs are permitted.');
      }
      
      final params = {
        'symbol': symbol,
        'side': side,
        'type': 'MARKET',
        'quantity': quantity.toStringAsFixed(8),
      };
      
      final response = await _signedRequest(
        '/api/v3/order',
        params,
        method: 'POST',
      );
      
      return Order.fromJson(response);
    } catch (e) {
      _logger.e('Failed to place market order: $e');
      rethrow;
    }
  }

  // Place limit order
  Future<Order> placeLimitOrder({
    required String symbol,
    required String side,
    required double quantity,
    required double price,
  }) async {
    try {
      if (!BinanceConfig.allowedPairs.contains(symbol)) {
        throw Exception('Trading pair $symbol is not allowed. Only ETH pairs are permitted.');
      }
      
      final params = {
        'symbol': symbol,
        'side': side,
        'type': 'LIMIT',
        'timeInForce': 'GTC',
        'quantity': quantity.toStringAsFixed(8),
        'price': price.toStringAsFixed(2),
      };
      
      final response = await _signedRequest(
        '/api/v3/order',
        params,
        method: 'POST',
      );
      
      return Order.fromJson(response);
    } catch (e) {
      _logger.e('Failed to place limit order: $e');
      rethrow;
    }
  }

  // Cancel order
  Future<void> cancelOrder({
    required String symbol,
    required int orderId,
  }) async {
    try {
      await _signedRequest(
        '/api/v3/order',
        {
          'symbol': symbol,
          'orderId': orderId,
        },
        method: 'DELETE',
      );
    } catch (e) {
      _logger.e('Failed to cancel order: $e');
      rethrow;
    }
  }

  // Get order status
  Future<Order> getOrderStatus({
    required String symbol,
    required int orderId,
  }) async {
    try {
      final response = await _signedRequest('/api/v3/order', {
        'symbol': symbol,
        'orderId': orderId,
      });
      
      return Order.fromJson(response);
    } catch (e) {
      _logger.e('Failed to get order status: $e');
      rethrow;
    }
  }

  // Get all open orders
  Future<List<Order>> getOpenOrders({String? symbol}) async {
    try {
      final params = <String, dynamic>{};
      if (symbol != null) params['symbol'] = symbol;
      
      final response = await _signedRequest('/api/v3/openOrders', params);
      return (response as List).map((o) => Order.fromJson(o)).toList();
    } catch (e) {
      _logger.e('Failed to get open orders: $e');
      rethrow;
    }
  }

  // Cancel all open orders
  Future<void> cancelAllOrders({String? symbol}) async {
    try {
      final openOrders = await getOpenOrders(symbol: symbol);
      for (final order in openOrders) {
        await cancelOrder(symbol: order.symbol, orderId: order.orderId);
      }
    } catch (e) {
      _logger.e('Failed to cancel all orders: $e');
      rethrow;
    }
  }

  // Get current price
  Future<double> getCurrentPrice(String symbol) async {
    try {
      final url = Uri.parse('$_baseUrl/api/v3/ticker/price?symbol=$symbol');
      final response = await http.get(url);
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return double.parse(data['price']);
      } else {
        throw Exception('Failed to get price');
      }
    } catch (e) {
      _logger.e('Failed to get current price: $e');
      rethrow;
    }
  }

  // Get klines (candlestick data)
  Future<List<List<dynamic>>> getKlines({
    required String symbol,
    required String interval, // 1m, 5m, 15m, 1h, etc.
    int limit = 100,
  }) async {
    try {
      final url = Uri.parse(
        '$_baseUrl/api/v3/klines?symbol=$symbol&interval=$interval&limit=$limit',
      );
      final response = await http.get(url);
      
      if (response.statusCode == 200) {
        return List<List<dynamic>>.from(jsonDecode(response.body));
      } else {
        throw Exception('Failed to get klines');
      }
    } catch (e) {
      _logger.e('Failed to get klines: $e');
      rethrow;
    }
  }

  // WebSocket connection for real-time price updates
  void connectWebSocket(String symbol, Function(Map<String, dynamic>) onData) {
    try {
      final wsUrl = '$_wsBaseUrl/ws/${symbol.toLowerCase()}@trade';
      _wsChannel = WebSocketChannel.connect(Uri.parse(wsUrl));
      
      _wsChannel!.stream.listen(
        (data) {
          final parsed = jsonDecode(data);
          onData(parsed);
        },
        onError: (error) {
          _logger.e('WebSocket error: $error');
          _reconnectWebSocket(symbol, onData);
        },
        onDone: () {
          _logger.w('WebSocket connection closed');
          _reconnectWebSocket(symbol, onData);
        },
      );
      
      _logger.i('WebSocket connected for $symbol');
    } catch (e) {
      _logger.e('Failed to connect WebSocket: $e');
      rethrow;
    }
  }

  void _reconnectWebSocket(String symbol, Function(Map<String, dynamic>) onData) {
    Future.delayed(BinanceConfig.wsReconnectDelay, () {
      _logger.i('Attempting to reconnect WebSocket...');
      connectWebSocket(symbol, onData);
    });
  }

  void disconnectWebSocket() {
    _wsChannel?.sink.close();
    _wsChannel = null;
    _logger.i('WebSocket disconnected');
  }

  void dispose() {
    disconnectWebSocket();
  }
}
