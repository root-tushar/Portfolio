// Check if n8n is running and accessible
// Run with: node check-n8n-status.js

async function checkN8nStatus() {
  console.log('🔍 Checking n8n status...\n');
  
  // Check if n8n is running
  console.log('1. Checking if n8n is accessible...');
  try {
    const response = await fetch('http://localhost:5678');
    console.log('   ✅ n8n is running on http://localhost:5678');
    console.log('   Status:', response.status);
  } catch (error) {
    console.log('   ❌ n8n is NOT running on http://localhost:5678');
    console.log('   Error:', error.message);
    console.log('\n   💡 Start n8n with: n8n start');
    return;
  }
  
  // Try different webhook paths
  console.log('\n2. Testing common webhook paths...');
  
  const paths = [
    'http://localhost:5678/webhook/gCQ2UPC28b97bull',
    'http://localhost:5678/webhook/chatbot',
    'http://localhost:5678/webhook-test/chatbot',
    'http://localhost:5678/webhook/chat',
    'http://localhost:5678/webhook-test/chat',
  ];
  
  for (const url of paths) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: 'test', userId: 'test' })
      });
      
      if (response.status !== 404) {
        console.log(`   ✅ Found webhook at: ${url}`);
        console.log(`   Status: ${response.status}`);
        const data = await response.text();
        console.log(`   Response: ${data.substring(0, 100)}...`);
      } else {
        console.log(`   ❌ Not found: ${url}`);
      }
    } catch (error) {
      console.log(`   ❌ Error testing ${url}: ${error.message}`);
    }
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Open n8n: http://localhost:5678');
  console.log('2. Create or open your chatbot workflow');
  console.log('3. Check the Webhook node for the correct path');
  console.log('4. Make sure the workflow is ACTIVATED (toggle in top-right)');
  console.log('5. Copy the webhook URL and update .env.local');
}

checkN8nStatus();
