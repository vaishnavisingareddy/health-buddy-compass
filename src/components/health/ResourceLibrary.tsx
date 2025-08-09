import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConditionKey } from "./conditions-data";

interface ResourceLibraryProps { condition: ConditionKey | null; onEarnPoints?: (d: number) => void }

const LIB: Record<string, { title: string; type: string; href: string }[]> = {
  default: [
    { title: "Anti-inflammatory Plate (PDF)", type: "pdf", href: "#" },
    { title: "Beginner Breathwork (Video)", type: "video", href: "#" },
    { title: "Gentle Mobility Flow (Guide)", type: "guide", href: "#" },
  ],
  pregnant: [
    { title: "Pregnancy-safe Exercises", type: "guide", href: "#" },
    { title: "Trimester Nutrition Basics", type: "pdf", href: "#" },
  ],
};

export function ResourceLibrary({ condition, onEarnPoints }: ResourceLibraryProps) {
  const list = [...(LIB[condition ?? ""] ?? []), ...LIB.default];
  const share = async (title: string) => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url: location.href });
        onEarnPoints?.(1);
      }
    } catch {}
  };
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Resource library</h2>
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {list.map((r, i) => (
          <Card key={i} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-muted-foreground capitalize">{r.type}</div>
            </div>
            <div className="flex gap-2">
              <a href={r.href} download className="contents" aria-label={`Download ${r.title}`}>
                <Button variant="soft" size="sm">Download</Button>
              </a>
              <Button variant="soft" size="sm" onClick={() => share(r.title)}>Share</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
