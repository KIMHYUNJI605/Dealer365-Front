"use client"

import * as React from "react"
import { Search, Mic, Image as ImageIcon, Sparkles, Command } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Icon } from "@/components/d365/atoms/icon"

export function GlobalSearch() {
  return (
    <div className="relative group w-full max-w-md xl:max-w-lg">
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center pointer-events-none">
          <Icon icon={Search} size={16} className="text-muted-foreground transition-colors group-focus-within:text-primary" />
        </div>
        <Input
          type="search"
          placeholder="Search items, VINs, ROs or ask AI..."
          className="w-full pl-10 pr-24 h-10 bg-muted/30 border-input focus:bg-background transition-all rounded-md text-sm"
        />
        <div className="absolute right-1.5 flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-muted">
                <Icon icon={Mic} size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Voice Search</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-muted">
                <Icon icon={ImageIcon} size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Image Search</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                <Icon icon={Sparkles} size={16} className="fill-indigo-500/10" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-indigo-600 text-white border-none">AI Smart Search</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="absolute right-28 top-2.5 hidden xl:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/60 bg-muted/50 pointer-events-none">
        <Icon icon={Command} size={10} className="text-muted-foreground" />
        <span className="text-[10px] font-bold text-muted-foreground">K</span>
      </div>
    </div>
  )
}
