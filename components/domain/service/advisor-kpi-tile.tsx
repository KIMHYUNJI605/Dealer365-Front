import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AdvisorKPITileProps {
  label: string;
  value: string | number;
  delta?: number;
  statusColor?: "blue" | "emerald" | "amber" | "destructive" | "neutral";
  onClick?: () => void;
  className?: string;
}

export function AdvisorKPITile({
  label,
  value,
  delta,
  statusColor = "neutral",
  onClick,
  className
}: AdvisorKPITileProps) {
  const colorStyles = {
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    destructive: "text-destructive",
    neutral: "text-foreground"
  };

  return (
    <Card 
      className={cn(
        "transition-colors shadow-sm",
        onClick && "cursor-pointer hover:border-primary/50 hover:bg-muted/10",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="px-3 py-2 flex flex-col gap-0.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-xl font-bold tracking-tight", colorStyles[statusColor])}>
            {value}
          </span>
          {delta !== undefined && (
            <span className={cn(
              "text-[10px] font-bold", 
              delta > 0 ? "text-emerald-600" : delta < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
