import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, sourceScript, targetScript } = await req.json();
    console.log("Transliteration request:", { text, sourceScript, targetScript });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const scriptNames: Record<string, string> = {
      devanagari: "Devanagari (Hindi/Marathi/Sanskrit)",
      tamil: "Tamil",
      gurumukhi: "Gurumukhi (Punjabi)",
      malayalam: "Malayalam",
    };

    const systemPrompt = `You are an expert in Indian scripts and transliteration. Your task is to transliterate text from one Indian script to another.

CRITICAL INSTRUCTIONS:
- This is TRANSLITERATION, not translation
- Convert the phonetic sounds from one script to another
- Maintain the pronunciation as closely as possible
- Do NOT translate the meaning
- Return ONLY the transliterated text without any explanation

Example: If transliterating "मुंबई" (Mumbai in Devanagari) to Tamil, return "மும்பை" (the phonetic equivalent), NOT the English word "Mumbai" or a translation.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Transliterate the following text from ${scriptNames[sourceScript]} script to ${scriptNames[targetScript]} script:

"${text}"

Remember: Only provide the transliterated text, nothing else.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI service requires payment. Please contact support." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const transliteratedText = data.choices[0].message.content.trim();

    console.log("Transliteration result:", transliteratedText);

    return new Response(
      JSON.stringify({ transliteratedText }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in transliterate function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
