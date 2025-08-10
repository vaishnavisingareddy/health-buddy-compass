import { CONDITIONS, ConditionKey } from "./conditions-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ConditionSelectorProps {
  selected: ConditionKey[];
  onSelect: (keys: ConditionKey[]) => void;
  onContinue?: () => void;
}

export function ConditionSelector({ selected, onSelect, onContinue }: ConditionSelectorProps) {
  const handleToggle = (key: ConditionKey) => {
    if (selected.includes(key)) {
      onSelect(selected.filter(k => k !== key));
    } else {
      onSelect([...selected, key]);
    }
  };

  return (
    <section aria-labelledby="condition-heading" className="container mx-auto">
      <h1 id="condition-heading" className="text-3xl md:text-4xl font-semibold mb-6">
        Hi friend, what brings you here today?
      </h1>
      <p className="text-gray-600 mb-6">Select all that apply to you:</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in">
        {CONDITIONS.map((c) => {
          const Icon = c.icon as any;
          const isActive = selected.includes(c.key);
          return (
            <Card
              key={c.key}
              className={cn(
                "p-4 md:p-5 cursor-pointer transition-all hover:shadow-lg hover-scale relative",
                isActive ? "ring-2 ring-primary bg-primary/5" : ""
              )}
              onClick={() => handleToggle(c.key)}
              role="button"
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "btn-soft"
                )}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-sm md:text-base font-medium flex-1">{c.title}</div>
                {isActive && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Selected {selected.length} condition{selected.length > 1 ? 's' : ''}
          </p>
          {onContinue && (
            <Button onClick={onContinue} size="lg" className="px-8 bg-green-600 hover:bg-green-700 text-white">
              Continue with Selected Conditions
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
