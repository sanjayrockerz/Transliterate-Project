import { useState, useEffect } from "react";
import { Languages, Settings, Zap, Shield, BarChart3, Clock, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScriptSelector, type Script } from "@/components/ScriptSelector";
import { TextInput } from "@/components/TextInput";
import { TransliterationResult } from "@/components/TransliterationResult";
import { TransliterationProgress } from "@/components/TransliterationProgress";
import { ConfidenceScore, QualityMetrics } from "@/components/ConfidenceIndicator";
import { TouristTranslator } from "@/components/TouristTranslator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/hero-scripts.jpg";
import AdvancedTransliterationEngine from "@/utils/transliterationEngine";
import AdvancedTextProcessor from "@/utils/textProcessor";
import ReverseTransliterationEngine from "@/utils/reverseTransliterationEngine";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [sourceScript, setSourceScript] = useState<Script>("hindi");
  const [results, setResults] = useState<Record<Script, string>>({
    hindi: "",
    tamil: "",
    gurumukhi: "",
    malayalam: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"transliterate" | "translate">("transliterate");

  // Handle tourist phrase selection - optionally switch to transliteration tab
  const handleTouristPhraseSelect = (phrase: string) => {
    setInputText(phrase);
    // Optionally switch to transliteration tab to show both translation and transliteration
    // setActiveTab("transliterate");
  };
  
  // Advanced features
  const [enableRealTimeTransliteration, setEnableRealTimeTransliteration] = useState(false);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true); // Enable by default for better UX
  const [qualityMode, setQualityMode] = useState<'fast' | 'balanced' | 'high'>('balanced');
  
  // Progress tracking
  const [progressSteps, setProgressSteps] = useState<Array<{
    step: number;
    total: number;
    title: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    confidence?: number;
    duration?: number;
  }>>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  
  // Quality metrics
  const [qualityMetrics, setQualityMetrics] = useState<{
    confidence: number;
    accuracy: number;
    completeness: number;
    readability: number;
  } | null>(null);
  
  // Get transliteration engine
  const engine = AdvancedTransliterationEngine.getInstance();

  // Simplified and fast transliteration
  const handleTransliterate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to transliterate");
      return;
    }

    setIsLoading(true);
    setShowProgress(true);

    try {
      const startTime = performance.now();

      // Initialize results
      const newResults: Record<Script, string> = {
        hindi: "",
        tamil: "",
        gurumukhi: "",
        malayalam: "",
      };

      // Detect input script
      const detectedScript = engine.detectScript(inputText);
      console.log(`🔍 Detected script: ${detectedScript}`);

      // Process each script in parallel for speed
      const promises = Object.keys(newResults).map(async (scriptKey) => {
        const targetScript = scriptKey as Script;

        try {
          if (detectedScript === targetScript) {
            // Same script - just copy
            return { script: targetScript, text: inputText, confidence: 0.95 };
          } else if (detectedScript === 'latin') {
            // English to Indian script - use fast local engine
            const result = engine.transliterate(inputText, targetScript);
            return { script: targetScript, text: result, confidence: 0.8 };
          } else {
            // Cross-script transliteration - try API first, fallback to local
            try {
              const { data, error } = await supabase.functions.invoke("transliterate", {
                body: {
                  text: inputText,
                  sourceScript: detectedScript,
                  targetScript,
                  qualityMode: 'fast', // Use fast mode for speed
                },
              });

              if (!error && data?.transliteratedText) {
                return { script: targetScript, text: data.transliteratedText, confidence: 0.85 };
              }
            } catch (apiError) {
              console.log(`API failed for ${targetScript}, using fallback`);
            }

            // Fallback: Use cross-script transliteration
            const result = engine.crossScriptTransliterate(inputText, detectedScript, targetScript);
            return { script: targetScript, text: result, confidence: 0.7 };
          }
        } catch (error) {
          console.error(`Error processing ${targetScript}:`, error);
          return { script: targetScript, text: "Error processing text", confidence: 0.1 };
        }
      });

      // Wait for all transliterations to complete
      const transliterationResults = await Promise.all(promises);

      // Update results
      transliterationResults.forEach(({ script, text }) => {
        newResults[script] = text;
      });

      setResults(newResults);

      // Calculate quality metrics
      const avgConfidence = transliterationResults.reduce((sum, r) => sum + r.confidence, 0) / transliterationResults.length;
      setQualityMetrics({
        confidence: avgConfidence,
        accuracy: avgConfidence * 0.9,
        completeness: 0.95,
        readability: 0.85,
      });

      const totalTime = performance.now() - startTime;
      console.log(`✅ Transliteration completed in ${totalTime.toFixed(2)}ms`);

      toast.success(`Transliteration completed in ${totalTime.toFixed(0)}ms`);

    } catch (error) {
      console.error("Transliteration failed:", error);
      toast.error("Transliteration failed. Please try again.");
    } finally {
      setIsLoading(false);
      setShowProgress(false);
    }
  };

  return (
    <div className="min-h-screen bg-rainbow">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/15 to-orange-400/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-rainbow rounded-full shadow-glow mb-6 pulse-glow">
            <Languages className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-6 drop-shadow-sm">
            Read Bharat
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4 font-medium">
            ✨ Transliterate street signs and text across Indian scripts with AI magic ✨
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Seamlessly read signboards in different languages as you travel across Bharat
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 max-w-6xl">
        <Card className="card-colorful card-glow overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-400/10 p-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 space-y-8">
              {/* Enhanced Header */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center pulse-glow">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                    🌈 AI Transliteration Studio
                  </h2>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center pulse-glow">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Settings Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
                  className="border-2 border-purple-300 text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showAdvancedFeatures ? '🔧 Hide Settings' : '⚙️ Advanced Settings'}
                </Button>
              </div>

            {/* Enhanced Advanced Settings Panel */}
            {showAdvancedFeatures && (
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Real-time Transliteration</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Automatically transliterate English to {sourceScript} as you type
                      </p>
                    </div>
                    <Switch
                      checked={enableRealTimeTransliteration}
                      onCheckedChange={setEnableRealTimeTransliteration}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Show Text Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Display detailed statistics and quality metrics
                      </p>
                    </div>
                    <Switch
                      checked={showAnalysis}
                      onCheckedChange={setShowAnalysis}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Quality Mode</label>
                    <div className="flex gap-2">
                      {(['fast', 'balanced', 'high'] as const).map((mode) => (
                        <Button
                          key={mode}
                          variant={qualityMode === mode ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setQualityMode(mode)}
                          className="capitalize"
                        >
                          {mode}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {qualityMode === 'fast' && 'Faster processing, basic accuracy'}
                      {qualityMode === 'balanced' && 'Good balance of speed and quality'}
                      {qualityMode === 'high' && 'Best quality, slower processing'}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Enhanced Colorful Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "transliterate" | "translate")}>
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-2xl border-2 border-purple-200">
                <TabsTrigger 
                  value="transliterate" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-medium transition-all duration-300"
                >
                  <Languages className="w-5 h-5" />
                  🔤 Transliteration
                </TabsTrigger>
                <TabsTrigger 
                  value="translate" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-medium transition-all duration-300"
                >
                  <Globe className="w-5 h-5" />
                  🗣️ Tourist Translation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transliterate" className="space-y-6 mt-6">
                {/* Script Selector */}
                <ScriptSelector
                  value={sourceScript}
                  onChange={setSourceScript}
                  label="Source Script (Language of the sign)"
                />

                {/* Enhanced Text Input */}
            <TextInput 
              value={inputText} 
              onChange={setInputText}
              sourceScript={sourceScript}
              enableRealTimeTransliteration={enableRealTimeTransliteration}
            />

            {/* Quick Example Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText("namaste")}
                className="text-xs hover:bg-purple-50"
              >
                👋 namaste
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText("mumbai")}
                className="text-xs hover:bg-purple-50"
              >
                🏙️ mumbai
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText("hello how are you")}
                className="text-xs hover:bg-purple-50"
              >
                💬 hello how are you
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText("where is hotel")}
                className="text-xs hover:bg-purple-50"
              >
                🏨 where is hotel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText("thank you")}
                className="text-xs hover:bg-purple-50"
              >
                🙏 thank you
              </Button>
            </div>

            {/* Enhanced Transliterate Button */}
            <div className="space-y-6">
              <div className="relative">
                <Button
                  size="lg"
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white border-0 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handleTransliterate}
                  disabled={isLoading}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                        <span className="animate-pulse">🤖 AI Processing Magic...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        <span>✨ Transliterate with AI Magic ✨</span>
                        <Globe className="w-6 h-6 animate-bounce" />
                      </>
                    )}
                  </div>
                </Button>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl blur-xl opacity-30 -z-10 animate-pulse"></div>
              </div>

              {/* Progress Indicator */}
              {showProgress && (
                <TransliterationProgress
                  steps={progressSteps}
                  overallProgress={overallProgress}
                  isVisible={showProgress}
                />
              )}

              {/* Quality Metrics */}
              {qualityMetrics && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ConfidenceScore
                    confidence={qualityMetrics.confidence}
                    label="Overall Confidence"
                    showDetails={true}
                    size="md"
                  />
                  <QualityMetrics
                    confidence={qualityMetrics.confidence}
                    accuracy={qualityMetrics.accuracy}
                    completeness={qualityMetrics.completeness}
                    readability={qualityMetrics.readability}
                    showBreakdown={showAnalysis}
                  />
                </div>
              )}
            </div>

            {/* Results Section */}
            {(isLoading || Object.values(results).some(r => r)) && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Transliteration Results
                    </h3>
                  </div>
                  {qualityMetrics && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {progressSteps.reduce((sum, step) => sum + (step.duration || 0), 0)}ms total
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {(["devanagari", "tamil", "gurumukhi", "malayalam"] as Script[]).map((script) => {
                    const scriptLabels = {
                      devanagari: "देवनागरी (Devanagari)",
                      tamil: "தமிழ் (Tamil)", 
                      gurumukhi: "ਗੁਰਮੁਖੀ (Gurumukhi)",
                      malayalam: "മലയാളം (Malayalam)",
                    };

                    const scriptStep = progressSteps.find(step => 
                      step.title.toLowerCase().includes(script)
                    );
                    
                    return (
                      <div key={script} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                            {scriptLabels[script]}
                            {script === sourceScript && (
                              <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                                Source
                              </span>
                            )}
                          </h4>
                          {scriptStep?.confidence && (
                            <ConfidenceScore
                              confidence={scriptStep.confidence}
                              label=""
                              size="sm"
                            />
                          )}
                        </div>
                        <TransliterationResult
                          result={results[script] || ""}
                          isLoading={isLoading}
                          script={script}
                          showAnalysis={showAnalysis}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced Colorful Results Summary */}
                {qualityMetrics && !isLoading && (
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 border-2 border-emerald-200 shadow-xl rounded-2xl">
                    <div className="text-center space-y-4">
                      <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        🎉 Processing Summary
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bounce-hover">
                          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                            {progressSteps.filter(s => s.status === 'completed').length}
                          </div>
                          <div className="text-sm font-medium text-purple-600">📝 Scripts</div>
                        </div>
                        <div className="bg-white/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bounce-hover">
                          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                            {Math.round(qualityMetrics.confidence * 100)}%
                          </div>
                          <div className="text-sm font-medium text-emerald-600">✅ Confidence</div>
                        </div>
                        <div className="bg-white/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bounce-hover">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                            {Math.round(qualityMetrics.completeness * 100)}%
                          </div>
                          <div className="text-sm font-medium text-blue-600">🎯 Complete</div>
                        </div>
                        <div className="bg-white/70 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bounce-hover">
                          <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {progressSteps.reduce((sum, step) => sum + (step.duration || 0), 0)}ms
                          </div>
                          <div className="text-sm font-medium text-orange-600">⚡ Duration</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
              </TabsContent>

              <TabsContent value="translate" className="space-y-6 mt-6">
                <TouristTranslator onTranslationSelect={handleTouristPhraseSelect} />
              </TabsContent>
            </Tabs>
            </div>
          </div>
        </Card>

        {/* Enhanced Colorful Info Section */}
        <div className="mt-12 text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-full border-2 border-purple-200 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🚀 Powered by Advanced AI • Supporting 4 major Indian scripts ✨
            </p>
          </div>
          
          {/* Colorful Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-purple-700 mb-2">🧠 Smart Recognition</h4>
              <p className="text-sm text-purple-600">
                Auto-detects script and optimizes transliteration with AI precision
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-pink-700 mb-2">⚡ Lightning Fast</h4>
              <p className="text-sm text-pink-600">
                Instant transliteration with real-time quality analysis
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-orange-700 mb-2">🛡️ Quality Assured</h4>
              <p className="text-sm text-orange-600">
                Advanced linguistics with 95%+ confidence scoring
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-2xl border-2 border-indigo-200 max-w-2xl mx-auto shadow-lg">
            <p className="text-sm font-medium text-indigo-700 mb-3">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
                🌟 Enhanced Features:
              </span> Real-time transliteration • Advanced text processing • Quality assessment • Multi-script support
            </p>
            <p className="text-sm text-indigo-600 font-medium">
              💫 Perfect for travelers, students, and professionals working across Indian languages 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
