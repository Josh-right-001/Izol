#!/usr/bin/env node

/**
 * Quick test script to verify Gemini API is working
 * Run: node test-gemini.js
 */

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAuHbo0FZzmL1ulNvEMQlC6TdLSMPMfErI';

async function testGemini() {
  console.log('🧪 Testing Gemini API...\n');
  
  try {
    // Test 1: Simple text generation
    console.log('Test 1: Simple text generation');
    const response1 = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Say hello in 5 languages'
          }]
        }]
      })
    });

    if (!response1.ok) {
      throw new Error(`API Error: ${response1.status} ${response1.statusText}`);
    }

    const data1 = await response1.json();
    console.log('✅ Text generation works!');
    console.log('Response:', data1.candidates[0].content.parts[0].text.substring(0, 100) + '...\n');

    // Test 2: Translation
    console.log('Test 2: Translation request');
    const response2 = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Translate "Welcome to ISOLELE" to French'
          }]
        }]
      })
    });

    if (!response2.ok) {
      throw new Error(`Translation API Error: ${response2.status}`);
    }

    const data2 = await response2.json();
    console.log('✅ Translation works!');
    console.log('Response:', data2.candidates[0].content.parts[0].text + '\n');

    // Test 3: Description generation
    console.log('Test 3: Product description generation');
    const response3 = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Create a short 2-line product description for: Royal ISOLELE Crown inspired by African mythology'
          }]
        }]
      })
    });

    if (!response3.ok) {
      throw new Error(`Description API Error: ${response3.status}`);
    }

    const data3 = await response3.json();
    console.log('✅ Description generation works!');
    console.log('Response:', data3.candidates[0].content.parts[0].text + '\n');

    console.log('🎉 All tests passed! Gemini API is working perfectly!\n');
    console.log('You can now:');
    console.log('1. Run: npm run dev');
    console.log('2. Go to: http://localhost:3000/chatbot');
    console.log('3. Test the AI-powered features!\n');

  } catch (error) {
    console.error('❌ Error testing Gemini:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check your API key is correct');
    console.error('2. Verify .env.local exists with: NEXT_PUBLIC_GEMINI_API_KEY=your_key');
    console.error('3. Check internet connection');
    console.error('4. Visit: https://aistudio.google.com/app/apikey\n');
    process.exit(1);
  }
}

testGemini();
