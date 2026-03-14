import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Customer, CustomerSalesSummary, CustomerServiceSummary } from "@/lib/types/customer";
import { CustomerIdentity } from "./customer-identity";
import { Tag, Car } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon";

export interface CustomerContextCardProps {
  customer: Customer;
  salesSummary?: CustomerSalesSummary;
  serviceSummary?: CustomerServiceSummary;
  className?: string;
}

export function CustomerContextCard({
  customer,
  salesSummary,
  serviceSummary,
  className
}: CustomerContextCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3 px-5 pt-5 bg-muted/20">
        <CustomerIdentity 
          customerId={customer.customerId}
          fullName={customer.fullName}
          phone={customer.phone}
          email={customer.email}
          size="lg"
        />
        <div className="flex divide-x pt-2 text-xs text-muted-foreground ml-[68px] mt-1 -mb-1">
          <span className="pr-2">{customer.customerType || "Retail"}</span>
          <span className="px-2 capitalize">{customer.status || "Active"}</span>
          <span className="pl-2">Since {new Date(customer.createdAt).getFullYear()}</span>
        </div>
      </CardHeader>
      
      <CardContent className="grid grid-cols-2 gap-4 px-5 pb-5 pt-4">
        {/* Sales Context */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Icon icon={Tag}  /> Sales Context
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Purchases</span>
              <span className="font-medium">{salesSummary?.totalPurchases ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Opps</span>
              <span className="font-medium">{salesSummary?.activeOpportunities ?? 0}</span>
            </div>
            {salesSummary?.lastPurchaseDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Purchase</span>
                <span className="font-medium">{new Date(salesSummary.lastPurchaseDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* separator for visual distinction could be here, but side by side is fine */}
        
        {/* Service Context */}
        <div className="space-y-3 border-l pl-4 border-border/60">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Icon icon={Car}  /> Service Context
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Visits</span>
              <span className="font-medium">{serviceSummary?.totalVisits ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Open ROs</span>
              <span className="font-medium">{serviceSummary?.openROs ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Upcoming Appts</span>
              <span className="font-medium">{serviceSummary?.upcomingAppointments ?? 0}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
