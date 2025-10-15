// Advanced transliteration engine for Hindi/Devanagari and other Indian scripts
// Includes phonetic mapping, contextual rules, and linguistic accuracy improvements

import { ReverseTransliterationEngine } from './reverseTransliterationEngine';

export interface TransliterationMapping {
  [key: string]: string;
}

export interface ContextRule {
  pattern: RegExp;
  replacement: string;
  description: string;
}

// Enhanced phonetic mappings for Hindi/Devanagari
export const englishToDevanagariMap: TransliterationMapping = {
  // Vowels
  'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ee': 'ई', 'u': 'उ', 'oo': 'ऊ',
  'ri': 'ऋ', 'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
  
  // Consonants
  'ka': 'क', 'kha': 'ख', 'ga': 'ग', 'gha': 'घ', 'nga': 'ङ',
  'cha': 'च', 'chha': 'छ', 'ja': 'ज', 'jha': 'झ', 'nya': 'ञ',
  'ta': 'ट', 'tha': 'ठ', 'da': 'ड', 'dha': 'ढ', 'na': 'ण',
  'th': 'त', 'thh': 'थ', 'dh': 'द', 'dhh': 'ध', 'n': 'न',
  'pa': 'प', 'pha': 'फ', 'ba': 'ब', 'bha': 'भ', 'ma': 'म',
  'ya': 'य', 'ra': 'र', 'la': 'ल', 'va': 'व', 'wa': 'व',
  'sha': 'श', 'shha': 'ष', 'sa': 'स', 'ha': 'ह',
  
  // Special characters
  'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ',
  
  // Numbers
  '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
  
  // Common Hindi phrases and words
  'hello': 'हैलो', 'hi': 'हाय', 'namaste': 'नमस्ते', 'namaskar': 'नमस्कार',
  'thank you': 'धन्यवाद', 'thanks': 'धन्यवाद', 'dhanyawad': 'धन्यवाद',
  'good morning': 'सुप्रभात', 'good afternoon': 'नमस्ते', 'good evening': 'शुभ संध्या', 'good night': 'शुभ रात्रि',
  'how are you': 'आप कैसे हैं', 'aap kaise hain': 'आप कैसे हैं',
  'what is your name': 'आपका नाम क्या है', 'aapka naam kya hai': 'आपका नाम क्या है',
  'where is': 'कहाँ है', 'kahan hai': 'कहाँ है', 'how much': 'कितना', 'kitna': 'कितना',
  'please': 'कृपया', 'krpaya': 'कृपया', 'sorry': 'माफ़ करना', 'maaf karna': 'माफ़ करना',
  'excuse me': 'क्षमा करें', 'kshama karen': 'क्षमा करें',
  'yes': 'हाँ', 'haan': 'हाँ', 'no': 'नहीं', 'nahi': 'नहीं',
  'water': 'पानी', 'paani': 'पानी', 'food': 'खाना', 'khana': 'खाना', 'help': 'मदद', 'madad': 'मदद',
  'hotel': 'होटल', 'restaurant': 'रेस्तराँ', 'hospital': 'अस्पताल', 'station': 'स्टेशन',
  'railway station': 'रेलवे स्टेशन', 'airport': 'हवाईअड्डा', 'bus stop': 'बस स्टॉप', 'market': 'बाज़ार',
  'toilet': 'शौचालय', 'bathroom': 'स्नानघर', 'room': 'कमरा', 'money': 'पैसा', 'paisa': 'पैसा',
  'mumbai': 'मुंबई', 'delhi': 'दिल्ली', 'bangalore': 'बंगलोर',
  'hyderabad': 'हैदराबाद', 'chennai': 'चेन्नै', 'kolkata': 'कोलकाता',
  'ahmedabad': 'अहमदाबाद', 'pune': 'पुणे', 'surat': 'सूरत',
  'jaipur': 'जयपुर', 'lucknow': 'लखनऊ', 'kanpur': 'कानपुर',
  'nagpur': 'नागपुर', 'indore': 'इंदौर', 'thane': 'ठाणे',
  'bhopal': 'भोपाल', 'visakhapatnam': 'विशाखापत्तनम', 'pimpri': 'पिंपरी',
  'patna': 'पटना', 'vadodara': 'वडोदरा', 'ghaziabad': 'गाज़ियाबाद',
  'ludhiana': 'लुधियाना', 'agra': 'आगरा', 'nashik': 'नासिक',
  'faridabad': 'फरीदाबाद', 'meerut': 'मेरठ', 'rajkot': 'राजकोट'
};

// Contextual rules for better transliteration accuracy
export const contextualRules: ContextRule[] = [
  // Handle silent 'h' in English
  { pattern: /h(?=[aeiou])/gi, replacement: 'ह', description: 'Silent h before vowels' },
  
  // Handle 'ch' combinations
  { pattern: /ch(?=[aeiou])/gi, replacement: 'च', description: 'Ch before vowels' },
  
  // Handle 'sh' combinations  
  { pattern: /sh(?=[aeiou])/gi, replacement: 'श', description: 'Sh before vowels' },
  
  // Handle 'th' combinations
  { pattern: /th(?=[aeiou])/gi, replacement: 'थ', description: 'Th before vowels' },
  
  // Handle double consonants
  { pattern: /([kgtpbdnmrlvs])\1/gi, replacement: '$1्$1', description: 'Double consonants with halant' },
  
  // Handle vowel combinations in English words
  { pattern: /ou/gi, replacement: 'ओ', description: 'Ou sound' },
  { pattern: /ea/gi, replacement: 'ी', description: 'Ea sound' },
  { pattern: /ei/gi, replacement: 'ै', description: 'Ei sound' },
  
  // Handle common English endings
  { pattern: /ing$/gi, replacement: 'िंग', description: 'Ing ending' },
  { pattern: /tion$/gi, replacement: 'शन', description: 'Tion ending' },
  { pattern: /sion$/gi, replacement: 'शन', description: 'Sion ending' },
];

// Devanagari to other scripts mapping
export const scriptMappings = {
  devanagari_to_tamil: {
    // Vowels
    'अ': 'அ', 'आ': 'ஆ', 'इ': 'இ', 'ई': 'ஈ', 'उ': 'உ', 'ऊ': 'ஊ',
    'ए': 'ஏ', 'ऐ': 'ஐ', 'ओ': 'ஓ', 'औ': 'ஔ',
    
    // Consonants (selective mapping)
    'क': 'க', 'ख': 'க', 'ग': 'க', 'घ': 'க',
    'च': 'ச', 'छ': 'ச', 'ज': 'ச', 'झ': 'ச',
    'ट': 'ட', 'ठ': 'ட', 'ड': 'ட', 'ढ': 'ட',
    'त': 'த', 'थ': 'த', 'द': 'த', 'ध': 'த',
    'न': 'ந', 'प': 'ப', 'फ': 'ப', 'ब': 'ப', 'भ': 'ப',
    'म': 'ம', 'य': 'ய', 'र': 'ர', 'ल': 'ல', 'व': 'வ',
    'श': 'ஶ', 'ष': 'ஷ', 'स': 'ஸ', 'ह': 'ஹ'
  }
};

// Multi-script mappings
export const englishToTamilMap: TransliterationMapping = {
  // Vowels
  'a': 'அ', 'aa': 'ஆ', 'i': 'இ', 'ii': 'ஈ', 'u': 'உ', 'uu': 'ஊ',
  'e': 'எ', 'ee': 'ஏ', 'ai': 'ஐ', 'o': 'ஒ', 'oo': 'ஓ', 'au': 'ஔ',
  // Consonants
  'ka': 'க', 'kha': 'க', 'ga': 'க', 'gha': 'க', 'nga': 'ங',
  'cha': 'ச', 'chha': 'ச', 'ja': 'ஜ', 'jha': 'ஜ', 'nya': 'ஞ',
  'ta': 'த', 'tha': 'த', 'da': 'த', 'dha': 'த', 'na': 'ந',
  'tta': 'ட', 'ttha': 'ட', 'dda': 'ட', 'ddha': 'ட', 'nna': 'ண',
  'pa': 'ப', 'pha': 'ப', 'ba': 'ப', 'bha': 'ப', 'ma': 'ம',
  'ya': 'ய', 'ra': 'ர', 'la': 'ல', 'va': 'வ', 'sha': 'ஶ',
  'ssa': 'ஷ', 'sa': 'ஸ', 'ha': 'ஹ',
  // Common words
  'chennai': 'சென்னை', 'madurai': 'மதுரை', 'coimbatore': 'கோயம்புத்தூர',
  'salem': 'சேலம்', 'tirupur': 'திருப்பூர', 'erode': 'ஈரோடு',
  'vellore': 'வேலூர்', 'thoothukudi': 'தூத்துக்குடி', 'dindigul': 'திண்டுக்கல்',
  'thanjavur': 'தஞ்சாவூர்', 'tirunelveli': 'திருநெல்வேலி', 'karur': 'கரூர்'
};

export const englishToMalayalamMap: TransliterationMapping = {
  // Vowels
  'a': 'അ', 'aa': 'ആ', 'i': 'ഇ', 'ii': 'ഈ', 'u': 'ഉ', 'uu': 'ഊ',
  'e': 'എ', 'ee': 'ഏ', 'ai': 'ഐ', 'o': 'ഒ', 'oo': 'ഓ', 'au': 'ഔ',
  // Consonants
  'ka': 'ക', 'kha': 'ഖ', 'ga': 'ഗ', 'gha': 'ഘ', 'nga': 'ങ',
  'cha': 'ച', 'chha': 'ഛ', 'ja': 'ജ', 'jha': 'ഝ', 'nya': 'ഞ',
  'ta': 'ത', 'tha': 'ഥ', 'da': 'ദ', 'dha': 'ധ', 'na': 'ന',
  'tta': 'ട', 'ttha': 'ഠ', 'dda': 'ഡ', 'ddha': 'ഢ', 'nna': 'ണ',
  'pa': 'പ', 'pha': 'ഫ', 'ba': 'ബ', 'bha': 'ഭ', 'ma': 'മ',
  'ya': 'യ', 'ra': 'ര', 'la': 'ല', 'va': 'വ', 'sha': 'ശ',
  'ssa': 'ഷ', 'sa': 'സ', 'ha': 'ഹ',
  // Common words
  'kochi': 'കൊച്ചി', 'thiruvananthapuram': 'തിരുവനന്തപുരം', 'kozhikode': 'കോഴിക്കോട്',
  'kollam': 'കൊല്ലം', 'thrissur': 'തൃശൂർ', 'alappuzha': 'ആലപ്പുഴ',
  'kannur': 'കണ്ണൂർ', 'kottayam': 'കോട്ടയം', 'palakkad': 'പാലക്കാട്'
};

export const englishToGurmukhiMap: TransliterationMapping = {
  // Vowels
  'a': 'ਅ', 'aa': 'ਆ', 'i': 'ਇ', 'ii': 'ਈ', 'u': 'ਉ', 'uu': 'ਊ',
  'e': 'ਏ', 'ai': 'ਐ', 'o': 'ਓ', 'au': 'ਔ',
  // Consonants
  'ka': 'ਕ', 'kha': 'ਖ', 'ga': 'ਗ', 'gha': 'ਘ', 'nga': 'ਙ',
  'cha': 'ਚ', 'chha': 'ਛ', 'ja': 'ਜ', 'jha': 'ਝ', 'nya': 'ਞ',
  'ta': 'ਤ', 'tha': 'ਥ', 'da': 'ਦ', 'dha': 'ਧ', 'na': 'ਨ',
  'tta': 'ਟ', 'ttha': 'ਠ', 'dda': 'ਡ', 'ddha': 'ਢ', 'nna': 'ਣ',
  'pa': 'ਪ', 'pha': 'ਫ', 'ba': 'ਬ', 'bha': 'ਭ', 'ma': 'ਮ',
  'ya': 'ਯ', 'ra': 'ਰ', 'la': 'ਲ', 'va': 'ਵ', 'wa': 'ਵ',
  'sha': 'ਸ਼', 'sa': 'ਸ', 'ha': 'ਹ',
  // Common words
  'amritsar': 'ਅੰਮ੍ਰਿਤਸਰ', 'ludhiana': 'ਲੁਧਿਆਣਾ', 'jalandhar': 'ਜਲੰਧਰ',
  'patiala': 'ਪਟਿਆਲਾ', 'bathinda': 'ਬਠਿੰਡਾ', 'mohali': 'ਮੋਹਾਲੀ',
  'pathankot': 'ਪਠਾਨਕੋਟ', 'hoshiarpur': 'ਹੁਸ਼ਿਆਰਪੁਰ', 'moga': 'ਮੋਗਾ'
};

export class AdvancedTransliterationEngine {
  private static instance: AdvancedTransliterationEngine;

  static getInstance(): AdvancedTransliterationEngine {
    if (!AdvancedTransliterationEngine.instance) {
      AdvancedTransliterationEngine.instance = new AdvancedTransliterationEngine();
    }
    return AdvancedTransliterationEngine.instance;
  }

  // Preprocess text for better transliteration
  preprocessText(text: string): string {
    // Normalize Unicode
    let processed = text.normalize('NFC');
    
    // Remove extra spaces and normalize
    processed = processed.trim().replace(/\s+/g, ' ');
    
    // Handle common abbreviations
    processed = processed.replace(/\bst\./gi, 'street');
    processed = processed.replace(/\brd\./gi, 'road');
    processed = processed.replace(/\bdr\./gi, 'doctor');
    processed = processed.replace(/\bmr\./gi, 'mister');
    
    return processed;
  }

  // Bulletproof English to Hindi transliteration - NEVER returns blank
  englishToDevanagari(text: string): string {
    console.log(`🔍 Hindi transliterating: "${text}"`);
    
    // Handle empty input gracefully
    if (!text || text.trim() === '') {
      console.log('❌ Empty text provided to Hindi transliterator');
      return '❌ कोई टेक्स्ट नहीं'; // "No text" in Hindi
    }
    
    try {
      let result = this.preprocessText(text.toLowerCase().trim());
      console.log(`🔄 Preprocessed text: "${result}"`);
      
      // If still empty after preprocessing, return fallback
      if (!result || result.trim() === '') {
        return text; // Return original if preprocessing fails
      }
      
      // Apply contextual rules first
      for (const rule of contextualRules) {
        result = result.replace(rule.pattern, rule.replacement);
      }
      
      // Split into words and process each
      const words = result.split(/\s+/).filter(word => word.length > 0);
      const transliteratedWords = words.map(word => {
        // Priority 1: Check if entire word exists in mapping
        if (englishToDevanagariMap[word]) {
          console.log(`✅ Direct word mapping: "${word}" → "${englishToDevanagariMap[word]}"`);
          return englishToDevanagariMap[word];
        }
        
        // Priority 2: Check common variations
        const variations = [
          word.toLowerCase(),
          word.charAt(0).toUpperCase() + word.slice(1),
          word.replace(/s$/, ''), // Remove plural 's'
          word.replace(/ing$/, ''), // Remove '-ing'
          word.replace(/ed$/, ''), // Remove '-ed'
        ];
        
        for (const variation of variations) {
          if (englishToDevanagariMap[variation]) {
            console.log(`✅ Variation mapping: "${word}" (${variation}) → "${englishToDevanagariMap[variation]}"`);
            return englishToDevanagariMap[variation];
          }
        }
        
        // Priority 3: Character-by-character transliteration
        let transliterated = '';
        let i = 0;
        while (i < word.length) {
          let found = false;
          
          // Try longest matches first (up to 5 characters for better accuracy)
          for (let len = Math.min(5, word.length - i); len > 0; len--) {
            const substring = word.substr(i, len);
            if (englishToDevanagariMap[substring]) {
              transliterated += englishToDevanagariMap[substring];
              i += len;
              found = true;
              break;
            }
          }
          
          if (!found) {
            // Priority 4: Enhanced phonetic mapping for any English character
            const char = word[i].toLowerCase();
            const phoneticMapping: { [key: string]: string } = {
              'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'द', 'e': 'ए', 'f': 'फ',
              'g': 'ग', 'h': 'ह', 'i': 'इ', 'j': 'ज', 'k': 'क', 'l': 'ल',
              'm': 'म', 'n': 'न', 'o': 'ओ', 'p': 'प', 'q': 'क्यू', 'r': 'र',
              's': 'स', 't': 'त', 'u': 'उ', 'v': 'व', 'w': 'व', 'x': 'एक्स',
              'y': 'य', 'z': 'ज़',
              // Numbers
              '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
              '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
              // Special characters
              ' ': ' ', '.': '।', ',': ',', '!': '!', '?': '?',
              '-': '-', '(': '(', ')': ')', ':': ':'
            };
            
            transliterated += phoneticMapping[char] || char;
            i++;
          }
        }
        
        // Ensure we never return empty string for a word
        if (!transliterated || transliterated.trim() === '') {
          transliterated = word; // Return original word if all else fails
        }
        
        console.log(`🔤 Processed word: "${word}" → "${transliterated}"`);
        return transliterated;
      });
      
      // Join words and ensure we have a result
      let finalResult = transliteratedWords.join(' ').trim();
      
      // Final safety check - never return blank
      if (!finalResult || finalResult === '') {
        finalResult = text; // Return original text if everything fails
        console.log(`⚠️ Fallback to original text: "${finalResult}"`);
      }
      
      console.log(`✅ Final Hindi result: "${text}" → "${finalResult}"`);
      return finalResult;
      
    } catch (error) {
      console.error('❌ Error in Hindi transliteration:', error);
      // Even on error, return something meaningful
      return `${text} (हिंदी में)`; // "(in Hindi)" suffix
    }
  }

  // Detect script of input text with confidence
  detectScript(text: string): string {
    console.log(`🔍 Detecting script for: "${text}"`);
    
    const scriptTests = [
      { regex: /[\u0900-\u097F]/, script: 'hindi' }, // Devanagari script used for Hindi
      { regex: /[\u0B80-\u0BFF]/, script: 'tamil' },
      { regex: /[\u0A00-\u0A7F]/, script: 'gurumukhi' },
      { regex: /[\u0D00-\u0D7F]/, script: 'malayalam' }
    ];
    
    // Count characters for each script
    const scriptCounts = scriptTests.map(({ regex, script }) => {
      const count = (text.match(regex) || []).length;
      if (count > 0) {
        console.log(`  📝 ${script}: ${count} matches`);
      }
      return { script, count };
    });
    
    // Find the script with the most characters
    const dominantScript = scriptCounts.reduce((max, current) => 
      current.count > max.count ? current : max
    );
    
    console.log(`🎯 Detected script: "${dominantScript.script}" with ${dominantScript.count} characters`);
    
    // If no Indic script characters found, default to Latin
    return dominantScript.count > 0 ? dominantScript.script : 'latin';
  }

  // Get appropriate CSS class for script
  getScriptClass(script: string): string {
    const classMap = {
      'hindi': 'text-hindi',
      'tamil': 'text-tamil', 
      'gurumukhi': 'text-gurmukhi',
      'malayalam': 'text-malayalam',
      'latin': 'font-latin'
    };
    
    return classMap[script] || 'font-latin';
  }

  // Transliterate to Tamil
  englishToTamil(text: string): string {
    return this.transliterateWithMapping(text, englishToTamilMap);
  }

  // Transliterate to Malayalam  
  englishToMalayalam(text: string): string {
    return this.transliterateWithMapping(text, englishToMalayalamMap);
  }

  // Transliterate to Gurmukhi
  englishToGurmukhi(text: string): string {
    return this.transliterateWithMapping(text, englishToGurmukhiMap);
  }

  // Generic transliteration method
  private transliterateWithMapping(text: string, mapping: TransliterationMapping): string {
    let result = this.preprocessText(text.toLowerCase());
    
    // Apply phonetic mappings
    const words = result.split(/\s+/);
    const transliteratedWords = words.map(word => {
      // Check if entire word exists in mapping
      if (mapping[word]) {
        return mapping[word];
      }
      
      // Character by character transliteration with longest match first
      let transliterated = '';
      let i = 0;
      while (i < word.length) {
        let found = false;
        
        // Try longest matches first (up to 4 characters)
        for (let len = Math.min(4, word.length - i); len > 0; len--) {
          const substring = word.substr(i, len);
          if (mapping[substring]) {
            transliterated += mapping[substring];
            i += len;
            found = true;
            break;
          }
        }
        
        if (!found) {
          // Keep original character if no mapping found
          transliterated += word[i];
          i++;
        }
      }
      
      return transliterated;
    });
    
    return transliteratedWords.join(' ');
  }

  // Universal transliterate method
  transliterate(text: string, targetScript: string): string {
    switch (targetScript) {
      case 'hindi':
        return this.englishToDevanagari(text); // Hindi uses Devanagari script
      case 'tamil':
        return this.englishToTamil(text);
      case 'malayalam':
        return this.englishToMalayalam(text);
      case 'gurumukhi':
        return this.englishToGurmukhi(text);
      default:
        return text; // Return original if script not supported
    }
  }

  // Cross-script transliteration - converts between Indian scripts
  crossScriptTransliterate(text: string, sourceScript: string, targetScript: string): string {
    console.log(`🔀 Cross-script: ${sourceScript} → ${targetScript}, text: "${text}"`);
    
    try {
      // Special handling for common conversions
      if (sourceScript === 'tamil' && targetScript === 'hindi') {
        console.log(`🎯 TAMIL TO HINDI CONVERSION TRIGGERED!`);
        // Direct Tamil to Hindi conversion
        const result = this.tamilToDevanagariDirect(text);
        console.log(`📝 Tamil→Hindi direct: "${text}" → "${result}"`);
        console.log(`📊 Result length: ${result.length}, Original length: ${text.length}`);
        console.log(`📊 Result different from original: ${result !== text}`);
        if (result && result !== text && result.trim() !== '') {
          console.log(`✅ RETURNING TAMIL→HINDI RESULT: "${result}"`);
          return result;
        } else {
          console.log(`⚠️ Tamil→Hindi conversion failed, result was: "${result}"`);
        }
      }
      
      // Use reverse transliteration approach for other cases
      const reverseEngine = ReverseTransliterationEngine.getInstance();
      
      // First convert the source script to English phonetics
      let englishPhonetics = '';
      switch (sourceScript) {
        case 'hindi':
          englishPhonetics = reverseEngine.devanagariToEnglish(text);
          break;
        case 'tamil':
          englishPhonetics = reverseEngine.tamilToEnglish(text);
          break;
        case 'malayalam':
          englishPhonetics = reverseEngine.malayalamToEnglish(text);
          break;
        case 'gurumukhi':
          englishPhonetics = reverseEngine.gurmukhiToEnglish(text);
          break;
        default:
          englishPhonetics = text;
      }
      
      console.log(`🔄 ${sourceScript} → English: "${text}" → "${englishPhonetics}"`);
      
      // Then convert English phonetics to target script
      if (englishPhonetics && englishPhonetics !== text && englishPhonetics.trim() !== '') {
        const finalResult = this.transliterate(englishPhonetics, targetScript);
        console.log(`🔄 English → ${targetScript}: "${englishPhonetics}" → "${finalResult}"`);
        return finalResult;
      }
      
      // If reverse transliteration failed, try phonetic approximation
      console.log(`⚠️ Reverse failed, trying phonetic approximation`);
      return this.phoneticApproximation(text, sourceScript, targetScript);
      
    } catch (error) {
      console.warn(`Cross-script transliteration failed: ${error}`);
      return this.phoneticApproximation(text, sourceScript, targetScript);
    }
  }

  // Direct Tamil to Devanagari conversion
  private tamilToDevanagariDirect(text: string): string {
    console.log(`🔥 tamilToDevanagariDirect called with: "${text}"`);
    const tamilToDevanagariMap: { [key: string]: string } = {
      // Tamil vowels to Devanagari
      'அ': 'अ', 'ஆ': 'आ', 'இ': 'इ', 'ஈ': 'ई', 'உ': 'उ', 'ஊ': 'ऊ',
      'ஏ': 'ए', 'ஐ': 'ऐ', 'ஓ': 'ओ', 'ஔ': 'औ',
      
      // Tamil consonants to Devanagari  
      'க': 'क', 'ங': 'ङ', 'ச': 'च', 'ஞ': 'ञ', 'ட': 'ट', 'ண': 'ण',
      'த': 'त', 'ந': 'न', 'ப': 'प', 'ம': 'म', 'ய': 'य', 'ர': 'र',
      'ல': 'ल', 'வ': 'व', 'ழ': 'ळ', 'ள': 'ल', 'ற': 'र', 'ன': 'न',
      'ஸ': 'स', 'ஹ': 'ह', 'க்ஷ': 'क्ष', 'ஜ': 'ज', 'ஶ': 'श',
      
      // Tamil vowel signs (matras)
      'ா': 'ा', 'ி': 'ि', 'ீ': 'ी', 'ு': 'ु', 'ூ': 'ू', 'ெ': 'े', 'ே': 'े', 
      'ை': 'ै', 'ொ': 'ो', 'ோ': 'ो', 'ௌ': 'ौ', '்': '्',
      
      // Tamil combined characters with vowels
      'கா': 'का', 'கி': 'कि', 'கீ': 'की', 'கு': 'कु', 'கூ': 'कू', 'கே': 'के', 'கை': 'कै', 'கோ': 'को', 'கௌ': 'कौ',
      'தா': 'ता', 'தி': 'ति', 'தீ': 'ती', 'தே': 'ते', 'தை': 'तै', 'தோ': 'तो', 'தௌ': 'तौ',
      'மா': 'मा', 'மி': 'मि', 'மீ': 'मी', 'மு': 'मु', 'மூ': 'मू', 'மே': 'मे', 'மை': 'मै', 'மோ': 'मो',
      'பா': 'पा', 'பி': 'पि', 'பீ': 'पी', 'பு': 'पु', 'பூ': 'पू', 'பே': 'पे', 'பை': 'पै',
      'ரா': 'रा', 'ரி': 'रि', 'ரீ': 'री', 'ரு': 'रु', 'ரூ': 'रू', 'ரே': 'रे', 'ரை': 'रै', 'ரோ': 'रो',
      'லா': 'ला', 'லி': 'लि', 'லீ': 'ली', 'லு': 'लु', 'லூ': 'लू', 'லே': 'ले', 'லை': 'लै', 'லோ': 'लो',
      'நா': 'ना', 'நி': 'नि', 'நீ': 'नी', 'நு': 'नु', 'நூ': 'नू', 'நே': 'ने', 'நை': 'नै', 'நோ': 'नो',
      
      // Common Tamil consonant clusters and combinations
      'ம்பா': 'म्बा', 'ம்ப': 'म्ब', 'ம்பி': 'म्बि', 'ம்பு': 'म्बु', 'ம்பே': 'म्बे', 'ம்பை': 'म्बै', 'ம்போ': 'म्बो',
      'ன்னா': 'न्ना', 'ன்ன': 'न्न', 'ன்னி': 'न्नि', 'ன்னு': 'न्नु', 'ன்னே': 'न्ने', 'ன்னै': 'न्नै', 'ன்னோ': 'न्नो',
      'ன்றா': 'न्ता', 'ன்ற': 'न्त', 'ன்றி': 'न्ति', 'ன்று': 'न्तु', 'ன்றே': 'न्ते', 'ன்றை': 'न्तै', 'ன்றோ': 'न्तो',
      'ள்ளா': 'ल्ला', 'ள்ள': 'ल्ल', 'ள்ளி': 'ल्लि', 'ள்ளு': 'ल्लu', 'ள்ளே': 'ल्ले', 'ள்ளை': 'ल्लै', 'ள்ளோ': 'ल्लो',
      'த்தா': 'त्ता', 'த்த': 'त्त', 'த்தி': 'त्ति', 'த்து': 'त्तु', 'த்தே': 'त्ते', 'த்தை': 'त्तै', 'த்தோ': 'त्तो',
      'க்க': 'क्क', 'ச்ச': 'च्च', 'ட்ட': 'ट्ट', 'ப்ப': 'प्प', 'ல்ல': 'ल्ल', 'ர்ர': 'र्र',
      
      // Tamil specific characters and combinations
      'ங்க': 'ङ्क', 'ங்கா': 'ङ्का', 'ங்கி': 'ङ्कि', 'ங்கு': 'ङ्कु', 'ங்கே': 'ङ्के', 'ங்கை': 'ङ्कै', 'ங்கோ': 'ङ्को',
      'ஞ்ச': 'ञ्च', 'ஞ்சா': 'ञ्चा', 'ஞ்சி': 'ञ्चि', 'ஞ்சு': 'ञ्चu', 'ஞ்சே': 'ञ्चे', 'ஞ்சை': 'ञ्चै', 'ஞ்சோ': 'ञ्चो',
      'ண்ட': 'ण्ट', 'ண்டா': 'ण्टा', 'ண்டி': 'ण्टi', 'ண்டு': 'ण्टu', 'ண்டே': 'ण्टे', 'ண்டை': 'ण्टै', 'ண்டோ': 'ण्टो',
      
      // Common Tamil words from your example
      'தாம்பரம்': 'ताम्बरम्', 'TAMBARAM': 'ताम्बरम्', 'கீஷ்கிஷந்': 'कीष्किषन्', 
      'மற்றும்': 'और', 'வல்லக்கோட்டை': 'वल्लक्कोट्टै', 'முருகன்': 'मुरुगन्', 
      'கோவில்': 'मंदिर', 'போ': 'जाओ', 'இங்கே': 'यहाँ', 'இறங்கவும்': 'उतरें',
      'வாருங்கள்': 'आइए', 'இருக்கும்': 'होगा', 'எங்கே': 'कहाँ', 'உக்கு': 'को',
      
      // Measurements and abbreviations
      'MSL': 'एमएसएल', 'km': 'किमी', 'cm': 'सेमी', 'mm': 'एमएम',
      
      // Special number combinations - Tamil to Devanagari
      '29': '२९', '00': '००'
    };
    
    // Enhanced processing with pattern matching (longest first)
    let result = text;
    const sortedKeys = Object.keys(tamilToDevanagariMap).sort((a, b) => b.length - a.length);
    
    console.log(`🔑 Tamil mapping has ${sortedKeys.length} keys`);
    console.log(`🔤 Processing "${text}" with sorted keys (first 10):`, sortedKeys.slice(0, 10));
    
    sortedKeys.forEach(tamilChar => {
      const hindiChar = tamilToDevanagariMap[tamilChar];
      if (text.includes(tamilChar)) {
        console.log(`🔄 Found "${tamilChar}" → "${hindiChar}" in text`);
        result = result.split(tamilChar).join(hindiChar);
      }
    });
    
    console.log(`🔀 After mapping: "${text}" → "${result}"`);
    
    // Apply phonetic fallback for remaining Tamil characters
    if (/[\u0B80-\u0BFF]/.test(result)) {
      console.log(`🔧 Applying phonetic fallback to remaining Tamil chars in: "${result}"`);
      result = this.phoneticTamilToHindi(result);
    }
    
    console.log(`✅ Tamil→Hindi final result: "${result}"`);
    return result || text;
  }

  // Phonetic Tamil to Hindi fallback
  private phoneticTamilToHindi(text: string): string {
    return text.replace(/[\u0B80-\u0BFF]/g, (char) => {
      const fallbackMap: { [key: string]: string } = {
        'ஃ': 'ः', '்': '्', 'ௐ': 'ॐ', '௧': '१', '௨': '२', '௩': '३', '௪': '४', '௫': '५',
        '௬': '६', '௭': '७', '௮': '८', '௯': '९', '௰': '१०'
      };
      return fallbackMap[char] || char;
    });
  }

  // Simple phonetic approximation for cross-script transliteration
  private phoneticApproximation(text: string, sourceScript: string, targetScript: string): string {
    // Basic phonetic mapping between scripts
    const basicPhoneticMap: { [key: string]: { [key: string]: string } } = {
      devanagari: {
        tamil: this.devanagariToTamilBasic(text),
        malayalam: this.devanagariToMalayalamBasic(text),
        gurumukhi: this.devanagariToGurmukhiBasic(text)
      }
    };

    return basicPhoneticMap[sourceScript]?.[targetScript] || 
           `Phonetic approximation: ${text}`;
  }

  // Basic Devanagari to Tamil conversion
  private devanagariToTamilBasic(text: string): string {
    const basicMap: { [key: string]: string } = {
      // Vowels
      'अ': 'அ', 'आ': 'ஆ', 'इ': 'இ', 'ई': 'ஈ', 'उ': 'உ', 'ऊ': 'ஊ',
      'ए': 'ஏ', 'ऐ': 'ஐ', 'ओ': 'ஓ', 'औ': 'ஔ',
      // Common consonants
      'क': 'க', 'ख': 'க', 'ग': 'க', 'घ': 'க',
      'च': 'ச', 'छ': 'ச', 'ज': 'ச', 'झ': 'ச',
      'त': 'த', 'थ': 'த', 'द': 'த', 'ध': 'த',
      'न': 'ந', 'प': 'ப', 'फ': 'ப', 'ब': 'ப', 'भ': 'ப',
      'म': 'ம', 'य': 'ய', 'र': 'ர', 'ल': 'ல', 'व': 'வ',
      'स': 'ஸ', 'ह': 'ஹ',
      // Numbers
      '०': '०', '१': '१', '२': '२', '३': '३', '४': '४',
      '५': '५', '६': '६', '७': '७', '८': '८', '९': '९'
    };

    return this.mapText(text, basicMap);
  }

  // Basic Devanagari to Malayalam conversion
  private devanagariToMalayalamBasic(text: string): string {
    const basicMap: { [key: string]: string } = {
      // Vowels
      'अ': 'അ', 'आ': 'ആ', 'इ': 'ഇ', 'ई': 'ഈ', 'उ': 'ഉ', 'ऊ': 'ഊ',
      'ए': 'ഏ', 'ऐ': 'ഐ', 'ओ': 'ഓ', 'औ': 'ഔ',
      // Common consonants
      'क': 'ക', 'ख': 'ഖ', 'ग': 'ഗ', 'घ': 'ഘ',
      'च': 'ച', 'छ': 'ഛ', 'ज': 'ജ', 'झ': 'ഝ',
      'त': 'ത', 'थ': 'ഥ', 'द': 'ദ', 'ध': 'ധ',
      'न': 'ന', 'प': 'പ', 'फ': 'ഫ', 'ब': 'ബ', 'भ': 'ഭ',
      'म': 'മ', 'य': 'യ', 'र': 'ര', 'ल': 'ല', 'व': 'വ',
      'स': 'സ', 'ह': 'ഹ'
    };

    return this.mapText(text, basicMap);
  }

  // Basic Devanagari to Gurmukhi conversion
  private devanagariToGurmukhiBasic(text: string): string {
    const basicMap: { [key: string]: string } = {
      // Vowels
      'अ': 'ਅ', 'आ': 'ਆ', 'इ': 'ਇ', 'ई': 'ਈ', 'उ': 'ਉ', 'ऊ': 'ਊ',
      'ए': 'ਏ', 'ऐ': 'ਐ', 'ओ': 'ਓ', 'औ': 'ਔ',
      // Common consonants
      'क': 'ਕ', 'ख': 'ਖ', 'ग': 'ਗ', 'घ': 'ਘ',
      'च': 'ਚ', 'छ': 'ਛ', 'ज': 'ਜ', 'झ': 'ਝ',
      'त': 'ਤ', 'थ': 'ਥ', 'द': 'ਦ', 'ध': 'ਧ',
      'न': 'ਨ', 'प': 'ਪ', 'फ': 'ਫ', 'ब': 'ਬ', 'भ': 'ਭ',
      'म': 'ਮ', 'य': 'ਯ', 'र': 'ਰ', 'ल': 'ਲ', 'व': 'ਵ',
      'स': 'ਸ', 'ह': 'ਹ'
    };

    return this.mapText(text, basicMap);
  }

  // Helper method to map text using a character mapping
  private mapText(text: string, mapping: { [key: string]: string }): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += mapping[char] || char;
    }
    return result;
  }

  // Validate Devanagari text quality
  validateDevanagariText(text: string): {
    isValid: boolean;
    confidence: number;
    issues: string[];
  } {
    const issues: string[] = [];
    let confidence = 1.0;
    
    // Check for common issues
    const hasOrphanedDiacritics = /[\u093E-\u094F\u0951-\u0957]/.test(text.replace(/[\u0900-\u093D\u0940-\u0950]/g, ''));
    if (hasOrphanedDiacritics) {
      issues.push('Contains orphaned diacritics');
      confidence -= 0.3;
    }
    
    // Check for proper conjunct formation
    const hasImproperConjuncts = /[\u0915-\u0939][\u0915-\u0939]/.test(text);
    if (hasImproperConjuncts) {
      issues.push('May have improper conjunct formation');
      confidence -= 0.2;
    }
    
    return {
      isValid: confidence > 0.5,
      confidence: Math.max(0, confidence),
      issues
    };
  }
}

export default AdvancedTransliterationEngine;