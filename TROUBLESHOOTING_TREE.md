# 🔧 Troubleshooting Decision Tree

## Start Here: What's the Error?

### 1️⃣ "Invalid JSON in Response Body" (in n8n)

**Problem:** Wrong expression syntax

**Solution:**
```json
{
  "reply": "={{ $json.output || $json.text }}"
}
```

**Key points:**
- Must have `=` after opening quote: `"={{`
- Must be wrapped in quotes
- Don't use `{{ }}` without `=`

**Test:** Execute workflow in n8n. Error should disappear.

---

### 2️⃣ n8n Returns Wrong Data (webhook input instead of AI response)

**Problem:** Response Data set to "First Incoming Data"

**Solution:**
1. Open "Respond to Webhook" node
2. Set "Response Data" to `Last Node`
3. Save and test

**Test:** Curl should return AI response, not your input.

---

### 3️⃣ "reply is undefined" (in API logs)

**Problem:** Wrong field name in expression

**Solution:**
1. Execute n8n workflow
2. Click on LLM node
3. Check Output tab
4. Find the field with AI response (text/output/response)
5. Update expression:
   - If field is `text`: `"={{ $json.text }}"`
   - If field is `output`: `"={{ $json.output }}"`
   - Or use universal: `"={{ $json.output || $json.text }}"`

**Test:** API logs should show `✅ Successfully got reply from n8n`

---

### 4️⃣ "Failed to fetch" or "Network error" (in frontend)

**Problem:** Can't reach API or n8n

**Check:**
- [ ] Is n8n running? Visit `http://localhost:5678`
- [ ] Is Next.js running? Visit `http://localhost:3000`
- [ ] Is `N8N_WEBHOOK_URL` in `.env.local` correct?
- [ ] Is n8n workflow activated? (toggle switch)

**Solution:**
1. Start n8n: `n8n start` or `docker start n8n`
2. Start Next.js: `npm run dev`
3. Verify `.env.local` has correct URL
4. Activate workflow in n8n

**Test:** Run `node test-n8n-pipeline.js`

---

### 5️⃣ n8n Workflow Fails (red X on nodes)

**Problem:** LLM node error

**Check:**
- [ ] LLM node has valid API key
- [ ] API key has credits/quota
- [ ] Input field is set to `={{ $json.chatInput }}`
- [ ] Model name is correct

**Solution:**
1. Click on failed node
2. Read error message
3. Common fixes:
   - Invalid API key → Add/update key in credentials
   - Quota exceeded → Check API provider account
   - Invalid model → Use valid model name (gpt-3.5-turbo, gpt-4, etc.)

**Test:** Execute workflow. All nodes should show green checkmarks.

---

### 6️⃣ Frontend Shows Error Message

**Problem:** API route returning error

**Check API logs for:**
- `❌ n8n webhook failed` → n8n is down or returning error
- `⚠️ No "reply" field` → Wrong field name in Respond to Webhook
- `📊 n8n response status: 404` → Wrong webhook URL

**Solution based on log:**

**If n8n is down:**
```bash
# Check if n8n is running
curl http://localhost:5678

# If not, start it
n8n start
```

**If wrong webhook URL:**
1. Check n8n webhook path
2. Update `.env.local`:
```
N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/YOUR-PATH
```
3. Restart Next.js

**If wrong field name:**
- See solution #3 above

**Test:** Send message in frontend chatbot

---

### 7️⃣ Response is Slow or Times Out

**Problem:** LLM taking too long

**Solutions:**
1. Use faster model (gpt-3.5-turbo instead of gpt-4)
2. Reduce max tokens in LLM node
3. Add timeout to API route:
```typescript
const response = await fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(30000) // 30 second timeout
});
```

**Test:** Response should come within 5-10 seconds

---

### 8️⃣ Works in curl but not in frontend

**Problem:** CORS or frontend code issue

**Check:**
1. Browser console for errors
2. Network tab in DevTools
3. API route logs

**Common issues:**
- Frontend sending wrong format
- Browser blocking request
- API route not handling request properly

**Solution:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Check Network tab for failed requests
5. Verify request payload matches expected format

**Test:** Should see successful request in Network tab

---

### 9️⃣ Everything Works Once, Then Fails

**Problem:** Session or state issue

**Solutions:**
1. Clear browser cache
2. Restart Next.js dev server
3. Restart n8n
4. Check n8n execution history for errors

**Test:** Try in incognito/private window

---

### 🔟 Random/Intermittent Failures

**Problem:** Rate limiting or API issues

**Check:**
1. LLM provider status page
2. API rate limits
3. n8n error logs

**Solutions:**
1. Add retry logic to API route
2. Implement rate limiting
3. Add better error messages
4. Use fallback responses

**Test:** Monitor over time

---

## 🎯 Quick Diagnostic Commands

### Check if n8n is running:
```bash
curl http://localhost:5678
```

### Test n8n webhook directly:
```bash
curl -X POST http://localhost:5678/webhook-test/chatbot \
  -H "Content-Type: application/json" \
  -d '{"chatInput":"test","userId":"test"}'
```

### Test API route:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"userMessage":"test","userId":"test"}'
```

### Run full test suite:
```bash
node test-n8n-pipeline.js
```

---

## 🔍 Log Analysis Guide

### API Route Logs

**Good logs (working):**
```
📨 Received chat message: Hello
👤 User ID: user_123
🔗 Using n8n webhook URL: http://localhost:5678/webhook-test/chatbot
📤 Sending to n8n: {"chatInput":"Hello","userId":"user_123"}
📊 n8n response status: 200
📥 n8n response data: {"reply":"Hello! Welcome..."}
✅ Successfully got reply from n8n
```

**Bad logs (not working):**
```
📨 Received chat message: Hello
📤 Sending to n8n: {...}
📊 n8n response status: 500
❌ n8n webhook failed: ...
```
→ n8n has an error, check n8n execution log

```
📥 n8n response data: {"text":"Hello..."}
⚠️ No "reply" field in n8n response
```
→ Wrong field name, update Respond to Webhook

---

## 🆘 Still Stuck?

### Step-by-step debug process:

1. **Verify n8n is running**
   ```bash
   curl http://localhost:5678
   ```

2. **Test n8n workflow manually**
   - Open n8n UI
   - Click "Execute Workflow"
   - Check each node's output

3. **Test webhook directly**
   ```bash
   curl -X POST http://localhost:5678/webhook-test/chatbot \
     -H "Content-Type: application/json" \
     -d '{"chatInput":"test","userId":"test"}'
   ```
   - Should return: `{ "reply": "..." }`

4. **Check API route**
   - Look at terminal running Next.js
   - Find the emoji logs
   - Identify where it fails

5. **Test frontend**
   - Open browser DevTools
   - Check Console and Network tabs
   - Look for errors

6. **Run test script**
   ```bash
   node test-n8n-pipeline.js
   ```
   - Shows exactly where the problem is

---

## 💡 Most Common Solution

90% of issues are fixed by:

```json
{
  "reply": "={{ $json.output || $json.text || $json.response }}"
}
```

In your n8n "Respond to Webhook" node.

Make sure:
- Response Data: `Last Node`
- Response Mode: `Using Fields Below`

That's it! 🎉
