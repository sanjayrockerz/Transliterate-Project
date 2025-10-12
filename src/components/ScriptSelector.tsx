import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Script = "devanagari" | "tamil" | "gurumukhi" | "malayalam";

interface ScriptSelectorProps {
  value: Script;
  onChange: (value: Script) => void;
  label: string;
}

const scripts = [
  { value: "devanagari" as Script, label: "देवनागरी (Devanagari)", example: "हिन्दी, मराठी, संस्कृत" },
  { value: "tamil" as Script, label: "தமிழ் (Tamil)", example: "Tamil Nadu" },
  { value: "gurumukhi" as Script, label: "ਗੁਰਮੁਖੀ (Gurumukhi)", example: "Punjabi" },
  { value: "malayalam" as Script, label: "മലയാളം (Malayalam)", example: "Kerala" },
];

export function ScriptSelector({ value, onChange, label }: ScriptSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card border-border shadow-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {scripts.map((script) => (
            <SelectItem key={script.value} value={script.value}>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{script.label}</span>
                <span className="text-xs text-muted-foreground">{script.example}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
