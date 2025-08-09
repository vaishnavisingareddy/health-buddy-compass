import { CONDITIONS, ConditionKey } from "./conditions-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ConditionSelectorProps {
  selected?: ConditionKey | null;
  onSelect: (key: ConditionKey) => void;
}

export function ConditionSelector({ selected, onSelect }: ConditionSelectorProps) {
  return (
    <section aria-labelledby="condition-heading" className="container mx-auto">
      <h1 id="condition-heading" className="text-3xl md:text-4xl font-semibold mb-6">
        Hi friend, what brings you here today?
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
        {CONDITIONS.map((c) => {
          const Icon = c.icon as any;
          const isActive = selected === c.key;
          return (
            <Card
              key={c.key}
              className={cn(
                "p-4 md:p-5 cursor-pointer transition-all hover:shadow-lg hover-scale",
                isActive ? "ring-2 ring-sidebar-ring" : ""
              )}
              onClick={() => onSelect(c.key)}
              role="button"
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center btn-soft">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm md:text-base font-medium">{c.title}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
