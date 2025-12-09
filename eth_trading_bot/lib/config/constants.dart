class BinanceConfig {
  // Binance API endpoints
  static const String baseUrl = 'https://api.binance.com';
  static const String wsBaseUrl = 'wss://stream.binance.com:9443';
  static const String testnetBaseUrl = 'https://testnet.binance.vision';
  static const String testnetWsBaseUrl = 'wss://testnet.binance.vision';
  
  // Allowed trading pairs (ETH only)
  static const List<String> allowedPairs = [
    'ETHINR',
    'ETHEUR',
    'ETHUSDT',
  ];
  
  // Rate limits (requests per minute)
  static const int orderRateLimit = 50;
  static const int requestRateLimit = 1200;
  
  // WebSocket settings
  static const Duration wsReconnectDelay = Duration(seconds: 5);
  static const int wsMaxReconnectAttempts = 10;
  static const Duration wsHeartbeatInterval = Duration(minutes: 3);
}

class TradingConfig {
  // Capital limits (in INR)
  static const double minCapital = 1000.0;
  static const double maxCapital = 10000.0;
  
  // Risk management
  static const double defaultRiskPercent = 2.0;
  static const double minRiskPercent = 0.1;
  static const double maxRiskPercent = 5.0;
  
  // Position limits
  static const int maxOpenPositions = 1;
  static const bool allowPyramiding = false;
  
  // Slippage protection
  static const double defaultMaxSlippagePct = 0.75;
  
  // Strategy parameters
  static const int emaFastPeriod = 9;
  static const int emaSlowPeriod = 34;
  
  // Order types
  static const String defaultOrderType = 'MARKET';
  static const String limitOrderType = 'LIMIT';
}

class SecurityConfig {
  // Session token settings
  static const Duration sessionTokenLifetime = Duration(hours: 24);
  static const Duration sessionRefreshInterval = Duration(hours: 1);
  
  // Biometric settings
  static const String biometricReason = 'Authenticate to access trading keys';
  
  // Storage keys
  static const String secureStorageKeyPrefix = 'eth_bot_';
  static const String privateKeyStorageKey = '${secureStorageKeyPrefix}private_key';
  static const String apiKeyIdStorageKey = '${secureStorageKeyPrefix}api_key_id';
  static const String sessionTokenStorageKey = '${secureStorageKeyPrefix}session_token';
  static const String pinHashStorageKey = '${secureStorageKeyPrefix}pin_hash';
}

class AppConfig {
  // Server endpoints (for session validation)
  static const String serverBaseUrl = 'https://your-server.com'; // Update this
  static const String verifySessionEndpoint = '/verify-session';
  static const String healthEndpoint = '/health';
  
  // Logging
  static const bool enableDebugLogs = true;
  static const bool enableRemoteErrorReporting = false;
}
