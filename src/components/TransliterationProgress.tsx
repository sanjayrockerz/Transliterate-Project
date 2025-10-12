import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface ProgressStepProps {
  step: number;
  total: number;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  confidence?: number;
  duration?: number;
}

interface TransliterationProgressProps {
  steps: ProgressStepProps[];
  overallProgress: number;
  isVisible: boolean;
}

export function ProgressStep({ step, total, title, status, confidence, duration }: ProgressStepProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-700 dark:text-green-400';
      case 'processing':
        return 'text-blue-700 dark:text-blue-400';
      case 'error':
        return 'text-red-700 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50">
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {step}/{total} {title}
          </span>
          {duration && status === 'completed' && (
            <span className="text-xs text-muted-foreground">
              {duration}ms
            </span>
          )}
        </div>
        
        {confidence !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  confidence > 0.8 ? 'bg-green-500' :
                  confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round(confidence * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TransliterationProgress({ steps, overallProgress, isVisible }: TransliterationProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(overallProgress);
    }, 100);
    return () => clearTimeout(timer);
  }, [overallProgress]);

  if (!isVisible) return null;

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const processingSteps = steps.filter(s => s.status === 'processing').length;
  const errorSteps = steps.filter(s => s.status === 'error').length;

  return (
    <Card className="p-4 bg-gradient-to-r from-background/95 to-background/90 border-border shadow-lg">
      <div className="space-y-4">
        {/* Overall Progress Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Loader2 className={`w-5 h-5 ${processingSteps > 0 ? 'animate-spin text-blue-500' : 'text-green-500'}`} />
            Transliteration Progress
          </h3>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {Math.round(animatedProgress)}% Complete
            </div>
            <div className="text-xs text-muted-foreground">
              {completedSteps}/{steps.length} scripts processed
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <Progress value={animatedProgress} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Processing {processingSteps} scripts...</span>
            <span>
              {errorSteps > 0 && (
                <span className="text-red-500">{errorSteps} errors</span>
              )}
            </span>
          </div>
        </div>

        {/* Individual Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <ProgressStep
              key={index}
              {...step}
            />
          ))}
        </div>

        {/* Summary Statistics */}
        {completedSteps > 0 && (
          <div className="pt-3 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-600">
                  {completedSteps}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-600">
                  {processingSteps}
                </div>
                <div className="text-xs text-muted-foreground">Processing</div>
              </div>
              <div>
                <div className="text-lg font-semibold">
                  {steps.length > 0 ? 
                    Math.round((steps.reduce((sum, s) => sum + (s.confidence || 0), 0) / steps.length) * 100) 
                    : 0}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Confidence</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default TransliterationProgress;