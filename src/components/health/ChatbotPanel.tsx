import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { ConditionKey } from "./conditions-data";
import { SURGERY_SUGGESTIONS } from "./conditions-data";

interface ChatbotPanelProps {
  condition: ConditionKey | null;
  onEarnPoints?: (delta: number) => void;
}

type Msg = { role: "user" | "bot"; text: string };

const QUICK_ASK: string[] = [
  "Give me a diet plan for my condition",
  "What sports or exercises are safe for me?",
  "Daily routine suggestions",
  "Foods to avoid",
  "Tips to reduce symptoms",
  "What should I ask my doctor?",
  "Safe home remedies",
];

function getWarmIntro(condition: ConditionKey): string {
  const map: Partial<Record<ConditionKey, string>> = {
    pregnant: "I'm so glad you're here. Let's make this journey comfortable and safe.",
    recent_surgery: "Welcome back. Gentle recovery steps can help you heal smoothly.",
    mental_health: "You're not alone. Let's take this one gentle step at a time.",
  };
  return map[condition] ?? "I'm here for you. Let's explore supportive, practical steps together.";
}

function makeResponse(condition: ConditionKey, input: string, surgeryKind?: string): string {
  const lc = input.toLowerCase();
  const conditionName = condition.replace(/_/g, " ");

  if (condition === "recent_surgery" && surgeryKind) {
    if (lc.includes("diet") || lc.includes("food")) {
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
    return `Common triggers to minimize:
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

export function ChatbotPanel({ condition, onEarnPoints }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [speechOn, setSpeechOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [surgeryKind, setSurgeryKind] = useState<string>(SURGERY_SUGGESTIONS[0]);
  const recRef = useRef<any>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!condition) return;
    setMessages([{ role: "bot", text: getWarmIntro(condition) }]);
  }, [condition]);

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
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1;
      u.pitch = 1;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch {}
  };

  const ask = (q: string) => {
    if (!condition) return;
    const userMsg: Msg = { role: "user", text: q };
    const botText = makeResponse(condition, q, surgeryKind);
    const botMsg: Msg = { role: "bot", text: botText };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
    onEarnPoints?.(5);
    speak(botText);
  };

  if (!condition) return null;

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

        {condition === "recent_surgery" && (
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
                <div className={m.role === "user" ? "inline-block px-3 py-2 rounded-lg bg-primary text-primary-foreground" : "inline-block px-3 py-2 rounded-lg btn-soft"}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form
          className="mt-4 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return toast({ title: "Say something", description: "Type or use the mic to ask a question." });
            ask(input.trim());
          }}
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." aria-label="Ask anything" />
          <Button type="submit" variant="hero">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </section>
  );
}
