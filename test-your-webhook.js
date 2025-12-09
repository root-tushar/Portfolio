/**
 * Test your specific n8n webhook
 * Run with: node test-your-webhook.js
 */

const WEBHOOK_URL = 'http://localhost:5678/webhook/gCQ2UPC28b97bull';

console.log('🧪 Testing Your n8n Webhook\n');
console.log('📍 Webhook URL:', WEBHOOK_URL);
console.log('─'.repeat(60));

async function testWebhook() {
  const payload = {
    chatInput: 'Hello, this is a test',
    userId: 'test-user-123'
  };
  
  console.log('\n📤 Sending:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('\n📊 Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('\n📥 Response:', JSON.stringify(data, null, 2));
    
    // Check what fields are present
    console.log('\n🔍 Available fields:', Object.keys(data).join(', '));
    
    // Check for expected fields
    if (data.reply) {
      console.log('\n✅ SUCCESS! Found "reply" field');
      console.log('💬 Reply:', data.reply);
    } else if (data.text) {
      console.log('\n⚠️ Found "text" field instead of "reply"');
      console.log('💬 Text:', data.text);
      console.log('\n🔧 FIX: Update your n8n "Respond to Webhook" node to:');
      console.log('   {');
      console.log('     "reply": "={{ $json.text }}"');
      console.log('   }');
    } else {
      console.log('\n❌ No "reply" or "text" field found');
      console.log('💡 Check your n8n "Respond to Webhook" configuration');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. n8n is running (http://localhost:5678)');
    console.log('   2. Workflow is activated');
    console.log('   3. Webhook URL is correct');
  }
}

testWebhook();
