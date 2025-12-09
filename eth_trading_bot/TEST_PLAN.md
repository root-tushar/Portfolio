# Test Plan - ETH Trading Bot

Comprehensive testing strategy for production readiness.

## Test Objectives

1. Verify Ed25519 authentication works with Binance
2. Validate capital limits and trading restrictions
3. Ensure 24/7 operation reliability
4. Confirm security measures are effective
5. Test emergency stop functionality

## Test Environment

### Testnet Setup

- Binance Testnet: `https://testnet.binance.vision`
- Test API Keys: Ed25519 keys generated for testnet
- Test Capital: ₹5,000 (simulated)
- Test Pairs: ETHUSDT (testnet)

### Production Staging

- Binance Live API with minimal capital
- Real Ed25519 keys
- Capital: ₹1,000 (minimum)
- Pairs: ETHUSDT, ETHINR

## Unit Tests

### 1. EMA Calculation Tests

**File**: `test/services/trading_strategy_service_test.dart`

```dart
test('Calculate EMA(9) correctly', () {
  final prices = [100, 102, 101, 103, 105, 104, 106, 108, 107];
  final ema9 = calculateEMA(prices, 9);
  expect(ema9, closeTo(104.5, 0.5));
});

test('Calculate EMA(34) correctly', () {
  // Test with 34+ data points
});
```

**Expected Results**:
- EMA values match manual calculations
- Handles edge cases (insufficient data)

### 2. Signal Detection Tests

```dart
test('Detect bullish crossover', () {
  // Previous: EMA9 < EMA34
  // Current: EMA9 > EMA34
  // Expected: BUY signal
});

test('Detect bearish crossover', () {
  // Previous: EMA9 > EMA34
  // Current: EMA9 < EMA34
  // Expected: SELL signal
});

test('No signal when no crossover', () {
  // EMA9 and EMA34 maintain relationship
  // Expected: HOLD signal
});
```

**Expected Results**:
- Crossovers detected accurately
- No false signals

### 3. Position Sizing Tests

```dart
test('Calculate position size with 2% risk', () {
  final capital = 5000.0;
  final risk = 2.0;
  final price = 2000.0;
  final size = calculatePositionSize(capital, risk, price);
  expect(size, equals(0.05)); // (5000 * 0.02) / 2000
});
```

**Expected Results**:
- Position sizes calculated correctly
- Respects risk limits (0.1% - 5%)

### 4. Ed25519 Signing Tests

```dart
test('Sign request with Ed25519', () {
  final privateKey = generateTestKey();
  final queryString = 'symbol=ETHUSDT&side=BUY&timestamp=123456';
  final signature = signEd25519(privateKey, queryString);
  expect(signature.length, equals(128)); // 64 bytes hex
});

test('Reject HMAC keys', () {
  final hmacKey = Uint8List(64); // Wrong size
  expect(() => validateKeyType(hmacKey), throwsException);
});
```

**Expected Results**:
- Ed25519 signatures generated correctly
- HMAC keys rejected

### 5. Capital Validation Tests

```dart
test('Accept valid capital', () {
  expect(() => setCapital(5000), returnsNormally);
});

test('Reject capital below minimum', () {
  expect(() => setCapital(500), throwsException);
});

test('Reject capital above maximum', () {
  expect(() => setCapital(15000), throwsException);
});
```

**Expected Results**:
- Capital within ₹1,000 - ₹10,000 accepted
- Out-of-range capital rejected

## Integration Tests

### 1. Binance API Integration

**Test**: Connect to Binance and fetch account info

```bash
flutter test integration_test/binance_api_test.dart
```

**Steps**:
1. Initialize BinanceEd25519Service with test keys
2. Call getAccountInfo()
3. Verify response contains balances

**Expected Results**:
- API connection successful
- Ed25519 signature accepted
- Account data retrieved

### 2. Order Placement Test

**Test**: Place and cancel a small order

**Steps**:
1. Place market order for 0.001 ETH
2. Verify order accepted
3. Check order status
4. Cancel order
5. Verify cancellation

**Expected Results**:
- Order placed successfully
- Order ID returned
- Order cancelled successfully

### 3. WebSocket Connection Test

**Test**: Connect to price stream and receive updates

**Steps**:
1. Connect to ETHUSDT@trade stream
2. Receive 10 price updates
3. Disconnect
4. Reconnect after 5 seconds
5. Verify auto-reconnect works

**Expected Results**:
- WebSocket connects successfully
- Price updates received
- Auto-reconnect works

### 4. Session Token Validation Test

**Test**: Verify session token with server

**Steps**:
1. Generate session token on server
2. Send token to app
3. Verify token with /verify-session
4. Attempt to enable live mode
5. Verify live mode enabled

**Expected Results**:
- Token validated successfully
- Live mode enabled
- Invalid tokens rejected

## End-to-End Tests

### Test 1: Paper Trading (24 Hours)

**Objective**: Verify bot runs continuously in paper mode

**Setup**:
- Mode: Paper trading
- Symbol: ETHUSDT
- Capital: ₹5,000
- Risk: 2%

**Steps**:
1. Start bot at 00:00
2. Monitor for 24 hours
3. Record all signals and trades
4. Check logs every 6 hours
5. Stop bot at 24:00

**Success Criteria**:
- [ ] No crashes or freezes
- [ ] All signals logged
- [ ] Paper trades executed correctly
- [ ] P&L calculated accurately
- [ ] WebSocket maintained connection
- [ ] Memory usage stable (<200MB)

**Data to Collect**:
- Number of signals generated
- Number of trades executed
- Final P&L
- Max drawdown
- Memory usage over time
- Log file size

### Test 2: Live Trading Staging (Small Orders)

**Objective**: Verify live trading with real orders

**Setup**:
- Mode: Live trading
- Symbol: ETHUSDT
- Capital: ₹1,000 (minimum)
- Risk: 0.5% (conservative)

**Steps**:
1. Enable live mode with session token
2. Start trading
3. Wait for first signal
4. Verify order on Binance
5. Let position close naturally
6. Verify P&L matches Binance

**Success Criteria**:
- [ ] Ed25519 orders accepted by Binance
- [ ] Orders appear in Binance account
- [ ] Fills confirmed and recorded
- [ ] Slippage within limits
- [ ] P&L matches Binance records

**Data to Collect**:
- Order IDs
- Fill prices
- Slippage percentages
- Execution times
- Binance screenshots

### Test 3: 24/7 Operation (72 Hours)

**Objective**: Verify bot runs continuously without issues

**Setup**:
- Mode: Paper trading (for safety)
- Symbol: ETHUSDT
- Capital: ₹5,000
- Duration: 72 hours

**Steps**:
1. Start bot on Friday 00:00
2. Monitor remotely
3. Simulate network interruptions
4. Check logs every 12 hours
5. Stop bot on Monday 00:00

**Success Criteria**:
- [ ] 72-hour uptime achieved
- [ ] Auto-reconnect after network issues
- [ ] No memory leaks
- [ ] No crashes
- [ ] All trades logged
- [ ] Emergency stop works at any time

**Monitoring**:
- CPU usage
- Memory usage
- Network traffic
- Log file growth
- Battery usage (mobile)

### Test 4: Emergency Stop

**Objective**: Verify emergency stop cancels all orders

**Setup**:
- Mode: Live trading (testnet)
- Open position: 0.01 ETH
- Pending orders: 2

**Steps**:
1. Open a position
2. Place limit orders
3. Trigger emergency stop
4. Verify all orders cancelled
5. Verify trading stopped
6. Check Binance account

**Success Criteria**:
- [ ] All orders cancelled immediately
- [ ] Trading stopped
- [ ] No new orders placed
- [ ] Position remains (not force-closed)
- [ ] App remains functional

### Test 5: Capital Limit Enforcement

**Objective**: Verify capital limits are enforced

**Test Cases**:

1. **Below Minimum**
   - Set capital to ₹500
   - Attempt to enable live mode
   - Expected: Rejected with error

2. **Above Maximum**
   - Set capital to ₹15,000
   - Attempt to enable live mode
   - Expected: Rejected with error

3. **Within Range**
   - Set capital to ₹5,000
   - Enable live mode
   - Expected: Accepted

**Success Criteria**:
- [ ] Capital validation works
- [ ] Clear error messages shown
- [ ] Live mode blocked for invalid capital

### Test 6: Symbol Restriction

**Objective**: Verify only ETH pairs are tradeable

**Test Cases**:

1. **Allowed Pairs**
   - ETHINR: Should work
   - ETHEUR: Should work
   - ETHUSDT: Should work

2. **Blocked Pairs**
   - BTCUSDT: Should be rejected
   - BNBUSDT: Should be rejected
   - Any non-ETH pair: Should be rejected

**Success Criteria**:
- [ ] Only ETH pairs selectable in UI
- [ ] API rejects non-ETH orders
- [ ] Clear error messages

### Test 7: Slippage Protection

**Objective**: Verify slippage protection works

**Setup**:
- Max slippage: 0.75%
- Simulate high volatility

**Test Cases**:

1. **Low Slippage** (0.3%)
   - Expected: Order accepted

2. **High Slippage** (1.5%)
   - Expected: Order rejected or cancelled

**Success Criteria**:
- [ ] Slippage calculated correctly
- [ ] Orders rejected when slippage exceeds limit
- [ ] User notified of rejection

## Security Tests

### Test 1: Key Storage Security

**Steps**:
1. Store Ed25519 key
2. Attempt to read without authentication
3. Authenticate with biometric
4. Read key
5. Logout
6. Attempt to read again

**Expected Results**:
- Key not readable without auth
- Biometric required
- Key cleared on logout

### Test 2: Session Token Security

**Steps**:
1. Store session token
2. Verify token with server
3. Wait for expiration
4. Attempt to use expired token
5. Refresh token

**Expected Results**:
- Expired tokens rejected
- Refresh works correctly
- Invalid tokens rejected

### Test 3: Log Sanitization

**Steps**:
1. Enable debug logging
2. Perform various operations
3. Review all log files
4. Search for sensitive data

**Expected Results**:
- No private keys in logs
- No API secrets in logs
- No session tokens in logs

## Performance Tests

### Test 1: Memory Usage

**Objective**: Verify no memory leaks

**Steps**:
1. Start bot
2. Run for 24 hours
3. Monitor memory usage every hour
4. Plot memory over time

**Expected Results**:
- Memory usage stable
- No continuous growth
- Max usage <200MB

### Test 2: API Rate Limits

**Objective**: Verify rate limit handling

**Steps**:
1. Make rapid API calls
2. Trigger rate limit
3. Verify backoff behavior
4. Verify recovery

**Expected Results**:
- Rate limits respected
- Exponential backoff works
- No API bans

### Test 3: WebSocket Stability

**Objective**: Verify WebSocket reliability

**Steps**:
1. Connect WebSocket
2. Simulate network issues
3. Verify reconnection
4. Run for 24 hours

**Expected Results**:
- Auto-reconnect works
- No data loss
- Stable connection

## Acceptance Test Results Template

```markdown
## Test Execution: [Date]

### Environment
- Mode: [Paper/Live]
- Symbol: [ETHUSDT/ETHINR/ETHEUR]
- Capital: ₹[amount]
- Duration: [hours]

### Results
- [ ] Test passed
- [ ] Test failed

### Metrics
- Uptime: [%]
- Trades executed: [count]
- P&L: ₹[amount]
- Max drawdown: [%]
- Errors: [count]

### Issues Found
1. [Issue description]
2. [Issue description]

### Screenshots
- [Attach screenshots]

### Logs
- [Attach relevant logs]

### Conclusion
[Pass/Fail with reasoning]
```

## Test Schedule

### Week 1: Unit & Integration Tests
- Day 1-2: Unit tests
- Day 3-4: Integration tests
- Day 5: Fix issues

### Week 2: End-to-End Tests
- Day 1: Paper trading 24h
- Day 2: Review results
- Day 3-5: Live staging tests

### Week 3: Reliability Tests
- Day 1-3: 72-hour operation test
- Day 4: Security tests
- Day 5: Performance tests

### Week 4: Final Validation
- Day 1-2: Fix remaining issues
- Day 3-4: Retest failed cases
- Day 5: Final acceptance

## Sign-Off

### Test Lead
- Name: _______________
- Date: _______________
- Signature: _______________

### Product Owner
- Name: _______________
- Date: _______________
- Signature: _______________

---

**Document Version**: 1.0
**Last Updated**: 2024-12-05
