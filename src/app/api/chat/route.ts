import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    console.log('Received chat message:', message);

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Replace with your actual n8n webhook URL
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-domain/webhook/chatbot';
    console.log('Using n8n webhook URL:', N8N_WEBHOOK_URL);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('n8n response:', data);
    
    return NextResponse.json({
      reply: data.reply || 'Sorry, I encountered an issue processing your request.',
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a helpful fallback message instead of just an error
    return NextResponse.json({
      reply: "Sorry, I'm temporarily unavailable. Please try again in a moment, or feel free to contact Tushar directly through the contact form for immediate assistance with cybersecurity and AI consulting needs."
    });
  }
}