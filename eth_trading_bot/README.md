# ETH Trading Bot - Production-Ready 24/7 Live Trading

A secure, production-ready Flutter trading bot for Ethereum pairs (ETH/INR, ETH/EUR, ETH/USDT) on Binance using **Ed25519 authentication only**.

## 🔐 Security Features

- **Ed25519 Authentication Only**: HMAC keys are rejected for live trading
- **Encrypted Local Storage**: Private keys stored with AES-256 encryption
- **Biometric/PIN Protection**: Keys only accessible after authentication
- **No Server-Side Key Storage**: Private keys never leave your device
- **Session Token Validation**: Server-side HMAC verification without exposing secrets

## 📊 Trading Features

- **EMA(9)/EMA(34) Crossover Strategy**: Confirmed crossover logic
- **Capital Limits**: ₹1,000 - ₹10,000 enforced
- **Risk Management**: 0.1% - 5% risk per trade (default 2%)
- **Slippage Protection**: Default 0.75% max slippage
- **Position Limits**: Maximum 1 open position, no pyramiding
- **24/7 Operation**: Auto-reconnect, rate-limit handling
- **Paper Trading**: Test strategies with real-time prices

## 🚀 Quick Start

### Prerequisites

- Flutter SDK 3.0+
- Dart SDK 3.0+
- Binance account with Ed25519 API keys

### Installation

```bash
cd eth_trading_bot
flutter pub get
flutter run
```

### Generate Ed25519 API Keys on Binance

1. **Log in to Binance**: Go to [binance.com](https://www.binance.com)
2. **Navigate to API Management**: Account → API Management
3. **Create API Key**: Click "Create API" → Choose "System generated"
4. **Select Ed25519**: ⚠️ **IMPORTANT**: Choose **Ed25519** as key type (NOT HMAC)
5. **Set Permissions**: Enable "Enable Spot & Margin Trading"
6. **Save Keys**: Copy your API Key ID and Private Key

**Direct Link**: [Binance API Management](https://www.binance.com/en/my/settings/api-management)

### First-Time Setup

1. **Launch App**: Open the app and follow the onboarding wizard
2. **Enter Credentials**:
   - API Key ID (from Binance)
   - Ed25519 Private Key (32 bytes, base64 or hex)
3. **Session Token** (optional): Enter session token from admin for live trading
4. **Authenticate**: Set up biometric/PIN authentication

### Paper Trading (No Session Token Required)

- Start trading immediately with paper mode
- Uses real-time Binance prices
- Simulates order fills
- Perfect for testing strategies

### Live Trading (Requires Session Token)

- Contact admin for session token
- Capital must be between ₹1,000 - ₹10,000
- Only ETH pairs allowed (ETHINR, ETHEUR, ETHUSDT)
- Ed25519 keys validated before enabling

## 📱 Usage

### Home Screen

- **Real-time Price**: Live ETH price updates via WebSocket
- **EMAs**: EMA(9) and EMA(34) indicators
- **Signal**: Current trading signal (BUY/SELL/HOLD)
- **Active Position**: Entry price, quantity, unrealized P&L
- **Performance**: Total P&L, closed trades, capital

### Controls

- **Start Trading**: Begin automated trading
- **Stop Trading**: Pause trading (keeps positions open)
- **Emergency Stop**: Cancel all orders and stop immediately

### Settings

- **Trading Pair**: Select ETHINR, ETHEUR, or ETHUSDT
- **Capital**: Set trading capital (₹1,000 - ₹10,000)
- **Risk %**: Risk per trade (0.1% - 5%)
- **Max Slippage**: Maximum allowed slippage (default 0.75%)
- **Export Data**: Export trade history to CSV
- **Factory Reset**: Clear all credentials and data

## 🏗️ Architecture

### Core Services

- **BinanceEd25519Service**: Ed25519 signing, REST API, WebSocket
- **TradingStrategyService**: EMA calculation, signal detection, order execution
- **SessionAuthService**: Session token validation with server
- **SecureStorageService**: Encrypted key storage with biometric auth
- **NotificationService**: Push notifications for trades and errors

### State Management

- **AuthProvider**: Authentication state, credentials management
- **TradingProvider**: Trading state, positions, P&L tracking

### Data Persistence

- **Hive**: Local database for positions and trade history
- **FlutterSecureStorage**: Encrypted storage for API keys

## 🔧 Configuration

### Edit Constants

File: `lib/config/constants.dart`

```dart
// Capital limits
static const double minCapital = 1000.0;
static const double maxCapital = 10000.0;

// Risk management
static const double defaultRiskPercent = 2.0;

// Slippage protection
static const double defaultMaxSlippagePct = 0.75;

// Server URL (for session validation)
static const String serverBaseUrl = 'https://your-server.com';
```

## 🖥️ Server Setup (Optional)

A minimal Node.js server for session token validation is included in `server/`.

### Install & Run

```bash
cd server
npm install
npm start
```

### Environment Variables

Create `server/.env`:

```env
PORT=3000
HMAC_SECRET=your-secret-key-here
SESSION_TOKEN_LIFETIME=86400
```

### Endpoints

- `POST /verify-session`: Validate session token
- `POST /refresh-session`: Refresh expired token
- `GET /health`: Health check

## 🧪 Testing

### Unit Tests

```bash
flutter test
```

### Integration Tests

```bash
flutter test integration_test/
```

### Test Plan

1. **Paper Trading**: Run for 24 hours, verify logs and P&L
2. **Live Trading (Staging)**: Place small orders, verify fills
3. **24/7 Operation**: Run for 72 hours, check auto-reconnect
4. **Emergency Stop**: Verify all orders cancelled

## ✅ Acceptance Criteria

- [x] Ed25519-signed requests accepted by Binance
- [x] Capital validation (₹1,000 - ₹10,000)
- [x] Only ETH pairs tradeable
- [x] 24/7 operation with auto-reconnect
- [x] Secure local key storage with biometric auth
- [x] Emergency stop cancels all orders

## 📚 References

- [Binance Ed25519 API Keys](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072)
- [Binance API Documentation](https://binance-docs.github.io/apidocs/spot/en/)
- [Ed25519 Signature Guide](https://binance-docs.github.io/apidocs/spot/en/#signed-trade-user_data-and-margin-endpoint-security)

## 🛡️ Security Checklist

- [x] Ed25519 keys only (HMAC rejected)
- [x] Encrypted storage (AES-256)
- [x] Biometric/PIN authentication
- [x] No secrets in logs
- [x] TLS everywhere
- [x] Session tokens (not HMAC secrets)
- [x] Factory reset option

## 📝 License

MIT License - See LICENSE file

## 🤝 Support

For issues or questions:
- GitHub Issues: [Create an issue]
- Email: support@example.com

## ⚠️ Disclaimer

Trading cryptocurrencies involves substantial risk of loss. This bot is provided as-is without warranty. Use at your own risk. Always test thoroughly in paper trading mode before going live.
