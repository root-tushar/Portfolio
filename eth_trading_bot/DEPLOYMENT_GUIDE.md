# Deployment Guide - ETH Trading Bot

Complete guide for deploying the ETH Trading Bot to production.

## Pre-Deployment Checklist

### 1. Security Audit

- [ ] Ed25519 keys validated (32 bytes)
- [ ] HMAC keys rejected for live trading
- [ ] Private keys encrypted with AES-256
- [ ] Biometric/PIN authentication working
- [ ] No secrets in logs or crash reports
- [ ] TLS certificates valid
- [ ] Session tokens properly validated

### 2. Testing

- [ ] Unit tests passing (`flutter test`)
- [ ] Integration tests passing
- [ ] Paper trading tested for 24+ hours
- [ ] Live trading tested on testnet
- [ ] Emergency stop tested
- [ ] Auto-reconnect tested
- [ ] Memory leak testing completed

### 3. Configuration

- [ ] Server URL updated in `lib/config/constants.dart`
- [ ] Sentry DSN configured (if using)
- [ ] Capital limits verified (₹1,000 - ₹10,000)
- [ ] Allowed pairs verified (ETH only)
- [ ] Rate limits configured

## Server Deployment

### Option 1: VPS (DigitalOcean, AWS, etc.)

1. **Provision Server**
   ```bash
   # Ubuntu 22.04 LTS recommended
   ssh root@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Setup Application**
   ```bash
   cd /opt
   git clone your-repo
   cd eth_trading_bot/server
   npm install --production
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env
   # Set HMAC_SECRET to a strong random value
   ```

5. **Install PM2**
   ```bash
   npm install -g pm2
   pm2 start index.js --name eth-bot-auth
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 2: Docker

1. **Build Image**
   ```bash
   cd eth_trading_bot/server
   docker build -t eth-bot-auth .
   ```

2. **Run Container**
   ```bash
   docker run -d \
     --name eth-bot-auth \
     -p 3000:3000 \
     --env-file .env \
     --restart unless-stopped \
     eth-bot-auth
   ```

### Option 3: Heroku

1. **Create Heroku App**
   ```bash
   heroku create eth-bot-auth
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set HMAC_SECRET=your-secret
   heroku config:set SESSION_TOKEN_LIFETIME=86400
   ```

3. **Deploy**
   ```bash
   git subtree push --prefix eth_trading_bot/server heroku main
   ```

## Mobile App Deployment

### Android

1. **Update Version**
   ```yaml
   # pubspec.yaml
   version: 1.0.0+1
   ```

2. **Generate Keystore**
   ```bash
   keytool -genkey -v -keystore ~/eth-bot-key.jks \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias eth-bot
   ```

3. **Configure Signing**
   ```properties
   # android/key.properties
   storePassword=your-password
   keyPassword=your-password
   keyAlias=eth-bot
   storeFile=/path/to/eth-bot-key.jks
   ```

4. **Build Release APK**
   ```bash
   flutter build apk --release
   ```

5. **Build App Bundle (for Play Store)**
   ```bash
   flutter build appbundle --release
   ```

### iOS

1. **Update Version**
   ```yaml
   # pubspec.yaml
   version: 1.0.0+1
   ```

2. **Configure Xcode**
   - Open `ios/Runner.xcworkspace`
   - Set Team and Bundle Identifier
   - Configure signing certificates

3. **Build Release**
   ```bash
   flutter build ios --release
   ```

4. **Archive and Upload**
   - Open Xcode
   - Product → Archive
   - Upload to App Store Connect

## Post-Deployment

### 1. Monitoring

- [ ] Setup server monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Setup log aggregation
- [ ] Monitor API rate limits

### 2. User Onboarding

- [ ] Create admin session tokens
- [ ] Distribute tokens to authorized users
- [ ] Provide Ed25519 key generation guide
- [ ] Setup support channels

### 3. Maintenance

- [ ] Schedule regular backups
- [ ] Monitor server resources
- [ ] Review logs daily
- [ ] Update dependencies monthly

## Acceptance Testing

### Test Plan

1. **Paper Trading Test (24 hours)**
   - Start bot in paper mode
   - Monitor for 24 hours
   - Verify no crashes
   - Check trade logs
   - Validate P&L calculations

2. **Live Trading Test (Staging)**
   - Use testnet or small amounts
   - Place 5-10 trades
   - Verify orders on Binance
   - Check slippage protection
   - Test emergency stop

3. **24/7 Operation Test (72 hours)**
   - Run bot continuously
   - Monitor auto-reconnect
   - Check memory usage
   - Verify no memory leaks
   - Test during network issues

### Acceptance Criteria

- [x] Ed25519 requests accepted by Binance
- [x] Capital validation working (₹1,000 - ₹10,000)
- [x] Only ETH pairs tradeable
- [x] 72-hour uptime achieved
- [x] Auto-reconnect working
- [x] Secure key storage verified
- [x] Emergency stop functional

## Rollback Plan

If issues occur in production:

1. **Immediate Actions**
   - Execute emergency stop on all bots
   - Cancel all open orders manually on Binance
   - Stop server to prevent new sessions

2. **Investigation**
   - Review error logs
   - Check Binance API status
   - Verify network connectivity

3. **Rollback**
   - Revert to previous stable version
   - Restore from backup if needed
   - Notify users of downtime

## Support

### User Support

- Email: support@example.com
- Telegram: @eth_bot_support
- GitHub Issues: [link]

### Emergency Contacts

- Server Admin: [contact]
- Lead Developer: [contact]
- Binance Support: [link]

## Legal & Compliance

- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Risk disclaimer displayed
- [ ] User consent obtained
- [ ] Data protection compliance (GDPR, etc.)

## Backup & Recovery

### Database Backups

```bash
# Backup Hive data
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/hive/data

# Restore
tar -xzf backup-20240101.tar.gz -C /path/to/restore
```

### Session Store Backup

```bash
# If using Redis
redis-cli BGSAVE

# Restore
redis-cli --rdb /path/to/dump.rdb
```

## Performance Optimization

1. **Server**
   - Use Redis for session store
   - Enable gzip compression
   - Setup CDN for static assets
   - Implement rate limiting

2. **Mobile App**
   - Optimize image assets
   - Minimize API calls
   - Cache static data
   - Use WebSocket for real-time updates

## Security Hardening

1. **Server**
   - Disable root login
   - Setup firewall (UFW)
   - Enable fail2ban
   - Regular security updates

2. **Application**
   - Implement rate limiting
   - Add request validation
   - Setup CORS properly
   - Use security headers

## Monitoring Checklist

- [ ] Server uptime monitoring
- [ ] API response time monitoring
- [ ] Error rate tracking
- [ ] Memory usage alerts
- [ ] Disk space alerts
- [ ] SSL certificate expiry alerts
- [ ] Binance API status monitoring

## Documentation

- [ ] User manual published
- [ ] API documentation complete
- [ ] Troubleshooting guide available
- [ ] FAQ updated
- [ ] Video tutorials created

---

**Last Updated**: 2024-12-05
**Version**: 1.0.0
