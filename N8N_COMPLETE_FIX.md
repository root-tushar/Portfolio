# Complete n8n Chatbot Pipeline Fix

## 🎯 Goal
Fix the entire Frontend → API → n8n → LLM → Response pipeline

---

## 📋 The Complete Flow

```
Frontend (Chatbot.tsx)
  ↓ POST /api/chat
  { "userMessage": "...", "userId": "..." }
  ↓
API Route (route.ts)
  ↓ POST to n8n webhook
  { "chatInput": "...", "userId": "..." }
  ↓
n8n Webhook (receives data)
  ↓
LLM/AI Agent Node (processes chatInput)
  ↓ outputs AI response
Respond to Webhook Node
  ↓ returns JSON
  { "reply": "AI response text" }
  ↓
API Route (receives reply)
  ↓ returns to frontend
  { "reply": "..." }
  ↓
Frontend displays data.reply
```

---

## 🔧 n8n Configuration (Step-by-Step)

### Step 1: Webhook Node (Chat Trigger)
- **Method**: POST
- **Path**: `/webhook-test/chatbot` (or your custom path)
- **Response Mode**: "Respond to Webhook"
- **Response Data**: "Last Node"

### Step 2: LLM/AI Agent Node

The output variable depends on which node you're using:

#### If using "OpenAI Chat Model" or "Chat OpenAI":
- Output is in: `{{ $json.text }}` or `{{ $json.output }}`

#### If using "AI Agent":
- Output is in: `{{ $json.output }}`

#### If using "Basic LLM Chain":
- Output is in: `{{ $json.text }}`

#### If using "Conversational Agent":
- Output is in: `{{ $json.output }}` or `{{ $json.text }}`

**To find the exact field:**
1. Run your workflow once
2. Click on the LLM node after execution
3. Look at the "Output" tab
4. Find where the AI's text response is stored
5. Common fields: `output`, `text`, `response`, `content`

### Step 3: Respond to Webhook Node

**CRITICAL: Use the correct syntax for n8n expressions**

#### Option A: If LLM output is in `output` field
```json
{
  "reply": "={{ $json.output }}"
}
```

#### Option B: If LLM output is in `text` field
```json
{
  "reply": "={{ $json.text }}"
}
```

#### Option C: If LLM output is in `response` field
```json
{
  "reply": "={{ $json.response }}"
}
```

#### Option D: With fallback (RECOMMENDED)
```json
{
  "reply": "={{ $json.output || $json.text || $json.response || 'No response generated' }}"
}
```

**Important Notes:**
- Use `"={{ ... }}"` syntax (with equals sign) for expressions in n8n
- Don't use `{{ ... }}` without the `=` - that won't work in JSON fields
- The expression must be inside quotes: `"={{ ... }}"`

---

## 🛠️ Common Issues & Solutions

### Issue 1: "Invalid JSON in Response Body"
**Cause**: Using `{{ }}` instead of `"={{ }}"`

**Fix**: Always wrap expressions in quotes with equals:
```json
{
  "reply": "={{ $json.output }}"
}
```

### Issue 2: "reply is undefined"
**Cause**: Wrong field name from LLM node

**Fix**: Check LLM node output and use correct field:
1. Execute workflow
2. Click LLM node
3. Check Output tab
4. Use the exact field name you see

### Issue 3: LLM node doesn't have predictable output
**Fix**: Add a "Set" node between LLM and Respond to Webhook:
- Add field: `output`
- Value: `={{ $json.text || $json.output || $json.response }}`

Then in Respond to Webhook use:
```json
{
  "reply": "={{ $json.output }}"
}
```

---

## ✅ Testing Your Setup

### Test 1: Direct n8n Test
```bash
curl -X POST http://localhost:5678/webhook-test/chatbot \
  -H "Content-Type: application/json" \
  -d "{\"chatInput\":\"Hello\",\"userId\":\"test-user\"}"
```

Expected response:
```json
{
  "reply": "Hello! Welcome to Tushar's portfolio..."
}
```

### Test 2: Through API Route
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"userMessage\":\"Hello\",\"userId\":\"test-user\"}"
```

Expected response:
```json
{
  "reply": "Hello! Welcome to Tushar's portfolio..."
}
```

### Test 3: Frontend
Open your website and use the chatbot widget.

---

## 🎯 Exact Configuration for Common LLM Nodes

### For OpenAI Chat Model:
**Respond to Webhook → Response Body:**
```json
{
  "reply": "={{ $json.text }}"
}
```

### For AI Agent:
**Respond to Webhook → Response Body:**
```json
{
  "reply": "={{ $json.output }}"
}
```

### For Conversational Chain:
**Respond to Webhook → Response Body:**
```json
{
  "reply": "={{ $json.text }}"
}
```

---

## 🔍 How to Debug

1. **Check n8n execution logs**:
   - Click on each node after execution
   - Look at Input and Output tabs
   - Find where the AI response text is

2. **Test webhook directly**:
   - Use curl or Postman
   - Send to n8n webhook URL
   - Check the response structure

3. **Add logging to API route**:
   - Already added in updated route.ts
   - Check browser console and server logs

4. **Use n8n's "Execute Node" feature**:
   - Click "Execute Node" on each node
   - Verify data flows correctly

---

## 📝 Quick Reference

| LLM Node Type | Output Field | Respond to Webhook Config |
|---------------|--------------|---------------------------|
| OpenAI Chat Model | `text` | `{ "reply": "={{ $json.text }}" }` |
| AI Agent | `output` | `{ "reply": "={{ $json.output }}" }` |
| Basic LLM Chain | `text` | `{ "reply": "={{ $json.text }}" }` |
| Conversational Agent | `output` or `text` | `{ "reply": "={{ $json.output || $json.text }}" }` |

---

## 🚀 Final Checklist

- [ ] Webhook node set to "Respond to Webhook" mode
- [ ] LLM node configured with API key and model
- [ ] Respond to Webhook uses correct field name with `"={{ }}"`
- [ ] Test direct webhook call returns `{ "reply": "..." }`
- [ ] API route logs show correct data flow
- [ ] Frontend displays AI responses correctly
- [ ] Error handling works (try disconnecting n8n)

---

## 💡 Pro Tips

1. **Always use the fallback pattern** for production:
   ```json
   {
     "reply": "={{ $json.output || $json.text || 'Sorry, I could not generate a response.' }}"
   }
   ```

2. **Add a Set node** before Respond to Webhook to normalize output:
   - Field: `reply`
   - Value: `={{ $json.output || $json.text || $json.response }}`
   
   Then Respond to Webhook becomes simple:
   ```json
   {
     "reply": "={{ $json.reply }}"
   }
   ```

3. **Enable n8n logging** for debugging:
   - Settings → Log Level → Debug
   - Check logs in n8n console

4. **Test incrementally**:
   - First: Test webhook alone
   - Second: Test with LLM
   - Third: Test with API route
   - Finally: Test with frontend
