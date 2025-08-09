import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface TrackerProps { onEarnPoints?: (delta: number) => void }

type TrackState = {
  water: number;
  sleep: number;
  steps: number;
  mood: string;
};

const KEY = "healthFriend.trackers";

export function Tracker({ onEarnPoints }: TrackerProps) {
  const [state, setState] = useState<TrackState>({ water: 0, sleep: 0, steps: 0, mood: "" });

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setState(JSON.parse(raw)); } catch {}
  }, []);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }, [state]);

  const addWater = () => setState((s) => ({ ...s, water: Math.min(8, s.water + 1) }));
  const removeWater = () => setState((s) => ({ ...s, water: Math.max(0, s.water - 1) }));

  const saveMood = () => { toast({ title: "Saved", description: "Mood & symptom note saved." }); onEarnPoints?.(3); };

  return (
    <section aria-labelledby="tracker-heading" className="mt-10">
      <h2 id="tracker-heading" className="text-2xl font-semibold mb-4">Lifestyle tracker</h2>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Water intake</div>
            <div className="text-sm text-muted-foreground">{state.water}/8 glasses</div>
          </div>
          <Progress value={(state.water / 8) * 100} className="mb-3" />
          <div className="flex gap-2">
            <Button variant="soft" onClick={removeWater}>-1</Button>
            <Button variant="hero" onClick={() => { addWater(); onEarnPoints?.(1); }}>+1</Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Sleep hours</div>
            <div className="text-sm text-muted-foreground">{state.sleep}h</div>
          </div>
          <div className="flex items-center gap-3">
            <Input type="number" min={0} max={24} value={state.sleep}
              onChange={(e) => setState((s) => ({ ...s, sleep: Number(e.target.value) }))}
              className="w-24"/>
            <Button variant="soft" onClick={() => { toast({ title: "Nice!", description: "Consistent sleep is healing." }); onEarnPoints?.(2); }}>Save</Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Steps / exercise</div>
            <div className="text-sm text-muted-foreground">{state.steps} steps</div>
          </div>
          <Slider value={[state.steps]} max={15000} step={500} onValueChange={([v]) => setState((s) => ({ ...s, steps: v }))} className="mb-3" />
          <Button variant="soft" onClick={() => { toast({ title: "Great job!", description: "Every step counts. 🎉" }); onEarnPoints?.(2); }}>Save</Button>
        </Card>

        <Card className="p-4">
          <div className="font-medium mb-2">Mood & symptom diary</div>
          <Input placeholder="How are you feeling today? Any symptoms?" value={state.mood}
            onChange={(e) => setState((s) => ({ ...s, mood: e.target.value }))} />
          <div className="mt-3">
            <Button variant="soft" onClick={saveMood}>Save note</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
