const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HMAC_SECRET = process.env.HMAC_SECRET || 'change-this-secret-key';
const SESSION_TOKEN_LIFETIME = parseInt(process.env.SESSION_TOKEN_LIFETIME || '86400'); // 24 hours

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// In-memory session store (use Redis in production)
const sessionStore = new Map();

// Generate session token
function generateSessionToken(userId) {
  const timestamp = Date.now();
  const expiresAt = timestamp + (SESSION_TOKEN_LIFETIME * 1000);
  const payload = `${userId}:${timestamp}:${expiresAt}`;
  
  const hmac = crypto.createHmac('sha256', HMAC_SECRET);
  hmac.update(payload);
  const signature = hmac.digest('hex');
  
  const token = Buffer.from(`${payload}:${signature}`).toString('base64');
  
  // Store in session store
  sessionStore.set(token, {
    userId,
    createdAt: timestamp,
    expiresAt,
  });
  
  return token;
}

// Verify session token
function verifySessionToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    
    if (parts.length !== 4) {
      return { valid: false, error: 'Invalid token format' };
    }
    
    const [userId, timestamp, expiresAt, signature] = parts;
    const payload = `${userId}:${timestamp}:${expiresAt}`;
    
    // Verify HMAC signature
    const hmac = crypto.createHmac('sha256', HMAC_SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');
    
    if (signature !== expectedSignature) {
      return { valid: false, error: 'Invalid signature' };
    }
    
    // Check expiration
    const now = Date.now();
    if (now > parseInt(expiresAt)) {
      sessionStore.delete(token);
      return { valid: false, error: 'Token expired' };
    }
    
    // Check if token exists in store
    if (!sessionStore.has(token)) {
      return { valid: false, error: 'Token not found' };
    }
    
    return {
      valid: true,
      userId,
      expiresAt: parseInt(expiresAt),
    };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
  });
});

// Create session token (admin only - add authentication in production)
app.post('/create-session', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  const token = generateSessionToken(userId);
  const session = sessionStore.get(token);
  
  res.json({
    session_token: token,
    expires_at: session.expiresAt,
    lifetime_seconds: SESSION_TOKEN_LIFETIME,
  });
});

// Verify session token
app.post('/verify-session', (req, res) => {
  const { session_token } = req.body;
  
  if (!session_token) {
    return res.status(400).json({ error: 'session_token is required' });
  }
  
  const result = verifySessionToken(session_token);
  
  if (result.valid) {
    res.json({
      valid: true,
      user_id: result.userId,
      expires_at: result.expiresAt,
    });
  } else {
    res.status(401).json({
      valid: false,
      error: result.error,
    });
  }
});

// Refresh session token
app.post('/refresh-session', (req, res) => {
  const { session_token } = req.body;
  
  if (!session_token) {
    return res.status(400).json({ error: 'session_token is required' });
  }
  
  const result = verifySessionToken(session_token);
  
  if (!result.valid) {
    return res.status(401).json({ error: result.error });
  }
  
  // Delete old token
  sessionStore.delete(session_token);
  
  // Generate new token
  const newToken = generateSessionToken(result.userId);
  const session = sessionStore.get(newToken);
  
  res.json({
    new_token: newToken,
    expires_at: session.expiresAt,
  });
});

// Revoke session token
app.post('/revoke-session', (req, res) => {
  const { session_token } = req.body;
  
  if (!session_token) {
    return res.status(400).json({ error: 'session_token is required' });
  }
  
  if (sessionStore.has(session_token)) {
    sessionStore.delete(session_token);
    res.json({ success: true, message: 'Session revoked' });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// List active sessions (admin only - add authentication in production)
app.get('/sessions', (req, res) => {
  const sessions = Array.from(sessionStore.entries()).map(([token, data]) => ({
    token_preview: token.substring(0, 20) + '...',
    user_id: data.userId,
    created_at: data.createdAt,
    expires_at: data.expiresAt,
  }));
  
  res.json({
    count: sessions.length,
    sessions,
  });
});

// Cleanup expired sessions periodically
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [token, data] of sessionStore.entries()) {
    if (now > data.expiresAt) {
      sessionStore.delete(token);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    console.log(`Cleaned ${cleaned} expired sessions`);
  }
}, 60000); // Every minute

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Session auth server running on port ${PORT}`);
  console.log(`📝 HMAC Secret: ${HMAC_SECRET.substring(0, 10)}...`);
  console.log(`⏱️  Session lifetime: ${SESSION_TOKEN_LIFETIME} seconds`);
});
