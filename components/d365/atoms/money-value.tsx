import { cn } from "@/lib/utils"

interface MoneyValueProps {
  amount: number
  currency?: string
  negativeStyle?: "minus" | "parentheses" | "red"
  emphasis?: boolean
  className?: string
}

export function MoneyValue({
  amount,
  currency = "$",
  negativeStyle = "minus",
  emphasis = false,
  className,
}: MoneyValueProps) {
  const isNegative = amount < 0
  const absAmount = Math.abs(amount)
  
  const formattedAmount = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const renderNegative = () => {
    switch (negativeStyle) {
      case "parentheses":
        return `(${currency}${formattedAmount})`
      case "red":
        return `-${currency}${formattedAmount}`
      default:
        return `-${currency}${formattedAmount}`
    }
  }

  const displayString = isNegative ? renderNegative() : `${currency}${formattedAmount}`

  return (
    <span
      className={cn(
        "font-mono font-medium tracking-tight",
        emphasis && "font-bold text-emerald-600 dark:text-emerald-500",
        isNegative && negativeStyle === "red" && "text-destructive font-bold",
        isNegative && negativeStyle === "parentheses" && "text-muted-foreground",
        className
      )}
    >
      {displayString}
    </span>
  )
}
