import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineItemProps {
  id: string | number;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  date: ReactNode;
  isLatest?: boolean;
}

export interface ActivityTimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  if (!items || items.length === 0) {
    return <div className={cn("text-sm text-muted-foreground", className)}>No recent activity.</div>;
  }

  return (
    <div className={cn("relative space-y-4 pl-4", className)}>
      <div className="absolute left-4 top-2 bottom-0 w-px bg-border/60 -z-10" />
      
      {items.map((item) => (
        <div key={item.id} className="relative flex gap-4 pr-2">
          <div className="flex shrink-0 w-6 mt-0.5 justify-center z-10">
            <div className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border bg-background mt-1",
              item.isLatest ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"
            )}>
              {item.icon ? (
                <div className="[&>svg]:h-2.5 [&>svg]:w-2.5">{item.icon}</div>
              ) : (
                <div className={cn("h-1.5 w-1.5 rounded-full", item.isLatest ? "bg-primary" : "bg-muted-foreground")} />
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-1 min-w-0 pb-4">
            <div className="flex items-start justify-between gap-2">
              <span className={cn("text-sm font-semibold text-foreground", item.isLatest && "text-foreground")}>
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5 font-medium shrink-0">
                {item.date}
              </span>
            </div>
            {item.description && (
              <div className="text-sm text-muted-foreground">
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
