// Test script to verify bulletproof Hindi transliteration
// Run this with: node test_hindi_bulletproof.js

import { transliterateWithFallback } from './src/utils/transliterationEngine.ts';

// Test cases that should NEVER return blank
const testCases = [
  "hello",
  "namaste", 
  "thank you",
  "water",
  "food",
  "help",
  "good morning",
  "how are you",
  "where is",
  "mumbai",
  "station",
  "hotel",
  "abc123", // edge case
  "xyz", // edge case
  "qwerty", // edge case
  "", // empty case
  " ", // space case
  "123", // numbers only
  "!@#", // special chars only
];

console.log("🔍 Testing Bulletproof Hindi Transliteration...\n");

testCases.forEach((input, index) => {
  try {
    // This should use our enhanced transliteration engine
    const result = transliterateWithFallback(input, 'hindi');
    console.log(`Test ${index + 1}: "${input}" → "${result}"`);
    
    if (!result || result.trim() === "") {
      console.error(`❌ CRITICAL: Blank result for "${input}"`);
    } else {
      console.log(`✅ SUCCESS: Non-blank result`);
    }
  } catch (error) {
    console.error(`💥 ERROR for "${input}":`, error.message);
  }
  console.log("");
});

console.log("🎯 Hindi Transliteration Test Complete!");