import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StickySummaryBarProps {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function StickySummaryBar({ children, actions, className }: StickySummaryBarProps) {
  return (
    <div className={cn(
      "sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background/95 px-6 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="flex flex-1 items-center overflow-x-auto scrollbar-none gap-6 text-sm font-medium">
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export function SummaryItem({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-0.5 min-w-max", className)}>
      <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
