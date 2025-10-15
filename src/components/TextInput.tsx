import { Textarea } from "@/components/ui/textarea";
import { Camera, Type, Mic, Keyboard, RotateCcw, Upload, Volume2, MicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import AdvancedTransliterationEngine from "@/utils/transliterationEngine";
import AdvancedTextProcessor from "@/utils/textProcessor";
import { toast } from "sonner";
import "../types/speech";

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
  const [inputMode, setInputMode] = useState<"text" | "camera" | "voice" | "upload">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [showTransliterationMode, setShowTransliterationMode] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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

  // Enhanced Voice input with Web Speech API
  const handleVoiceInput = useCallback(async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = sourceScript === 'hindi' ? 'hi-IN' : 
                       sourceScript === 'tamil' ? 'ta-IN' : 
                       sourceScript === 'malayalam' ? 'ml-IN' : 
                       sourceScript === 'gurumukhi' ? 'pa-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setIsRecording(true);
        toast.success("🎤 Listening... Speak now!");
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        
        if (transcript.trim()) {
          onChange(value + ' ' + transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error(`Voice recognition error: ${event.error}`);
        setIsListening(false);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsRecording(false);
        toast.info("🎤 Voice input stopped");
      };

      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (error) {
      console.error('Voice input error:', error);
      toast.error("Failed to start voice input");
    }
  }, [isListening, onChange, sourceScript, value]);

  // Drag and drop functionality
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (!file) {
      toast.error("No file dropped");
      return;
    }

    // Handle image files
    if (file.type.startsWith('image/')) {
      handleImageFile(file);
    } 
    // Handle text files
    else if (file.type.startsWith('text/')) {
      handleTextFile(file);
    } 
    // Handle audio files
    else if (file.type.startsWith('audio/')) {
      toast.info("🎵 Audio transcription coming soon!");
    } 
    else {
      toast.error("Unsupported file type. Please drop an image or text file.");
    }
  }, []);

  // Handle dropped image files
  const handleImageFile = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        
        onChange("🔍 Processing dropped image...");
        
        const { supabase } = await import("@/integrations/supabase/client");
        const { data, error } = await supabase.functions.invoke("ocr", {
          body: { imageBase64: base64Image },
        });

        if (error) throw error;

        if (data?.extractedText && data.extractedText !== "NO_TEXT_FOUND") {
          const extractedText = data.extractedText;
          const processed = AdvancedTextProcessor.formatIndianText(extractedText, sourceScript);
          onChange(processed);
          toast.success("📄 Text extracted from image!");
        } else {
          onChange("❌ No text found in dropped image. Please try another image.");
          toast.error("No text detected in the image");
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Image processing error:", error);
      onChange("❌ Failed to process dropped image. Please try again.");
      toast.error("Failed to process image");
    }
  };

  // Handle dropped text files
  const handleTextFile = async (file: File) => {
    try {
      const text = await file.text();
      onChange(text);
      toast.success("📄 Text file loaded successfully!");
    } catch (error) {
      console.error("Text file error:", error);
      toast.error("Failed to read text file");
    }
  };

  // Clear input
  const clearInput = () => {
    onChange("");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsRecording(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Enhanced Header with immersive input mode controls */}
      <div className="relative overflow-hidden">
        {/* Dynamic background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl animate-shimmer"></div>
        
        <div className="relative flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-blue-200 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-sm">✏️</span>
              </div>
              <label className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                💭 Enter Your Text
              </label>
            </div>
            {textStats && (
              <div className="flex flex-wrap gap-4 text-sm bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-2xl border border-green-200">
                <div className="flex items-center gap-1">
                  <span className="text-blue-600">📝</span>
                  <span className="font-medium text-blue-700">{textStats.wordCount} words</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600">🔤</span>
                  <span className="font-medium text-green-700">{textStats.characterCount} chars</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-purple-600">📜</span>
                  <span className="font-medium text-purple-700 capitalize">{textStats.script}</span>
                </div>
                {textStats.confidence < 0.8 && (
                  <div className="flex items-center gap-1">
                    <span className="text-amber-600">⚠️</span>
                    <span className="font-medium text-amber-700">Mixed scripts</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={inputMode === "text" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInputMode("text")}
              title="Type text"
              className={`transition-all duration-300 hover:scale-105 ${
                inputMode === "text" 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg animate-glow" 
                  : "hover:bg-blue-100"
              }`}
            >
              <Type className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Text</span>
            </Button>
            <Button
              variant={inputMode === "camera" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setInputMode("camera");
                fileInputRef.current?.click();
              }}
              title="Capture from camera/image"
              className={`transition-all duration-300 hover:scale-105 ${
                inputMode === "camera" 
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg animate-glow" 
                  : "hover:bg-green-100"
              }`}
            >
              <Camera className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Photo</span>
            </Button>
            <Button
              variant={inputMode === "voice" || isListening ? "default" : "ghost"}
              size="sm"
              onClick={handleVoiceInput}
              title={isListening ? "Stop voice input" : "Start voice input"}
              className={`transition-all duration-300 hover:scale-105 ${
                isListening 
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse" 
                  : "hover:bg-red-100"
              }`}
            >
              {isListening ? (
                <Volume2 className="w-4 h-4 mr-1 animate-bounce" />
              ) : (
                <MicIcon className="w-4 h-4 mr-1" />
              )}
              <span className="hidden sm:inline">{isListening ? "Stop" : "Voice"}</span>
            </Button>
            <Button
              variant={inputMode === "upload" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInputMode("upload")}
              title="Upload or drag & drop files"
              className="transition-all duration-300 hover:scale-105 hover:bg-yellow-100"
            >
              <Upload className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            {enableRealTimeTransliteration && (
              <Button
                variant={showTransliterationMode ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowTransliterationMode(!showTransliterationMode)}
                title="Toggle real-time transliteration"
                className={`transition-all duration-300 hover:scale-105 ${
                  showTransliterationMode 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-glow" 
                    : "hover:bg-orange-100"
                }`}
              >
                <Keyboard className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Auto</span>
              </Button>
            )}
            {value && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInput}
                title="Clear input"
                className="transition-all duration-300 hover:scale-105 hover:bg-red-100 text-red-600"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Real-time transliteration toggle */}
      {showTransliterationMode && enableRealTimeTransliteration && (
        <div className="relative animate-slideUp">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-red-100/50 rounded-2xl blur-sm"></div>
          <div className="relative p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="animate-pulse">🔄</span>
                <span className="font-semibold text-orange-700">
                  Real-time English → {sourceScript} transliteration
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTransliterationMode(false)}
                className="hover:bg-red-100 transition-all duration-300 hover:scale-105"
              >
                ❌
              </Button>
            </div>
            <p className="text-orange-600 text-sm mt-2 flex items-center gap-1">
              <span>⚡</span>
              Type in English and see instant {sourceScript} transliteration magic!
            </p>
          </div>
        </div>
      )}

      {/* Enhanced drag & drop textarea with immersive styling */}
      <div 
        className={`relative transition-all duration-300 ${isDragOver ? 'scale-105' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Animated border glow */}
        <div className={`absolute inset-0 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 rounded-2xl blur-md opacity-70 animate-pulse ${isDragOver ? 'opacity-100 scale-110' : ''} transition-all duration-300`}></div>
        
        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl border-4 border-dashed border-purple-400 flex items-center justify-center z-10">
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto text-purple-600 animate-bounce mb-2" />
              <p className="text-lg font-bold text-purple-600">Drop your file here!</p>
              <p className="text-sm text-purple-500">Images, text files supported</p>
            </div>
          </div>
        )}
        
        <Textarea
          value={value}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={`🕉️ Enter text, drag & drop files, or use voice input...${enableRealTimeTransliteration ? ' 🎯 Try typing in English!' : ''}`}
          className={`relative min-h-[120px] max-h-[300px] bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl rounded-2xl text-sm p-4 ${scriptClass} transition-all duration-300 focus:border-purple-400 focus:shadow-2xl hover:shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100`}
          dir={detectedScript === 'hindi' ? 'ltr' : 'auto'}
          spellCheck={detectedScript === 'latin'}
          style={{ 
            resize: 'vertical',
            fontFamily: detectedScript === 'hindi' ? '"Noto Sans Devanagari", serif' : 'inherit',
            lineHeight: '1.6'
          }}
        />
      </div>

      {/* Enhanced Text quality indicator */}
      {value && textStats && (
        <div className="relative animate-fadeIn">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-blue-100/50 rounded-2xl blur-sm"></div>
          <div className="relative p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-2 bg-blue-50 rounded-xl">
                <div className="font-bold text-blue-600">{Math.round(textStats.readabilityScore)}/100</div>
                <div className="text-xs text-blue-500">📊 Readability</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded-xl">
                <div className="font-bold text-purple-600 capitalize">{textStats.complexity}</div>
                <div className="text-xs text-purple-500">🧠 Complexity</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-xl">
                <div className="font-bold text-green-600">{detectedScript}</div>
                <div className="text-xs text-green-500">🌍 Script</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded-xl">
                <div className="font-bold text-orange-600">{textStats.wordCount}</div>
                <div className="text-xs text-orange-500">📝 Words</div>
              </div>
            </div>
            
            {textStats.wordBreakConfidence < 0.9 && (
              <div className="mt-3 p-2 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2">
                <span className="text-amber-500">⚠️</span>
                <span className="text-amber-600 text-sm font-medium">Word breaking uncertain - check for proper spacing</span>
              </div>
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
