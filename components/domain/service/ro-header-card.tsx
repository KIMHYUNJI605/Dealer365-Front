import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RepairOrder } from "@/lib/types/repair-order"
import { Button } from "@/components/ui/button"
import { User, Car, PhoneCall, AlertCircle, Clock } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon"
import { TimeValue } from "@/components/d365/atoms/time-value"
import { MoneyValue } from "@/components/d365/atoms/money-value"

interface ROHeaderCardProps {
  ro: RepairOrder;
}

export function ROHeaderCard({ ro }: ROHeaderCardProps) {
  return (
    <Card className="shadow-sm border-border/60">
      <CardHeader className="bg-muted/30 p-4 border-b border-border/40">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xl font-bold tracking-tight">{ro.roId}</span>
              <Badge variant="outline" className="uppercase font-bold tracking-wider">{ro.status}</Badge>
              {ro.visitMode === "WAITING" && (
                <Badge variant="destructive" className="uppercase font-bold tracking-wider animate-pulse">Waiting</Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline"><Icon icon={PhoneCall} className="mr-2"/> Call</Button>
            <Button size="sm" variant="outline" className="text-amber-600 border-amber-200"><Icon icon={AlertCircle} className="mr-2"/> Resend Approval</Button>
            <Button size="sm">Save / Close</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-wrap lg:flex-nowrap gap-6 items-center divide-x divide-border/50">
        
        <div className="flex gap-4 items-center pr-6">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon icon={User} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">{ro.customerName}</p>
            <p className="text-xs text-muted-foreground">{ro.customerId}</p>
          </div>
        </div>

        <div className="flex gap-4 items-center pl-6 pr-6">
          <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
            <Icon icon={Car} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">{ro.vehicleSummary}</p>
            <p className="text-xs text-muted-foreground">{ro.mileage?.toLocaleString()} mi • {ro.vehicleId}</p>
          </div>
        </div>

        <div className="flex gap-4 items-center pl-6 pr-6">
          <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Icon icon={Clock} className="text-amber-700" />
          </div>
          <div>
            <p className="text-sm font-semibold">Promise Time</p>
            <p className="text-xs text-amber-700">
               <TimeValue datetime={ro.promiseTime} mode="time" showIcon={false} className="font-bold font-mono" />
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-end pl-6">
          <div className="text-right">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Current Estimate</p>
            <MoneyValue amount={ro.totals.customerPay} emphasis className="text-2xl" />
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
