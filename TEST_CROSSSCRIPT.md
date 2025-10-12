# Cross-Script Transliteration Test Cases

## Testing Instructions
1. Open http://localhost:8081
2. Use the Transliteration tab (first tab)
3. Test the following cases:

## Test Case 1: Devanagari to Tamil
**Input:** नमस्ते
**Expected Output:** Should show Tamil script approximation
**Target Language:** Select Tamil from dropdown

## Test Case 2: Devanagari to Malayalam  
**Input:** धन्यवाद
**Expected Output:** Should show Malayalam script approximation
**Target Language:** Select Malayalam from dropdown

## Test Case 3: Devanagari to Gurmukhi
**Input:** हैलो
**Expected Output:** Should show Gurmukhi script approximation  
**Target Language:** Select Gurmukhi from dropdown

## Test Case 4: Tamil to Devanagari
**Input:** வணக்கம்
**Expected Output:** Should show Devanagari approximation
**Target Language:** Select Hindi from dropdown

## Test Case 5: Tourist Translation Mode
1. Switch to "Tourist Translation" tab (second tab)
2. Test English to Indian: "How much does this cost?"
3. Test Indian to English pronunciation: Enter any Indian script text

## Expected Behavior
- No empty results or error messages
- Always shows some form of transliteration or approximation
- Cross-script conversion provides phonetically similar characters
- Tourist mode provides practical phrase translations
- Pronunciation mode gives English phonetic guides

## Fallback System
- If Supabase API fails: Use client-side cross-script engine
- If cross-script fails: Use phonetic approximation
- Always provide meaningful output to user

## Status: ✅ IMPLEMENTED
All components are integrated and functional.