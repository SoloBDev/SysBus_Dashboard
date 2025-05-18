"use client"

import type React from "react"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/auth-context"

// Public pages
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"

// Admin pages
import AdminDashboardPage from "./pages/admin/dashboard"
import AdminTenantsPage from "./pages/admin/tenants"
import AdminAnalyticsPage from "./pages/admin/analytics"
import AdminConfigPage from "./pages/admin/config"
import AdminSecurityPage from "./pages/admin/security"
import AdminFinancesPage from "./pages/admin/finances"

// Tenant pages
import TenantDashboardPage from "./pages/tenant/dashboard"
import TenantSettingsPage from "./pages/tenant/settings"

// Operator pages
import OperatorDashboardPage from "./pages/operator/dashboard"

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* System Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["system_admin"]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tenants"
        element={
          <ProtectedRoute allowedRoles={["system_admin"]}>
            <AdminTenantsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRoles={["system_admin"]}>
            <AdminAnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/config"
        element={
          <ProtectedRoute allowedRoles={["system_admin"]}>
            <AdminConfigPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/security"
        element={
          <ProtectedRoute allowedRoles={["system_admin"]}>
            <AdminSecurityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/finances"
        element={
          <ProtectedRoute allowedRoles={["system_admin"]}>
            <AdminFinancesPage />
          </ProtectedRoute>
        }
      />

      {/* Tenant Admin routes */}
      <Route
        path="/tenant/dashboard"
        element={
          <ProtectedRoute allowedRoles={["tenant_admin"]}>
            <TenantDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/settings"
        element={
          <ProtectedRoute allowedRoles={["tenant_admin"]}>
            <TenantSettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Operator routes */}
      <Route
        path="/operator/dashboard"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <OperatorDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
