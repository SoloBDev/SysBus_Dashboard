"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import {
  BarChart3,
  Bus,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Map,
  Package,
  QrCode,
  Settings,
  Users,
  LogOut,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"

interface SidebarWrapperProps {
  children: React.ReactNode
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Define navigation items based on user role
  const getNavItems = () => {
    if (!user) return []

    if (user.role === "system_admin") {
      return [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Tenants", href: "/admin/tenants", icon: Bus },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Platform Config", href: "/admin/config", icon: Settings },
        { name: "Security", href: "/admin/security", icon: QrCode },
        { name: "Finances", href: "/admin/finances", icon: CreditCard },
      ]
    } else if (user.role === "tenant_admin") {
      return [
        { name: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
        { name: "Fleet", href: "/tenant/fleet", icon: Bus },
        { name: "Routes", href: "/tenant/routes", icon: Map },
        { name: "Schedule", href: "/tenant/schedule", icon: Calendar },
        { name: "Operators", href: "/tenant/operators", icon: Users },
        { name: "Bookings", href: "/tenant/bookings", icon: Package },
        { name: "Finances", href: "/tenant/finances", icon: CreditCard },
        { name: "Settings", href: "/tenant/settings", icon: Settings },
      ]
    } else {
      return [
        { name: "Dashboard", href: "/operator/dashboard", icon: LayoutDashboard },
        { name: "Trips", href: "/operator/trips", icon: Bus },
        { name: "Passengers", href: "/operator/passengers", icon: Users },
        { name: "Scan Tickets", href: "/operator/scan", icon: QrCode },
        { name: "Report Issue", href: "/operator/issues", icon: Bell },
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-xl font-bold">ADDIS</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Bus className="h-5 w-5" />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.role.replace("_", " ")}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  )
}
