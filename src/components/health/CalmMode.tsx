import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function CalmMode() {
  const [running, setRunning] = useState(false);
  const [cue, setCue] = useState("Tap start for a gentle 4–8 breath");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    let phase: "in" | "out" = "in";
    setCue("Inhale… 4s");
    const loop = () => {
      setCue(phase === "in" ? "Exhale… 8s" : "Inhale… 4s");
      phase = phase === "in" ? "out" : "in";
      timer.current = window.setTimeout(loop, phase === "in" ? 4000 : 8000) as any;
    };
    timer.current = window.setTimeout(loop, 4000) as any;
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [running]);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Calm mode</h2>
      <Card className="p-6 flex items-center gap-6">
        <div className="h-28 w-28 md:h-36 md:w-36 breathing-circle" aria-hidden />
        <div>
          <div className="text-sm text-muted-foreground mb-2">Guided breathing</div>
          <div className="text-lg font-medium mb-3">{cue}</div>
          <Button variant="hero" onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Start"}</Button>
        </div>
      </Card>
    </section>
  );
}
