import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ConfidenceScoreProps {
  confidence: number;
  label?: string;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface QualityMetricsProps {
  confidence: number;
  accuracy: number;
  completeness: number;
  readability: number;
  showBreakdown?: boolean;
}

export function ConfidenceScore({ 
  confidence, 
  label = "Confidence", 
  showDetails = false,
  size = 'md' 
}: ConfidenceScoreProps) {
  const getConfidenceLevel = () => {
    if (confidence >= 0.9) return { level: 'excellent', color: 'bg-green-500', icon: CheckCircle, text: 'Excellent' };
    if (confidence >= 0.8) return { level: 'high', color: 'bg-blue-500', icon: Star, text: 'High' };
    if (confidence >= 0.6) return { level: 'medium', color: 'bg-yellow-500', icon: Shield, text: 'Medium' };
    return { level: 'low', color: 'bg-red-500', icon: AlertTriangle, text: 'Low' };
  };

  const { level, color, icon: Icon, text } = getConfidenceLevel();
  const percentage = Math.round(confidence * 100);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs px-2 py-1';
      case 'lg': return 'text-base px-4 py-2';
      default: return 'text-sm px-3 py-1.5';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="secondary" 
        className={`${getSizeClasses()} bg-background/80 border-border`}
      >
        <Icon className={`w-3 h-3 mr-1 ${
          level === 'excellent' ? 'text-green-500' :
          level === 'high' ? 'text-blue-500' :
          level === 'medium' ? 'text-yellow-500' : 'text-red-500'
        }`} />
        {label}: {percentage}%
      </Badge>
      
      {showDetails && (
        <div className="flex items-center gap-1">
          <div className="w-16 bg-muted rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-500 ${color}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{text}</span>
        </div>
      )}
    </div>
  );
}

export function QualityMetrics({ 
  confidence, 
  accuracy, 
  completeness, 
  readability,
  showBreakdown = false 
}: QualityMetricsProps) {
  const overallScore = (confidence + accuracy + completeness + readability) / 4;
  
  const metrics = [
    { label: 'Confidence', value: confidence, icon: Shield },
    { label: 'Accuracy', value: accuracy, icon: CheckCircle },
    { label: 'Completeness', value: completeness, icon: Star },
    { label: 'Readability', value: readability, icon: Star }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 dark:text-green-400';
    if (score >= 0.8) return 'text-blue-600 dark:text-blue-400';
    if (score >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-background/95 to-background/80 border-border">
      <div className="space-y-3">
        {/* Overall Score */}
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Quality Score</h4>
          <div className="flex items-center gap-2">
            <div className={`text-xl font-bold ${getScoreColor(overallScore)}`}>
              {Math.round(overallScore * 100)}
            </div>
            <div className="text-xs text-muted-foreground">/100</div>
          </div>
        </div>

        {/* Overall Progress */}
        <Progress value={overallScore * 100} className="h-2" />

        {/* Detailed Breakdown */}
        {showBreakdown && (
          <div className="space-y-2 pt-2 border-t border-border">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-muted rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        value >= 0.9 ? 'bg-green-500' :
                        value >= 0.8 ? 'bg-blue-500' :
                        value >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${getScoreColor(value)}`}>
                    {Math.round(value * 100)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {overallScore < 0.8 && (
          <div className="pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Tip:</span>{' '}
              {overallScore < 0.6 ? 
                'Consider reviewing input text quality for better results.' :
                'Good quality. Minor improvements may enhance accuracy.'
              }
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ConfidenceScore;