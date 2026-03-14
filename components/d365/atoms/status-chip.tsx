import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusVariant = 
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "waiting"

interface StatusChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatusVariant
  label: string
}

export function StatusChip({ variant = "neutral", label, className, ...props }: StatusChipProps) {
  const variantStyles: Record<StatusVariant, string> = {
    success: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
    warning: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    error: "bg-red-100 text-red-800 hover:bg-red-100",
    info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    neutral: "bg-slate-100 text-slate-800 hover:bg-slate-100",
    waiting: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100 ring-1 ring-indigo-200"
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium px-2.5 py-0.5 border-transparent", variantStyles[variant], className)}
      {...props}
    >
      {label}
    </Badge>
  )
}
