import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Mic, MicOff, Send, Volume2, VolumeX, Loader2, Upload, X } from "lucide-react";
import { ConditionKey } from "./conditions-data";
import { SURGERY_SUGGESTIONS } from "./conditions-data";
import { getGeminiService, initializeGeminiService, ChatContext } from "@/services/geminiService";

interface ChatbotPanelProps {
  conditions: ConditionKey[];
  onEarnPoints?: (delta: number) => void;
}

type Msg = { role: "user" | "bot"; text: string; attachments?: { name: string; type: string; content: string }[] };

const QUICK_ASK: string[] = [
  "Give me a diet plan for my condition",
  "What sports or exercises are safe for me?",
  "Daily routine suggestions",
  "Foods to avoid",
  "Tips to reduce symptoms",
  "What should I ask my doctor?",
  "Safe home remedies",
];

// Initialize Gemini service
const initGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log('Initializing Gemini with API key:', apiKey ? 'API key found' : 'No API key');
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    const service = initializeGeminiService(apiKey);
    console.log('Gemini service initialized:', service ? 'Success' : 'Failed');
    return service;
  }
  console.log('Gemini service not initialized: No valid API key');
  return null;
};

function getWarmIntro(conditions: ConditionKey[]): string {
  // Fallback intros in case Gemini service is not available
  const primaryCondition = conditions[0];
  const map: Partial<Record<ConditionKey, string>> = {
    pregnant: "I'm so glad you're here. Let's make this journey comfortable and safe.",
    recent_surgery: "Welcome back. Gentle recovery steps can help you heal smoothly.",
    mental_health: "You're not alone. Let's take this one gentle step at a time.",
    skin: "I understand skin concerns can be frustrating. Let's find gentle, effective solutions together.",
    diabetes: "Managing diabetes can feel overwhelming, but small steps make a big difference. I'm here to help.",
    pcos: "PCOS affects everyone differently. Let's find approaches that work specifically for you."
  };
  
  if (conditions.length > 1) {
    const conditionNames = conditions.map(c => c.replace(/_/g, " ")).join(", ");
    return `I'm here to support you with your ${conditionNames} journey. Let's explore gentle, practical steps together.`;
  }
  
  return map[primaryCondition] ?? "I'm here for you. Let's explore supportive, practical steps together.";
}

async function makeGeminiResponse(
  conditions: ConditionKey[], 
  input: string, 
  surgeryKind?: string,
  previousQuestions: string[] = [],
  attachments?: { name: string; type: string; content: string }[]
): Promise<string> {
  console.log('makeGeminiResponse called with:', { conditions, input, surgeryKind });
  const geminiService = getGeminiService();
  
  console.log('Gemini service available:', geminiService ? 'Yes' : 'No');
  
  if (!geminiService) {
    console.log('Using fallback response - no Gemini service');
    // Fallback to hardcoded responses if Gemini is not available
    return makeResponse(conditions[0], input, surgeryKind);
  }

  try {
    const context: ChatContext = {
      conditions,
      surgeryType: surgeryKind,
      previousQuestions,
      currentQuestion: input,
      attachments
    };

    console.log('Calling Gemini with context:', context);
    const response = await geminiService.generateResponse(context);
    console.log('Gemini response received:', response);
    return response;
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    // Fallback to hardcoded response
    return makeResponse(conditions[0], input, surgeryKind);
  }
}

function makeResponse(condition: ConditionKey, input: string, surgeryKind?: string): string {
  const lc = input.toLowerCase();
  const conditionName = condition.replace(/_/g, " ");

  if (condition === "recent_surgery" && surgeryKind && surgeryKind.trim() !== "") {
    if (lc.includes("diet") || lc.includes("food") || lc.includes("avoid")) {
      return `After ${surgeryKind}, choose small, frequent meals. Focus on protein (dal, eggs, yogurt), soft veggies, and hydration. Avoid very spicy or oily foods initially. Sip water often. If nausea appears, try ginger tea. Reach out to your doctor if vomiting or severe pain occurs.`;
    }
  }

  if (lc.includes("diet") || lc.includes("foods") || lc.includes("meal")) {
    return `A gentle, balanced plate helps with ${conditionName}. Prioritize:
- Half plate veggies (cooked or raw as tolerated)
- Lean protein (dal, legumes, fish, eggs)
- Whole grains (oats, brown rice)
- Healthy fats (nuts, seeds, olive oil)
Hydrate well. Avoid ultra-processed snacks and too much sugar.`;
  }
  if (lc.includes("exercise") || lc.includes("sport") || lc.includes("workout")) {
    return `Safe movement for ${conditionName}:
- Start with 15–20 mins of light activity (walk, gentle yoga)
- Add mobility drills and breathing
- Progress slowly; stop with sharp pain or dizziness
Consult a clinician before new routines, especially if symptoms flare.`;
  }
  if (lc.includes("routine") || lc.includes("daily")) {
    return `A calming daily rhythm:
- Morning: Hydrate, 5 mins of calm breathing, light stretch
- Midday: Balanced meal, short walk
- Evening: Device wind-down, gratitude note, aim for consistent sleep \nConsistency > intensity.`;
  }
  if (lc.includes("avoid") || lc.includes("trigger")) {
    return `Common triggers to minimize for ${conditionName}:
- Ultra-processed foods, heavy late-night meals
- Irregular sleep and dehydration
- Skipping meds or check-ups\nTrack patterns in a simple diary—awareness leads to kinder choices.`;
  }
  if (lc.includes("doctor") || lc.includes("ask")) {
    return `Helpful questions for your doctor:\n- What signs mean I should seek urgent care?\n- Which medicines/supplements should I continue or pause?\n- When can I resume exercise/sex/travel?\n- Any red flags specific to my history?`;
  }
  if (lc.includes("remed") || lc.includes("home")) {
    return `Gentle home supports (not replacing medical advice):\n- Warm compresses, herbal teas (ginger, chamomile) as tolerated\n- Mindful breathing: in 4s, out 6–8s\n- Light movement and sunshine if possible`;
  }

  return `I hear you. Can you share a bit more about what you need today—diet, exercise, routines, or symptoms? I’ll suggest simple, caring steps.`;
}

export function ChatbotPanel({ conditions, onEarnPoints }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [speechOn, setSpeechOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [surgeryKind, setSurgeryKind] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [geminiService, setGeminiService] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; content: string }[]>([]);
  const recRef = useRef<any>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize surgery kind when recent_surgery is selected
  useEffect(() => {
    if (conditions.includes("recent_surgery") && !surgeryKind) {
      setSurgeryKind(SURGERY_SUGGESTIONS[0]);
    } else if (!conditions.includes("recent_surgery")) {
      setSurgeryKind("");
    }
  }, [conditions, surgeryKind]);

  // Initialize Gemini service
  useEffect(() => {
    const service = initGemini();
    setGeminiService(service);
  }, []);

  const reinitializeGemini = () => {
    const service = initGemini();
    setGeminiService(service);
  };

  useEffect(() => {
    if (!conditions || conditions.length === 0) return;
    
    const loadIntro = async () => {
      if (geminiService) {
        try {
          const intro = await geminiService.generateWarmIntro(conditions);
          setMessages([{ role: "bot", text: intro }]);
        } catch (error) {
          console.error('Error generating intro:', error);
          setMessages([{ role: "bot", text: getWarmIntro(conditions) }]);
        }
      } else {
        setMessages([{ role: "bot", text: getWarmIntro(conditions) }]);
      }
    };

    loadIntro();
  }, [conditions, geminiService]);

  useEffect(() => {
    if (!areaRef.current) return;
    areaRef.current.scrollTop = areaRef.current.scrollHeight;
  }, [messages]);

  const canRecord = typeof window !== "undefined" && ("webkitSpeechRecognition" in window || (window as any).SpeechRecognition);

  const startRec = () => {
    if (!canRecord) return;
    // @ts-ignore
    const SR = (window.SpeechRecognition || (window as any).webkitSpeechRecognition);
    const rec = new SR();
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setRecording(false);
    };
    rec.onend = () => setRecording(false);
    rec.start();
    recRef.current = rec;
    setRecording(true);
  };
  const stopRec = () => {
    try { recRef.current?.stop(); } catch {}
    setRecording(false);
  };

  const speak = (text: string) => {
    if (!speechOn) return;
    try {
      // Remove markdown formatting for speech
      const cleanText = text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
      const u = new SpeechSynthesisUtterance(cleanText);
      u.rate = 1;
      u.pitch = 1;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {}
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ 
          title: "File too large", 
          description: "Please upload files smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      if (!file.type.includes('text') && !file.type.includes('pdf') && !file.type.includes('image')) {
        toast({ 
          title: "Unsupported file type", 
          description: "Please upload text files, PDFs, or images.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newFile = {
          name: file.name,
          type: file.type,
          content: content
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        toast({ 
          title: "File uploaded", 
          description: `${file.name} has been added to your consultation.`
        });
      };

      if (file.type.includes('text')) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast({ 
      title: "File removed", 
      description: "The file has been removed from your consultation."
    });
  };

  const formatBotResponse = (text: string): string => {
    // Convert markdown-style formatting to proper display
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br/>'); // Line breaks
  };

  const ask = async (q: string) => {
    if (!conditions || conditions.length === 0) return;
    
    setIsLoading(true);
    const userMsg: Msg = { 
      role: "user", 
      text: q,
      attachments: uploadedFiles.length > 0 ? uploadedFiles : undefined
    };
    setMessages((m) => [...m, userMsg]);
    
    try {
      // Only pass surgeryKind if recent_surgery is in conditions
      const relevantSurgeryKind = conditions.includes("recent_surgery") ? surgeryKind : undefined;
      const botText = await makeGeminiResponse(
        conditions, 
        q, 
        relevantSurgeryKind, 
        previousQuestions,
        uploadedFiles.length > 0 ? uploadedFiles : undefined
      );
      const botMsg: Msg = { role: "bot", text: botText };
      setMessages((m) => [...m, botMsg]);
      setPreviousQuestions(prev => [...prev, q].slice(-10)); // Keep last 10 questions for context
      onEarnPoints?.(5);
      speak(botText);
    } catch (error) {
      console.error('Error generating response:', error);
      const fallbackText = "I'm sorry, I'm having trouble responding right now. Please try again or consult your healthcare provider.";
      const botMsg: Msg = { role: "bot", text: fallbackText };
      setMessages((m) => [...m, botMsg]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  if (!conditions || conditions.length === 0) return null;

  const hasRecentSurgery = conditions.includes("recent_surgery");

  return (
    <section className="mt-10">
      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
          <h2 className="text-xl font-semibold">Your friendly health chat</h2>
          <div className="flex items-center gap-2">
            <Button variant="soft" size="sm" onClick={() => setSpeechOn((v) => !v)} aria-pressed={speechOn}>
              {speechOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />} {speechOn ? "Voice on" : "Voice off"}
            </Button>
            {canRecord && (
              <Button variant="soft" size="sm" onClick={() => (recording ? stopRec() : startRec())} aria-pressed={recording}>
                {recording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />} {recording ? "Stop" : "Speak"}
              </Button>
            )}
          </div>
        </div>

        {hasRecentSurgery && (
          <div className="mb-4">
            <label className="text-sm mb-2 block">What kind of operation did you have recently?</label>
            <Select value={surgeryKind} onValueChange={(v) => setSurgeryKind(v)}>
              <SelectTrigger className="w-full md:w-[320px]">
                <SelectValue placeholder="Select surgery" />
              </SelectTrigger>
              <SelectContent>
                {SURGERY_SUGGESTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-2 flex-wrap mb-4">
          {QUICK_ASK.map((q) => (
            <Button key={q} variant="chip" size="chip" onClick={() => ask(q)}>
              {q}
            </Button>
          ))}
        </div>

        <ScrollArea className="h-[280px] md:h-[360px] border rounded-md p-3" ref={areaRef as any}>
          <div className="space-y-3 pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={m.role === "user" ? "inline-block px-3 py-2 rounded-lg bg-primary text-primary-foreground max-w-[80%]" : "inline-block px-3 py-2 rounded-lg btn-soft max-w-[80%]"}>
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: m.role === "bot" ? formatBotResponse(m.text) : m.text 
                    }} 
                  />
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {m.attachments.map((file, fileIdx) => (
                        <div key={fileIdx} className="text-xs opacity-75 flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-lg btn-soft">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing your documents and thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* File Upload Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Upload Medical Reports (Optional)
            </label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Add Files
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />

          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                  <Upload className="h-3 w-3" />
                  <span className="max-w-[100px] truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-xs text-gray-500 mb-3">
            Upload previous prescriptions, lab reports, or consultation notes for more personalized advice. Max 5MB per file.
          </p>
        </div>

        <form
          className="mt-4 flex items-center gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return toast({ title: "Say something", description: "Type or use the mic to ask a question." });
            await ask(input.trim());
          }}
        >
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask anything..." 
            aria-label="Ask anything"
            disabled={isLoading}
          />
          <Button type="submit" variant="hero" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </Card>
    </section>
  );
}
