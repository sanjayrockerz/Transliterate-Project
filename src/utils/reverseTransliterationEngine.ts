// Reverse Transliteration Engine - Indian Scripts to English Pronunciation
// Converts Devanagari, Tamil, Malayalam, Gurmukhi to Roman/English phonetics

export interface ReverseMapping {
  [key: string]: string;
}

// Devanagari to English phonetics
export const devanagariToEnglishMap: ReverseMapping = {
  // Vowels
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  
  // Consonants with inherent 'a'
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
  'ष': 'shha', 'स': 'sa', 'ह': 'ha',
  
  // Vowel diacritics (matras)
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  
  // Special characters
  '्': '', // Halant (virama) - removes inherent vowel
  'ं': 'n', 'ः': 'h', '।': '.', '॥': '..',
  
  // Conjuncts
  'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya',
  
  // Numbers
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  
  // Common words
  'नमस्ते': 'namaste', 'धन्यवाद': 'dhanyawad', 'कृपया': 'kripaya',
  'मुंबई': 'mumbai', 'दिल्ली': 'delhi', 'भारत': 'bharat'
};

// Tamil to English phonetics
export const tamilToEnglishMap: ReverseMapping = {
  // Vowels
  'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ee', 'உ': 'u', 'ஊ': 'oo',
  'எ': 'e', 'ஏ': 'ae', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'oo', 'ஔ': 'au',
  
  // Consonants
  'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nya', 'ட': 'ta',
  'ண': 'na', 'த': 'tha', 'ந': 'na', 'ப': 'pa', 'ம': 'ma',
  'ய': 'ya', 'ர': 'ra', 'ல': 'la', 'வ': 'va', 'ழ': 'zha',
  'ள': 'la', 'ற': 'ra', 'ன': 'na', 'ஜ': 'ja', 'ஶ': 'sha',
  'ஷ': 'sha', 'ஸ': 'sa', 'ஹ': 'ha',
  
  // Vowel signs (matras)
  'ா': 'aa', 'ி': 'i', 'ீ': 'ee', 'ு': 'u', 'ூ': 'oo',
  'ெ': 'e', 'ே': 'ae', 'ை': 'ai', 'ொ': 'o', 'ோ': 'oo', 'ௌ': 'au',
  
  // Special
  '்': '', // Pulli (virama)
  
  // Common words
  'வணக்கம்': 'vanakkam', 'நன்றி': 'nandri', 'சென்னை': 'chennai',
  'தமிழ்': 'tamil', 'நாடு': 'naadu'
};

// Malayalam to English phonetics  
export const malayalamToEnglishMap: ReverseMapping = {
  // Vowels
  'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ee', 'ഉ': 'u', 'ഊ': 'oo',
  'എ': 'e', 'ഏ': 'ae', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'oo', 'ഔ': 'au',
  
  // Consonants
  'ക': 'ka', 'ഖ': 'kha', 'ഗ': 'ga', 'ഘ': 'gha', 'ങ': 'nga',
  'ച': 'cha', 'ഛ': 'chha', 'ജ': 'ja', 'ഝ': 'jha', 'ഞ': 'nya',
  'ട': 'ta', 'ഠ': 'tha', 'ഡ': 'da', 'ഢ': 'dha', 'ണ': 'na',
  'ത': 'tha', 'ഥ': 'thha', 'ദ': 'da', 'ധ': 'dha', 'ന': 'na',
  'പ': 'pa', 'ഫ': 'pha', 'ബ': 'ba', 'ഭ': 'bha', 'മ': 'ma',
  'യ': 'ya', 'ര': 'ra', 'ല': 'la', 'വ': 'va', 'ശ': 'sha',
  'ഷ': 'shha', 'സ': 'sa', 'ഹ': 'ha', 'ള': 'la', 'ഴ': 'zha', 'റ': 'ra',
  
  // Vowel signs
  'ാ': 'aa', 'ി': 'i', 'ീ': 'ee', 'ു': 'u', 'ൂ': 'oo',
  'െ': 'e', 'േ': 'ae', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'oo', 'ൌ': 'au',
  
  // Special
  '്': '', // Virama
  
  // Common words
  'നമസ്കാരം': 'namaskaram', 'നന്ദി': 'nandi', 'കൊച്ചി': 'kochi',
  'മലയാളം': 'malayalam', 'കേരളം': 'kerala'
};

// Gurmukhi to English phonetics
export const gurmukhiToEnglishMap: ReverseMapping = {
  // Vowels
  'ਅ': 'a', 'ਆ': 'aa', 'ਇ': 'i', 'ਈ': 'ee', 'ਉ': 'u', 'ਊ': 'oo',
  'ਏ': 'e', 'ਐ': 'ai', 'ਓ': 'o', 'ਔ': 'au',
  
  // Consonants
  'ਕ': 'ka', 'ਖ': 'kha', 'ਗ': 'ga', 'ਘ': 'gha', 'ਙ': 'nga',
  'ਚ': 'cha', 'ਛ': 'chha', 'ਜ': 'ja', 'ਝ': 'jha', 'ਞ': 'nya',
  'ਟ': 'ta', 'ਠ': 'tha', 'ਡ': 'da', 'ਢ': 'dha', 'ਣ': 'na',
  'ਤ': 'ta', 'ਥ': 'tha', 'ਦ': 'da', 'ਧ': 'dha', 'ਨ': 'na',
  'ਪ': 'pa', 'ਫ': 'pha', 'ਬ': 'ba', 'ਭ': 'bha', 'ਮ': 'ma',
  'ਯ': 'ya', 'ਰ': 'ra', 'ਲ': 'la', 'ਵ': 'va', 'ਸ਼': 'sha',
  'ਸ': 'sa', 'ਹ': 'ha',
  
  // Vowel signs
  'ਾ': 'aa', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo',
  'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au',
  
  // Special
  '੍': '', // Halant
  
  // Common words
  'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ': 'sat sri akal', 'ਧੰਨਵਾਦ': 'dhannwad',
  'ਅੰਮ੍ਰਿਤਸਰ': 'amritsar', 'ਪੰਜਾਬੀ': 'punjabi', 'ਪੰਜਾਬ': 'punjab'
};

export class ReverseTransliterationEngine {
  private static instance: ReverseTransliterationEngine;
  
  public static getInstance(): ReverseTransliterationEngine {
    if (!ReverseTransliterationEngine.instance) {
      ReverseTransliterationEngine.instance = new ReverseTransliterationEngine();
    }
    return ReverseTransliterationEngine.instance;
  }

  // Detect script of input text
  detectScript(text: string): 'devanagari' | 'tamil' | 'malayalam' | 'gurumukhi' | 'unknown' {
    const devanagariCount = (text.match(/[\u0900-\u097F]/g) || []).length;
    const tamilCount = (text.match(/[\u0B80-\u0BFF]/g) || []).length;
    const malayalamCount = (text.match(/[\u0D00-\u0D7F]/g) || []).length;
    const gurmukhiCount = (text.match(/[\u0A00-\u0A7F]/g) || []).length;

    const max = Math.max(devanagariCount, tamilCount, malayalamCount, gurmukhiCount);
    
    if (max === 0) return 'unknown';
    if (devanagariCount === max) return 'devanagari';
    if (tamilCount === max) return 'tamil';
    if (malayalamCount === max) return 'malayalam';
    if (gurmukhiCount === max) return 'gurumukhi';
    
    return 'unknown';
  }

  // Convert Devanagari to English phonetics
  devanagariToEnglish(text: string): string {
    return this.transliterateWithMapping(text, devanagariToEnglishMap);
  }

  // Convert Tamil to English phonetics
  tamilToEnglish(text: string): string {
    return this.transliterateWithMapping(text, tamilToEnglishMap);
  }

  // Convert Malayalam to English phonetics
  malayalamToEnglish(text: string): string {
    return this.transliterateWithMapping(text, malayalamToEnglishMap);
  }

  // Convert Gurmukhi to English phonetics
  gurmukhiToEnglish(text: string): string {
    return this.transliterateWithMapping(text, gurmukhiToEnglishMap);
  }

  // Universal reverse transliteration
  toEnglish(text: string): { 
    result: string; 
    detectedScript: string; 
    confidence: number 
  } {
    const detectedScript = this.detectScript(text);
    let result = text;
    let confidence = 0;

    switch (detectedScript) {
      case 'devanagari':
        result = this.devanagariToEnglish(text);
        confidence = 0.9;
        break;
      case 'tamil':
        result = this.tamilToEnglish(text);
        confidence = 0.9;
        break;
      case 'malayalam':
        result = this.malayalamToEnglish(text);
        confidence = 0.9;
        break;
      case 'gurumukhi':
        result = this.gurmukhiToEnglish(text);
        confidence = 0.9;
        break;
      default:
        result = text;
        confidence = 0.1;
        break;
    }

    return {
      result: result || text,
      detectedScript,
      confidence
    };
  }

  // Generic transliteration with mapping
  private transliterateWithMapping(text: string, mapping: ReverseMapping): string {
    let result = '';
    let i = 0;
    
    while (i < text.length) {
      let found = false;
      
      // Try longest matches first (up to 3 characters for conjuncts)
      for (let len = Math.min(3, text.length - i); len > 0; len--) {
        const substring = text.substr(i, len);
        if (mapping[substring] !== undefined) {
          result += mapping[substring];
          i += len;
          found = true;
          break;
        }
      }
      
      if (!found) {
        // If character not found in mapping, keep original or convert to closest
        const char = text[i];
        if (/[\u0020-\u007F]/.test(char)) {
          // ASCII character, keep as is
          result += char;
        } else if (/[\s\n\r\t]/.test(char)) {
          // Whitespace, keep as is
          result += char;
        } else {
          // Unknown character, skip or use placeholder
          result += '?';
        }
        i++;
      }
    }
    
    // Clean up result
    return result
      .replace(/\s+/g, ' ')  // Multiple spaces to single space
      .replace(/^\s|\s$/g, '') // Trim
      .toLowerCase();
  }

  // Get pronunciation guide
  getPronunciationGuide(text: string): {
    original: string;
    phonetic: string;
    script: string;
    syllables: string[];
  } {
    const transliteration = this.toEnglish(text);
    const syllables = this.breakIntoSyllables(transliteration.result);
    
    return {
      original: text,
      phonetic: transliteration.result,
      script: transliteration.detectedScript,
      syllables
    };
  }

  // Break phonetic text into syllables for easier pronunciation
  private breakIntoSyllables(phoneticText: string): string[] {
    return phoneticText
      .replace(/([aeiou])([bcdfghjklmnpqrstvwxyz]+)([aeiou])/g, '$1$2-$3')
      .split(/[-\s]+/)
      .filter(s => s.length > 0);
  }
}

export default ReverseTransliterationEngine;