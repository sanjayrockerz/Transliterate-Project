import { Card } from "@/components/ui/card";
import { Copy, Check, Info, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import AdvancedTransliterationEngine from "@/utils/transliterationEngine";
import AdvancedTextProcessor from "@/utils/textProcessor";

interface TransliterationResultProps {
  result: string;
  isLoading: boolean;
  script?: string;
  showAnalysis?: boolean;
}

export function TransliterationResult({ result, isLoading, script = 'hindi', showAnalysis = false }: TransliterationResultProps) {
  const [copied, setCopied] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Get advanced text analysis
  const textAnalysis = useMemo(() => {
    if (!result) return null;
    return AdvancedTextProcessor.getTextStatistics(result);
  }, [result]);

  // Get quality assessment
  const qualityAssessment = useMemo(() => {
    if (!result) return null;
    return AdvancedTextProcessor.assessTextQuality(result);
  }, [result]);

  // Get appropriate font class for the script
  const engine = AdvancedTransliterationEngine.getInstance();
  const scriptClass = engine.getScriptClass(script);

  // Script-specific configuration
  const scriptConfig = useMemo(() => {
    switch (script) {
      case 'hindi':
        return {
          displayName: 'Hindi',
          nativeName: 'हिन्दी',
          emoji: '🇮🇳',
          gradient: 'from-purple-600 via-pink-500 to-orange-500',
          iconBg: 'from-purple-500 to-pink-500',
          icon: 'हि',
          readyMessage: 'Ready for Hindi Magic!',
          placeholder: 'Type any English text above to see instant Hindi translation'
        };
      case 'tamil':
        return {
          displayName: 'Tamil',
          nativeName: 'தமிழ்',
          emoji: '🏛️',
          gradient: 'from-red-600 via-orange-500 to-yellow-500',
          iconBg: 'from-red-500 to-orange-500',
          icon: 'த',
          readyMessage: 'Ready for Tamil Magic!',
          placeholder: 'Type any English text above to see instant Tamil translation'
        };
      case 'gurumukhi':
        return {
          displayName: 'Gurumukhi',
          nativeName: 'ਗੁਰਮੁਖੀ',
          emoji: '🎯',
          gradient: 'from-blue-600 via-indigo-500 to-purple-500',
          iconBg: 'from-blue-500 to-indigo-500',
          icon: 'ਗੁ',
          readyMessage: 'Ready for Gurumukhi Magic!',
          placeholder: 'Type any English text above to see instant Gurumukhi translation'
        };
      case 'malayalam':
        return {
          displayName: 'Malayalam',
          nativeName: 'മലയാളം',
          emoji: '🌴',
          gradient: 'from-green-600 via-teal-500 to-cyan-500',
          iconBg: 'from-green-500 to-teal-500',
          icon: 'മ',
          readyMessage: 'Ready for Malayalam Magic!',
          placeholder: 'Type any English text above to see instant Malayalam translation'
        };
      default:
        return {
          displayName: 'Hindi',
          nativeName: 'हिन्दी',
          emoji: '🇮🇳',
          gradient: 'from-purple-600 via-pink-500 to-orange-500',
          iconBg: 'from-purple-500 to-pink-500',
          icon: 'हि',
          readyMessage: 'Ready for Hindi Magic!',
          placeholder: 'Type any English text above to see instant Hindi translation'
        };
    }
  }, [script]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result && !isLoading) {
    return (
      <div className="relative">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-purple-50 rounded-3xl opacity-60 animate-pulse"></div>
        
        <Card className="relative p-8 bg-white/70 backdrop-blur-sm border-2 border-gray-200 shadow-xl rounded-3xl">
          <div className="text-center space-y-3">
            <div className="text-4xl animate-bounce">{scriptConfig.emoji}</div>
            <p className="text-lg font-medium text-gray-600">{scriptConfig.readyMessage}</p>
            <p className="text-sm text-gray-500">{scriptConfig.placeholder}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden group animate-fadeIn">
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 via-pink-100/70 to-orange-100/70 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500"></div>
      
      <Card className="relative p-8 bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:border-purple-300 rounded-3xl">
        {/* Enhanced header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${scriptConfig.iconBg} rounded-full flex items-center justify-center animate-pulse shadow-lg`}>
              <span className="text-white font-bold text-lg">{scriptConfig.icon}</span>
            </div>
            <h3 className={`text-xl font-bold bg-gradient-to-r ${scriptConfig.gradient} bg-clip-text text-transparent`}>
              {scriptConfig.emoji} {scriptConfig.displayName} Translation Result
            </h3>
          </div>
          
          <div className="flex gap-2">
            {result && showAnalysis && textAnalysis && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowStats(!showStats)}
                className="text-xs hover:bg-purple-100 transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                📊 Stats
              </Button>
            )}
            {result && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopy}
                className="hover:bg-green-100 transition-all duration-300 hover:scale-105"
              >
                {copied ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-xs">✅</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Copy className="w-4 h-4" />
                    <span className="text-xs">📋</span>
                  </div>
                )}
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            {/* Enhanced loading animation */}
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent absolute inset-0"></div>
            </div>
            
            <div className="text-center">
              <div className={`text-lg font-semibold bg-gradient-to-r ${scriptConfig.gradient} bg-clip-text text-transparent mb-1`}>
                🪔 Converting to {scriptConfig.displayName}...
              </div>
              <div className="text-sm text-purple-500 animate-pulse">
                {scriptConfig.emoji} Creating beautiful {scriptConfig.nativeName} script for you
              </div>
            </div>
            
            {/* Loading dots animation */}
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Main result with enhanced styling */}
            <div className="relative mb-6">
              <div className={`text-4xl font-bold text-purple-800 leading-relaxed p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 shadow-inner transform hover:scale-105 transition-transform duration-300 text-center ${scriptClass} conjunct-aware`}>
                {result}
              </div>
            </div>
            
            {/* Enhanced Quality indicator */}
            {qualityAssessment && (
              <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">
                      🎯 Translation Quality: 
                      <span className="font-bold text-green-600 ml-1">{Math.round(qualityAssessment.overall * 100)}%</span>
                    </span>
                  </div>
                  
                  {qualityAssessment.overall >= 0.8 ? (
                    <span className="text-green-600 animate-bounce">🌟</span>
                  ) : qualityAssessment.overall >= 0.6 ? (
                    <span className="text-yellow-500">⭐</span>
                  ) : (
                    <span className="text-orange-500">🕉️</span>
                  )}
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${qualityAssessment.overall * 100}%` }}
                  />
                </div>
                
                {qualityAssessment.overall < 0.7 && (
                  <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block">
                    ⚠️ May need review
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Advanced statistics */}
            {showStats && textAnalysis && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 shadow-inner">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{textAnalysis.wordCount}</div>
                    <div className="text-xs text-gray-500">📝 Words</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-green-600">{textAnalysis.characterCount}</div>
                    <div className="text-xs text-gray-500">🔤 Characters</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <div className="text-lg font-bold text-purple-600 capitalize">{textAnalysis.script}</div>
                    <div className="text-xs text-gray-500">📜 Script</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-orange-600">{Math.round(textAnalysis.readabilityScore)}/100</div>
                    <div className="text-xs text-gray-500">📊 Readability</div>
                  </div>
                </div>
                
                {qualityAssessment?.recommendations.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-2">
                      💡 Recommendations:
                    </div>
                    <ul className="text-sm space-y-1">
                      {qualityAssessment.recommendations.slice(0, 2).map((rec, idx) => (
                        <li key={idx} className="text-amber-700 flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Success celebration */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                <span className="animate-bounce">🎉</span>
                <span className="text-sm font-medium text-green-700">Successfully translated to {scriptConfig.displayName}!</span>
                <span className="animate-bounce">{scriptConfig.emoji}</span>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
