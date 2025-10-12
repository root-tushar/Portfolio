# 🔧 Environment Setup Checker

## Step 1: Create .env.local File

Create a file called `.env.local` in your project root (same level as package.json):

```bash
# .env.local
N8N_WEBHOOK_URL=https://your-actual-n8n-webhook-url/webhook/chatbot
```

**Important Notes:**
- Replace `https://your-actual-n8n-webhook-url` with your real n8n URL
- Do NOT use `NEXT_PUBLIC_` prefix (this keeps it server-side only)
- No trailing slashes
- Must be HTTPS if deployed to Vercel

## Step 2: Common n8n URL Formats

### Cloud n8n (n8n.cloud)
```
https://your-instance.app.n8n.cloud/webhook/chatbot
```

### Self-hosted n8n
```
https://your-domain.com:5678/webhook/chatbot
```

### Local n8n with ngrok (for development)
```bash
# Install ngrok: https://ngrok.com/
ngrok http 5678

# Use the HTTPS URL it provides:
https://abc123.ngrok.io/webhook/chatbot
```

### Docker n8n
```
https://your-server.com/n8n/webhook/chatbot
```

## Step 3: Verify Your Setup

1. **Check your .env.local file exists:**
   ```bash
   ls -la .env.local
   ```

2. **Restart your Next.js server:**
   ```bash
   npm run dev
   ```

3. **Test the connection:**
   - Open browser console (F12)
   - Copy and paste the contents of `debug-n8n-connection.js`
   - Check the logs for your webhook URL

## Step 4: Test n8n Workflow

1. **Open your n8n editor**
2. **Make sure workflow is ACTIVE** (toggle switch ON)
3. **Test manually:**
   - Click "Execute Workflow" button
   - Check if it runs without errors
4. **Check credentials:**
   - OpenAI API key is valid
   - Has sufficient credits/quota

## Step 5: Common Issues & Solutions

### Issue: "Using n8n webhook URL: https://your-n8n-domain/webhook/chatbot"
**Solution:** Your .env.local is not configured correctly
- Create/update .env.local with your real webhook URL
- Restart Next.js server

### Issue: Network/CORS errors
**Solution:** n8n is not publicly accessible
- If local: Use ngrok to create public tunnel
- If cloud: Check n8n instance is running
- If self-hosted: Verify firewall/port settings

### Issue: n8n workflow not executing
**Solution:** Check n8n configuration
- Workflow must be ACTIVE
- Webhook node properly configured
- AI node has valid credentials
- Check Executions tab for errors

### Issue: AI node failing
**Solution:** Check API credentials
- OpenAI: Valid API key with credits
- Gemini: Valid API key and proper endpoint
- Check n8n execution logs for specific error

## Step 6: Manual Testing Commands

### Test webhook directly (replace URL):
```bash
curl -X POST "https://your-webhook-url/webhook/chatbot" \
  -H "Content-Type: application/json" \
  -d '{"question":"Hello, what services do you offer?"}'
```

### Expected response:
```json
{
  "reply": "Hello! I'm Tushar's AI assistant. I can help you learn about..."
}
```

## Step 7: Verification Checklist

- [ ] .env.local file exists with correct webhook URL
- [ ] Next.js server restarted after creating .env.local
- [ ] n8n workflow is ACTIVE
- [ ] n8n webhook URL is publicly accessible
- [ ] AI node has valid credentials
- [ ] Manual curl test returns AI response
- [ ] Browser console shows correct webhook URL in logs
- [ ] Chatbot returns intelligent responses (not fallback message)

## 🎉 Success Indicators

When everything is working correctly:
1. **Server logs show your real webhook URL** (not the placeholder)
2. **n8n Executions tab shows successful runs** when you send messages
3. **Chatbot gives intelligent responses** about Tushar's services
4. **No fallback messages** appear in normal operation

## 🆘 Still Having Issues?

1. **Check server console logs** for detailed error messages
2. **Test n8n workflow manually** in the editor
3. **Verify webhook URL accessibility** with curl
4. **Use ngrok** if n8n is running locally
5. **Check n8n execution logs** for specific failure points