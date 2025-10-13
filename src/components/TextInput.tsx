import { Textarea } from "@/components/ui/textarea";
import { Camera, Type, Mic, Keyboard, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import AdvancedTransliterationEngine from "@/utils/transliterationEngine";
import AdvancedTextProcessor from "@/utils/textProcessor";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  sourceScript?: string;
  enableRealTimeTransliteration?: boolean;
}

export function TextInput({ 
  value, 
  onChange, 
  sourceScript = "hindi",
  enableRealTimeTransliteration = false 
}: TextInputProps) {
  const [inputMode, setInputMode] = useState<"text" | "camera" | "voice">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [showTransliterationMode, setShowTransliterationMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get transliteration engine
  const engine = AdvancedTransliterationEngine.getInstance();

  // Detect current script and get appropriate styling
  const detectedScript = useMemo(() => {
    if (!value) return 'latin';
    return engine.detectScript(value);
  }, [value, engine]);

  const scriptClass = engine.getScriptClass(detectedScript);

  // Real-time text analysis
  const textStats = useMemo(() => {
    if (!value) return null;
    return AdvancedTextProcessor.getTextStatistics(value);
  }, [value]);

  // Handle real-time transliteration for English input
  const handleTextChange = (newValue: string) => {
    if (enableRealTimeTransliteration && detectedScript === 'latin' && sourceScript === 'hindi') {
      // Real-time English to Hindi transliteration
      const transliterated = engine.englishToDevanagari(newValue);
      onChange(transliterated);
    } else {
      onChange(newValue);
    }
  };

  // Enhanced image capture with better OCR
  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          
          const { supabase } = await import("@/integrations/supabase/client");
          onChange("🔍 Processing image...");
          
          const { data, error } = await supabase.functions.invoke("ocr", {
            body: { imageBase64: base64Image },
          });

          if (error) throw error;

          if (data?.extractedText && data.extractedText !== "NO_TEXT_FOUND") {
            const extractedText = data.extractedText;
            // Post-process OCR result for better quality
            const processed = AdvancedTextProcessor.formatIndianText(extractedText, sourceScript);
            onChange(processed);
          } else {
            onChange("❌ No text found in image. Please try another image or ensure text is clearly visible.");
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("OCR error:", error);
        onChange("❌ Failed to process image. Please try again.");
      }
    }
  };

  // Voice input (placeholder for future implementation)
  const handleVoiceInput = async () => {
    setIsRecording(!isRecording);
    // Future: Implement Web Speech API or similar
    if (!isRecording) {
      onChange("🎤 Voice input coming soon! Use text or camera input for now.");
    }
  };

  // Clear input
  const clearInput = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      {/* Header with input mode controls */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">Input Text</label>
          {textStats && (
            <div className="text-xs text-muted-foreground">
              {textStats.wordCount} words • {textStats.characterCount} chars • {textStats.script}
              {textStats.confidence < 0.8 && " • Mixed scripts"}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant={inputMode === "text" ? "default" : "ghost"}
            size="sm"
            onClick={() => setInputMode("text")}
            title="Type text"
          >
            <Type className="w-4 h-4" />
          </Button>
          <Button
            variant={inputMode === "camera" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setInputMode("camera");
              fileInputRef.current?.click();
            }}
            title="Capture from camera/image"
          >
            <Camera className="w-4 h-4" />
          </Button>
          <Button
            variant={inputMode === "voice" ? "default" : "ghost"}
            size="sm"
            onClick={handleVoiceInput}
            title="Voice input (coming soon)"
            disabled
          >
            <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500' : ''}`} />
          </Button>
          {enableRealTimeTransliteration && (
            <Button
              variant={showTransliterationMode ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowTransliterationMode(!showTransliterationMode)}
              title="Toggle real-time transliteration"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          )}
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearInput}
              title="Clear input"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Real-time transliteration toggle */}
      {showTransliterationMode && enableRealTimeTransliteration && (
        <div className="p-3 bg-primary/10 rounded-lg text-sm">
          <div className="flex items-center justify-between">
            <span className="text-foreground">Real-time English → {sourceScript} transliteration</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowTransliterationMode(false)}
            >
              ✕
            </Button>
          </div>
          <p className="text-muted-foreground text-xs mt-1">
            Type in English and see instant {sourceScript} transliteration
          </p>
        </div>
      )}

      {/* Enhanced textarea with script-appropriate styling */}
      <Textarea
        value={value}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder={`Enter text to transliterate...${enableRealTimeTransliteration ? ' (Try typing in English!)' : ''}`}
        className={`min-h-[120px] bg-card border-border shadow-sm resize-none ${scriptClass} transition-all duration-200`}
        dir={detectedScript === 'hindi' ? 'ltr' : 'auto'}
        spellCheck={detectedScript === 'latin'}
      />

      {/* Text quality indicator */}
      {value && textStats && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-4 text-muted-foreground">
            <span>Readability: {Math.round(textStats.readabilityScore)}/100</span>
            <span>Complexity: {textStats.complexity}</span>
            {textStats.wordBreakConfidence < 0.9 && (
              <span className="text-amber-500">Word breaking uncertain</span>
            )}
          </div>
        </div>
      )}

      {/* Hidden file input for camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageCapture}
        className="hidden"
      />
    </div>
  );
}
