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

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result && !isLoading) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Transliteration Result</h3>
        <div className="flex gap-2">
          {result && showAnalysis && textAnalysis && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowStats(!showStats)}
              className="text-xs"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Stats
            </Button>
          )}
          {result && (
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className={`text-2xl font-medium text-foreground leading-relaxed p-4 bg-background/50 rounded-lg ${scriptClass} conjunct-aware`}>
            {result}
          </div>
          
          {/* Quality indicator */}
          {qualityAssessment && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                Quality: {Math.round(qualityAssessment.overall * 100)}%
              </div>
              {qualityAssessment.overall < 0.7 && (
                <div className="text-xs text-amber-500">
                  May need review
                </div>
              )}
            </div>
          )}

          {/* Advanced statistics */}
          {showStats && textAnalysis && (
            <div className="mt-4 p-3 bg-background/30 rounded-lg text-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Words:</span>
                  <div className="font-medium">{textAnalysis.wordCount}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Characters:</span>
                  <div className="font-medium">{textAnalysis.characterCount}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Script:</span>
                  <div className="font-medium capitalize">{textAnalysis.script}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Readability:</span>
                  <div className="font-medium">{Math.round(textAnalysis.readabilityScore)}/100</div>
                </div>
              </div>
              
              {qualityAssessment?.recommendations.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="text-muted-foreground text-xs mb-1">Recommendations:</div>
                  <ul className="text-xs space-y-1">
                    {qualityAssessment.recommendations.slice(0, 2).map((rec, idx) => (
                      <li key={idx} className="text-amber-600">• {rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
