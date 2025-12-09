# n8n Chat Trigger Configuration Guide

## 🎯 Chat Trigger Node Settings

### Basic Configuration

#### 1. **Authentication** (Optional)
- **None** - No authentication required (recommended for testing)
- **Basic Auth** - Username/password protection
- **Header Auth** - Custom header authentication

For your use case: **Select "None"**

#### 2. **Path**
- Set to: `chatbot`
- This creates the URL: `http://localhost:5678/webhook/chatbot`

#### 3. **Response Mode**
- **When Last Node Finishes** (Recommended)
- This waits for your LLM to respond before sending back to the website

#### 4. **Options** (Click "Add Option")

**Public** (Optional):
- Enable if you want the webhook accessible without n8n login
- For local testing: Not required
- For production: Enable this

**Response Data**:
- **First Entry JSON** (Recommended)
- This returns the JSON response from your workflow

**Response Code**:
- Leave as default (200)

**Response Headers**:
- Add if needed for CORS:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```

---

## 📋 Complete Chat Trigger Configuration

### Recommended Settings:

```
┌─────────────────────────────────────────┐
│         Chat Trigger Node               │
├─────────────────────────────────────────┤
│ Authentication:        None             │
│ Path:                  chatbot          │
│ Response Mode:         lastNode         │
│                                         │
│ Options:                                │
│   ✓ Public                              │
│   ✓ Response Data: First Entry JSON    │
│   ✓ Response Code: 200                  │
└─────────────────────────────────────────┘
```

---

## 🔗 Complete Workflow Structure

Here's the recommended workflow setup:

```
┌──────────────────┐
│  Chat Trigger    │  ← Receives: { chatInput, userId }
│  (Webhook)       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  OpenAI Chat     │  ← Uses chatInput automatically
│  Model / LLM     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Code Node       │  ← Format response
│  (Optional)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Respond to      │  ← Returns: { reply: "..." }
│  Webhook         │
└──────────────────┘
```

---

## 🛠️ Node-by-Node Configuration

### 1. Chat Trigger Node

**Settings:**
- **Path:** `chatbot`
- **HTTP Method:** POST (automatic)
- **Response Mode:** When Last Node Finishes
- **Authentication:** None

**What it receives from your website:**
```json
{
  "chatInput": "What services does Tushar offer?",
  "userId": "user_1234567890_abc123"
}
```

---

### 2. OpenAI Chat Model / LLM Chain Node

**Settings:**
- **Model:** gpt-3.5-turbo (or gpt-4)
- **Prompt:** 
  ```
  You are Tushar's AI assistant. You help visitors learn about Tushar's 
  cybersecurity and AI consulting services.
  
  Tushar specializes in:
  - AI Agents & Automation
  - Cybersecurity Consulting
  - Penetration Testing
  - Vulnerability Assessment
  - Business AI Integration
  
  Be helpful, professional, and concise.
  ```

**System Message (if available):**
```
You are a helpful AI assistant for Tushar's portfolio website. 
Answer questions about his cybersecurity and AI services professionally.
```

**The LLM node automatically uses the `chatInput` field from the Chat Trigger!**

---

### 3. Code Node (Optional - for formatting)

If you need to format the response, add a Code node:

**JavaScript Code:**
```javascript
// Get the LLM output
const llmOutput = $input.first().json.output || $input.first().json.text;

// Format for the website
return {
  json: {
    reply: llmOutput
  }
};
```

---

### 4. Respond to Webhook Node

**Settings:**
- **Respond With:** JSON
- **Response Body:**

**Option A - Simple (if using Code node):**
```json
={{ $json }}
```

**Option B - Direct from LLM:**
```json
{
  "reply": "={{ $json.output }}"
}
```

**Option C - With error handling:**
```json
{
  "reply": "={{ $json.output || $json.text || 'Sorry, I could not process your request.' }}"
}
```

---

## 🎨 Alternative: Simple Echo Bot (for testing)

If you want to test the connection first, create this simple workflow:

### Chat Trigger → Code → Respond to Webhook

**Code Node:**
```javascript
const userMessage = $input.first().json.chatInput;
const userId = $input.first().json.userId;

return {
  json: {
    reply: `Echo: ${userMessage} (from user: ${userId})`
  }
};
```

**Respond to Webhook:**
```json
={{ $json }}
```

This will echo back your message to confirm the connection works.

---

## 🔐 Production Settings (When Deploying)

When you deploy to production:

### 1. Update Chat Trigger:
- **Authentication:** Basic Auth or Header Auth
- **Public:** Enabled
- **Add CORS headers** in Options → Response Headers:
  ```
  Access-Control-Allow-Origin: https://your-domain.com
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```

### 2. Update .env.local:
```env
N8N_WEBHOOK_URL="https://your-n8n-domain.com/webhook/chatbot"
```

### 3. Add Rate Limiting (Optional):
Add a Code node at the start to track and limit requests per user.

---

## ✅ Testing Your Configuration

### 1. Activate the workflow (toggle in top-right)

### 2. Get the webhook URL from Chat Trigger node

### 3. Test with curl:
```bash
curl -X POST http://localhost:5678/webhook/chatbot \
  -H "Content-Type: application/json" \
  -d '{"chatInput":"Hello, what services do you offer?","userId":"test-123"}'
```

### 4. Expected response:
```json
{
  "reply": "Tushar offers cybersecurity and AI consulting services including..."
}
```

### 5. Update your .env.local:
```env
N8N_WEBHOOK_URL="http://localhost:5678/webhook/chatbot"
```

### 6. Restart your Next.js server:
```bash
npm run dev
```

### 7. Test on your website!

---

## 🐛 Troubleshooting

### Issue: "No prompt specified"
**Solution:** Make sure your website sends `chatInput` field (not `message` or `userMessage`)

### Issue: "Webhook not registered"
**Solution:** 
1. Check workflow is ACTIVATED
2. Verify the path matches your .env.local
3. Restart n8n if needed

### Issue: No response from LLM
**Solution:**
1. Check OpenAI API key is configured
2. Verify you have API credits
3. Check n8n execution logs for errors

### Issue: CORS errors
**Solution:** Add CORS headers in Chat Trigger Options → Response Headers

---

## 📝 Quick Checklist

- [ ] Chat Trigger path is set to `chatbot`
- [ ] Response Mode is "When Last Node Finishes"
- [ ] LLM node is configured with API key
- [ ] Respond to Webhook returns `{ "reply": "..." }`
- [ ] Workflow is ACTIVATED
- [ ] .env.local has correct webhook URL
- [ ] Next.js dev server is restarted

---

## 🎉 You're Done!

Your chatbot should now:
1. ✅ Receive messages from your website
2. ✅ Process them with AI
3. ✅ Return intelligent responses
4. ✅ Maintain conversation context via userId

Test it by clicking the chat icon on your website and sending a message!
