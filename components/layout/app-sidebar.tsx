"use client"

import * as React from "react"
import {
  Car,
  Briefcase,
  Wrench,
  Users,
  Settings,
  LayoutDashboard,
  Calendar,
  ClipboardList,
  UserPlus,
  Target,
  Package,
  FileCheck,
  MapPin,
  Truck,
  Component,
  Globe,
  MessageSquare,
  BarChart3,
  PieChart,
  ShieldCheck,
  Settings2,
  ListTree,
  Cable,
  LucideIcon
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Icon } from "@/components/d365/atoms/icon"

interface NavSubItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  icon: LucideIcon;
  items: NavSubItem[];
}

const navItems: NavGroup[] = [
  {
    title: "Sales",
    icon: Briefcase,
    items: [
      { title: "Dashboard", url: "/sales", icon: LayoutDashboard },
      { title: "Leads", url: "#", icon: UserPlus },
      { title: "Opportunities", url: "#", icon: Target },
      { title: "Inventory", url: "#", icon: Package },
      { title: "Deal Desk", url: "#", icon: FileCheck },
      { title: "Customers", url: "/sales/customers", icon: Users },
    ],
  },
  {
    title: "Service",
    icon: Wrench,
    items: [
      { title: "Dashboard", url: "/service", icon: LayoutDashboard },
      { title: "Appointments", url: "#", icon: Calendar },
      { title: "Lane Check-in", url: "/service/check-in", icon: MapPin },
      { title: "Repair Orders", url: "/service/ro", icon: ClipboardList },
      { title: "Dispatch", url: "/service/dispatch", icon: Truck },
      { title: "Technician", url: "/service/technician", icon: Wrench },
      { title: "Parts", url: "#", icon: Component },
      { title: "Customers", url: "/service/customers", icon: Users },
    ],
  },
  {
    title: "Shared / 360",
    icon: Users,
    items: [
      { title: "Global Customer", url: "/customers/mock", icon: Globe },
      { title: "Vehicle Profiles", url: "#", icon: Car },
      { title: "Communications", url: "#", icon: MessageSquare },
      { title: "Master Reports", url: "#", icon: BarChart3 },
    ],
  },
  {
    title: "Operations",
    icon: LayoutDashboard,
    items: [
      { title: "Executive Dash", url: "#", icon: PieChart },
      { title: "Team Management", url: "#", icon: ShieldCheck },
    ]
  },
  {
    title: "Admin",
    icon: Settings,
    items: [
      { title: "Store Settings", url: "#", icon: Settings2 },
      { title: "Rules & Templates", url: "#", icon: ListTree },
      { title: "Integrations", url: "#", icon: Cable },
    ]
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-border/40">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton size="lg" className="border border-border/30 bg-muted/20">
              <div className="flex aspect-square size-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
                D
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-tight">Dealer365</span>
                <span className="truncate text-xs font-mono opacity-80">v2.0 Beta</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-muted/40 font-medium">
                      <a href={item.url}>
                        <Icon icon={item.icon} size={16} />
                        <span className="text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-border/40 p-2">
         <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold border border-border">MR</div>
            <div className="flex-1">
               <p className="text-sm font-bold leading-tight">Mike Roberts</p>
               <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Service Advisor</p>
            </div>
         </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
