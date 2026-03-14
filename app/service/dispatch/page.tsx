"use client"

import { useState } from "react"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Clock, Users, Zap, AlertTriangle, Layers, GripVertical, Wrench } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { mockTechs, mockUnassignedJobs, mockDispatchedJobs } from "@/lib/mock/dispatch"
import { DispatchJob, DispatchTechnician } from "@/lib/types/dispatch"
import { cn } from "@/lib/utils"

function TechRow({ tech, activeJobs }: { tech: DispatchTechnician, activeJobs: DispatchJob[] }) {
  return (
    <div className="flex border-b border-border/50 bg-background hover:bg-muted/10 transition-colors h-24">
      {/* Tech Info Sticky Column */}
      <div className="w-56 shrink-0 border-r border-border/50 p-3 flex flex-col justify-center bg-muted/5 z-10 sticky left-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-sm truncate">{tech.name}</span>
          <Badge variant={tech.status === "ACTIVE" ? "default" : "secondary"} className="text-[9px] uppercase font-bold tracking-wider px-1 py-0 h-4">
            {tech.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-medium text-muted-foreground">{tech.techId}</span>
          <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
             <Icon icon={Clock} /> {tech.availableAt}
          </span>
        </div>
        {/* Utilization Bar */}
        <div className="w-full bg-muted h-1.5 rounded-full mt-2 overflow-hidden shadow-inner">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", tech.utilizationPercent > 85 ? "bg-destructive" : tech.utilizationPercent > 60 ? "bg-amber-500" : "bg-emerald-500")}
            style={{ width: `${tech.utilizationPercent}%` }}
          />
        </div>
      </div>

      {/* Timeline / Job Blocks Area */}
      <div className="flex-1 relative flex items-center px-4 overflow-hidden gap-2">
        {/* Render Active Jobs as Blocks */}
        {activeJobs.map(job => (
          <div key={`${job.roId}-${job.lineNo}`} className="h-16 shrink-0 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md shadow-sm p-2 flex flex-col justify-between" style={{ width: Math.max(job.estimatedMinutes * 2, 120) }}>
             <div className="flex justify-between items-start">
               <span className="font-mono text-[10px] font-bold text-blue-800 dark:text-blue-400">{job.roId}</span>
               <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none px-1 py-0 h-4 text-[9px] dark:bg-blue-900/50 dark:text-blue-300">
                 {job.status === "IN_PROGRESS" ? "WORKING" : "ASSIGNED"}
               </Badge>
             </div>
             <p className="text-xs font-semibold truncate text-blue-950 dark:text-blue-200" title={job.description}>{job.description}</p>
             <div className="flex justify-between text-[10px] text-muted-foreground font-medium mt-1">
               <span className="flex items-center gap-0.5"><Icon icon={Clock}  /> {job.estimatedMinutes}m</span>
               <span className="uppercase text-blue-700/70 font-bold dark:text-blue-400">{job.customerName.split(" ")[1]}</span>
             </div>
          </div>
        ))}

        {/* Empty Slot Placeholder */}
        {!activeJobs.length && tech.status === "ACTIVE" && (
           <div className="h-16 w-32 border-2 border-dashed border-border/60 rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground bg-muted/5">
             Drop here
           </div>
        )}
      </div>
    </div>
  )
}

function UnassignedCard({ job }: { job: DispatchJob }) {
  return (
    <div className="border border-border/60 rounded-lg p-3 bg-background shadow-sm hover:border-primary/50 cursor-grab active:cursor-grabbing group transition-all">
      <div className="flex justify-between items-start mb-1.5">
        <div className="flex items-center gap-1.5 cursor-move">
           <Icon icon={GripVertical} className="text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
           <span className="font-mono text-xs font-bold">{job.roId}</span>
        </div>
        {job.priority === "WAITING" && <Badge variant="destructive" className="h-4 text-[9px] uppercase px-1 font-bold animate-pulse">Waiting</Badge>}
        {job.priority === "VIP" && <Badge className="bg-amber-500 hover:bg-amber-600 h-4 text-[9px] uppercase px-1 font-bold">VIP</Badge>}
      </div>
      <h4 className="font-medium text-sm leading-tight mb-2 pl-5.5">{job.description}</h4>
      <div className="flex justify-between items-end pl-5.5 mt-2">
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-mono tracking-wider font-bold border-muted-foreground/30">
             {job.estimatedMinutes}m
           </Badge>
           {job.predictedMinutesAI && (
             <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-mono tracking-wider font-bold bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 flex items-center gap-1">
                <Icon icon={Activity}  /> AI: {job.predictedMinutesAI}m
             </Badge>
           )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
          {job.requiredSkills[0]}
        </span>
      </div>
    </div>
  )
}

export default function DispatchBoard() {
  const [unassigned] = useState<DispatchJob[]>(mockUnassignedJobs)

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <div className="bg-background px-4 lg:px-6 shadow-sm z-20 sticky top-0">
        <WorkspaceHeader 
          title="Service Dispatch Board"
          subtitle="Shop Capacity & Route Control • Real-time orchestration"
        />
      </div>

      {/* Main Layout: Left Queue, Right Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Drawer: Job Queue */}
        <aside className="w-80 shrink-0 border-r border-border/60 bg-background flex flex-col h-full bg-muted/5">
          <div className="p-3 border-b border-border/50 bg-background flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-wider text-xs flex items-center gap-2">
              <Icon icon={Layers} className="text-muted-foreground"/> Unassigned Queue
            </h3>
            <Badge variant="secondary" className="font-mono">{unassigned.length}</Badge>
          </div>
          
          <div className="p-3 border-b border-border/30 bg-indigo-50/50 dark:bg-indigo-950/20">
            <h4 className="text-[10px] font-bold uppercase text-indigo-800 dark:text-indigo-400 flex items-center gap-1.5 mb-2">
              <Icon icon={Zap} className="fill-current" /> AI Auto-Dispatch Action
            </h4>
            <Button size="sm" className="w-full h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">
               Auto-Assign {unassigned.length} Jobs
            </Button>
          </div>

          <ScrollArea className="flex-1 p-3">
            <div className="flex flex-col gap-3 pb-10">
               {unassigned.map(job => (
                 <UnassignedCard key={`${job.roId}-${job.lineNo}`} job={job} />
               ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Area: Tech Grid */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
          {/* Grid Header (Time / Metrics) */}
          <div className="h-14 border-b border-border/50 bg-background flex items-center px-4 justify-between shrink-0 shadow-sm z-10 sticky top-0">
             <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <Icon icon={Users} className="text-muted-foreground" />
                 <span className="text-sm font-bold">{mockTechs.length} Techs Online</span>
               </div>
               <div className="h-4 w-px bg-border"></div>
               <div className="flex items-center gap-2">
                 <Icon icon={Wrench} className="text-muted-foreground" />
                 <span className="text-sm font-bold">Shop Capacity: <span className="text-emerald-600">82%</span></span>
               </div>
             </div>
             
             <div className="flex items-center gap-3">
               <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900/50">
                  <Icon icon={AlertTriangle} className="mr-1.5" /> 1 Tech Overloaded
               </Button>
               <Button variant="outline" size="sm" className="h-8">Timeline View</Button>
             </div>
          </div>

          {/* Render Tech Grid Rows */}
          <div className="flex-1 overflow-auto relative bg-[#f8fafc] dark:bg-transparent">
             {/* Master Wrapper */}
             <div className="min-w-[800px] flex flex-col">
                {mockTechs.map(tech => (
                  <TechRow 
                    key={tech.techId} 
                    tech={tech} 
                    activeJobs={mockDispatchedJobs.filter(j => j.assignedTechId === tech.techId)} 
                  />
                ))}
             </div>
          </div>
        </main>
      </div>
    </div>
  )
}
