import * as React from "react"
import { Search } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface SearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ className, leftIcon, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full max-w-sm", className)}>
        <div className="absolute left-3 text-muted-foreground">
          {leftIcon || <Icon icon={Search}  />}
        </div>
        <Input
          type="search"
          className="pl-9 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm h-9"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchField.displayName = "SearchField"
