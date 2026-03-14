import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-center">Dealer365</h1>
        <p className="text-muted-foreground text-center mb-12">Select a domain to get started</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/sales" className="block transition-transform hover:scale-105 active:scale-95">
            <Card className="h-full hover:border-primary">
              <CardHeader>
                <CardTitle className="text-xl">Sales</CardTitle>
                <CardDescription>
                  Lead Management, Deal Desk, F&I, Contracts
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/service" className="block transition-transform hover:scale-105 active:scale-95">
            <Card className="h-full hover:border-primary">
              <CardHeader>
                <CardTitle className="text-xl">Service</CardTitle>
                <CardDescription>
                  Appointments, RO Workspace, Dispatch, Technician
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/customers" className="block transition-transform hover:scale-105 active:scale-95">
            <Card className="h-full hover:border-primary">
              <CardHeader>
                <CardTitle className="text-xl">Customers</CardTitle>
                <CardDescription>
                  Customer 360, Profiles, Interactions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
