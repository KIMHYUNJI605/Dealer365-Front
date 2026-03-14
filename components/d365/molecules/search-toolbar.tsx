import { SearchField } from "@/components/d365/atoms/search-field"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"

interface SearchToolbarProps {
  placeholder?: string
  onSearch?: (value: string) => void
  onFilterClick?: () => void
  onViewToggle?: () => void
  extraActions?: React.ReactNode
}

export function SearchToolbar({
  placeholder = "Search...",
  onSearch,
  onFilterClick,
  onViewToggle,
  extraActions
}: SearchToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 pb-4">
      <div className="flex items-center gap-3 flex-1">
        <SearchField 
          placeholder={placeholder} 
          className="max-w-[320px]" 
          onChange={(e) => onSearch?.(e.target.value)}
        />
        {onFilterClick && (
          <Button variant="outline" size="sm" className="h-9 px-3 text-muted-foreground" onClick={onFilterClick}>
            <Icon icon={Filter} className="mr-2" />
            Filters
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {extraActions}
        {onViewToggle && (
          <Button variant="outline" size="sm" className="h-9 w-9 p-0" onClick={onViewToggle}>
            <Icon icon={SlidersHorizontal}  />
          </Button>
        )}
      </div>
    </div>
  )
}
