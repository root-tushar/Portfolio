// Direct test script for n8n webhook
// Run with: node test-n8n-direct.js

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/gCQ2UPC28b97bull';

async function testN8nWebhook() {
  console.log('Testing n8n webhook...');
  console.log('URL:', N8N_WEBHOOK_URL);
  
  // Test 1: Send with chatInput field
  console.log('\n--- Test 1: chatInput field ---');
  try {
    const response1 = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatInput: 'Hello, what services does Tushar offer?',
        userId: 'test-user-123'
      }),
    });
    
    const data1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', JSON.stringify(data1, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  // Test 2: Send with message field (alternative)
  console.log('\n--- Test 2: message field ---');
  try {
    const response2 = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, what services does Tushar offer?',
        userId: 'test-user-123'
      }),
    });
    
    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(data2, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  // Test 3: Send with input field (another alternative)
  console.log('\n--- Test 3: input field ---');
  try {
    const response3 = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: 'Hello, what services does Tushar offer?',
        userId: 'test-user-123'
      }),
    });
    
    const data3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', JSON.stringify(data3, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testN8nWebhook();
