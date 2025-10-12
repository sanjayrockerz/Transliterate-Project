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
  const [targetScript, setTargetScript] = useState<Script>("tamil");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransliterate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to transliterate");
      return;
    }

    if (sourceScript === targetScript) {
      toast.error("Please select different source and target scripts");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const { data, error } = await supabase.functions.invoke("transliterate", {
        body: {
          text: inputText,
          sourceScript,
          targetScript,
        },
      });

      if (error) throw error;

      if (data?.transliteratedText) {
        setResult(data.transliteratedText);
        toast.success("Transliteration complete!");
      } else {
        throw new Error("No result returned");
      }
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
            {/* Script Selectors */}
            <div className="grid md:grid-cols-2 gap-6">
              <ScriptSelector
                value={sourceScript}
                onChange={setSourceScript}
                label="From Script"
              />
              <ScriptSelector
                value={targetScript}
                onChange={setTargetScript}
                label="To Script"
              />
            </div>

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

            {/* Result */}
            <TransliterationResult result={result} isLoading={isLoading} />
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
