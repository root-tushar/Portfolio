# 🧪 Test Your Chatbot Now

## Quick Test Commands

### 1. Test n8n Webhook Directly
```bash
node test-your-webhook.js
```

**What to expect:**
- ✅ Status: 200 OK
- ✅ Found "text" field (or "reply" field)
- ✅ Shows actual AI response text

**If you see this, n8n is working!** ✅

---

### 2. Test Full Pipeline (API + n8n)
```bash
node test-n8n-pipeline.js
```

**What to expect:**
- ✅ Direct n8n webhook: PASS
- ✅ API route: PASS
- 🎉 All tests passed!

---

### 3. Test Your Website

1. **Make sure Next.js is running:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000
   ```

3. **Click the AI Assistant button** (bottom right)

4. **Send a message:** Type "hi" and press Enter

5. **You should see:** AI response from your chatbot!

---

## 🔍 Check Logs

### In your terminal (where Next.js is running):

**Good logs (working):**
```
📨 Received chat message: hi
👤 User ID: user_...
🔗 Using n8n webhook URL: http://localhost:5678/webhook/gCQ2UPC28b97bull
📤 Sending to n8n: {"chatInput":"hi","userId":"user_..."}
📊 n8n response status: 200
📥 n8n response data: {"text":"Hello! Welcome..."}
✅ Found response in alternative field: Hello! Welcome...
```

**Bad logs (not working):**
```
❌ n8n webhook failed: ...
```

---

## 🆘 If It Doesn't Work

### Check n8n:
1. Is n8n running? Visit: `http://localhost:5678`
2. Is your workflow **Active**? (toggle switch should be ON)
3. Is "Respond to Webhook" set to "First Incoming Item"?

### Check .env.local:
```bash
type .env.local
```

Should show:
```
N8N_WEBHOOK_URL="http://localhost:5678/webhook/gCQ2UPC28b97bull"
```

### Restart Next.js:
```bash
# Press Ctrl+C
npm run dev
```

---

## ✅ Success Checklist

- [ ] `node test-your-webhook.js` shows ✅ SUCCESS
- [ ] n8n workflow is Active (toggle ON)
- [ ] Next.js server is running (`npm run dev`)
- [ ] Website loads at http://localhost:3000
- [ ] AI Assistant button appears
- [ ] Chatbot opens when clicked
- [ ] Sending message shows AI response
- [ ] No errors in browser console (F12)
- [ ] Terminal shows ✅ emoji in logs

---

## 🎉 When Everything Works

You should see:
1. ✅ Test script passes
2. ✅ Terminal shows success logs with emojis
3. ✅ Website chatbot responds with AI messages
4. ✅ No errors anywhere

**That's it! Your chatbot is working!** 🚀

---

## 📞 Quick Commands Reference

```bash
# Test n8n webhook
node test-your-webhook.js

# Test full pipeline
node test-n8n-pipeline.js

# Start Next.js
npm run dev

# Check .env.local
type .env.local

# Check if n8n is running
curl http://localhost:5678
```

---

**Start with:** `node test-your-webhook.js` 🎯
