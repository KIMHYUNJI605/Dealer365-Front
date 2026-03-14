"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { SearchToolbar } from "@/components/d365/molecules/search-toolbar"
import { FilterRail } from "@/components/d365/molecules/filter-rail"
import { ResultTable } from "@/components/d365/patterns/result-table"
import { CustomerIdentity } from "@/components/domain/customer/customer-identity"
import { mockCustomers, mockServiceSummaries, mockCustomerVehicles } from "@/lib/mock/customers"
import { Customer } from "@/lib/types/customer"
import { ColumnDef } from "@tanstack/react-table"
import { AlertCircle, CarFront } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"

type ServiceCustomerRow = Customer & {
  openROs: number;
  upcomingAppointments: number;
  lastVisitDate?: string;
  vehicleCount: number;
};

export default function ServiceCustomersPage() {
  const router = useRouter()
  const [data, setData] = useState<ServiceCustomerRow[]>([])
  const [status, setStatus] = useState<"loading" | "empty" | "populated" | "error">("loading")
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => {
      try {
        const rows: ServiceCustomerRow[] = mockCustomers.map(c => ({
          ...c,
          openROs: mockServiceSummaries[c.customerId]?.openROs || 0,
          upcomingAppointments: mockServiceSummaries[c.customerId]?.upcomingAppointments || 0,
          lastVisitDate: mockServiceSummaries[c.customerId]?.lastVisitDate,
          vehicleCount: mockCustomerVehicles[c.customerId]?.length || 0
        }))
        
        if (rows.length === 0) setStatus("empty")
        else {
          setData(rows)
          setStatus("populated")
        }
      } catch {
        setStatus("error")
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const filteredData = data.filter(c => {
    if (activeFilter === "with-open-ro" && c.openROs === 0) return false;
    if (activeFilter === "with-upcoming-appt" && c.upcomingAppointments === 0) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.fullName.toLowerCase().includes(q) || c.phone?.includes(q) || c.email?.toLowerCase().includes(q);
    }
    return true;
  });

  const columns: ColumnDef<ServiceCustomerRow>[] = [
    {
      accessorKey: "fullName",
      header: "Customer",
      cell: ({ row }) => (
        <CustomerIdentity 
          customerId={row.original.customerId}
          fullName={row.original.fullName}
          phone={row.original.phone}
          email={row.original.email}
          size="sm"
        />
      ),
    },
    {
      accessorKey: "vehicleCount",
      header: "Vehicles",
      cell: ({ row }) => (
        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <Icon icon={CarFront}  />
          {row.original.vehicleCount}
        </span>
      )
    },
    {
      accessorKey: "openROs",
      header: "Open ROs",
      cell: ({ row }) => <span className="font-medium text-amber-600">{row.original.openROs > 0 ? row.original.openROs : "-"}</span>
    },
    {
      accessorKey: "upcomingAppointments",
      header: "Upcoming Appts",
      cell: ({ row }) => <span className="font-medium text-primary">{row.original.upcomingAppointments > 0 ? row.original.upcomingAppointments : "-"}</span>
    },
    {
      accessorKey: "lastVisitDate",
      header: "Last Visit",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.lastVisitDate ? new Date(row.original.lastVisitDate).toLocaleDateString() : "Never"}
        </span>
      )
    }
  ]

  const filters = [
    { value: "all", label: "All Customers", count: data.length },
    { value: "with-active", label: "Active", count: data.filter(c => c.status === "active").length },
    { value: "with-open-ro", label: "Open ROs", count: data.filter(c => c.openROs > 0).length },
    { value: "with-upcoming-appt", label: "Upcoming Appointments", count: data.filter(c => c.upcomingAppointments > 0).length }
  ]

  return (
    <div className="flex flex-col h-full bg-background p-6 lg:p-8">
      <WorkspaceHeader 
        title="Service Customers"
        subtitle="Manage repair orders, service history, and appointments."
      />
      
      <div className="py-4">
        <SearchToolbar 
          placeholder="Search by name, phone, VIN, or plate..."
          onSearch={setSearchQuery}
        />
        <FilterRail 
          filters={filters}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      <div className="flex-1 min-h-0">
        {status === "loading" && (
          <div className="flex items-center justify-center p-12 text-muted-foreground animate-pulse">
            Loading customers...
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center p-12 text-destructive gap-2 text-center">
            <Icon icon={AlertCircle} className="mb-2" />
            <h3 className="font-semibold text-lg">Failed to load customers</h3>
            <p className="text-sm text-muted-foreground">Please try refreshing the page.</p>
          </div>
        )}

        {status === "empty" && (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-2 text-center border rounded-lg border-dashed">
            <h3 className="font-medium text-foreground">No customers found</h3>
            <p className="text-sm">There are no customers matching your current filters.</p>
          </div>
        )}

        {status === "populated" && (
          <ResultTable 
            columns={columns} 
            data={filteredData}
            onRowClick={(row) => router.push(`/customers/${row.customerId}`)}
          />
        )}
      </div>
    </div>
  )
}
