import { Textarea } from "@/components/ui/textarea";
import { Camera, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  const [inputMode, setInputMode] = useState<"text" | "camera">("text");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Convert image to base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          
          // Call OCR function
          const { supabase } = await import("@/integrations/supabase/client");
          onChange("Processing image...");
          
          const { data, error } = await supabase.functions.invoke("ocr", {
            body: { imageBase64: base64Image },
          });

          if (error) throw error;

          if (data?.extractedText && data.extractedText !== "NO_TEXT_FOUND") {
            onChange(data.extractedText);
          } else {
            onChange("No text found in image. Please try another image.");
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("OCR error:", error);
        onChange("Failed to process image. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Input Text</label>
        <div className="flex gap-2">
          <Button
            variant={inputMode === "text" ? "default" : "ghost"}
            size="sm"
            onClick={() => setInputMode("text")}
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
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text to transliterate..."
        className="min-h-[120px] bg-card border-border shadow-sm resize-none"
      />

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
