import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, ShoppingBag, Utensils, AlertTriangle, Car, Globe, BookOpen, Volume2 } from "lucide-react";
import TouristTranslationEngine, { TouristPhrase } from "@/utils/translationEngine";
import ReverseTransliterationEngine from "@/utils/reverseTransliterationEngine";

interface TouristTranslatorProps {
  onTranslationSelect?: (text: string) => void;
}

export function TouristTranslator({ onTranslationSelect }: TouristTranslatorProps) {
  const [activeMode, setActiveMode] = useState<"translate" | "pronounce">("translate");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhrase, setSelectedPhrase] = useState<string>("");
  const [translations, setTranslations] = useState<Record<string, string> | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Reverse transliteration states
  const [pronunciationInput, setPronunciationInput] = useState("");
  const [pronunciationResult, setPronunciationResult] = useState<{
    original: string;
    phonetic: string;
    script: string;
    syllables: string[];
  } | null>(null);
  
  const translationEngine = TouristTranslationEngine.getInstance();
  const reverseEngine = ReverseTransliterationEngine.getInstance();

  const categories = [
    { id: 'all', label: 'All', icon: Globe },
    { id: 'greetings', label: 'Greetings', icon: Globe },
    { id: 'directions', label: 'Directions', icon: MapPin },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'transport', label: 'Transport', icon: Car }
  ];

  const modes = [
    { id: 'translate', label: 'English → Indian', icon: BookOpen },
    { id: 'pronounce', label: 'Indian → Pronunciation', icon: Volume2 }
  ];

  const essentialPhrases = [
    "hello", "thank you", "please", "excuse me", "help",
    "where is", "how much", "water", "food", "hotel",
    "taxi", "hospital", "police"
  ];

  // Handle search and get suggestions for translation mode
  useEffect(() => {
    if (activeMode === "translate" && searchTerm.length > 0) {
      const newSuggestions = translationEngine.getSuggestions(searchTerm);
      setSuggestions(newSuggestions);
      
      // Check if current search term is translatable
      if (translationEngine.isTranslatable(searchTerm)) {
        const result = translationEngine.getAllTranslations(searchTerm);
        setTranslations(result);
        setSelectedPhrase(searchTerm);
      }
    } else if (activeMode === "translate") {
      setSuggestions([]);
      setTranslations(null);
      setSelectedPhrase("");
    }
  }, [searchTerm, activeMode]);

  // Handle pronunciation input
  useEffect(() => {
    if (activeMode === "pronounce" && pronunciationInput.length > 0) {
      const result = reverseEngine.getPronunciationGuide(pronunciationInput);
      setPronunciationResult(result);
    } else if (activeMode === "pronounce") {
      setPronunciationResult(null);
    }
  }, [pronunciationInput, activeMode]);

  const handlePhraseSelect = (phrase: string) => {
    setSelectedPhrase(phrase);
    setSearchTerm(phrase);
    const result = translationEngine.getAllTranslations(phrase);
    setTranslations(result);
    
    // Notify parent component if callback provided
    if (onTranslationSelect) {
      onTranslationSelect(phrase);
    }
  };

  const getFilteredPhrases = () => {
    if (selectedCategory === 'all') {
      return essentialPhrases;
    }
    
    // Get phrases from actual translation dictionary that match the category
    const categoryPhrases: { [category: string]: string[] } = {
      'greetings': [
        "hello", "thank you", "please", "excuse me", "i don't speak hindi",
        "do you speak english", "i am a tourist", "can you help me", 
        "beautiful place", "thank you for your help"
      ],
      'directions': [
        "where is", "railway station", "airport", "hotel", 
        "where is the bathroom", "i am lost"
      ],
      'food': [
        "food", "water", "restaurant", "spicy", "vegetarian",
        "is this vegetarian", "not too spicy please", "this is delicious",
        "where can i find a good restaurant"
      ],
      'shopping': [
        "how much", "expensive", "cheap", "market",
        "where can i buy souvenirs"
      ],
      'emergency': [
        "help", "police", "emergency", "hospital"
      ],
      'transport': [
        "taxi", "bus", "auto rickshaw"
      ]
    };
    
    return categoryPhrases[selectedCategory] || [];
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Globe;
  };

  return (
    <Card className="w-full bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="w-5 h-5 text-primary" />
          Tourist Translator
          <Badge variant="outline" className="ml-2">Meaning-based</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mode Selector */}
        <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as "translate" | "pronounce")}>
          <TabsList className="grid w-full grid-cols-2">
            {modes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <TabsTrigger 
                  key={mode.id} 
                  value={mode.id}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  {mode.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Translation Mode */}
          <TabsContent value="translate" className="space-y-4">
            {/* Search Section */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tourist phrases (e.g., 'hello', 'where is', 'food')..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Badge 
                      key={suggestion}
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handlePhraseSelect(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Pronunciation Mode */}
          <TabsContent value="pronounce" className="space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <Volume2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter text in Hindi, Tamil, Malayalam, or Punjabi..."
                  value={pronunciationInput}
                  onChange={(e) => setPronunciationInput(e.target.value)}
                  className="pl-10"
                  style={{ fontSize: '16px' }} // Better for Indian scripts
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                <p>💡 <strong>Tip:</strong> Copy and paste signs or text you see to learn how to pronounce them!</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-1 text-xs"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Quick Phrases */}
          <TabsContent value={selectedCategory} className="mt-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">
                {selectedCategory === 'all' ? 'Essential Phrases' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Phrases`}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {getFilteredPhrases().map((phrase) => (
                  <Button
                    key={phrase}
                    variant={selectedPhrase === phrase ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePhraseSelect(phrase)}
                    className="text-xs text-left justify-start"
                  >
                    {phrase}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Pronunciation Results */}
        {pronunciationResult && activeMode === "pronounce" && (
          <Card className="bg-background/50 border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-foreground">
                  Pronunciation Guide
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {pronunciationResult.script} → English
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Original Text */}
              <div className="p-3 bg-background rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Original Text</div>
                <div className="text-xl font-medium text-foreground">
                  {pronunciationResult.original}
                </div>
              </div>

              {/* Phonetic Pronunciation */}
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">How to Pronounce</div>
                <div className="text-lg font-medium text-foreground">
                  {pronunciationResult.phonetic}
                </div>
              </div>

              {/* Syllable Breakdown */}
              {pronunciationResult.syllables.length > 0 && (
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2">Syllable Breakdown</div>
                  <div className="flex flex-wrap gap-1">
                    {pronunciationResult.syllables.map((syllable, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {syllable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(pronunciationResult.phonetic);
                  }}
                >
                  Copy Pronunciation
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (onTranslationSelect) {
                      onTranslationSelect(pronunciationResult.phonetic);
                    }
                  }}
                >
                  Use in Transliteration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Translation Results */}
        {translations && selectedPhrase && activeMode === "translate" && (
          <Card className="bg-background/50 border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-foreground">
                  "{selectedPhrase}" in Indian Languages
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  Tourist Translation
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                {Object.entries(translations).map(([script, translation]) => {
                  const scriptLabels = {
                    hindi: 'हिंदी (Hindi)',
                    tamil: 'தமிழ் (Tamil)',
                    malayalam: 'മലയാളം (Malayalam)',
                    gurumukhi: 'ਪੰਜਾਬੀ (Punjabi)'
                  };
                  
                  return (
                    <div key={script} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          {scriptLabels[script as keyof typeof scriptLabels]}
                        </span>
                        <span className="text-lg font-medium text-foreground">
                          {translation}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(translation);
                          }}
                        >
                          Copy
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            if (onTranslationSelect) {
                              onTranslationSelect(translation);
                            }
                          }}
                          title="Send to transliteration"
                        >
                          →
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Context Info */}
              {(() => {
                const context = translationEngine.getTranslationWithContext(selectedPhrase);
                if (context?.meaning || context?.category) {
                  return (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <div className="text-xs text-muted-foreground space-y-1">
                        {context.meaning && (
                          <p><strong>Meaning:</strong> {context.meaning}</p>
                        )}
                        {context.category && (
                          <p><strong>Category:</strong> {context.category}</p>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <p className="font-medium mb-1">💡 Two-Way Tourist Helper:</p>
          <ul className="space-y-1 ml-4">
            <li>• <strong>English → Indian:</strong> Get translations to communicate (hello → नमस्ते)</li>
            <li>• <strong>Indian → Pronunciation:</strong> Learn how to say Indian text (नमस्ते → namaste)</li>
            <li>• Perfect for reading signs, menus, and talking with locals!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default TouristTranslator;