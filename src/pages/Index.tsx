import hero from "@/assets/health-hero.jpg";
import { useEffect, useState } from "react";
import { ConditionSelector } from "@/components/health/ConditionSelector";
import { ChatbotPanel } from "@/components/health/ChatbotPanel";
import { Tracker } from "@/components/health/Tracker";
import { ResourceLibrary } from "@/components/health/ResourceLibrary";
import { EmergencyInfo } from "@/components/health/EmergencyInfo";
import { CalmMode } from "@/components/health/CalmMode";
import { ConditionKey } from "@/components/health/conditions-data";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [condition, setCondition] = useState<ConditionKey | null>(null);
  const [points, setPoints] = useState<number>(() => {
    try { return Number(localStorage.getItem("healthFriend.points")) || 0 } catch { return 0 }
  });
  useEffect(() => { try { localStorage.setItem("healthFriend.points", String(points)); } catch {} }, [points]);

  useEffect(() => {
    const root = document.documentElement;
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100 + "%";
      const y = (e.clientY / window.innerHeight) * 100 + "%";
      root.style.setProperty("--pointer-x", x);
      root.style.setProperty("--pointer-y", y);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  const earn = (d: number) => setPoints((p) => p + d);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="container mx-auto py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={hero} alt="One-Stop Health Friend welcoming illustration" className="h-10 w-10 rounded-md object-cover" loading="lazy" />
          <div className="text-xl font-semibold">One-Stop Health Friend</div>
        </div>
        <div className="flex items-center gap-3">
          <div aria-label="Your points" className="px-3 py-1 rounded-full btn-soft text-sm">Points: {points}</div>
          <EmergencyInfo />
        </div>
      </header>

      <main className="container mx-auto pb-16">
        <ConditionSelector selected={condition} onSelect={(c) => { setCondition(c); toast({ title: "Selected", description: "Let’s explore your care together." }); }} />
        <ChatbotPanel condition={condition} onEarnPoints={earn} />

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Daily wellness tip</h2>
          <div className="btn-soft p-4 rounded-md">
            {condition ? "Tiny steps matter. Try a glass of water and 2 minutes of deep breathing now." : "Pick a topic above to get personalized tips."}
          </div>
        </section>

        <Tracker onEarnPoints={earn} />
        <CalmMode />
        <ResourceLibrary condition={condition} onEarnPoints={earn} />

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Mini communities</h2>
          <p className="text-sm text-muted-foreground mb-3">Anonymous, moderated spaces—coming soon. For now, feel free to jot supportive notes for others:</p>
          <div className="flex items-center gap-2">
            <input className="flex-1 border rounded-md px-3 py-2 bg-background" placeholder="Leave a kind note (local only)" />
            <Button variant="soft" onClick={() => toast({ title: "Thank you!", description: "Your kind note brightened someone’s day." })}>Post</Button>
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-10 text-sm text-muted-foreground">
        © {new Date().getFullYear()} One-Stop Health Friend · This is educational support, not medical advice.
      </footer>
    </div>
  );
};

export default Index;
