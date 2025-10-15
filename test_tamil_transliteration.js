// Test Tamil to Hindi transliteration specifically
import AdvancedTransliterationEngine from './src/utils/transliterationEngine.js';

const engine = AdvancedTransliterationEngine.getInstance();

// Test the specific problematic text
const testTexts = [
  'தாம்பரம்',
  'ताम्बरम TAMBARAM',
  'தாம்பரம் ताम्बरम TAMBARAM',
  'கீஷ்கிஷந்',
  'மற்றும்',
  'வல்லக்கோட்டைமுருகன்'
];

console.log('🧪 Testing Tamil to Hindi Transliteration');
console.log('=====================================');

testTexts.forEach(text => {
  console.log(`\nInput: "${text}"`);
  
  // Test detection
  const detected = engine.detectScript(text);
  console.log(`Detected script: ${detected}`);
  
  // Test direct Tamil to Hindi
  if (detected === 'tamil') {
    const result = engine.crossScriptTransliterate(text, 'tamil', 'hindi');
    console.log(`Tamil→Hindi: "${result}"`);
  } else {
    console.log('Not detected as Tamil script');
  }
});