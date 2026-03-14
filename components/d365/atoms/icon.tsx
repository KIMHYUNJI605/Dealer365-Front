import { LucideIcon, LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconProps extends LucideProps {
  icon: LucideIcon;
  size?: number | string;
}

/**
 * D365 Design System Icon wrapper
 * Enforces unified stroke width and consistent sizing across the application.
 */
export function Icon({ 
  icon: IconComponent, 
  size = 16, 
  strokeWidth = 2, 
  className, 
  ...props 
}: IconProps) {
  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}
