import { ThemeToggle } from "@/components/theme-toggle"

interface WorkspaceHeaderProps {
  title: string
  subtitle?: string
  statusInfo?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function WorkspaceHeader({
  title,
  subtitle,
  statusInfo,
  actions,
  className
}: WorkspaceHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 pt-1 border-b ${className || ''}`}>
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
            {title}
          </h1>
          {statusInfo && (
            <div className="flex shrink-0 ml-2">
              {statusInfo}
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0 self-start">
        {actions && (
          <div className="flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}
        <div className="h-6 w-px bg-border mx-1" />
        <ThemeToggle />
      </div>
    </div>
  )
}
