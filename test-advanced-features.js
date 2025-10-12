// Test file for advanced Hindi/Devanagari features
import AdvancedTransliterationEngine from '../src/utils/transliterationEngine';
import AdvancedTextProcessor from '../src/utils/textProcessor';

// Test the transliteration engine
console.log('🧪 Testing Advanced Transliteration Engine...');

const engine = AdvancedTransliterationEngine.getInstance();

// Test English to Devanagari
console.log('\n📝 English to Devanagari Tests:');
const englishTests = [
  'hello',
  'namaste', 
  'mumbai',
  'delhi',
  'thank you'
];

englishTests.forEach(text => {
  const result = engine.englishToDevanagari(text);
  console.log(`${text} → ${result}`);
});

// Test script detection
console.log('\n🔍 Script Detection Tests:');
const scriptTests = [
  'Hello World',
  'नमस्ते',
  'தமிழ்',
  'ਪੰਜਾਬੀ',
  'മലയാളം'
];

scriptTests.forEach(text => {
  const script = engine.detectScript(text);
  const scriptClass = engine.getScriptClass(script);
  console.log(`"${text}" → Script: ${script}, Class: ${scriptClass}`);
});

// Test text processing
console.log('\n📊 Text Processing Tests:');
const processingTests = [
  'This is a simple English sentence.',
  'यह एक हिंदी वाक्य है।',
  'Mixed text with English and हिंदी words.'
];

processingTests.forEach(text => {
  const analysis = AdvancedTextProcessor.analyzeText(text);
  const quality = AdvancedTextProcessor.assessTextQuality(text);
  
  console.log(`\n"${text}"`);
  console.log(`  Words: ${analysis.wordCount}, Characters: ${analysis.characterCount}`);
  console.log(`  Script: ${analysis.script} (confidence: ${(analysis.confidence * 100).toFixed(1)}%)`);
  console.log(`  Complexity: ${analysis.complexity}, Readability: ${analysis.readabilityScore.toFixed(1)}/100`);
  console.log(`  Quality: ${(quality.overall * 100).toFixed(1)}%`);
});

console.log('\n✅ All tests completed!');