"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/auth-context"
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { cn } from "../lib/utils"

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

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

  // Toggle sidebar on mobile
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  // Toggle sidebar collapse on desktop
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Bus className="h-5 w-5" />
            </div>
            {!collapsed && <span className="text-xl font-bold">ADDIS</span>}
          </div>
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse} className="h-8 w-8">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-sm font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.role.replace("_", " ")}</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileSidebar}
          className="fixed left-4 top-4 z-50 h-8 w-8 rounded-full bg-background shadow-md"
        >
          {mobileOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      )}

      {/* Main content */}
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : collapsed ? "ml-16" : "ml-64",
        )}
      >
        {children}
      </main>
    </div>
  )
}
