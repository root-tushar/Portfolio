/**
 * Test script for n8n chatbot pipeline
 * Run with: node test-n8n-pipeline.js
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/gCQ2UPC28b97bull';

console.log('🧪 Testing n8n Chatbot Pipeline\n');
console.log('📍 n8n Webhook URL:', N8N_WEBHOOK_URL);
console.log('─'.repeat(50));

async function testN8nDirect() {
  console.log('\n1️⃣ Testing direct n8n webhook call...\n');
  
  const payload = {
    chatInput: 'Hello, this is a test message',
    userId: 'test-user-123'
  };
  
  console.log('📤 Sending:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('📊 Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      return false;
    }
    
    const data = await response.json();
    console.log('📥 Response:', JSON.stringify(data, null, 2));
    
    // Check for reply field
    if (data.reply) {
      console.log('✅ SUCCESS: Found "reply" field');
      console.log('💬 Reply content:', data.reply);
      return true;
    } else {
      console.log('⚠️ WARNING: No "reply" field found');
      console.log('📋 Available fields:', Object.keys(data).join(', '));
      
      // Check for alternative fields
      const alternatives = ['output', 'text', 'response', 'message'];
      for (const field of alternatives) {
        if (data[field]) {
          console.log(`💡 Found response in "${field}":`, data[field]);
        }
      }
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function testAPIRoute() {
  console.log('\n2️⃣ Testing API route (/api/chat)...\n');
  
  const payload = {
    userMessage: 'Hello from API test',
    userId: 'test-user-456'
  };
  
  console.log('📤 Sending:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('📊 Status:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('📥 Response:', JSON.stringify(data, null, 2));
    
    if (data.reply) {
      console.log('✅ SUCCESS: API route working correctly');
      console.log('💬 Reply:', data.reply);
      return true;
    } else {
      console.log('❌ FAILED: No reply field in API response');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('💡 Make sure your Next.js dev server is running (npm run dev)');
    return false;
  }
}

async function runTests() {
  console.log('\n🚀 Starting tests...\n');
  
  const test1 = await testN8nDirect();
  const test2 = await testAPIRoute();
  
  console.log('\n' + '─'.repeat(50));
  console.log('\n📊 Test Results:\n');
  console.log(`Direct n8n webhook: ${test1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`API route: ${test2 ? '✅ PASS' : '❌ FAIL'}`);
  
  if (test1 && test2) {
    console.log('\n🎉 All tests passed! Your pipeline is working correctly.\n');
  } else if (test1 && !test2) {
    console.log('\n⚠️ n8n works but API route has issues. Check your Next.js server.\n');
  } else if (!test1) {
    console.log('\n❌ n8n webhook is not responding correctly.\n');
    console.log('🔧 Fix your n8n workflow:');
    console.log('   1. Make sure n8n is running');
    console.log('   2. Check webhook path matches');
    console.log('   3. Verify "Respond to Webhook" node returns: { "reply": "={{ $json.output }}" }');
    console.log('   4. Check LLM node output field (output, text, or response)\n');
  }
}

runTests();
