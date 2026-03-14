"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { WorkspaceHeader } from "@/components/d365/molecules/workspace-header"
import { SearchToolbar } from "@/components/d365/molecules/search-toolbar"
import { FilterRail } from "@/components/d365/molecules/filter-rail"
import { ResultTable } from "@/components/d365/patterns/result-table"
import { CustomerIdentity } from "@/components/domain/customer/customer-identity"
import { mockCustomers, mockSalesSummaries } from "@/lib/mock/customers"
import { Customer } from "@/lib/types/customer"
import { ColumnDef } from "@tanstack/react-table"
import { AlertCircle } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"

type SalesCustomerRow = Customer & {
  activeOpportunities: number;
  lastPurchaseDate?: string;
};

export default function SalesCustomersPage() {
  const router = useRouter()
  const [data, setData] = useState<SalesCustomerRow[]>([])
  const [status, setStatus] = useState<"loading" | "empty" | "populated" | "error">("loading")
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => {
      try {
        const rows: SalesCustomerRow[] = mockCustomers.map(c => ({
          ...c,
          activeOpportunities: mockSalesSummaries[c.customerId]?.activeOpportunities || 0,
          lastPurchaseDate: mockSalesSummaries[c.customerId]?.lastPurchaseDate
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
    if (activeFilter === "active" && c.status !== "active") return false;
    if (activeFilter === "prospect" && c.status !== "prospect") return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.fullName.toLowerCase().includes(q) || c.phone?.includes(q) || c.email?.toLowerCase().includes(q);
    }
    return true;
  });

  const columns: ColumnDef<SalesCustomerRow>[] = [
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="capitalize text-muted-foreground">{row.original.status || "Unknown"}</span>
      )
    },
    {
      accessorKey: "activeOpportunities",
      header: "Active Opps",
      cell: ({ row }) => <span className="font-medium">{row.original.activeOpportunities}</span>
    },
    {
      accessorKey: "lastPurchaseDate",
      header: "Last Purchase",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.lastPurchaseDate ? new Date(row.original.lastPurchaseDate).toLocaleDateString() : "Never"}
        </span>
      )
    }
  ]

  const filters = [
    { value: "all", label: "All Customers", count: data.length },
    { value: "active", label: "Active", count: data.filter(c => c.status === "active").length },
    { value: "prospect", label: "Prospects", count: data.filter(c => c.status === "prospect").length }
  ]

  return (
    <div className="flex flex-col h-full bg-background p-6 lg:p-8">
      <WorkspaceHeader 
        title="Sales Customers"
        subtitle="Manage leads, prospects, and active buyers in your pipeline."
      />
      
      <div className="py-4">
        <SearchToolbar 
          placeholder="Search by name, phone, or email..."
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
