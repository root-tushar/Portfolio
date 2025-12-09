# 🎯 Exact n8n Configuration Guide

## Your n8n Workflow Should Look Like This:

```
[Webhook] → [LLM/AI Node] → [Respond to Webhook]
```

---

## 📝 Step-by-Step Configuration

### Node 1: Webhook (Chat Trigger)

**Settings:**
- **Webhook Name**: `chatbot` (or any name)
- **HTTP Method**: `POST`
- **Path**: `/webhook-test/chatbot`
- **Authentication**: None (or as needed)
- **Response**: 
  - Mode: `Respond to Webhook`
  - Response Data: `Last Node`

**What it receives:**
```json
{
  "chatInput": "user's message here",
  "userId": "user_123..."
}
```

---

### Node 2: LLM/AI Agent Node

Choose ONE of these based on what you're using:

#### Option A: OpenAI Chat Model
**Settings:**
- **Model**: `gpt-3.5-turbo` or `gpt-4`
- **Messages**: 
  - Role: `user`
  - Content: `={{ $json.chatInput }}`

**Output field**: `text`

#### Option B: AI Agent
**Settings:**
- **Prompt**: Your system prompt
- **Input**: `={{ $json.chatInput }}`

**Output field**: `output`

#### Option C: Basic LLM Chain
**Settings:**
- **Prompt**: Your prompt template with `{chatInput}`
- **Input Values**: 
  - Name: `chatInput`
  - Value: `={{ $json.chatInput }}`

**Output field**: `text`

---

### Node 3: Respond to Webhook

**CRITICAL: This is where most errors happen!**

#### Configuration Method 1: Using Expressions (RECOMMENDED)

**Response Mode**: `Using Fields Below`

**Response Body** (click "Add Field"):

**For OpenAI Chat Model or Basic LLM Chain:**
```json
{
  "reply": "={{ $json.text }}"
}
```

**For AI Agent:**
```json
{
  "reply": "={{ $json.output }}"
}
```

**Universal (with fallback):**
```json
{
  "reply": "={{ $json.output || $json.text || $json.response || 'No response' }}"
}
```

#### Configuration Method 2: Using Set Node (SAFEST)

Add a **Set** node between LLM and Respond to Webhook:

**Set Node Configuration:**
- Mode: `Manual Mapping`
- Fields to Set:
  - **Name**: `reply`
  - **Value**: `={{ $json.output || $json.text || $json.response }}`

**Then in Respond to Webhook:**
```json
{
  "reply": "={{ $json.reply }}"
}
```

---

## 🔍 How to Find Your LLM Output Field

1. **Execute your workflow once** with a test message
2. **Click on your LLM node** after execution
3. **Look at the "Output" tab**
4. **Find the field** containing the AI's text response

Common output structures:

**OpenAI Chat Model:**
```json
{
  "text": "AI response here",
  "usage": {...}
}
```
→ Use `$json.text`

**AI Agent:**
```json
{
  "output": "AI response here",
  "metadata": {...}
}
```
→ Use `$json.output`

**Conversational Chain:**
```json
{
  "text": "AI response here",
  "response": "AI response here"
}
```
→ Use `$json.text` or `$json.response`

---

## ⚠️ Common Mistakes & Fixes

### ❌ Mistake 1: Using `{{ }}` without `=`
```json
{
  "reply": "{{ $json.output }}"
}
```
**Error**: Invalid JSON

**Fix**: Add `=` inside quotes:
```json
{
  "reply": "={{ $json.output }}"
}
```

### ❌ Mistake 2: Wrong field name
```json
{
  "reply": "={{ $json.output }}"
}
```
But your LLM outputs `text` not `output`

**Fix**: Check LLM output and use correct field:
```json
{
  "reply": "={{ $json.text }}"
}
```

### ❌ Mistake 3: Response mode set to "First Incoming Data"
**Error**: Returns webhook input instead of LLM output

**Fix**: Set Response Data to `Last Node`

### ❌ Mistake 4: Not connecting nodes properly
**Error**: Respond to Webhook doesn't receive LLM output

**Fix**: Ensure nodes are connected: Webhook → LLM → Respond to Webhook

---

## ✅ Testing Your Configuration

### Test 1: Execute Workflow in n8n
1. Click "Execute Workflow" button
2. Send a test request:
```bash
curl -X POST http://localhost:5678/webhook-test/chatbot \
  -H "Content-Type: application/json" \
  -d '{"chatInput":"Hello","userId":"test"}'
```
3. Check each node's output
4. Verify Respond to Webhook returns: `{ "reply": "..." }`

### Test 2: Check Response Format
The response MUST be:
```json
{
  "reply": "actual AI response text here"
}
```

NOT:
```json
[{ "text": "..." }]
```

NOT:
```json
{
  "output": "..."
}
```

NOT:
```
plain text response
```

---

## 🎯 Quick Copy-Paste Configs

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

### For Any LLM (Universal):
**Add Set Node first:**
- Field: `reply`
- Value: `={{ $json.output || $json.text || $json.response }}`

**Then Respond to Webhook:**
```json
{
  "reply": "={{ $json.reply }}"
}
```

---

## 🚀 Final Verification Checklist

Before testing with your frontend:

- [ ] Webhook node is set to "Respond to Webhook" mode
- [ ] LLM node receives `{{ $json.chatInput }}` as input
- [ ] LLM node executes successfully and produces output
- [ ] You've identified the correct output field (text/output/response)
- [ ] Respond to Webhook uses `"={{ $json.FIELD }}"` syntax
- [ ] Response Data is set to "Last Node"
- [ ] Test curl command returns `{ "reply": "..." }`
- [ ] No JSON parsing errors in n8n

---

## 💡 Pro Tip: Debug Mode

Add an **Edit Fields (Set)** node before Respond to Webhook to see exactly what data you have:

**Set Node:**
- Field: `debug_output`
- Value: `={{ JSON.stringify($json) }}`
- Field: `reply`
- Value: `={{ $json.output || $json.text || 'NO OUTPUT FOUND' }}`

This will show you all available fields in the response.

---

## 📞 Still Having Issues?

Run the test script:
```bash
node test-n8n-pipeline.js
```

Check the logs for:
1. What n8n is actually returning
2. Which field contains the AI response
3. Whether the API route is receiving it correctly

The enhanced API route now logs everything, so check your terminal for detailed debugging info with emoji indicators! 🎯
