"use client"

import { useState } from "react"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { 
  Car, 
  User, 
  ChevronRight, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  PenTool,
  Plus,
  ArrowRight,
  Activity
} from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { mockArrivals, mockCheckinSession } from "@/lib/mock/check-in"
import { cn } from "@/lib/utils"

export default function LaneCheckIn() {
  const [step, setStep] = useState(1)
  const [session] = useState(mockCheckinSession)

  const steps = [
    { id: 1, label: "Vehicle Info" },
    { id: 2, label: "Walk-around" },
    { id: 3, label: "Concerns" },
    { id: 4, label: "Authorize" }
  ]

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <div className="bg-background px-4 lg:px-6 shadow-sm z-10 sticky top-0">
        <WorkspaceHeader 
          title="Service Lane Check-in"
          subtitle="Process arrivals and draft Repair Orders"
          actions={
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">Cancel</Button>
                <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700 font-bold">
                  {step === 4 ? "Complete & Create RO" : "Next Step"}
                  <Icon icon={ChevronRight} className="ml-1" />
                </Button>
             </div>
          }
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Arrival Queue (Tactical sticky list) */}
        <aside className="w-80 shrink-0 border-r border-border/40 bg-background flex flex-col h-full">
          <div className="p-4 border-b border-border/40 bg-muted/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Arrival Queue</h3>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search appointment..." className="pl-9 h-9 bg-background/50 text-sm" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {mockArrivals.map((arrival) => (
                <button 
                  key={arrival.appointmentId}
                  className={cn(
                    "p-4 text-left border-b border-border/30 hover:bg-muted/30 transition-colors group",
                    arrival.appointmentId === session.appointmentId && "bg-primary/5 border-l-4 border-l-primary"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold font-mono text-muted-foreground">{arrival.arrivalTime}</span>
                    <Badge variant={arrival.visitType === 'WAITING' ? 'destructive' : 'outline'} className="text-[9px] h-4 px-1 uppercase font-bold tracking-tighter">
                      {arrival.visitType}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-sm truncate">{arrival.customerName}</h4>
                  <p className="text-xs text-muted-foreground truncate">{arrival.vehicleSummary}</p>
                  <div className="mt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] uppercase font-bold text-primary">Resume Check-in</span>
                     <Icon icon={ChevronRight} className="text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Center: Interactive Workflow */}
        <main className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* Stepper Header */}
          <div className="px-8 pt-6 pb-2 border-b border-border/30">
             <div className="flex justify-between items-center mb-4">
                {steps.map((s, idx) => (
                  <div key={s.id} className="flex items-center">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold transition-all",
                      step === s.id ? "border-primary bg-primary text-primary-foreground shadow-lg scale-110" : 
                      step > s.id ? "border-emerald-500 bg-emerald-500 text-white" : 
                      "border-muted text-muted-foreground"
                    )}>
                      {step > s.id ? <Icon icon={CheckCircle2}  /> : s.id}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={cn(
                        "w-12 h-0.5 mx-2 bg-muted",
                        step > s.id && "bg-emerald-500"
                      )} />
                    )}
                  </div>
                ))}
             </div>
             <h2 className="text-xl font-bold tracking-tight mb-4">{steps[step-1].label}</h2>
          </div>

          <ScrollArea className="flex-1 bg-muted/5">
             <div className="max-w-4xl mx-auto p-8">
               
               {/* Step 1: Vehicle Confirmation */}
               {step === 1 && (
                 <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <Card className="border-border/60 shadow-sm">
                          <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                             <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Icon icon={Car} className="text-muted-foreground" /> Vehicle Identity
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-4">
                             <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">VIN</label>
                                <div className="flex gap-2">
                                   <Input value={session.vin} className="font-mono text-sm h-10" readOnly />
                                   <Button variant="outline" size="icon" className="shrink-0"><Icon icon={Scan}  /></Button>
                                </div>
                             </div>
                             <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                                <div>
                                   <p className="text-muted-foreground text-[11px] uppercase font-bold tracking-wider">Model</p>
                                   <p className="font-semibold">{session.vehicleSummary}</p>
                                </div>
                                <div>
                                   <p className="text-muted-foreground text-[11px] uppercase font-bold tracking-wider">Color</p>
                                   <p className="font-semibold">Abyss Black Pearl</p>
                                </div>
                             </div>
                          </CardContent>
                       </Card>

                       <Card className="border-border/60 shadow-sm">
                          <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                             <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Icon icon={Activity} className="text-muted-foreground" /> Operational Data
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-6">
                             <div>
                                <div className="flex justify-between items-end mb-2">
                                   <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Current Mileage</label>
                                   <span className="text-xs font-mono font-bold text-primary">Miles</span>
                                </div>
                                <Input type="number" defaultValue={session.mileage} className="text-lg font-bold h-12" />
                             </div>
                             <div>
                                <div className="flex justify-between items-end mb-3">
                                   <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Fuel Level</label>
                                   <span className="text-xs font-bold">{session.fuelLevel}%</span>
                                </div>
                                <Slider defaultValue={[session.fuelLevel]} max={100} step={1} className="py-4" />
                                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase px-1">
                                   <span>Empty</span>
                                   <span>Full</span>
                                </div>
                             </div>
                          </CardContent>
                       </Card>
                    </div>

                    <Card className="border-border/60 shadow-sm border-l-4 border-l-amber-500 bg-amber-50/20 dark:bg-amber-950/20">
                       <CardContent className="p-4 flex gap-4">
                          <Icon icon={AlertCircle} className="text-amber-500 shrink-0 mt-0.5" />
                          <div>
                             <h4 className="text-sm font-bold text-amber-800 dark:text-amber-500">Active Recall Detected</h4>
                             <p className="text-xs text-amber-700/80 dark:text-amber-600/80 mt-1">
                                Campaign ID: 251 - ICCU Software Update. Estimated additional time: 45 min.
                             </p>
                             <Button variant="outline" size="sm" className="h-7 text-[10px] mt-2 bg-background border-amber-200">View Recall Details</Button>
                          </div>
                       </CardContent>
                    </Card>
                 </div>
               )}

               {/* Step 2: Walk-around (Tablet focus, touch targets) */}
               {step === 2 && (
                 <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                       <p className="text-sm text-muted-foreground max-w-xl">
                         Inspect the vehicle exterior for pre-existing damage. Use the camera to capture evidence.
                       </p>
                       <Button variant="outline" className="h-9 font-bold bg-background shadow-sm border-primary/30 text-primary">
                          <Icon icon={Camera} className="mr-2" /> Add General Photo
                       </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       {session.walkaround.map((item) => (
                         <Card key={item.id} className={cn(
                           "border-border/60 shadow-sm border-t-4 transition-all hover:scale-[1.02]",
                           item.condition === "GOOD" ? "border-t-emerald-500" : "border-t-amber-500"
                         )}>
                           <CardContent className="p-4 flex flex-col h-full">
                              <h4 className="text-sm font-bold mb-3">{item.label}</h4>
                              <div className="flex-1 min-h-[100px] border-2 border-dashed border-border/40 rounded-md bg-muted/20 flex flex-col items-center justify-center text-muted-foreground gap-2 cursor-pointer hover:bg-muted/40 transition-colors">
                                 <Icon icon={Camera} className="opacity-40" />
                                 <span className="text-[10px] font-bold uppercase tracking-wider">Tap to Capture</span>
                              </div>
                              <div className="flex gap-2 mt-4">
                                 <Button variant={item.condition === 'GOOD' ? 'default' : 'outline'} size="sm" className="flex-1 h-8 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700">Good</Button>
                                 <Button variant={item.condition !== 'GOOD' ? 'destructive' : 'outline'} size="sm" className="flex-1 h-8 text-[11px] font-bold">Damage</Button>
                              </div>
                           </CardContent>
                         </Card>
                       ))}
                    </div>

                    <Card className="bg-background border-border/60 p-6 flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed">
                        <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                           <Icon icon={Car} className="text-muted-foreground opacity-20" />
                        </div>
                        <div>
                           <h4 className="font-bold text-sm">Interactive Vehicle Diagram Mapping</h4>
                           <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">Tap specific areas on a 3D model to precisely mark scratches, dents, or cracked surfaces.</p>
                        </div>
                        <Button variant="secondary" size="sm" className="h-8 font-bold text-xs">Open Visual Mapper</Button>
                    </Card>
                 </div>
               )}

               {/* Step 3: Concerns and Statements */}
               {step === 3 && (
                 <div className="grid gap-6">
                    <Card className="border-border/60 shadow-sm">
                       <CardHeader className="pb-3 border-b bg-muted/10">
                          <CardTitle className="text-sm font-bold">Service Items & Customer Concerns</CardTitle>
                       </CardHeader>
                       <CardContent className="p-0">
                          <div className="divide-y divide-border/30">
                             {session.concerns.map((c, i) => (
                               <div key={i} className="p-4 flex items-start justify-between gap-4">
                                  <div className="flex gap-3">
                                     <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon icon={CheckCircle2}  />
                                     </div>
                                     <p className="text-sm font-medium">{c}</p>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Remove</Button>
                               </div>
                             ))}
                             <button className="w-full p-4 flex items-center gap-2 text-primary hover:bg-primary/5 transition-colors font-bold text-sm">
                                <Icon icon={Plus}  /> Add Line Item / Concern
                             </button>
                          </div>
                       </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Customer Statement (Voice to Text)</label>
                           <textarea 
                             className="w-full h-32 rounded-md border border-border bg-background p-3 text-sm resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                             placeholder="Start recording or type customer's explanation..."
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Advisor Observations</label>
                           <textarea 
                             className="w-full h-32 rounded-md border border-border bg-background p-3 text-sm resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                             placeholder="Internal notes for technicians..."
                           />
                        </div>
                    </div>
                 </div>
               )}

               {/* Step 4: Authorization and Signature */}
               {step === 4 && (
                 <div className="grid gap-8">
                    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                       <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                          <Icon icon={PenTool} className="text-emerald-600" />
                       </div>
                       <h3 className="text-xl font-bold">Review & Authorize</h3>
                       <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                         By signing below, you authorize the diagnostic work and repairs estimated. Total estimate will be updated after preliminary diagnostic.
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                       <Card className="border-border/60 shadow-md">
                          <CardHeader className="bg-muted/10 border-b">
                             <CardTitle className="text-sm font-bold flex items-center justify-between">
                                Estimate Authorization
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">$245.00 Preliminary</Badge>
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                             <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
                                <p>• I authorize the repairs described above to be performed together with necessary materials.</p>
                                <p>• I understand an estimate of costs for parts and labor will be provided after teardown.</p>
                                <p>• I grant permission to operate the vehicle for purpose of testing/inspection.</p>
                             </div>
                             <div className="mt-8 h-48 border-2 border-border/60 rounded-lg bg-white relative overflow-hidden cursor-crosshair">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 pointer-events-none" />
                                <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase text-slate-400">Sign Here</span>
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                   <Icon icon={PenTool}  />
                                </div>
                             </div>
                             <div className="flex gap-2 mt-4">
                                <Button variant="outline" className="flex-1 h-9 font-bold text-xs">Clear Signature</Button>
                                <Button variant="secondary" className="flex-1 h-9 font-bold text-xs">Authorize via SMS</Button>
                             </div>
                          </CardContent>
                       </Card>

                       <Card className="border-border/60 shadow-sm">
                           <CardHeader className="pb-3 border-b bg-muted/5">
                              <CardTitle className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground">Summary Recap</CardTitle>
                           </CardHeader>
                           <CardContent className="p-6 space-y-6">
                              <div className="flex gap-4">
                                 <Avatar className="h-12 w-12 rounded bg-muted border border-border" />
                                 <div>
                                    <h4 className="font-bold text-sm tracking-tight">{session.customerName}</h4>
                                    <p className="text-xs text-muted-foreground">{session.vehicleSummary}</p>
                                 </div>
                              </div>
                              <Separator />
                              <div className="space-y-4">
                                 <div>
                                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Service Line Items</p>
                                    <ul className="space-y-2">
                                       {session.concerns.map((c, i) => (
                                         <li key={i} className="text-xs flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {c}
                                         </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <div className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded border border-border/40">
                                    <span className="text-xs font-bold uppercase">Pickup ETA</span>
                                    <span className="text-sm font-mono font-bold text-primary">5:30 PM Today</span>
                                 </div>
                              </div>
                           </CardContent>
                       </Card>
                    </div>
                 </div>
               )}

             </div>
          </ScrollArea>

          {/* Bottom Action Footer for Navigation */}
          <div className="h-16 border-t border-border/60 bg-background flex items-center px-8 justify-between shrink-0">
             <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  disabled={step === 1} 
                  onClick={() => setStep(step - 1)}
                  className="font-bold"
                >
                  Go Back
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <span className="text-xs font-bold text-muted-foreground">
                   Check-in ID: <span className="text-foreground">{session.checkinId}</span>
                </span>
             </div>

             <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Draft RO Completion</span>
                   <div className="flex items-center gap-2 w-32 mt-1">
                      <Progress value={(step/4)*100} className="h-1.5" />
                      <span className="text-[10px] font-bold">{step}/4</span>
                   </div>
                </div>
                <Button 
                  size="lg" 
                  className={cn(
                    "font-bold min-w-[160px] h-11 text-sm shadow-md",
                    step === 4 ? "bg-emerald-600 hover:bg-emerald-700" : "bg-primary"
                  )}
                  onClick={() => step < 4 ? setStep(step + 1) : null}
                >
                  {step === 4 ? "Authorize & Create RO" : "Continue to Next Step"}
                  {step < 4 && <Icon icon={ArrowRight} className="ml-2" />}
                </Button>
             </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}



function Avatar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn("rounded-full flex items-center justify-center bg-muted text-muted-foreground overflow-hidden", props.className)}>
       <Icon icon={User} className="/5 /5" />
    </div>
  )
}
