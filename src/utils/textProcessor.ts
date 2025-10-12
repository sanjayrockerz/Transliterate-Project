// Advanced text processing utilities for Hindi/Devanagari and Indian scripts
// Includes word breaking, text analysis, and linguistic processing

export interface TextAnalysis {
  wordCount: number;
  characterCount: number;
  script: string;
  confidence: number;
  hasNumbers: boolean;
  hasPunctuation: boolean;
  complexity: 'simple' | 'medium' | 'complex';
  readabilityScore: number;
}

export interface WordBreakResult {
  words: string[];
  boundaries: number[];
  confidence: number;
}

export class AdvancedTextProcessor {
  // Enhanced word breaking for Indian scripts
  static breakIndianWords(text: string, script: string): WordBreakResult {
    const words: string[] = [];
    const boundaries: number[] = [];
    let confidence = 0.9;

    // Different strategies based on script
    switch (script) {
      case 'devanagari':
        return this.breakDevanagariWords(text);
      case 'tamil':
        return this.breakTamilWords(text);
      case 'gurumukhi':
        return this.breakGurmukhiWords(text);
      case 'malayalam':
        return this.breakMalayalamWords(text);
      default:
        // Simple space-based breaking for Latin text
        const latinWords = text.split(/\s+/).filter(w => w.length > 0);
        return {
          words: latinWords,
          boundaries: latinWords.map((_, i) => i),
          confidence: 0.95
        };
    }
  }

  // Devanagari-specific word breaking
  private static breakDevanagariWords(text: string): WordBreakResult {
    const words: string[] = [];
    const boundaries: number[] = [];
    
    // Devanagari word boundary markers
    const wordBoundaryPattern = /[\u0900-\u097F]*[\u093E-\u094F]?/g;
    const matches = text.match(wordBoundaryPattern) || [];
    
    let position = 0;
    matches.forEach((match, index) => {
      if (match.trim()) {
        words.push(match.trim());
        boundaries.push(position);
        position += match.length;
      }
    });

    return {
      words,
      boundaries,
      confidence: 0.85 // Devanagari word breaking is complex
    };
  }

  // Tamil-specific word breaking
  private static breakTamilWords(text: string): WordBreakResult {
    const words: string[] = [];
    const boundaries: number[] = [];
    
    // Tamil has clearer word boundaries
    const tamilWords = text.split(/[\s\u0B85-\u0BBF]*[\u0BC0-\u0BC2]?\s+/).filter(w => w.length > 0);
    
    return {
      words: tamilWords,
      boundaries: tamilWords.map((_, i) => i),
      confidence: 0.9
    };
  }

  // Gurmukhi-specific word breaking
  private static breakGurmukhiWords(text: string): WordBreakResult {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    return {
      words,
      boundaries: words.map((_, i) => i),
      confidence: 0.88
    };
  }

  // Malayalam-specific word breaking  
  private static breakMalayalamWords(text: string): WordBreakResult {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    return {
      words,
      boundaries: words.map((_, i) => i),
      confidence: 0.87
    };
  }

  // Comprehensive text analysis
  static analyzeText(text: string): TextAnalysis {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const characterCount = text.length;
    
    // Detect script and confidence
    const { script, confidence } = this.detectScriptWithConfidence(text);
    
    // Check for numbers and punctuation
    const hasNumbers = /\d|[\u0966-\u096F]|[\u0BE6-\u0BEF]|[\u0AE6-\u0AEF]|[\u0D66-\u0D6F]/.test(text);
    const hasPunctuation = /[.,!?;:\u0964\u0965]/.test(text);
    
    // Determine complexity
    let complexity: 'simple' | 'medium' | 'complex' = 'simple';
    if (wordCount > 50 || this.hasComplexConjuncts(text)) {
      complexity = 'complex';
    } else if (wordCount > 20 || hasNumbers || hasPunctuation) {
      complexity = 'medium';
    }
    
    // Calculate readability score (0-100)
    const readabilityScore = this.calculateReadabilityScore(text, script);
    
    return {
      wordCount,
      characterCount,
      script,
      confidence,
      hasNumbers,
      hasPunctuation,
      complexity,
      readabilityScore
    };
  }

  // Detect script with confidence level
  static detectScriptWithConfidence(text: string): { script: string; confidence: number } {
    const scriptRanges = {
      devanagari: { range: /[\u0900-\u097F]/g, name: 'devanagari' },
      tamil: { range: /[\u0B80-\u0BFF]/g, name: 'tamil' },
      gurumukhi: { range: /[\u0A00-\u0A7F]/g, name: 'gurumukhi' },
      malayalam: { range: /[\u0D00-\u0D7F]/g, name: 'malayalam' },
      latin: { range: /[A-Za-z]/g, name: 'latin' }
    };

    const counts: Record<string, number> = {};
    let totalChars = 0;

    for (const [scriptName, { range }] of Object.entries(scriptRanges)) {
      const matches = text.match(range) || [];
      counts[scriptName] = matches.length;
      totalChars += matches.length;
    }

    if (totalChars === 0) {
      return { script: 'unknown', confidence: 0 };
    }

    // Find dominant script
    let maxCount = 0;
    let dominantScript = 'unknown';
    
    for (const [script, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        dominantScript = script;
      }
    }

    const confidence = maxCount / totalChars;
    return { script: dominantScript, confidence };
  }

  // Check for complex conjuncts in Devanagari
  static hasComplexConjuncts(text: string): boolean {
    // Complex conjunct patterns in Devanagari
    const complexPatterns = [
      /[\u0915-\u0939]\u094D[\u0915-\u0939]\u094D[\u0915-\u0939]/,  // Triple conjuncts
      /[\u0915-\u0939]\u094D[\u0930]/,  // र् conjuncts
      /\u0930\u094D[\u0915-\u0939]/,  // र conjuncts
      /[\u0915-\u0939]\u094D\u0937/,   // क्ष type
    ];

    return complexPatterns.some(pattern => pattern.test(text));
  }

  // Calculate readability score based on script characteristics
  static calculateReadabilityScore(text: string, script: string): number {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?\u0964\u0965]/).filter(s => s.trim().length > 0);
    
    if (words.length === 0 || sentences.length === 0) return 0;

    const avgWordsPerSentence = words.length / sentences.length;
    const avgCharsPerWord = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    
    // Base readability calculation (modified Flesch-like formula for Indian scripts)
    let score = 100 - (1.015 * avgWordsPerSentence) - (84.6 * (avgCharsPerWord / 5));
    
    // Adjust for script complexity
    if (script === 'devanagari' && this.hasComplexConjuncts(text)) {
      score -= 15; // Devanagari conjuncts increase complexity
    }
    
    // Normalize to 0-100 range
    return Math.max(0, Math.min(100, score));
  }

  // Format text with proper line breaks and spacing for Indian scripts
  static formatIndianText(text: string, script: string, maxWidth: number = 80): string {
    const words = this.breakIndianWords(text, script).words;
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      // Check if adding this word exceeds max width
      if (currentLine && (currentLine.length + word.length + 1) > maxWidth) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
    
    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    return lines.join('\n');
  }

  // Generate text statistics
  static getTextStatistics(text: string) {
    const analysis = this.analyzeText(text);
    const wordBreak = this.breakIndianWords(text, analysis.script);
    
    return {
      ...analysis,
      averageWordLength: analysis.wordCount > 0 ? 
        wordBreak.words.reduce((sum, word) => sum + word.length, 0) / analysis.wordCount : 0,
      uniqueWords: new Set(wordBreak.words.map(w => w.toLowerCase())).size,
      wordBreakConfidence: wordBreak.confidence,
      sentenceCount: text.split(/[.!?\u0964\u0965]/).filter(s => s.trim().length > 0).length
    };
  }

  // Text quality assessment for different scripts
  static assessTextQuality(text: string): {
    overall: number;
    factors: {
      encoding: number;
      structure: number;
      readability: number;
      completeness: number;
    };
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let encoding = 1.0;
    let structure = 1.0;
    let readability = 1.0;
    let completeness = 1.0;

    // Check encoding quality
    const normalizedText = text.normalize('NFC');
    if (normalizedText !== text) {
      encoding -= 0.2;
      recommendations.push('Text contains non-normalized Unicode characters');
    }

    // Check structural quality
    const analysis = this.analyzeText(text);
    if (analysis.confidence < 0.8) {
      structure -= 0.3;
      recommendations.push('Mixed script content may affect readability');
    }

    // Check readability
    if (analysis.readabilityScore < 50) {
      readability -= 0.4;
      recommendations.push('Text complexity is high - consider simplifying');
    }

    // Check completeness
    const hasIncompleteWords = /[\u094D]$|[\u0BCD]$|[\u0A4D]$|[\u0D4D]$/.test(text);
    if (hasIncompleteWords) {
      completeness -= 0.3;
      recommendations.push('Text may contain incomplete words');
    }

    const overall = (encoding + structure + readability + completeness) / 4;

    return {
      overall,
      factors: { encoding, structure, readability, completeness },
      recommendations
    };
  }
}

export default AdvancedTextProcessor;