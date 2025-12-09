# Quick Reference Card - ETH Trading Bot

One-page reference for common tasks and information.

## 🚀 Quick Start

```bash
# Install dependencies
cd eth_trading_bot
flutter pub get

# Run app
flutter run

# Start server
cd server
npm install && npm start
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/config/constants.dart` | All configuration |
| `lib/services/binance_ed25519_service.dart` | Binance API |
| `lib/services/trading_strategy_service.dart` | Trading logic |
| `lib/providers/trading_provider.dart` | Trading state |
| `server/index.js` | Session server |

## ⚙️ Configuration

### Update Server URL
```dart
// lib/config/constants.dart
static const String serverBaseUrl = 'https://your-server.com';
```

### Change Capital Limits
```dart
static const double minCapital = 1000.0;
static const double maxCapital = 10000.0;
```

### Adjust Risk Settings
```dart
static const double defaultRiskPercent = 2.0;
static const double defaultMaxSlippagePct = 0.75;
```

## 🔐 Ed25519 Keys

### Generate on Binance
1. Go to binance.com → API Management
2. Create API → System generated
3. Choose **Ed25519** (NOT HMAC)
4. Enable "Spot & Margin Trading"
5. Save API Key ID and Private Key

### Key Format
- **Length**: 32 bytes (64 hex chars or 44 base64 chars)
- **Example (hex)**: `a1b2c3d4e5f6...` (64 chars)
- **Example (base64)**: `obPD1OX2...` (44 chars)

## 🎯 Trading Parameters

| Parameter | Min | Max | Default |
|-----------|-----|-----|---------|
| Capital | ₹1,000 | ₹10,000 | ₹5,000 |
| Risk % | 0.1% | 5% | 2% |
| Slippage | 0.1% | 5% | 0.75% |
| Positions | 1 | 1 | 1 |

## 📊 Trading Pairs

- ✅ ETHINR (ETH/Indian Rupee)
- ✅ ETHEUR (ETH/Euro)
- ✅ ETHUSDT (ETH/Tether)
- ❌ All other pairs blocked

## 🔄 Strategy

**EMA Crossover**
- Fast EMA: 9 periods
- Slow EMA: 34 periods
- Interval: 5 minutes
- Buy: EMA9 crosses above EMA34
- Sell: EMA9 crosses below EMA34

## 🛠️ Common Commands

### Flutter
```bash
# Run app
flutter run

# Run tests
flutter test

# Build APK
flutter build apk --release

# Clean build
flutter clean && flutter pub get

# Format code
dart format .

# Analyze code
flutter analyze
```

### Server
```bash
# Start server
npm start

# Development mode
npm run dev

# Create session token
curl -X POST http://localhost:3000/create-session \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'

# Verify token
curl -X POST http://localhost:3000/verify-session \
  -H "Content-Type: application/json" \
  -d '{"session_token": "YOUR_TOKEN"}'
```

## 🧪 Testing

### Unit Tests
```bash
flutter test
```

### Paper Trading Test
1. Start app in paper mode
2. Run for 24 hours
3. Monitor logs
4. Check P&L

### Live Trading Test
1. Use testnet or minimum capital
2. Place 5-10 trades
3. Verify on Binance
4. Test emergency stop

## 🚨 Emergency Stop

### In App
1. Tap "EMERGENCY STOP" button
2. Confirm action
3. All orders cancelled
4. Trading stopped

### Manual (Binance)
1. Go to binance.com
2. Open Orders → Cancel All
3. Disable API key if needed

## 📱 App Screens

| Screen | Purpose |
|--------|---------|
| Splash | Initial loading |
| Onboarding | Ed25519 setup |
| Auth | Biometric login |
| Home | Trading dashboard |
| Settings | Configuration |

## 🔐 Security Checklist

- [ ] Ed25519 keys only (not HMAC)
- [ ] Keys stored encrypted
- [ ] Biometric auth enabled
- [ ] Session token validated
- [ ] HTTPS everywhere
- [ ] No secrets in logs
- [ ] Factory reset available

## 📊 Monitoring

### What to Watch
- Connection status (green = live)
- Current price updates
- EMA values
- Signal changes
- Active position P&L
- Total P&L

### Red Flags
- ❌ Connection lost
- ❌ High slippage warnings
- ❌ Order failures
- ❌ Memory warnings
- ❌ API rate limits

## 🐛 Troubleshooting

### Connection Issues
```bash
# Check internet
ping binance.com

# Check Binance status
curl https://api.binance.com/api/v3/ping

# Restart app
flutter run
```

### Authentication Failed
1. Verify Ed25519 keys
2. Check API key enabled on Binance
3. Ensure trading permissions
4. Re-enter keys

### Orders Not Executing
1. Check mode (Paper vs Live)
2. Verify session token
3. Check capital limits
4. Ensure no open position

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| README.md | Quick start |
| USER_MANUAL.md | Complete guide |
| DEVELOPER_QUICK_START.md | Dev guide |
| DEPLOYMENT_GUIDE.md | Deployment |
| TEST_PLAN.md | Testing |
| PROJECT_SUMMARY.md | Overview |

## 🔗 Important Links

- **Binance API**: https://binance-docs.github.io/apidocs/spot/en/
- **Binance API Management**: https://www.binance.com/en/my/settings/api-management
- **Binance Status**: https://status.binance.com
- **Ed25519 Spec**: https://ed25519.cr.yp.to/
- **Flutter Docs**: https://docs.flutter.dev

## 💡 Tips

### For Users
- Always start with paper trading
- Test for at least 24 hours
- Start with minimum capital
- Monitor regularly
- Use emergency stop if needed

### For Developers
- Read DEVELOPER_QUICK_START.md first
- Follow code style guidelines
- Write tests for new features
- Update documentation
- Use git branches

### For Testers
- Follow TEST_PLAN.md
- Document all findings
- Test on multiple devices
- Check edge cases
- Report bugs with details

## 📞 Support

- **Email**: support@example.com
- **Telegram**: @eth_bot_support
- **GitHub**: [Issues page]

## ⚠️ Warnings

- Trading involves risk of loss
- Only invest what you can afford to lose
- Test thoroughly before live trading
- Keep API keys secure
- Monitor bot regularly
- Use emergency stop if needed

## 📝 Quick Checklist

### Before First Run
- [ ] Dependencies installed
- [ ] Server URL configured
- [ ] Ed25519 keys ready
- [ ] Session token obtained (for live)
- [ ] Documentation read

### Before Live Trading
- [ ] Paper trading tested (24h)
- [ ] Capital within limits
- [ ] Risk settings configured
- [ ] Emergency stop tested
- [ ] Monitoring setup

### Daily Checks
- [ ] Connection status
- [ ] Active positions
- [ ] P&L tracking
- [ ] Error logs
- [ ] Binance account

---

**Version**: 1.0.0
**Last Updated**: 2024-12-05

**Keep this card handy for quick reference! 📌**
