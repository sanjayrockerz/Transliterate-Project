import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TransliterationResultProps {
  result: string;
  isLoading: boolean;
}

export function TransliterationResult({ result, isLoading }: TransliterationResultProps) {
  const [copied, setCopied] = useState(false);

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
        {result && (
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="text-2xl font-medium text-foreground leading-relaxed p-4 bg-background/50 rounded-lg">
          {result}
        </div>
      )}
    </Card>
  );
}
