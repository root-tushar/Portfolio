# AI Chatbot Setup Guide

Your portfolio now has an AI-powered chatbot that integrates with n8n! Here's how to complete the setup:

## 🚀 Quick Setup Steps

### 1. Set up n8n Workflow
1. Import the JSON workflow you provided into your n8n instance
2. Add your OpenAI API credentials to the OpenAI node
3. Activate the workflow
4. Copy the webhook URL (should look like: `https://your-n8n-domain/webhook/chatbot`)

### 2. Configure Environment Variables
1. Copy `env.example` to `.env.local`
2. Add your n8n webhook URL:
   ```
   N8N_WEBHOOK_URL=https://your-n8n-domain/webhook/chatbot
   ```

### 3. Test the Integration
1. Run your Next.js app: `npm run dev`
2. Click the chat icon in the bottom-right corner
3. Send a test message like "What services do you offer?"
4. The AI should respond with information about your cybersecurity and AI services

## 🔧 What's Been Implemented

### API Route (`/api/chat`)
- Receives messages from your chatbot UI
- Forwards them to your n8n webhook
- Returns AI-generated responses

### Updated Chatbot Component
- Your existing chatbot now connects to the n8n workflow
- Maintains the same sleek UI and animations
- Shows typing indicators while waiting for AI responses
- Handles errors gracefully

### Environment Configuration
- Added `N8N_WEBHOOK_URL` to your environment variables
- Keeps your webhook URL secure and configurable

## 🎯 Customization Options

### Modify AI Personality
Edit the system prompt in your n8n OpenAI node:
```
You are Tushar's AI assistant. Respond in a professional and friendly tone. 
If user asks about Tushar, describe him as a cybersecurity and AI consultant 
with expertise in automation, penetration testing, and digital protection.
```

### Add More Context
You can enhance the AI responses by:
- Adding more details about your services in the system prompt
- Including links to your portfolio sections
- Adding specific pricing information
- Mentioning your recent projects or case studies

### Alternative: Use Gemini (Free)
If you prefer Google's Gemini API (free tier), replace the OpenAI node in n8n with an HTTP Request node as described in your original workflow.

## 🔍 Troubleshooting

### Common Issues:
1. **"Failed to process chat request"** - Check your n8n webhook URL in `.env.local`
2. **No AI response** - Verify your n8n workflow is activated and OpenAI credentials are correct
3. **CORS errors** - Ensure your n8n instance allows requests from your domain

### Testing the API Directly:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what services do you offer?"}'
```

## 🎉 You're All Set!

Your portfolio now has an intelligent AI assistant that can:
- Answer questions about your services
- Provide information about your expertise
- Engage visitors in meaningful conversations
- Generate leads and showcase your AI capabilities

The chatbot will appear on all pages of your portfolio and provides a great way for potential clients to learn more about your work!