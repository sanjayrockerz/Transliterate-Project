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

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would use OCR to extract text from the image
      // For now, we'll show a placeholder message
      onChange("Image OCR coming soon! Please use text input for now.");
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
