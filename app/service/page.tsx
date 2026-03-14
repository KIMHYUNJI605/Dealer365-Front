"use client"

import { useState, useEffect } from "react"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { AdvisorKPITile } from "@/components/domain/service/advisor-kpi-tile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Phone, MessageSquare, AlertCircle, Wrench, FileText, Activity, Plus } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"

import { 
  mockDashboardSummary, 
  mockArrivals, 
  mockOpenROs, 
  mockApprovals, 
  mockAlerts 
} from "@/lib/mock/service-dashboard"

export default function ServiceAdvisorDashboard() {
  const [status, setStatus] = useState<"loading" | "populated" | "error">("loading")

  useEffect(() => {
    // Simulate real data fetching
    const t = setTimeout(() => {
      setStatus("populated")
    }, 500)
    return () => clearTimeout(t)
  }, [])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground animate-pulse p-8">
        Loading Command Center...
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-muted/10 p-6 lg:p-8 min-h-screen">
      <WorkspaceHeader 
        title="My Service Day"
        subtitle="Friday, Mar 13 • Advisor: James Park"
        actions={
          <>
            <Button size="sm">
              <Icon icon={Plus} className="mr-2" /> New Appointment
            </Button>
            <Button size="sm" variant="outline">
              <Icon icon={FileText} className="mr-2" /> Search RO
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 pb-6">
        <AdvisorKPITile label="Arrivals Today" value={mockDashboardSummary.todayArrivals} />
        <AdvisorKPITile label="Open ROs" value={mockDashboardSummary.openROs} statusColor="blue" />
        <AdvisorKPITile label="Pending Approval" value={mockDashboardSummary.approvalPending} statusColor="amber" />
        <AdvisorKPITile label="Ready For Pickup" value={mockDashboardSummary.readyForPickup} statusColor="emerald" />
        <AdvisorKPITile label="Overdue" value={mockDashboardSummary.overdue} statusColor="destructive" />
        <AdvisorKPITile label="Closed / ARO" value={`$${mockDashboardSummary.aro}`} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-6">
        
        {/* Left Column: Arrivals & Approvals (Queue Focus) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <Card className="flex-1 shadow-sm border-border/60">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20 px-4 py-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon icon={Clock} className="text-muted-foreground" />
                  Upcoming Arrivals
                </span>
                <Badge variant="secondary" className="font-mono">{mockArrivals.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {mockArrivals.map((arrival) => (
                <div key={arrival.appointmentId} className="p-4 flex flex-col gap-2 hover:bg-muted/10 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{arrival.customerName}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{arrival.vehicleSummary}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold font-mono">{arrival.arrivalTime}</span>
                      <Badge variant={arrival.visitMode === 'WAITING' ? 'destructive' : 'outline'} className="text-[10px] uppercase font-bold px-1.5 h-4 tracking-wider">
                        {arrival.visitMode}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                    {arrival.serviceType}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs w-full">Check-in</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex-1 shadow-sm border-border/60 border-amber-200/50">
            <CardHeader className="pb-3 border-b border-amber-100/50 bg-amber-50/30 px-4 py-3 dark:bg-amber-950/20 dark:border-amber-900/30">
              <CardTitle className="text-sm font-semibold flex items-center justify-between text-amber-800 dark:text-amber-500">
                <span className="flex items-center gap-2">
                  <Icon icon={AlertCircle}  />
                  Pending Approvals
                </span>
                <Badge variant="outline" className="font-mono bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-400 dark:border-amber-800">
                  {mockApprovals.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {mockApprovals.map((approval) => (
                <div key={approval.approvalId} className="p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">{approval.roId}</span>
                      <h4 className="font-medium text-sm leading-tight mt-0.5">{approval.customerName}</h4>
                    </div>
                    <span className="font-medium text-sm">${approval.amount}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {approval.recommendationType.replace('_', ' ')}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">Sent: {new Date(approval.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="icon" ><Icon icon={Phone}  /></Button>
                      <Button variant="outline" size="icon" ><Icon icon={MessageSquare}  /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Center Column: Open ROs (In Progress) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <Card className="h-full shadow-sm border-border/60">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20 px-4 py-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon icon={Wrench} className="text-muted-foreground" />
                  Active ROs
                </span>
                <Badge variant="secondary" className="font-mono">{mockOpenROs.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {mockOpenROs.map((ro) => (
                <div key={ro.roId} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">{ro.roId}</span>
                      <h4 className="font-semibold text-sm">{ro.customerName}</h4>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">{ro.vehicleSummary}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <Badge variant="outline" className="text-[10px] font-bold bg-muted/50 border-transparent text-foreground uppercase tracking-wider h-5">
                        {ro.currentStage.replace('_', ' ')}
                      </Badge>
                      {ro.eta && <span className="text-[10px] font-medium text-muted-foreground mt-1">ETA: {ro.eta}</span>}
                    </div>
                  </div>
                  
                  <div className="flex mt-1 items-center justify-between gap-2">
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-[9px] px-1 h-4 uppercase font-bold tracking-wider">
                        {ro.partsStatus}
                      </Badge>
                    </div>
                    <div className="flex gap-1.5">
                      <Button variant="secondary" size="sm" className="h-6 text-[10px] px-2">Update</Button>
                      <Button size="sm" className="h-6 text-[10px] px-2">Open</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Priorities & Alerts */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* AI Copilot Pnale */}
          <Card className="shadow-md border-indigo-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <CardHeader className="pb-2 bg-indigo-50/50 dark:bg-indigo-950/20 px-5 pt-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-400">
                <Icon icon={Activity} className="text-indigo-500" />
                AI Priorities
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-3 space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-indigo-100 text-indigo-600 w-5 h-5 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold">1</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Call Jane Miller now</span>
                    <p className="text-xs text-muted-foreground leading-snug mt-1">Brake approval has been pending for 45 min. Customer is waiting on site.</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-indigo-100 text-indigo-600 w-5 h-5 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold">2</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Update Marvin McKinney</span>
                    <p className="text-xs text-muted-foreground leading-snug mt-1">Tech is running 30m behind schedule. High risk of missing 14:00 ETA.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exceptions & Alerts */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Alerts & Exceptions</h3>
            {mockAlerts.map(alert => (
              <div key={alert.alertId} className="flex flex-col p-3 rounded-lg border bg-background shadow-sm border-l-4 border-l-destructive">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold tracking-wider text-destructive uppercase">{alert.type.replace('_', ' ')}</span>
                  <span className="text-xs font-mono text-muted-foreground">{alert.roId}</span>
                </div>
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">{alert.recommendedAction}</span>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] font-semibold">Action</Button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
