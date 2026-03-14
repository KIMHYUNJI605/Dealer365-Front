import { Clock, Calendar } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { cn } from "@/lib/utils"

interface TimeValueProps {
  datetime?: string
  mode?: "time" | "datetime" | "relative" | "duration"
  minutes?: number
  showIcon?: boolean
  className?: string
}

export function TimeValue({
  datetime,
  mode = "time",
  minutes,
  showIcon = true,
  className
}: TimeValueProps) {
  
  if (mode === "duration" && minutes !== undefined) {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return (
      <span className={cn("inline-flex items-center gap-1 font-mono text-xs font-semibold tracking-tight", className)}>
        {showIcon && <Icon icon={Clock} className="text-muted-foreground" />}
        {hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`}
      </span>
    )
  }

  if (!datetime) return <span className="text-muted-foreground">-</span>

  const dateObj = new Date(datetime)
  
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-sans text-xs font-semibold", className)}>
      {showIcon && mode === "time" && <Icon icon={Clock} className="text-muted-foreground/70" />}
      {showIcon && mode === "datetime" && <Icon icon={Calendar} className="text-muted-foreground/70" />}
      
      {mode === "time" && <span className="tracking-tight">{formattedTime}</span>}
      {mode === "datetime" && <span className="tracking-tight">{formattedDate} • {formattedTime}</span>}
    </span>
  )
}
