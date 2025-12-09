# Developer Quick Start

Fast-track guide for developers to get the ETH Trading Bot running.

## Prerequisites

```bash
# Check versions
flutter --version  # Need 3.0+
dart --version     # Need 3.0+
node --version     # Need 18+ (for server)
```

## 5-Minute Setup

### 1. Clone & Install

```bash
cd eth_trading_bot
flutter pub get
```

### 2. Run the App

```bash
# Run on connected device/emulator
flutter run

# Or specify device
flutter devices
flutter run -d <device-id>
```

### 3. Start Server (Optional)

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your HMAC_SECRET
npm start
```

## Project Structure

```
eth_trading_bot/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── config/
│   │   └── constants.dart        # All configuration
│   ├── services/
│   │   ├── binance_ed25519_service.dart    # Binance API
│   │   ├── trading_strategy_service.dart   # Trading logic
│   │   ├── session_auth_service.dart       # Auth
│   │   ├── secure_storage_service.dart     # Storage
│   │   └── notification_service.dart       # Notifications
│   ├── providers/
│   │   ├── auth_provider.dart              # Auth state
│   │   └── trading_provider.dart           # Trading state
│   ├── screens/
│   │   ├── splash_screen.dart
│   │   ├── onboarding_screen.dart
│   │   ├── auth_screen.dart
│   │   ├── home_screen.dart
│   │   └── settings_screen.dart
│   └── models/
│       ├── order.dart
│       ├── account_info.dart
│       ├── position.dart
│       └── trade_signal.dart
├── server/
│   ├── index.js              # Express server
│   ├── package.json
│   └── .env                  # Configuration
└── test/
    └── services/             # Unit tests
```

## Key Files to Edit

### 1. Server URL

**File**: `lib/config/constants.dart`

```dart
class AppConfig {
  static const String serverBaseUrl = 'https://your-server.com';
}
```

### 2. Binance Endpoints

```dart
class BinanceConfig {
  static const String baseUrl = 'https://api.binance.com';
  // Use testnet for development:
  // static const String baseUrl = 'https://testnet.binance.vision';
}
```

### 3. Trading Parameters

```dart
class TradingConfig {
  static const double minCapital = 1000.0;
  static const double maxCapital = 10000.0;
  static const double defaultRiskPercent = 2.0;
}
```

## Testing

### Unit Tests

```bash
flutter test
```

### Integration Tests

```bash
flutter test integration_test/
```

### Run Specific Test

```bash
flutter test test/services/trading_strategy_service_test.dart
```

## Building

### Android Debug

```bash
flutter build apk --debug
```

### Android Release

```bash
flutter build apk --release
# Or for Play Store:
flutter build appbundle --release
```

### iOS

```bash
flutter build ios --release
```

## Debugging

### Enable Debug Logs

**File**: `lib/config/constants.dart`

```dart
class AppConfig {
  static const bool enableDebugLogs = true;
}
```

### View Logs

```bash
flutter logs
```

### Debug on Device

```bash
flutter run --debug
# Then press 'r' for hot reload
# Press 'R' for hot restart
```

## Common Tasks

### Add New Trading Pair

**File**: `lib/config/constants.dart`

```dart
static const List<String> allowedPairs = [
  'ETHINR',
  'ETHEUR',
  'ETHUSDT',
  'ETHGBP',  // Add new pair
];
```

### Change EMA Periods

```dart
static const int emaFastPeriod = 9;   // Change to 12
static const int emaSlowPeriod = 34;  // Change to 26
```

### Adjust Capital Limits

```dart
static const double minCapital = 1000.0;  // Change minimum
static const double maxCapital = 10000.0; // Change maximum
```

### Change Slippage Tolerance

```dart
static const double defaultMaxSlippagePct = 0.75; // Change to 1.0
```

## API Testing

### Test Binance Connection

```dart
// In your test file
final service = BinanceEd25519Service(
  apiKeyId: 'your-test-key',
  privateKey: yourTestPrivateKey,
  isTestnet: true,
);

final price = await service.getCurrentPrice('ETHUSDT');
print('Current ETH price: \$${price}');
```

### Test Session Token

```bash
# Create token
curl -X POST http://localhost:3000/create-session \
  -H "Content-Type: application/json" \
  -d '{"userId": "test-user"}'

# Verify token
curl -X POST http://localhost:3000/verify-session \
  -H "Content-Type: application/json" \
  -d '{"session_token": "YOUR_TOKEN"}'
```

## Troubleshooting

### Build Errors

```bash
# Clean build
flutter clean
flutter pub get
flutter run
```

### Dependency Issues

```bash
# Update dependencies
flutter pub upgrade

# Check for conflicts
flutter pub outdated
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
flutter run
```

### iOS Build Issues

```bash
# Clean iOS build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
flutter run
```

## Environment Setup

### Android

1. Install Android Studio
2. Install Android SDK
3. Create emulator or connect device
4. Enable USB debugging

### iOS

1. Install Xcode
2. Install CocoaPods: `sudo gem install cocoapods`
3. Open Xcode and accept license
4. Connect iOS device or use simulator

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub
```

## Code Style

### Dart Formatting

```bash
# Format all files
dart format .

# Check formatting
dart format --set-exit-if-changed .
```

### Linting

```bash
# Run analyzer
flutter analyze

# Fix auto-fixable issues
dart fix --apply
```

## Performance Profiling

```bash
# Run with performance overlay
flutter run --profile

# Generate performance report
flutter run --profile --trace-startup
```

## Useful Commands

```bash
# Check Flutter doctor
flutter doctor -v

# List devices
flutter devices

# Clean project
flutter clean

# Update Flutter
flutter upgrade

# Check dependencies
flutter pub deps

# Generate code (for Hive, etc.)
flutter pub run build_runner build

# Watch for changes
flutter pub run build_runner watch
```

## VS Code Setup

### Recommended Extensions

- Flutter
- Dart
- Dart Data Class Generator
- Error Lens
- GitLens

### Launch Configuration

**File**: `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart"
    },
    {
      "name": "Flutter (Profile)",
      "request": "launch",
      "type": "dart",
      "flutterMode": "profile",
      "program": "lib/main.dart"
    }
  ]
}
```

## Android Studio Setup

1. Open project in Android Studio
2. File → Settings → Plugins → Install Flutter plugin
3. Tools → Flutter → Flutter Doctor
4. Run → Edit Configurations → Add Flutter configuration

## Quick Reference

### Important Classes

- `BinanceEd25519Service` - All Binance API calls
- `TradingStrategyService` - Trading logic and signals
- `TradingProvider` - Main trading state
- `AuthProvider` - Authentication state

### Key Methods

```dart
// Start trading
await tradingProvider.startTrading();

// Stop trading
tradingProvider.stopTrading();

// Emergency stop
await tradingProvider.emergencyStop();

// Get current price
final price = await binanceService.getCurrentPrice('ETHUSDT');

// Place order
final order = await binanceService.placeMarketOrder(
  symbol: 'ETHUSDT',
  side: 'BUY',
  quantity: 0.01,
);
```

### State Access

```dart
// In widget
final trading = context.watch<TradingProvider>();
final auth = context.watch<AuthProvider>();

// Read once
final trading = context.read<TradingProvider>();
```

## Resources

- [Flutter Docs](https://docs.flutter.dev)
- [Dart Docs](https://dart.dev/guides)
- [Binance API Docs](https://binance-docs.github.io/apidocs/spot/en/)
- [Ed25519 Spec](https://ed25519.cr.yp.to/)

## Getting Help

- Check `USER_MANUAL.md` for user-facing issues
- Check `TEST_PLAN.md` for testing guidance
- Check `DEPLOYMENT_GUIDE.md` for deployment issues
- Open GitHub issue for bugs
- Email: dev@example.com

---

**Happy Coding! 🚀**
