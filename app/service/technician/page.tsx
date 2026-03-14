"use client"

import { useState, useEffect } from "react"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, CheckSquare, Camera, Video, AlertTriangle, FileText, Wrench } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { TechnicianJob, TechJobStatus } from "@/lib/types/technician"
import { mockTechJobs, mockMPIResults } from "@/lib/mock/technician"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

function StatusBadge({ status }: { status: TechJobStatus }) {
  const map: Record<TechJobStatus, { label: string, variant: "default" | "secondary" | "outline" | "destructive", className: string }> = {
    NOT_STARTED: { label: "Not Started", variant: "outline", className: "text-muted-foreground" },
    IN_PROGRESS: { label: "In Progress", variant: "default", className: "bg-emerald-600 hover:bg-emerald-700" },
    PAUSED: { label: "Paused/Wait", variant: "secondary", className: "bg-amber-100 text-amber-800" },
    COMPLETED: { label: "Done", variant: "secondary", className: "bg-muted text-muted-foreground" }
  }
  return (
    <Badge variant={map[status].variant} className={cn("uppercase text-[10px] font-bold tracking-wider", map[status].className)}>
      {map[status].label}
    </Badge>
  )
}

export default function TechnicianWorkbench() {
  const [data, setData] = useState<TechnicianJob[]>([])
  const [activeJobId, setActiveJobId] = useState<string | null>(null)

  useEffect(() => {
    // Simulate fetch with timeout to avoid synchronous setState and realistically mimic network condition
    const timer = setTimeout(() => {
      setData(mockTechJobs)
      const inProgress = mockTechJobs.find(j => j.status === "IN_PROGRESS")
      if (inProgress) setActiveJobId(inProgress.jobId)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const activeJob = data.find(j => j.jobId === activeJobId)

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <div className="bg-background px-4 lg:px-6 shadow-sm z-10">
        <WorkspaceHeader 
          title="Technician Workbench"
          subtitle="Tech: 22 (Mike R.) • Bay 04"
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Drawer: Job Queue */}
        <aside className="w-1/3 lg:w-[400px] border-r border-border/60 bg-background flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-muted/10 font-bold uppercase tracking-wider text-xs text-muted-foreground">
            My Queue ({data.length})
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {data.map(job => (
              <Card 
                key={job.jobId} 
                className={cn(
                  "cursor-pointer transition-colors shadow-sm",
                  activeJobId === job.jobId ? "bg-primary/5 border-primary/50 shadow-md ring-1 ring-primary/20" : "hover:bg-muted/30"
                )}
                onClick={() => setActiveJobId(job.jobId)}
              >
                <CardContent className="p-4 pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-muted-foreground">{job.roId}</span>
                    <StatusBadge status={job.status} />
                  </div>
                  <h4 className="font-semibold text-sm leading-tight mb-2">{job.description}</h4>
                  <div className="flex justify-between items-end mt-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-bold">
                      <Icon icon={Wrench}  /> {job.laborHours}h
                    </p>
                    <span className="text-xs tracking-tight font-medium bg-muted px-1.5 py-0.5 rounded">{job.vehicle.description.split(" ")[2]}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>

        {/* Main/Right Area: Current Job Workspace */}
        <main className="flex-1 overflow-y-auto bg-muted/10">
          {activeJob ? (
            <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8 pb-32">
              
              {/* Job Header Info */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold font-mono tracking-tight">{activeJob.roId}</h2>
                    <Badge variant="outline" className="text-xs font-bold border-muted-foreground/30">Line {activeJob.opLineNo}</Badge>
                  </div>
                  <h1 className="text-xl font-semibold mb-1">{activeJob.description}</h1>
                  <p className="text-muted-foreground text-sm font-medium">{activeJob.vehicle.vin} • {activeJob.vehicle.description.replace('Hyundai ', '')} • {activeJob.vehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Time Clock</p>
                  <p className="font-mono text-3xl font-bold text-emerald-600 block leading-none">
                    {activeJob.consumedTimeMinutes ? `${Math.floor(activeJob.consumedTimeMinutes / 60)}h ${activeJob.consumedTimeMinutes % 60}m` : "0h 0m"}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">/ {activeJob.laborHours}h allocated</p>
                </div>
              </div>

              {activeJob.customerConcern && (
                <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-xl shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-500 mb-2 flex items-center gap-1.5">
                    <Icon icon={AlertTriangle}  /> Customer Concern
                  </h3>
                  <p className="font-medium text-[15px] italic text-amber-900 dark:text-amber-400">&quot;{activeJob.customerConcern}&quot;</p>
                </div>
              )}

              {/* Execution Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Visual / Media Tools */}
                <Card className="shadow-sm">
                  <CardHeader className="p-4 border-b bg-muted/20">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Icon icon={Camera} className="text-muted-foreground" /> Media & Attachments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Icon icon={Camera} className="text-muted-foreground" />
                        <span className="text-xs font-bold">Take Photo</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Icon icon={Video} className="text-muted-foreground" />
                        <span className="text-xs font-bold">Record Video</span>
                      </Button>
                    </div>
                    {/* Mock thumbnails area */}
                    <div className="flex gap-2">
                       <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center border border-dashed border-muted-foreground/40 text-[10px] text-muted-foreground font-semibold">Empty</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tech Notes */}
                <Card className="shadow-sm">
                  <CardHeader className="p-4 border-b bg-muted/20">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Icon icon={FileText} className="text-muted-foreground" /> Technician Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea 
                      placeholder="Enter diagnostic findings or notes here. You can also use voice dictation." 
                      className="min-h-[110px] resize-none text-sm leading-relaxed"
                    />
                    <div className="flex justify-between mt-3">
                      <Button variant="secondary" size="sm" className="h-7 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400">Add AI Suggestion</Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">Save Note</Button>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* MPI Section Hook */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <h3 className="font-bold text-lg tracking-tight">Multi-Point Inspection</h3>
                  <Button variant="outline" size="sm">Full MPI Form</Button>
                </div>
                <Card className="overflow-hidden shadow-sm border-border/60">
                  <div className="divide-y">
                    {mockMPIResults.slice(0, 3).map(mpi => (
                      <div key={mpi.id} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded shrink-0 flex items-center justify-center font-bold text-lg",
                            mpi.result === "FAIL" ? "bg-destructive text-destructive-foreground" :
                            mpi.result === "WARNING" ? "bg-amber-500 text-white" :
                            "bg-emerald-500 text-white"
                          )}>
                            {mpi.result === "FAIL" ? "!" : mpi.result === "WARNING" ? "?" : "✓"}
                          </div>
                          <div>
                            <p className="font-bold text-sm tracking-tight leading-none mb-1">{mpi.name}</p>
                            <p className="text-xs text-muted-foreground">{mpi.category}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          {mpi.measurement && <span className="font-mono text-sm font-bold text-muted-foreground">{mpi.measurement}</span>}
                          {mpi.result === "FAIL" && <Button size="sm" variant="outline" className="text-destructive border-destructive/20 h-7 text-xs font-bold">Add to Estimate</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a job from the queue to start.
            </div>
          )}
        </main>
      </div>

      {/* Persistent Bottom Action Bar for Tablets */}
      {activeJob && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-[400px] bg-background border-t shadow-[0_-4px_24px_-12px_rgba(0,0,0,0.1)] p-4 flex gap-3 h-20 items-center justify-end z-50">
          <Button variant="outline" size="lg" className="h-12 w-32 font-bold opacity-70">
            <Icon icon={AlertTriangle} className="mr-2" /> Need Time
          </Button>
          <Button variant="outline" size="lg" className="h-12 w-32 font-bold border-amber-500/30 text-amber-700 bg-amber-50">
            <Icon icon={Pause} className="mr-2" /> Pause Job
          </Button>
          {activeJob.status !== "IN_PROGRESS" && (
            <Button size="lg" className="h-12 w-40 font-bold bg-emerald-600 hover:bg-emerald-700">
              <Icon icon={Play} className="mr-2 fill-current" /> Start Job
            </Button>
          )}
          <Button size="lg" className="h-12 w-48 font-bold">
            <Icon icon={CheckSquare} className="mr-2" /> Complete Job
          </Button>
        </div>
      )}
    </div>
  )
}
