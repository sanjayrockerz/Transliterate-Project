import { useState } from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScriptSelector, type Script } from "@/components/ScriptSelector";
import { TextInput } from "@/components/TextInput";
import { TransliterationResult } from "@/components/TransliterationResult";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import heroImage from "@/assets/hero-scripts.jpg";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [sourceScript, setSourceScript] = useState<Script>("devanagari");
  const [results, setResults] = useState<Record<Script, string>>({
    devanagari: "",
    tamil: "",
    gurumukhi: "",
    malayalam: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTransliterate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to transliterate");
      return;
    }

    setIsLoading(true);
    setResults({ devanagari: "", tamil: "", gurumukhi: "", malayalam: "" });

    const allScripts: Script[] = ["devanagari", "tamil", "gurumukhi", "malayalam"];
    const targetScripts = allScripts.filter(script => script !== sourceScript);

    try {
      const transliterationPromises = targetScripts.map(async (targetScript) => {
        const { data, error } = await supabase.functions.invoke("transliterate", {
          body: {
            text: inputText,
            sourceScript,
            targetScript,
          },
        });

        if (error) throw error;
        return { script: targetScript, text: data?.transliteratedText || "" };
      });

      const transliterations = await Promise.all(transliterationPromises);
      
      const newResults = { ...results };
      transliterations.forEach(({ script, text }) => {
        newResults[script] = text;
      });
      newResults[sourceScript] = inputText;
      
      setResults(newResults);
      toast.success("Transliteration complete!");
    } catch (error) {
      console.error("Transliteration error:", error);
      toast.error("Failed to transliterate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-sunrise rounded-full shadow-soft mb-4">
            <Languages className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Read Bharat
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Transliterate street signs and text across Indian scripts
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Seamlessly read signboards in different languages as you travel across Bharat
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 max-w-4xl">
        <Card className="p-6 md:p-8 bg-card shadow-card border-border">
          <div className="space-y-6">
            {/* Script Selector */}
            <ScriptSelector
              value={sourceScript}
              onChange={setSourceScript}
              label="Source Script (Language of the sign)"
            />

            {/* Text Input */}
            <TextInput value={inputText} onChange={setInputText} />

            {/* Transliterate Button */}
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleTransliterate}
              disabled={isLoading}
            >
              {isLoading ? "Transliterating..." : "Transliterate"}
            </Button>

            {/* Results */}
            {(isLoading || Object.values(results).some(r => r)) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Transliterations in All Scripts:
                </h3>
                <div className="grid gap-4">
                  {(["devanagari", "tamil", "gurumukhi", "malayalam"] as Script[]).map((script) => {
                    const scriptLabels = {
                      devanagari: "देवनागरी (Devanagari)",
                      tamil: "தமிழ் (Tamil)",
                      gurumukhi: "ਗੁਰਮੁਖੀ (Gurumukhi)",
                      malayalam: "മലയാളം (Malayalam)",
                    };
                    
                    return (
                      <Card key={script} className="p-4 bg-gradient-card border-border shadow-card">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            {scriptLabels[script]}
                          </h4>
                        </div>
                        {isLoading ? (
                          <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          </div>
                        ) : (
                          <div className="text-xl font-medium text-foreground leading-relaxed p-3 bg-background/50 rounded-lg">
                            {results[script] || "-"}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Info Section */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <p className="text-sm text-muted-foreground">
              Powered by AI • Supporting 4 major Indian scripts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
