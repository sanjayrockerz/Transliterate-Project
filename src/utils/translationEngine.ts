// Enhanced Translation Engine for Tourists
// Separate from transliteration - this handles meaning translation, not phonetic conversion

export interface TranslationMapping {
  [key: string]: {
    devanagari: string;
    tamil: string;
    malayalam: string;
    gurumukhi: string;
    meaning?: string;
    category?: string;
  };
}

export interface TouristPhrase {
  english: string;
  category: 'greetings' | 'directions' | 'food' | 'shopping' | 'emergency' | 'numbers' | 'time' | 'transport' | 'accommodation';
  priority: 'essential' | 'useful' | 'nice-to-have';
  pronunciation?: string;
}

// Essential tourist translations - meaning-based, not phonetic
export const touristTranslations: TranslationMapping = {
  // Greetings & Basic Courtesy
  "hello": {
    devanagari: "नमस्ते",
    tamil: "வணக்கம்",
    malayalam: "നമസ്കാരം",
    gurumukhi: "ਸਤ ਸ਼ਿ੍ਰੀ ਅਕਾਲ",
    meaning: "Traditional greeting",
    category: "greetings"
  },
  "goodbye": {
    devanagari: "अलविदा",
    tamil: "போய் வருகிறேன்",
    malayalam: "വിട",
    gurumukhi: "ਅਲਵਿਦਾ",
    meaning: "Farewell",
    category: "greetings"
  },
  "thank you": {
    devanagari: "धन्यवाद",
    tamil: "நன்றி",
    malayalam: "നന്ദി",
    gurumukhi: "ਧੰਨਵਾਦ",
    meaning: "Expression of gratitude",
    category: "greetings"
  },
  "please": {
    devanagari: "कृपया",
    tamil: "தயவு செய்து",
    malayalam: "ദയവായി",
    gurumukhi: "ਕਿਰਪਾ ਕਰਕੇ",
    meaning: "Polite request",
    category: "greetings"
  },
  "excuse me": {
    devanagari: "माफ़ करिये",
    tamil: "மன்னிக்கவும்",
    malayalam: "ക്ഷമിക്കണം",
    gurumukhi: "ਮਾਫ਼ ਕਰਨਾ",
    meaning: "Polite attention getter",
    category: "greetings"
  },
  "i don't speak hindi": {
    devanagari: "मैं हिंदी नहीं बोलता",
    tamil: "எனக்கு हिंदी தெரியாது",
    malayalam: "എനിക്ക് हിंદী അറിയില്ല",
    gurumukhi: "ਮੈਂ ਹਿੰਦੀ ਨਹੀਂ ਬੋਲਦਾ",
    meaning: "Cannot speak Hindi",
    category: "greetings"
  },
  "i don't speak tamil": {
    devanagari: "मैं तमिल नहीं बोलता",
    tamil: "எனக்கு தமிழ் தெரியாது",
    malayalam: "എനിക്ക് തമിഴ് അറിയില്ല", 
    gurumukhi: "ਮੈਂ ਤਮਿਲ ਨਹੀਂ ਬੋਲਦਾ",
    meaning: "Cannot speak Tamil",
    category: "greetings"
  },
  "i don't speak malayalam": {
    devanagari: "मैं मलयालम नहीं बोलता",
    tamil: "எனக்கு മലയാളം தெரியாது",
    malayalam: "എനിക്ക് മലയാളം അറിയില്ല",
    gurumukhi: "ਮੈਂ ਮਲਯਾਲਮ ਨਹੀਂ ਬੋਲਦਾ",
    meaning: "Cannot speak Malayalam", 
    category: "greetings"
  },
  "do you speak english": {
    devanagari: "क्या आप अंग्रेजी बोलते हैं?",
    tamil: "நீங்கள் ஆங்கிலம் பேசுவீர்களா?",
    malayalam: "നിങ്ങൾ ഇംഗ്ലീഷ് സംസാരിക്കുമോ?",
    gurumukhi: "ਕੀ ਤੁਸੀਂ ਅੰਗਰੇਜ਼ੀ ਬੋਲਦੇ ਹੋ?",
    meaning: "Question about English ability",
    category: "greetings"
  },
  "i am a tourist": {
    devanagari: "मैं एक पर्यटक हूँ",
    tamil: "நான் ஒரு சுற்றுலா பயணி",
    malayalam: "ഞാൻ ഒരു വിനോദസഞ്ചാരി ആണ്",
    gurumukhi: "ਮੈਂ ਇੱਕ ਸੈਲਾਨੀ ਹਾਂ",
    meaning: "Identifying as tourist",
    category: "greetings"
  },
  "can you help me": {
    devanagari: "क्या आप मेरी मदद कर सकते हैं?",
    tamil: "நீங்கள் எனக்கு உதவ முடியுமா?",
    malayalam: "നിങ്ങൾക്ക് എന്നെ സഹായിക്കാമോ?",
    gurumukhi: "ਕੀ ਤੁਸੀਂ ਮੇਰੀ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?",
    meaning: "Request for assistance",
    category: "greetings"
  },
  "beautiful place": {
    devanagari: "सुंदर जगह",
    tamil: "அழகான இடம்",
    malayalam: "സുന്ദരമായ സ്ഥലം",
    gurumukhi: "ਸੁੰਦਰ ਜਗ੍ਹਾ",
    meaning: "Compliment about location",
    category: "greetings"
  },
  "thank you for your help": {
    devanagari: "आपकी मदद के लिए धन्यवाद",
    tamil: "உங்கள் உதவிக்கு நன்றி",
    malayalam: "നിങ്ങളുടെ സഹായത്തിന് നന്ദി",
    gurumukhi: "ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਧੰਨਵਾਦ",
    meaning: "Gratitude for assistance",
    category: "greetings"
  },

  // Directions & Navigation
  "where is": {
    devanagari: "कहाँ है",
    tamil: "எங்கே இருக்கிறது",
    malayalam: "എവിടെയാണ്",
    gurumukhi: "ਕਿੱਥੇ ਹੈ",
    meaning: "Question about location",
    category: "directions"
  },
  "railway station": {
    devanagari: "रेलवे स्टेशन",
    tamil: "ரயில் நிலையம்",
    malayalam: "റെയിൽവേ സ്റ്റേഷൻ",
    gurumukhi: "ਰੇਲਵੇ ਸਟੇਸ਼ਨ",
    meaning: "Train station",
    category: "directions"
  },
  "airport": {
    devanagari: "हवाई अड्डा",
    tamil: "விமான நிலையம்",
    malayalam: "വിമാനത്താവളം",
    gurumukhi: "ਹਵਾਈ ਅੱਡਾ",
    meaning: "Airport",
    category: "directions"
  },
  "hospital": {
    devanagari: "अस्पताल",
    tamil: "மருத்துவமனை",
    malayalam: "ആശുപത്രി",
    gurumukhi: "ਹਸਪਤਾਲ",
    meaning: "Medical facility",
    category: "emergency"
  },
  "hotel": {
    devanagari: "होटल",
    tamil: "விடுதி",
    malayalam: "ഹോട്ടൽ",
    gurumukhi: "ਹੋਟਲ",
    meaning: "Accommodation",
    category: "accommodation"
  },

  // Food & Dining
  "food": {
    devanagari: "खाना",
    tamil: "உணவு",
    malayalam: "ഭക്ഷണം",
    gurumukhi: "ਖਾਣਾ",
    meaning: "Food/meal",
    category: "food"
  },
  "water": {
    devanagari: "पानी",
    tamil: "தண்ணீர்",
    malayalam: "വെള്ളം",
    gurumukhi: "ਪਾਣੀ",
    meaning: "Water",
    category: "food"
  },
  "restaurant": {
    devanagari: "रेस्टोरेंट",
    tamil: "உணவகம்",
    malayalam: "റെസ്റ്റോറന്റ്",
    gurumukhi: "ਰੈਸਟੋਰੈਂਟ",
    meaning: "Dining establishment",
    category: "food"
  },
  "spicy": {
    devanagari: "मसालेदार",
    tamil: "காரமான",
    malayalam: "കാരമുള്ള",
    gurumukhi: "ਤਿੱਖਾ",
    meaning: "Hot/spicy taste",
    category: "food"
  },
  "vegetarian": {
    devanagari: "शाकाहारी",
    tamil: "சைவம்",
    malayalam: "സസ്യാഹാരി",
    gurumukhi: "ਸ਼ਾਕਾਹਾਰੀ",
    meaning: "No meat diet",
    category: "food"
  },

  // Shopping & Money
  "how much": {
    devanagari: "कितना",
    tamil: "எவ்வளவு",
    malayalam: "എത്ര",
    gurumukhi: "ਕਿੰਨਾ",
    meaning: "Price inquiry",
    category: "shopping"
  },
  "expensive": {
    devanagari: "महंगा",
    tamil: "விலை அதிகம்",
    malayalam: "വില കൂടുതൽ",
    gurumukhi: "ਮਹਿੰਗਾ",
    meaning: "High cost",
    category: "shopping"
  },
  "cheap": {
    devanagari: "सस्ता",
    tamil: "மலிவு",
    malayalam: "വില കുറവ്",
    gurumukhi: "ਸਸਤਾ",
    meaning: "Low cost",
    category: "shopping"
  },
  "market": {
    devanagari: "बाज़ार",
    tamil: "சந்தை",
    malayalam: "ചന്ത",
    gurumukhi: "ਬਜ਼ਾਰ",
    meaning: "Shopping area",
    category: "shopping"
  },

  // Numbers (1-10)
  "one": {
    devanagari: "एक",
    tamil: "ஒன்று",
    malayalam: "ഒന്ന്",
    gurumukhi: "ਇੱਕ",
    meaning: "Number 1",
    category: "numbers"
  },
  "two": {
    devanagari: "दो",
    tamil: "இரண்டு",
    malayalam: "രണ്ട്",
    gurumukhi: "ਦੋ",
    meaning: "Number 2",
    category: "numbers"
  },
  "three": {
    devanagari: "तीन",
    tamil: "மூன்று",
    malayalam: "മൂന്ന്",
    gurumukhi: "ਤਿੰਨ",
    meaning: "Number 3",
    category: "numbers"
  },
  "five": {
    devanagari: "पांच",
    tamil: "ஐந்து",
    malayalam: "അഞ്ച്",
    gurumukhi: "ਪੰਜ",
    meaning: "Number 5",
    category: "numbers"
  },
  "ten": {
    devanagari: "दस",
    tamil: "பத்து",
    malayalam: "പത്ത്",
    gurumukhi: "ਦਸ",
    meaning: "Number 10",
    category: "numbers"
  },

  // Emergency
  "help": {
    devanagari: "मदद",
    tamil: "உதவி",
    malayalam: "സഹായം",
    gurumukhi: "ਮਦਦ",
    meaning: "Assistance needed",
    category: "emergency"
  },
  "police": {
    devanagari: "पुलिस",
    tamil: "காவல்துறை",
    malayalam: "പൊലീസ്",
    gurumukhi: "ਪੁਲਿਸ",
    meaning: "Law enforcement",
    category: "emergency"
  },
  "emergency": {
    devanagari: "आपातकाल",
    tamil: "அவசரநிலை",
    malayalam: "അടിയന്തിരസ്ഥിതി",
    gurumukhi: "ਐਮਰਜੈਂਸੀ",
    meaning: "Urgent situation",
    category: "emergency"
  },

  // Transport
  "taxi": {
    devanagari: "टैक्सी",
    tamil: "டாக்ஸி",
    malayalam: "ടാക്സി",
    gurumukhi: "ਟੈਕਸੀ",
    meaning: "Hired car",
    category: "transport"
  },
  "bus": {
    devanagari: "बस",
    tamil: "பேருந்து",
    malayalam: "ബസ്",
    gurumukhi: "ਬੱਸ",
    meaning: "Public transport",
    category: "transport"
  },
  "auto rickshaw": {
    devanagari: "ऑटो रिक्शा",
    tamil: "ஆட்டோ ரிக்ஷா",
    malayalam: "ഓട്ടോ റിക്ഷ",
    gurumukhi: "ਆਟੋ ਰਿਕਸ਼ਾ",
    meaning: "Three-wheeler",
    category: "transport"
  },
  "where is the bathroom": {
    devanagari: "शौचालय कहाँ है?",
    tamil: "கழிவறை எங்கே?",
    malayalam: "കുളിമുറി എവിടെ?",
    gurumukhi: "ਗੁਸਲਖਾਨਾ ਕਿੱਥੇ ਹੈ?",
    meaning: "Asking for restroom location",
    category: "directions"
  },
  "i am lost": {
    devanagari: "मैं रास्ता भूल गया हूँ",
    tamil: "நான் வழி தெரியாமல் இருக்கிறேன்",
    malayalam: "ഞാൻ വഴിതെറ്റി",
    gurumukhi: "ਮੈਂ ਰਸਤਾ ਭੁੱਲ ਗਿਆ ਹਾਂ",
    meaning: "Lost/need directions",
    category: "directions"
  },
  "where can i find a good restaurant": {
    devanagari: "अच्छा रेस्टोरेंट कहाँ मिलेगा?",
    tamil: "நல்ல உணவகம் எங்கே கிடைக்கும்?",
    malayalam: "നല്ല റെസ്റ്റോറന്റ് എവിടെ കിട്ടും?",
    gurumukhi: "ਚੰਗਾ ਰੈਸਟੋਰੈਂਟ ਕਿੱਥੇ ਮਿਲੇਗਾ?",
    meaning: "Looking for restaurant recommendation",
    category: "food"
  },
  "is this vegetarian": {
    devanagari: "क्या यह शाकाहारी है?",
    tamil: "இது சைவமா?",
    malayalam: "ഇത് വെജിറ്റേറിയൻ ആണോ?",
    gurumukhi: "ਕੀ ਇਹ ਸ਼ਾਕਾਹਾਰੀ ਹੈ?",
    meaning: "Asking if food is vegetarian",
    category: "food"
  },
  "not too spicy please": {
    devanagari: "कृपया बहुत तीखा नहीं",
    tamil: "தயவு செய்து அதிக காரம் வேண்டாம்",
    malayalam: "ദയവായി അധികം കാരം വേണ്ട",
    gurumukhi: "ਕਿਰਪਾ ਕਰਕੇ ਬਹੁਤ ਤਿੱਖਾ ਨਹੀਂ",
    meaning: "Requesting mild spice level",
    category: "food"
  },
  "where can i buy souvenirs": {
    devanagari: "स्मृति चिन्ह कहाँ से खरीद सकता हूँ?",
    tamil: "நினைவு பரிசுகள் எங்கே வாங்கலாம்?",
    malayalam: "സുവനീറുകൾ എവിടെ നിന്ന് വാങ്ങാം?",
    gurumukhi: "ਯਾਦਗਾਰ ਕਿੱਥੋਂ ਖਰੀਦ ਸਕਦਾ ਹਾਂ?",
    meaning: "Looking for souvenir shops",
    category: "shopping"
  },
  "this is delicious": {
    devanagari: "यह स्वादिष्ट है",
    tamil: "இது சுவையாக இருக்கிறது",
    malayalam: "ഇത് രുചികരമാണ്",
    gurumukhi: "ਇਹ ਸੁਆਦੀ ਹੈ",
    meaning: "Complimenting food taste",
    category: "food"
  }
};

// Tourist phrases with categories
export const touristPhrases: TouristPhrase[] = [
  // Essential phrases
  { english: "I don't speak Hindi/Tamil/Malayalam", category: 'greetings', priority: 'essential' },
  { english: "Do you speak English?", category: 'greetings', priority: 'essential' },
  { english: "I am a tourist", category: 'greetings', priority: 'essential' },
  { english: "Where is the bathroom?", category: 'directions', priority: 'essential' },
  { english: "How much does this cost?", category: 'shopping', priority: 'essential' },
  { english: "I need help", category: 'emergency', priority: 'essential' },
  { english: "Call the police", category: 'emergency', priority: 'essential' },
  
  // Useful phrases
  { english: "Can you help me?", category: 'greetings', priority: 'useful' },
  { english: "I am lost", category: 'directions', priority: 'useful' },
  { english: "Where can I find a good restaurant?", category: 'food', priority: 'useful' },
  { english: "Is this vegetarian?", category: 'food', priority: 'useful' },
  { english: "Not too spicy please", category: 'food', priority: 'useful' },
  { english: "Where can I buy souvenirs?", category: 'shopping', priority: 'useful' },
  
  // Nice to have
  { english: "This is delicious", category: 'food', priority: 'nice-to-have' },
  { english: "Beautiful place", category: 'greetings', priority: 'nice-to-have' },
  { english: "Thank you for your help", category: 'greetings', priority: 'nice-to-have' }
];

export class TouristTranslationEngine {
  private static instance: TouristTranslationEngine;
  
  public static getInstance(): TouristTranslationEngine {
    if (!TouristTranslationEngine.instance) {
      TouristTranslationEngine.instance = new TouristTranslationEngine();
    }
    return TouristTranslationEngine.instance;
  }

  // Translate a word or phrase (meaning-based translation)
  translatePhrase(englishText: string, targetScript: string): string | null {
    const normalizedText = englishText.toLowerCase().trim();
    
    // Direct lookup first
    const translation = touristTranslations[normalizedText];
    if (translation) {
      return translation[targetScript as keyof typeof translation] as string;
    }

    // Handle specific phrases with variations
    const phraseVariations: { [key: string]: string } = {
      "i don't speak hindi/tamil/malayalam": "i don't speak hindi",
      "i don't speak hindi/tamil": "i don't speak hindi", 
      "don't speak hindi": "i don't speak hindi",
      "don't speak tamil": "i don't speak tamil",
      "don't speak malayalam": "i don't speak malayalam",
      "do you speak english?": "do you speak english",
      "can you help me?": "can you help me",
      "where is bathroom?": "where is the bathroom",
      "where is the restroom?": "where is the bathroom",
      "how much does this cost?": "how much",
      "is this vegetarian?": "is this vegetarian",
      "not too spicy please": "not too spicy please",
      "where can i find a good restaurant?": "where can i find a good restaurant",
      "where can i buy souvenirs?": "where can i buy souvenirs",
      "this is delicious": "this is delicious",
      "i am lost": "i am lost",
      "beautiful place": "beautiful place",
      "thank you for your help": "thank you for your help"
    };

    // Check for phrase variations
    const variation = phraseVariations[normalizedText];
    if (variation && touristTranslations[variation]) {
      const varTranslation = touristTranslations[variation];
      return varTranslation[targetScript as keyof typeof varTranslation] as string;
    }

    // Fuzzy matching for common variations
    for (const [key, value] of Object.entries(touristTranslations)) {
      if (key.includes(normalizedText) || normalizedText.includes(key)) {
        return value[targetScript as keyof typeof value] as string;
      }
    }

    return null;
  }

  // Get all translations for a phrase
  getAllTranslations(englishText: string): Record<string, string> | null {
    const normalizedText = englishText.toLowerCase().trim();
    
    // Direct lookup first
    let translation = touristTranslations[normalizedText];
    
    // If not found, try phrase variations
    if (!translation) {
      const phraseVariations: { [key: string]: string } = {
        "i don't speak hindi/tamil/malayalam": "i don't speak hindi",
        "i don't speak hindi/tamil": "i don't speak hindi", 
        "don't speak hindi": "i don't speak hindi",
        "don't speak tamil": "i don't speak tamil",
        "don't speak malayalam": "i don't speak malayalam",
        "do you speak english?": "do you speak english",
        "can you help me?": "can you help me",
        "where is bathroom?": "where is the bathroom",
        "where is the restroom?": "where is the bathroom",
        "how much does this cost?": "how much",
        "is this vegetarian?": "is this vegetarian",
        "not too spicy please": "not too spicy please",
        "where can i find a good restaurant?": "where can i find a good restaurant",
        "where can i buy souvenirs?": "where can i buy souvenirs",
        "this is delicious": "this is delicious",
        "i am lost": "i am lost",
        "beautiful place": "beautiful place",
        "thank you for your help": "thank you for your help"
      };

      const variation = phraseVariations[normalizedText];
      if (variation) {
        translation = touristTranslations[variation];
      }
    }
    
    if (translation) {
      return {
        devanagari: translation.devanagari,
        tamil: translation.tamil,
        malayalam: translation.malayalam,
        gurumukhi: translation.gurumukhi
      };
    }
    
    return null;
  }

  // Get phrases by category
  getPhrasesByCategory(category: string): TouristPhrase[] {
    return touristPhrases.filter(phrase => phrase.category === category);
  }

  // Get essential phrases
  getEssentialPhrases(): TouristPhrase[] {
    return touristPhrases.filter(phrase => phrase.priority === 'essential');
  }

  // Search for relevant phrases
  searchPhrases(query: string): TouristPhrase[] {
    const lowercaseQuery = query.toLowerCase();
    return touristPhrases.filter(phrase => 
      phrase.english.toLowerCase().includes(lowercaseQuery) ||
      phrase.category.includes(lowercaseQuery)
    );
  }

  // Check if a phrase is translatable
  isTranslatable(text: string): boolean {
    const normalizedText = text.toLowerCase().trim();
    
    // Direct check first
    if (normalizedText in touristTranslations) {
      return true;
    }
    
    // Check phrase variations
    const phraseVariations: { [key: string]: string } = {
      "is this vegetarian?": "is this vegetarian",
      "not too spicy please": "not too spicy please",
      "do you speak english?": "do you speak english",
      "can you help me?": "can you help me"
    };
    
    const variation = phraseVariations[normalizedText];
    return variation ? variation in touristTranslations : false;
  }

  // Get translation with context
  getTranslationWithContext(englishText: string): {
    translations: Record<string, string>;
    meaning?: string;
    category?: string;
  } | null {
    const normalizedText = englishText.toLowerCase().trim();
    const translation = touristTranslations[normalizedText];
    
    if (translation) {
      return {
        translations: {
          devanagari: translation.devanagari,
          tamil: translation.tamil,
          malayalam: translation.malayalam,
          gurumukhi: translation.gurumukhi
        },
        meaning: translation.meaning,
        category: translation.category
      };
    }
    
    return null;
  }

  // Get suggestions for partial text
  getSuggestions(partialText: string): string[] {
    const lowercasePartial = partialText.toLowerCase();
    return Object.keys(touristTranslations)
      .filter(phrase => phrase.startsWith(lowercasePartial))
      .slice(0, 5); // Limit to 5 suggestions
  }
}

export default TouristTranslationEngine;