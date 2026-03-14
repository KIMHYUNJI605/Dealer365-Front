"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { StickySummaryBar, SummaryItem } from "@/components/d365/molecules/sticky-summary-bar"
import { CustomerIdentity } from "@/components/domain/customer/customer-identity"
import { CustomerContextCard } from "@/components/domain/customer/customer-context-card"
import { CustomerVehicleSummaryCard } from "@/components/domain/customer/customer-vehicle-summary-card"
import { CustomerCommunicationPreview } from "@/components/domain/customer/customer-communication-preview"
import { getMockCustomer360, mockCustomerCommunications } from "@/lib/mock/customers"
import { Customer360 } from "@/lib/types/customer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, MessageSquare, Plus, AlertCircle } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { ActivityTimeline } from "@/components/d365/molecules/activity-timeline"

export default function Customer360Page({ params }: { params: Promise<{ customerId: string }> }) {
  const router = useRouter()
  // Unwrap the params properly for Next.js 15+ conventions
  const unwrappedParams = use(params)
  const customerId = unwrappedParams.customerId

  const [data, setData] = useState<Customer360 | null>(null)
  const [comms, setComms] = useState<{ id: string; channel: string; direction: string; content: string; date: string; unread?: boolean }[]>([])
  const [status, setStatus] = useState<"loading" | "empty" | "populated" | "error">("loading")

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const result = getMockCustomer360(customerId)
        if (!result) setStatus("empty")
        else {
          setData(result)
          setComms(mockCustomerCommunications[customerId] || [])
          setStatus("populated")
        }
      } catch {
        setStatus("error")
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [customerId])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center p-12 text-muted-foreground animate-pulse">
        Loading customer profile...
      </div>
    )
  }

  if (status === "empty" || !data) {
    return (
      <div className="flex flex-col h-screen items-center justify-center p-12 text-muted-foreground gap-4 text-center">
        <h3 className="font-semibold text-xl text-foreground">Customer Not Found</h3>
        <p className="text-sm">The customer identity {customerId} does not exist or has been removed.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <Icon icon={ArrowLeft} className="mr-2" /> Go Back
        </Button>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col h-screen items-center justify-center p-12 text-destructive gap-4 text-center">
        <Icon icon={AlertCircle} className="mb-2" />
        <h3 className="font-semibold text-lg">Failed to load profile</h3>
        <p className="text-sm text-muted-foreground">Please try refreshing the page.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <Icon icon={ArrowLeft} className="mr-2" /> Go Back
        </Button>
      </div>
    )
  }

  const { customer, vehicles, salesSummary, serviceSummary } = data

  return (
    <div className="flex flex-col min-h-screen bg-muted/10 pb-12">
      {/* Top Header */}
      <div className="bg-background px-6 lg:px-8">
        <WorkspaceHeader 
          title="Customer 360"
          subtitle="Comprehensive view of customer information, vehicles, and history."
          actions={
            <>
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <Icon icon={ArrowLeft} className="mr-2" /> Back
              </Button>
              <Button variant="outline" size="sm">
                <Icon icon={MessageSquare} className="mr-2" /> Message
              </Button>
              <Button size="sm">
                <Icon icon={Edit} className="mr-2" /> Edit Profile
              </Button>
            </>
          }
        />
      </div>

      {/* Sticky Context Bar */}
      <StickySummaryBar>
        <div className="flex items-center gap-6 min-w-0 pr-8">
          <CustomerIdentity 
            customerId={customer.customerId}
            fullName={customer.fullName}
            avatarUrl={undefined}
            size="sm"
          />
        </div>
        <SummaryItem label="Phone" value={customer.phone || "-"} />
        <SummaryItem label="Email" value={customer.email || "-"} />
        <SummaryItem label="Status" value={<span className="capitalize">{customer.status}</span>} />
        <SummaryItem label="Type" value={<span className="capitalize">{customer.customerType || "Retail"}</span>} />
      </StickySummaryBar>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
            <TabsTrigger value="service">Service History</TabsTrigger>
            <TabsTrigger value="vehicles">
              Vehicles
              {vehicles.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center bg-primary/10 text-primary w-4 h-4 rounded-[3px] text-[10px] font-bold">
                  {vehicles.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column - Key Context & Entities */}
              <div className="lg:col-span-2 space-y-6">
                <CustomerContextCard 
                  customer={customer}
                  salesSummary={salesSummary}
                  serviceSummary={serviceSummary}
                  className="shadow-sm border-border/60"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomerVehicleSummaryCard 
                    vehicles={vehicles}
                    onVehicleClick={(vid) => console.log('view vehicle', vid)}
                    className="shadow-sm border-border/60"
                  />
                  
                  <CustomerCommunicationPreview 
                    communications={comms}
                    onViewAll={() => console.log('view comms')}
                    className="shadow-sm border-border/60"
                  />
                </div>
              </div>

              {/* Right Column - Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold tracking-tight">Recent Activity</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Icon icon={Plus} className="text-muted-foreground" />
                  </Button>
                </div>
                
                <div className="bg-background rounded-xl border shadow-sm p-4 pt-5">
                  <ActivityTimeline 
                    items={[
                      {
                        id: 1,
                        title: "Service Appointment Scheduled",
                        description: "Oil change and tire rotation for 2023 Hyundai Palisade",
                        date: "Today, 10:00 AM",
                        isLatest: true
                      },
                      {
                        id: 2,
                        title: "Received SMS",
                        description: "\"I will drop off the car early tomorrow\"",
                        date: "Yesterday"
                      },
                      {
                        id: 3,
                        title: "Sales Opportunity Created",
                        description: "Interested in 2025 Genesis GV80",
                        date: "Oct 12, 2025"
                      }
                    ]} 
                  />
                </div>
              </div>

            </div>
          </TabsContent>

          <TabsContent value="sales" className="outline-none h-64 flex items-center justify-center border border-dashed rounded-lg text-muted-foreground">
            Sales History detailed view goes here
          </TabsContent>

          <TabsContent value="service" className="outline-none h-64 flex items-center justify-center border border-dashed rounded-lg text-muted-foreground">
            Service History detailed view goes here
          </TabsContent>

          <TabsContent value="vehicles" className="outline-none h-64 flex items-center justify-center border border-dashed rounded-lg text-muted-foreground">
            Detailed Vehicle Management view goes here
          </TabsContent>
          
          <TabsContent value="communications" className="outline-none h-64 flex items-center justify-center border border-dashed rounded-lg text-muted-foreground">
            Full Communication Center embedded here
          </TabsContent>

        </Tabs>
      </main>
    </div>
  )
}
