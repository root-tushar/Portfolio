// N8N Connection Debugging Script
// Run this in your browser console to diagnose the webhook connection issue

console.log('🔍 N8N Connection Debugging Started...\n');

// Step 1: Check environment configuration
async function checkEnvironmentConfig() {
  console.log('1️⃣ Checking Environment Configuration...');
  
  try {
    // Test the API route to see what webhook URL it's using
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'debug test' })
    });
    
    console.log('📝 Check your server console logs for:');
    console.log('   - "Using n8n webhook URL: [URL]"');
    console.log('   - "Chat API error: [error details]"');
    console.log('\n✅ If you see "https://your-n8n-domain/webhook/chatbot" → Update your .env.local');
    console.log('✅ If you see your actual URL → Webhook URL is configured correctly');
    
  } catch (error) {
    console.log('❌ Failed to test API route:', error.message);
  }
}

// Step 2: Test webhook URL directly (if provided)
async function testWebhookDirect(webhookUrl) {
  if (!webhookUrl || webhookUrl.includes('your-n8n-domain')) {
    console.log('\n2️⃣ ⚠️ Skipping direct webhook test - Please provide your actual webhook URL');
    console.log('Usage: testWebhookDirect("https://your-actual-n8n-url/webhook/chatbot")');
    return;
  }
  
  console.log('\n2️⃣ Testing Webhook URL Directly...');
  console.log('🔗 Testing:', webhookUrl);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'Hello from direct test' })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Direct webhook test: SUCCESS');
      console.log('📝 Response:', data);
      return true;
    } else {
      console.log('❌ Direct webhook test: FAILED');
      console.log('📝 Status:', response.status, response.statusText);
      console.log('📝 This means your n8n workflow or URL has issues');
      return false;
    }
  } catch (error) {
    console.log('❌ Direct webhook test: ERROR');
    console.log('📝 Error:', error.message);
    
    if (error.message.includes('CORS')) {
      console.log('💡 CORS Error: Your n8n instance may not allow browser requests');
      console.log('   This is normal - the API route should still work');
    } else if (error.message.includes('Failed to fetch')) {
      console.log('💡 Network Error: Check if your n8n URL is reachable');
      console.log('   - Is n8n running?');
      console.log('   - Is the URL correct?');
      console.log('   - Is it publicly accessible (not localhost)?');
    }
    return false;
  }
}

// Step 3: Check common issues
function checkCommonIssues() {
  console.log('\n3️⃣ Common Issues Checklist...');
  
  console.log('📋 Please verify:');
  console.log('   ✓ n8n workflow is ACTIVE (toggle switch is ON)');
  console.log('   ✓ Webhook node is properly configured');
  console.log('   ✓ OpenAI/Gemini credentials are added to n8n');
  console.log('   ✓ .env.local file exists with N8N_WEBHOOK_URL');
  console.log('   ✓ Next.js dev server was restarted after adding .env.local');
  console.log('   ✓ n8n is publicly accessible (not localhost if deployed)');
  
  console.log('\n🔧 Quick Fixes:');
  console.log('   1. Restart Next.js: npm run dev');
  console.log('   2. Check n8n executions tab for failed runs');
  console.log('   3. Test n8n workflow manually in editor');
  console.log('   4. Use ngrok if n8n is on localhost');
}

// Step 4: Generate curl command for external testing
function generateCurlCommand(webhookUrl) {
  if (!webhookUrl || webhookUrl.includes('your-n8n-domain')) {
    console.log('\n4️⃣ ⚠️ Cannot generate curl command - webhook URL not provided');
    return;
  }
  
  console.log('\n4️⃣ External Testing Command:');
  console.log('Run this in your terminal to test the webhook outside the browser:');
  console.log('');
  console.log(`curl -X POST "${webhookUrl}" \\`);
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"question":"Hello from curl test"}\'');
  console.log('');
  console.log('Expected: JSON response with AI reply');
  console.log('If this fails, the issue is with n8n, not your Next.js app');
}

// Step 5: Test with sample n8n URLs
function testSampleUrls() {
  console.log('\n5️⃣ Sample n8n URL Formats:');
  console.log('');
  console.log('🌐 Cloud n8n: https://your-instance.app.n8n.cloud/webhook/chatbot');
  console.log('🏠 Self-hosted: https://your-domain.com:5678/webhook/chatbot');
  console.log('🔗 ngrok tunnel: https://abc123.ngrok.io/webhook/chatbot');
  console.log('🐳 Docker: https://your-server.com/n8n/webhook/chatbot');
  console.log('');
  console.log('💡 Make sure your URL matches one of these patterns');
}

// Main debugging function
async function debugN8NConnection(webhookUrl = null) {
  console.log('🚀 Running Complete N8N Debugging Suite...\n');
  
  await checkEnvironmentConfig();
  
  if (webhookUrl) {
    const webhookWorking = await testWebhookDirect(webhookUrl);
    generateCurlCommand(webhookUrl);
    
    if (webhookWorking) {
      console.log('\n🎉 Webhook is working! The issue might be in your .env.local configuration');
      console.log('Make sure N8N_WEBHOOK_URL in .env.local matches the working URL');
    }
  } else {
    console.log('\n💡 To test your webhook directly, run:');
    console.log('debugN8NConnection("https://your-actual-webhook-url")');
  }
  
  checkCommonIssues();
  testSampleUrls();
  
  console.log('\n🏁 Debugging Complete!');
  console.log('\n📞 Next Steps:');
  console.log('1. Check your server console logs for the actual webhook URL being used');
  console.log('2. Verify your n8n workflow is active and accessible');
  console.log('3. Test the webhook URL directly with curl');
  console.log('4. Update .env.local with the correct webhook URL');
  console.log('5. Restart your Next.js server');
}

// Auto-run basic checks
debugN8NConnection();

// Export functions for manual use
window.n8nDebug = {
  debugN8NConnection,
  testWebhookDirect,
  checkEnvironmentConfig,
  checkCommonIssues,
  generateCurlCommand
};

console.log('\n💡 Available debugging functions:');
console.log('n8nDebug.debugN8NConnection("your-webhook-url")');
console.log('n8nDebug.testWebhookDirect("your-webhook-url")');
console.log('n8nDebug.checkEnvironmentConfig()');