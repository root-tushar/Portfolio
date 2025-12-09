import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userMessage, userId } = await request.json();
    console.log('📨 Received chat message:', userMessage);
    console.log('👤 User ID:', userId);

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get n8n webhook URL from environment
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/gCQ2UPC28b97bull';
    console.log('🔗 Using n8n webhook URL:', N8N_WEBHOOK_URL);

    // Prepare payload for n8n
    const payload = {
      chatInput: userMessage,
      userId: userId || 'default-user',
    };
    console.log('📤 Sending to n8n:', JSON.stringify(payload));

    // Send to n8n with chatInput field (required by n8n LLM chain)
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📊 n8n response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ n8n webhook failed:', errorText);
      throw new Error(`n8n webhook failed: ${response.status}`);
    }

    // Parse response
    const data = await response.json();
    console.log('📥 n8n response data:', JSON.stringify(data));
    
    // Check if reply exists
    if (!data.reply) {
      console.error('⚠️ No "reply" field in n8n response. Full response:', data);
      console.error('💡 Check your n8n "Respond to Webhook" node configuration');
      
      // Try to extract response from common alternative fields
      const fallbackReply = data.output || data.text || data.response || data.message;
      
      if (fallbackReply) {
        console.log('✅ Found response in alternative field:', fallbackReply);
        return NextResponse.json({ reply: fallbackReply });
      }
      
      return NextResponse.json({
        reply: 'Sorry, I encountered an issue processing your request. Please try again.',
      });
    }
    
    console.log('✅ Successfully got reply from n8n');
    
    // Return the "reply" field from n8n response
    return NextResponse.json({
      reply: data.reply,
    });

  } catch (error) {
    console.error('❌ Chat API error:', error);
    
    // Return a helpful fallback message
    return NextResponse.json({
      reply: "Sorry, I'm temporarily unavailable. Please try again in a moment, or feel free to contact Tushar directly through the contact form for immediate assistance with cybersecurity and AI consulting needs."
    });
  }
}