# ETH Trading Bot - User Manual

Complete guide for using the ETH Trading Bot.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Setting Up Ed25519 Keys](#setting-up-ed25519-keys)
3. [First-Time Setup](#first-time-setup)
4. [Using the Bot](#using-the-bot)
5. [Settings & Configuration](#settings--configuration)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

## Getting Started

### What is ETH Trading Bot?

ETH Trading Bot is an automated trading application that trades Ethereum (ETH) pairs on Binance using a proven EMA crossover strategy. The bot operates 24/7 and uses secure Ed25519 authentication.

### Key Features

- **Automated Trading**: EMA(9)/EMA(34) crossover strategy
- **Secure**: Ed25519 authentication with encrypted local storage
- **Capital Protection**: Enforced limits (₹1,000 - ₹10,000)
- **Risk Management**: Configurable risk per trade (0.1% - 5%)
- **Paper Trading**: Test strategies without risking real money
- **Emergency Stop**: Instantly cancel all orders

### Supported Trading Pairs

- ETH/INR (Indian Rupee)
- ETH/EUR (Euro)
- ETH/USDT (Tether)

## Setting Up Ed25519 Keys

### Why Ed25519?

Ed25519 is a modern, secure signature algorithm that provides better security than traditional HMAC keys. This bot **only accepts Ed25519 keys** for live trading.

### Step-by-Step Guide

#### 1. Log in to Binance

Go to [binance.com](https://www.binance.com) and log in to your account.

#### 2. Navigate to API Management

- Click on your profile icon (top right)
- Select "API Management"
- Or go directly: [API Management](https://www.binance.com/en/my/settings/api-management)

#### 3. Create New API Key

- Click "Create API"
- Choose "System generated" (not "Self generated")
- Enter a label (e.g., "ETH Trading Bot")

#### 4. Select Ed25519 Key Type

⚠️ **CRITICAL**: Choose **Ed25519** as the key type

- Do NOT select HMAC-SHA256
- Ed25519 provides better security
- The app will reject HMAC keys

#### 5. Set Permissions

Enable the following permissions:
- ✅ Enable Spot & Margin Trading
- ❌ Enable Withdrawals (NOT recommended)
- ❌ Enable Futures (NOT needed)

#### 6. Complete 2FA Verification

- Enter your 2FA code
- Verify via email
- Complete any additional security checks

#### 7. Save Your Keys

You will see:
- **API Key**: A long string (this is your API Key ID)
- **Secret Key**: Your Ed25519 private key

⚠️ **IMPORTANT**:
- Copy both keys immediately
- Store them securely
- You won't be able to see the Secret Key again
- Never share these keys with anyone

#### 8. Restrict API Access (Recommended)

- Click "Edit restrictions"
- Enable "Restrict access to trusted IPs only"
- Add your IP address
- This prevents unauthorized access

### Key Format

Your Ed25519 private key should be:
- 32 bytes (64 hex characters)
- Or base64 encoded
- Example (hex): `a1b2c3d4e5f6...` (64 characters)
- Example (base64): `obPD1OX2...` (44 characters)

## First-Time Setup

### 1. Install the App

- Download from Google Play Store (Android)
- Download from App Store (iOS)
- Or install from APK (Android only)

### 2. Launch and Follow Onboarding

The app will guide you through setup:

#### Screen 1: Welcome
- Read the introduction
- Understand the features
- Tap "Next"

#### Screen 2: Ed25519 Instructions
- Follow the guide to create keys on Binance
- Copy the Binance API URL
- Tap "Next" when keys are ready

#### Screen 3: Enter Credentials
- Paste your **API Key ID**
- Paste your **Ed25519 Private Key**
- The app will validate the key format
- Tap "Next"

#### Screen 4: Session Token (Optional)
- Enter session token if you have one
- Or skip for paper trading only
- Tap "Complete Setup"

### 3. Set Up Authentication

- Choose biometric (fingerprint/face) or PIN
- This protects your private keys
- You'll need to authenticate each time you open the app

### 4. Setup Complete!

You're ready to start trading.

## Using the Bot

### Home Screen Overview

The home screen shows:

#### Price Card
- Current ETH price (real-time)
- Selected trading pair
- Connection status

#### EMA Card
- EMA 9 value
- EMA 34 value
- Visual indicators

#### Signal Card
- Current signal: BUY 🟢, SELL 🔴, or HOLD ⚪
- Updates every 5 minutes

#### Position Card
- Active position details
- Entry price and quantity
- Current P&L (profit/loss)
- P&L percentage

#### Performance Card
- Total P&L
- Number of closed trades
- Current capital

### Starting Trading

#### Paper Trading (No Risk)

1. Tap "Start Trading"
2. Bot will trade with simulated money
3. Uses real-time prices
4. Perfect for testing

#### Live Trading (Real Money)

1. Ensure you have a valid session token
2. Set your capital (₹1,000 - ₹10,000)
3. Review risk settings
4. Tap "Start Trading"
5. Confirm you understand the risks

### Monitoring Your Bot

#### What to Watch

- **Signal Changes**: Watch for crossovers
- **Active Position**: Monitor your open trade
- **P&L**: Track your profit/loss
- **Connection Status**: Ensure "Live" indicator is green

#### Notifications

You'll receive notifications for:
- Trade executions
- High slippage warnings
- Errors or connection issues
- Emergency stops

### Stopping Trading

#### Normal Stop

1. Tap "Stop Trading"
2. Bot stops looking for new signals
3. Existing position remains open
4. You can manually close it later

#### Emergency Stop

1. Tap "EMERGENCY STOP"
2. Confirm the action
3. All open orders are cancelled immediately
4. Trading stops completely
5. Use this if something goes wrong

## Settings & Configuration

### Accessing Settings

Tap the ⚙️ icon in the top right corner.

### Trading Parameters

#### Trading Pair

- Select: ETHINR, ETHEUR, or ETHUSDT
- Cannot change while trading is active
- Stop trading first to change

#### Trading Capital

- Minimum: ₹1,000
- Maximum: ₹10,000
- This is your total trading capital
- Cannot change while trading is active

#### Risk Per Trade

- Minimum: 0.1%
- Maximum: 5%
- Default: 2%
- This is the percentage of capital risked per trade
- Example: ₹5,000 capital × 2% = ₹100 risk per trade

#### Max Slippage

- Default: 0.75%
- Maximum allowed price difference
- Orders rejected if slippage exceeds this
- Lower = safer but fewer fills
- Higher = more fills but more slippage

### Account Information

View your:
- API Key ID
- Live mode status
- Authentication status

### Data Management

#### Export Trade History

- Tap "Export Trade History (CSV)"
- Saves all closed trades to CSV file
- Includes: entry/exit prices, P&L, timestamps
- Use for tax reporting or analysis

#### Factory Reset

⚠️ **WARNING**: This deletes everything!

- Tap "Clear All Data (Factory Reset)"
- Confirm the action
- All credentials deleted
- All trade history deleted
- Cannot be undone
- You'll need to set up again

## Troubleshooting

### Connection Issues

**Problem**: "Connecting..." never completes

**Solutions**:
1. Check your internet connection
2. Verify Binance is not down: [status.binance.com](https://status.binance.com)
3. Restart the app
4. Check if your IP is whitelisted on Binance

### Authentication Failed

**Problem**: "Authentication failed" error

**Solutions**:
1. Verify your Ed25519 keys are correct
2. Check if API key is enabled on Binance
3. Ensure API key has trading permissions
4. Try re-entering your keys

### Orders Not Executing

**Problem**: Signals appear but no orders placed

**Solutions**:
1. Check if you're in paper mode (should show "PAPER" badge)
2. Verify you have a valid session token for live mode
3. Check capital is within limits (₹1,000 - ₹10,000)
4. Ensure you don't already have an open position
5. Check Binance API status

### High Slippage Warnings

**Problem**: Orders rejected due to slippage

**Solutions**:
1. Increase max slippage in settings
2. Trade during less volatile times
3. Use limit orders instead of market orders
4. Trade more liquid pairs (ETHUSDT usually best)

### App Crashes

**Problem**: App closes unexpectedly

**Solutions**:
1. Update to latest version
2. Clear app cache
3. Reinstall the app
4. Check device storage space
5. Report the crash with logs

### Session Token Invalid

**Problem**: "Invalid session token" error

**Solutions**:
1. Contact admin for new token
2. Check token hasn't expired
3. Verify you copied the entire token
4. Try refreshing the token

## FAQ

### General Questions

**Q: Is this bot safe to use?**

A: The bot uses industry-standard security (Ed25519, AES-256 encryption, biometric auth). However, all trading involves risk. Never invest more than you can afford to lose.

**Q: How much money do I need?**

A: Minimum ₹1,000, maximum ₹10,000. Start small and increase as you gain confidence.

**Q: Can I trade Bitcoin or other coins?**

A: No, this bot only trades Ethereum (ETH) pairs. This is by design for focused strategy.

**Q: Do I need to keep the app open?**

A: Yes, the app must be running for the bot to trade. Keep your device charged and connected to internet.

**Q: What happens if my phone dies?**

A: Trading stops. Any open position remains on Binance. Restart the app when possible.

### Trading Strategy

**Q: What is EMA crossover strategy?**

A: The bot uses two moving averages (EMA 9 and EMA 34). When the fast EMA crosses above the slow EMA, it's a buy signal. When it crosses below, it's a sell signal.

**Q: How often does the bot trade?**

A: It depends on market conditions. Could be several times a day or once a week. The bot only trades on confirmed crossovers.

**Q: Can I customize the strategy?**

A: Not in this version. The EMA periods (9 and 34) are fixed for optimal performance.

**Q: What is the expected return?**

A: Returns vary based on market conditions. Past performance doesn't guarantee future results. Always test in paper mode first.

### Security

**Q: Where are my keys stored?**

A: On your device only, encrypted with AES-256. They never leave your device.

**Q: Can the developer access my keys?**

A: No. Keys are stored locally and encrypted. Even if someone gets your phone, they need your biometric/PIN.

**Q: What is a session token?**

A: A temporary authorization token issued by the admin. It enables live trading but doesn't contain your API keys.

**Q: Can I use HMAC keys?**

A: No. The app only accepts Ed25519 keys for better security.

### Paper Trading

**Q: Is paper trading realistic?**

A: Yes, it uses real-time prices from Binance. However, it doesn't account for slippage or order rejections.

**Q: Should I paper trade first?**

A: Absolutely! Paper trade for at least a week to understand how the bot works.

**Q: Does paper trading cost money?**

A: No, it's completely free. No session token needed.

### Live Trading

**Q: How do I get a session token?**

A: Contact the administrator or developer. Tokens are issued to verified users.

**Q: Can I trade without a session token?**

A: You can paper trade, but not live trade.

**Q: What fees does Binance charge?**

A: Binance charges trading fees (usually 0.1% per trade). Check Binance for current rates.

**Q: Are there any app fees?**

A: Check with the developer. The app itself doesn't charge fees, but there may be a subscription.

### Technical

**Q: What Android/iOS version do I need?**

A: Android 6.0+ or iOS 12.0+

**Q: How much data does the bot use?**

A: Minimal. Approximately 10-20 MB per day for price updates.

**Q: Can I run multiple bots?**

A: Not recommended. One bot per API key.

**Q: Can I use the same API key on multiple devices?**

A: Yes, but not recommended. Could cause conflicts.

## Support

### Getting Help

**Email**: support@example.com
**Telegram**: @eth_bot_support
**GitHub**: [Issues page]

### Reporting Bugs

When reporting bugs, include:
1. Device model and OS version
2. App version
3. Steps to reproduce
4. Screenshots if possible
5. Error messages

### Feature Requests

We welcome feature requests! Submit them via:
- GitHub Issues
- Email
- Telegram group

## Legal

### Disclaimer

Trading cryptocurrencies involves substantial risk of loss. This bot is provided as-is without warranty. The developers are not responsible for any losses incurred. Always:

- Start with paper trading
- Only invest what you can afford to lose
- Understand the risks
- Do your own research

### Terms of Service

By using this app, you agree to:
- Use it at your own risk
- Not hold developers liable for losses
- Comply with local laws and regulations
- Not use it for illegal activities

### Privacy Policy

- We don't collect personal data
- API keys stored locally only
- Anonymous usage statistics may be collected
- No data sold to third parties

## Updates

### Checking for Updates

- Android: Google Play Store
- iOS: App Store
- Or check GitHub releases

### Changelog

See CHANGELOG.md for version history.

---

**Version**: 1.0.0
**Last Updated**: 2024-12-05

**Happy Trading! 🚀**
