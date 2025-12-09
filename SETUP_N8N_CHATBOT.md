# n8n Chatbot Workflow Setup Guide

## 🚨 Current Issue
The webhook "chatbot" is not registered in your n8n instance.

## ✅ Solution Steps

### Step 1: Check Your n8n Instance
1. Open n8n in your browser: `http://localhost:5678`
2. Make sure n8n is running

### Step 2: Create/Activate the Workflow

#### Option A: Create New Workflow

1. **Create a new workflow in n8n**
2. **Add a Webhook node:**
   - Click the "+" button
   - Search for "Webhook"
   - Add it to the canvas

3. **Configure the Webhook node:**
   - **Webhook URLs:** Choose "Production URL"
   - **HTTP Method:** POST
   - **Path:** `chatbot` (or any name you prefer)
   - **Response Mode:** "When Last Node Finishes"
   - **Response Data:** "First Entry JSON"

4. **Add a Function node** (to extract the message):
   - Connect it after the Webhook
   - Add this code:
   ```javascript
   return {
     json: {
       chatInput: $input.item.json.chatInput || $input.item.json.message,
       userId: $input.item.json.userId || 'anonymous'
     }
   };
   ```

5. **Add your LLM Chain node:**
   - Connect it after the Function node
   - Configure your OpenAI/LLM settings
   - The prompt will automatically use `chatInput`

6. **Add a Respond to Webhook node:**
   - Connect it after the LLM Chain
   - Set Response Body to:
   ```json
   {
     "reply": "={{ $json.output }}"
   }
   ```

7. **Save and Activate the workflow** (toggle in top-right)

#### Option B: Use Existing Workflow

If you already have a workflow:

1. **Open your existing workflow**
2. **Check the Webhook node path:**
   - Click on the Webhook node
   - Look at the "Path" field
   - Copy the exact path (e.g., "chatbot", "webhook-test", etc.)

3. **Get the Production URL:**
   - The URL will be shown in the Webhook node
   - It should look like: `http://localhost:5678/webhook/YOUR-PATH`
   - Or: `http://localhost:5678/webhook-test/YOUR-PATH`

4. **Make sure the workflow is ACTIVATED** (toggle switch in top-right)

### Step 3: Update Your .env.local

Once you have the correct webhook URL, update your `.env.local`:

```env
N8N_WEBHOOK_URL="http://localhost:5678/webhook/chatbot"
```

Or if it's a test webhook:
```env
N8N_WEBHOOK_URL="http://localhost:5678/webhook-test/YOUR-WEBHOOK-ID"
```

### Step 4: Test the Webhook

Run this command to test:
```bash
node test-n8n-direct.js
```

## 📋 Simple n8n Workflow Structure

Here's the simplest workflow that will work:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────────┐
│   Webhook   │────▶│   Function   │────▶│   OpenAI Chat Model │
│  (Trigger)  │     │  (Transform) │     │    (LLM Chain)      │
└─────────────┘     └──────────────┘     └─────────────────────┘
                                                    │
                                                    ▼
                                          ┌─────────────────────┐
                                          │ Respond to Webhook  │
                                          └─────────────────────┘
```

## 🔍 Finding Your Webhook URL

### Method 1: Check n8n UI
1. Open your workflow in n8n
2. Click on the Webhook node
3. Look for "Production URL" or "Test URL"
4. Copy the full URL

### Method 2: Check n8n Executions
1. Go to "Executions" tab in n8n
2. Look at recent executions
3. Check the webhook URLs that were called

### Method 3: List All Webhooks
In n8n, go to Settings → Webhooks to see all registered webhooks.

## 🎯 Quick Test Workflow JSON

Copy this and import it into n8n (Workflows → Import from File):

```json
{
  "name": "Simple Chatbot",
  "nodes": [
    {
      "parameters": {
        "path": "chatbot",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "functionCode": "return {\n  json: {\n    chatInput: $input.item.json.chatInput,\n    userId: $input.item.json.userId\n  }\n};"
      },
      "name": "Extract Data",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"reply\": \"Echo: \" + $json.chatInput } }}"
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Extract Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Data": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

This creates a simple echo bot to test the connection.

## 🚀 After Setup

1. **Activate your workflow** in n8n
2. **Copy the webhook URL** from the Webhook node
3. **Update `.env.local`** with the correct URL
4. **Restart your Next.js dev server:** `npm run dev`
5. **Test the chatbot** on your website

## ❓ Still Having Issues?

Check:
- [ ] n8n is running on port 5678
- [ ] Workflow is activated (toggle switch is ON)
- [ ] Webhook path matches your .env.local
- [ ] No firewall blocking localhost:5678
- [ ] Browser console shows the correct URL being called

## 📞 Need Help?

Share:
1. Your n8n workflow screenshot
2. The webhook URL from n8n
3. Any error messages from n8n executions tab
