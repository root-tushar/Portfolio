// Chatbot Testing Script
// Copy and paste this into your browser console (F12 → Console) to test the integration

console.log('🤖 Starting Chatbot Integration Tests...\n');

// Test 1: Basic API Connection
async function testAPIConnection() {
  console.log('1️⃣ Testing API Route Connection...');
  
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello, AI assistant!" })
    });
    
    const data = await response.json();
    
    if (response.ok && data.reply) {
      console.log('✅ API Connection: SUCCESS');
      console.log('📝 Response:', data.reply);
      return true;
    } else {
      console.log('❌ API Connection: FAILED');
      console.log('📝 Error:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ API Connection: ERROR');
    console.log('📝 Error:', error.message);
    return false;
  }
}

// Test 2: Portfolio-specific questions
async function testPortfolioQuestions() {
  console.log('\n2️⃣ Testing Portfolio-Specific Questions...');
  
  const questions = [
    "What services does Tushar provide?",
    "Tell me about your AI expertise",
    "How can I contact Tushar?",
    "What is your experience in cybersecurity?"
  ];
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    console.log(`\n📤 Question ${i + 1}: "${question}"`);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      
      const data = await response.json();
      
      if (response.ok && data.reply) {
        console.log('✅ Response received');
        console.log('📝 AI Reply:', data.reply.substring(0, 100) + '...');
      } else {
        console.log('❌ No valid response');
        console.log('📝 Error:', data);
      }
      
      // Wait 1 second between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log('❌ Request failed');
      console.log('📝 Error:', error.message);
    }
  }
}

// Test 3: Error handling
async function testErrorHandling() {
  console.log('\n3️⃣ Testing Error Handling...');
  
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" }) // Empty message
    });
    
    const data = await response.json();
    
    if (response.status === 400) {
      console.log('✅ Empty message handling: SUCCESS');
      console.log('📝 Error message:', data.error);
    } else {
      console.log('❌ Empty message handling: UNEXPECTED RESPONSE');
      console.log('📝 Response:', data);
    }
  } catch (error) {
    console.log('❌ Error handling test failed');
    console.log('📝 Error:', error.message);
  }
}

// Test 4: Check environment configuration
function testEnvironmentConfig() {
  console.log('\n4️⃣ Checking Environment Configuration...');
  
  // This will show in the network tab and server logs
  console.log('📝 Check your server logs for the n8n webhook URL being used');
  console.log('📝 Expected format: https://your-n8n-domain/webhook/chatbot');
  console.log('📝 If you see "https://your-n8n-domain/webhook/chatbot", update your .env.local file');
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Running Complete Chatbot Test Suite...\n');
  
  const apiWorking = await testAPIConnection();
  
  if (apiWorking) {
    await testPortfolioQuestions();
  } else {
    console.log('\n⚠️ Skipping portfolio questions test due to API connection failure');
  }
  
  await testErrorHandling();
  testEnvironmentConfig();
  
  console.log('\n🏁 Test Suite Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Check your browser Network tab for API calls');
  console.log('2. Check your server console for n8n webhook logs');
  console.log('3. Verify your n8n workflow is active and receiving requests');
  console.log('4. Test the actual chatbot UI by clicking the chat icon');
}

// Auto-run tests
runAllTests();

// Export functions for manual testing
window.chatbotTests = {
  testAPIConnection,
  testPortfolioQuestions,
  testErrorHandling,
  testEnvironmentConfig,
  runAllTests
};

console.log('\n💡 You can also run individual tests:');
console.log('chatbotTests.testAPIConnection()');
console.log('chatbotTests.testPortfolioQuestions()');
console.log('chatbotTests.testErrorHandling()');