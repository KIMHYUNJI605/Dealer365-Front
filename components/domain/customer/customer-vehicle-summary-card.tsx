import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerVehicle } from "@/lib/types/customer";
import { Car, ChevronRight, Hash } from "lucide-react"
import { Icon } from "@/components/d365/atoms/icon";
import { Badge } from "@/components/ui/badge";

export interface CustomerVehicleSummaryCardProps {
  vehicles: CustomerVehicle[];
  onVehicleClick?: (vehicleId: string) => void;
  className?: string;
}

export function CustomerVehicleSummaryCard({
  vehicles,
  onVehicleClick,
  className
}: CustomerVehicleSummaryCardProps) {
  if (!vehicles || vehicles.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Icon icon={Car}  />
            Vehicles
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground flex flex-col items-center">
          <Icon icon={Car} className="mb-2 opacity-20" />
          No vehicles on file
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon icon={Car}  />
          Garage
          <Badge variant="secondary" className="ml-1 h-5 rounded-sm px-1.5 text-[10px] tabular-nums">
            {vehicles.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {vehicles.map((veh) => (
            <li 
              key={veh.vehicleId}
              className={`flex items-center justify-between p-4 ${onVehicleClick ? 'cursor-pointer hover:bg-muted/30 transition-colors' : ''}`}
              onClick={() => onVehicleClick?.(veh.vehicleId)}
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm">
                  {veh.year} {veh.make} {veh.model} {veh.trim}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-mono">
                    <Icon icon={Hash}  />
                    {veh.vin.slice(-6)}
                  </span>
                  {veh.plate && (
                    <span className="flex items-center gap-1">
                      <div className="border border-border rounded-[2px] px-1 text-[10px] leading-tight font-medium uppercase tracking-wider bg-muted/20 text-foreground">
                        {veh.plate}
                      </div>
                    </span>
                  )}
                  {veh.mileage && (
                    <span className="flex items-center gap-1">
                      {veh.mileage.toLocaleString()} mi
                    </span>
                  )}
                </div>
              </div>
              {onVehicleClick && (
                <Icon icon={ChevronRight} className="text-muted-foreground/50 shrink-0" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
