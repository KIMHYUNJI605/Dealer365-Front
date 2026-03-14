import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterRailProps {
  filters: FilterOption[];
  activeFilter?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function FilterRail({ filters, activeFilter, onChange, className }: FilterRailProps) {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none ${className || ''}`}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange?.(filter.value)}
          className={`
            relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors
            ${activeFilter === filter.value 
              ? 'bg-foreground text-background shadow-sm' 
              : 'bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }
          `}
        >
          {filter.label}
          {filter.count !== undefined && (
            <Badge 
              variant={activeFilter === filter.value ? 'secondary' : 'outline'} 
              className={`h-5 -my-1 rounded-sm px-1.5 text-xs font-semibold tabular-nums ${activeFilter === filter.value ? 'bg-background/20 text-background border-transparent' : 'bg-background/50 text-muted-foreground'}`}
            >
              {filter.count}
            </Badge>
          )}
        </button>
      ))}
    </div>
  );
}
