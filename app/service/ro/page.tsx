"use client"

import { useState, useEffect } from "react"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ROHeaderCard } from "@/components/domain/service/ro-header-card"
import { ActivityTimeline } from "@/components/d365/molecules/activity-timeline"
import { mockRO, mockROTimeline } from "@/lib/mock/repair-order"
import { MoneyValue } from "@/components/d365/atoms/money-value"
import { RepairOrder } from "@/lib/types/repair-order"
import { Info, Package, AlertCircle, Menu, PlusCircle } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RepairOrderWorkspace() {
  const [status, setStatus] = useState<"loading" | "populated" | "error">("loading")
  const [data, setData] = useState<RepairOrder | null>(null)

  useEffect(() => {
    // Simulate real data fetching
    const t = setTimeout(() => {
      setData(mockRO)
      setStatus("populated")
    }, 400)
    return () => clearTimeout(t)
  }, [])

  if (status === "loading" || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground animate-pulse p-8">
        Loading RO Workspace...
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/10 pb-12">
      {/* Small Header Menu */}
      <div className="bg-background px-6 lg:px-8">
        <WorkspaceHeader 
          title="Repair Order Workspace"
          subtitle="Manage operations, parts, and approvals."
        />
      </div>

      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-4 lg:px-6 py-6 font-sans">
        
        {/* Sticky RO Core Master Card */}
        <div className="sticky top-0 z-20 mb-6 bg-background rounded-xl shadow-sm border border-border/50">
          <ROHeaderCard ro={data} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
          
          {/* Main Left: Concerns & Operations */}
          <div className="xl:col-span-8 flex flex-col gap-6">

            {/* Concerns */}
            <Card className="shadow-none border-border/80">
              <CardHeader className="p-3 border-b bg-muted/30 flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Icon icon={Info} className="text-muted-foreground" />
                  Primary Concerns
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs"><Icon icon={PlusCircle} className="mr-1" /> Add Concern</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 divide-y">
                {data.concerns.map((c, i) => (
                  <div key={c.concernId} className="p-4 bg-background">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <Badge variant="outline" className="font-bold border-muted-foreground/30">{c.category}</Badge>
                        </div>
                        <div className="bg-muted/30 p-3 rounded text-sm border border-border/40 font-medium whitespace-pre-wrap">
                          &quot;{c.customerStatement}&quot;
                        </div>
                        {c.advisorNote && (
                          <div className="text-xs text-muted-foreground pl-1 mt-1 font-medium">
                            <span className="font-bold tracking-wider uppercase mr-1">Note:</span> {c.advisorNote}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Operation Lines Grid (The Core UX) */}
            <Card className="shadow-md border-indigo-200/50">
              <CardHeader className="p-3 border-b border-indigo-100 bg-indigo-50/30 flex-row items-center justify-between dark:bg-indigo-950/20 dark:border-indigo-900/30">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-400">
                  <Icon icon={Menu} className="text-indigo-500" />
                  Operation Lines
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" ><Icon icon={PlusCircle} className="mr-1" /> Add Op</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left align-middle border-collapse">
                  <thead className="bg-muted/40 uppercase text-xs font-bold tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2 w-10 text-center">No</th>
                      <th className="px-4 py-2 w-24">Code</th>
                      <th className="px-4 py-2 min-w-[200px]">Description</th>
                      <th className="px-4 py-2 w-20 text-center">Type</th>
                      <th className="px-4 py-2 w-20 text-center">Hours</th>
                      <th className="px-4 py-2 w-24 text-right">Labor ($)</th>
                      <th className="px-4 py-2 w-24 text-right">Parts ($)</th>
                      <th className="px-4 py-2 w-28 text-center">Status</th>
                      <th className="px-4 py-2 w-28 text-center border-l border-border/50">Approval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {data.lines.map(line => (
                      <tr key={line.lineNo} className="hover:bg-muted/20 group">
                        <td className="px-4 py-3 text-center font-bold text-muted-foreground">{line.lineNo}</td>
                        <td className="px-4 py-3 font-mono font-bold text-xs">{line.opCode}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-foreground leading-snug">{line.description}</p>
                          {line.parts.length > 0 && (
                            <p className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">
                              <Icon icon={Package}  /> {line.parts.length} part(s)
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="outline" className="font-bold border-foreground/30">{line.payType}</Badge>
                        </td>
                        <td className="px-4 py-3 text-center font-mono">
                          <Input className="h-7 w-16 text-center text-xs p-1" defaultValue={line.laborHours} />
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-medium">${line.laborAmount}</td>
                        <td className="px-4 py-3 text-right font-mono font-medium">${line.partsAmount}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400">
                            {line.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center border-l border-border/50">
                          {line.approvalStatus === "SENT" ? (
                            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700/50">
                              PENDING
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {/* Add blank row for realism */}
                    <tr className="bg-muted/5 opacity-50 border-t-2 border-dashed">
                      <td className="px-4 py-3 text-center font-bold text-muted-foreground">40</td>
                      <td className="px-4 py-3 font-mono text-xs"><Input className="h-7 w-20 text-xs px-2" placeholder="Code..." /></td>
                      <td className="px-4 py-3"><Input className="h-7 w-full text-xs px-2" placeholder="Operation description..." /></td>
                      <td colSpan={6}></td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

          </div>

          {/* Side Right: Contexts & AI */}
          <div className="xl:col-span-4 flex flex-col gap-6">

            {/* Estimate Summary Box */}
            <Card className="shadow-lg border-2 border-muted">
              <CardHeader className="p-4 bg-muted/40">
                <CardTitle className="text-sm font-bold tracking-tight uppercase">Estimate Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Labor</span>
                  <MoneyValue amount={data.totals.labor} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Parts</span>
                  <MoneyValue amount={data.totals.parts} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fees</span>
                  <MoneyValue amount={data.totals.fees} className="text-muted-foreground" />
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tax</span>
                  <MoneyValue amount={data.totals.tax} className="text-muted-foreground" />
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Customer Total</span>
                  <MoneyValue amount={data.totals.customerPay} emphasis className="text-xl" />
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals Side Pnale */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1">
                <Icon icon={AlertCircle} className="text-amber-500" /> Wait for Approval (1)
              </h3>
              <div className="flex flex-col p-4 rounded-lg border bg-amber-50/40 shadow-sm border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm leading-tight text-amber-900 dark:text-amber-500">Front Brake Pad Replace</h4>
                  <span className="font-mono font-bold text-sm">$485.00</span>
                </div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-2 border-b border-border/50 pb-2">Status: Sent at 10:42 AM</p>
                <div className="flex items-center gap-2 mt-3 w-full">
                  <Button variant="outline" size="sm" className="h-7 text-xs flex-1">Call</Button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs flex-1 bg-amber-200 text-amber-800 hover:bg-amber-300">Approve</Button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <Card className="shadow-none flex-1 mb-6 border-border/50 rounded-lg overflow-hidden flex flex-col">
              <CardHeader className="p-3 border-b bg-muted/20">
                <CardTitle className="text-sm font-bold uppercase tracking-tight text-muted-foreground">RO Audit Trail</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-5 flex-1 max-h-48 overflow-y-auto">
                <ActivityTimeline 
                  items={mockROTimeline.map((ev, i) => ({
                    id: ev.eventId,
                    title: ev.type,
                    description: ev.description,
                    date: new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isLatest: i === mockROTimeline.length - 1
                  }))} 
                />
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
