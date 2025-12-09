# Session Authentication Server

Minimal Node.js server for validating session tokens used by the ETH Trading Bot.

## Features

- Session token generation with HMAC-SHA256
- Token validation and verification
- Token refresh mechanism
- Automatic cleanup of expired sessions
- In-memory session store (use Redis in production)

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create `.env` file:

```env
PORT=3000
HMAC_SECRET=your-super-secret-hmac-key-change-this
SESSION_TOKEN_LIFETIME=86400
```

### Run Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Health Check

```bash
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": 1234567890,
  "uptime": 123.45
}
```

### Create Session Token (Admin)

```bash
POST /create-session
Content-Type: application/json

{
  "userId": "user123"
}
```

Response:
```json
{
  "session_token": "base64-encoded-token",
  "expires_at": 1234567890,
  "lifetime_seconds": 86400
}
```

### Verify Session Token

```bash
POST /verify-session
Content-Type: application/json

{
  "session_token": "base64-encoded-token"
}
```

Response (valid):
```json
{
  "valid": true,
  "user_id": "user123",
  "expires_at": 1234567890
}
```

Response (invalid):
```json
{
  "valid": false,
  "error": "Token expired"
}
```

### Refresh Session Token

```bash
POST /refresh-session
Content-Type: application/json

{
  "session_token": "old-token"
}
```

Response:
```json
{
  "new_token": "new-base64-encoded-token",
  "expires_at": 1234567890
}
```

### Revoke Session Token

```bash
POST /revoke-session
Content-Type: application/json

{
  "session_token": "token-to-revoke"
}
```

Response:
```json
{
  "success": true,
  "message": "Session revoked"
}
```

### List Active Sessions (Admin)

```bash
GET /sessions
```

Response:
```json
{
  "count": 2,
  "sessions": [
    {
      "token_preview": "abc123...",
      "user_id": "user123",
      "created_at": 1234567890,
      "expires_at": 1234567890
    }
  ]
}
```

## Security Notes

1. **HMAC Secret**: Change the default HMAC_SECRET in production
2. **Admin Endpoints**: Add authentication to `/create-session` and `/sessions`
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Redis**: Use Redis instead of in-memory store for production

## Production Deployment

### Using PM2

```bash
npm install -g pm2
pm2 start index.js --name eth-bot-auth
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

Build and run:
```bash
docker build -t eth-bot-auth .
docker run -p 3000:3000 --env-file .env eth-bot-auth
```

## Testing

### Create a test session

```bash
curl -X POST http://localhost:3000/create-session \
  -H "Content-Type: application/json" \
  -d '{"userId": "test-user"}'
```

### Verify the token

```bash
curl -X POST http://localhost:3000/verify-session \
  -H "Content-Type: application/json" \
  -d '{"session_token": "YOUR_TOKEN_HERE"}'
```

## License

MIT
