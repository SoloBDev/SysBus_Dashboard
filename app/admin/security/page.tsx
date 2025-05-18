"use client"

import { useState } from "react"
import { SidebarWrapper } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Info, Lock, Shield, ShieldAlert, UserCog, X, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for security logs
const securityLogs = [
  {
    id: "1",
    event: "Login attempt failed",
    user: "admin@example.com",
    ip: "192.168.1.1",
    timestamp: "2025-05-18 14:23:45",
    severity: "high",
  },
  {
    id: "2",
    event: "User role changed",
    user: "tenant@abaybus.com",
    ip: "192.168.1.2",
    timestamp: "2025-05-18 13:45:12",
    severity: "medium",
  },
  {
    id: "3",
    event: "Password reset requested",
    user: "operator@addisbus.com",
    ip: "192.168.1.3",
    timestamp: "2025-05-18 12:30:22",
    severity: "low",
  },
  {
    id: "4",
    event: "API key generated",
    user: "system",
    ip: "192.168.1.4",
    timestamp: "2025-05-18 11:15:33",
    severity: "medium",
  },
  {
    id: "5",
    event: "Multiple login attempts",
    user: "unknown",
    ip: "192.168.1.5",
    timestamp: "2025-05-18 10:05:18",
    severity: "high",
  },
]

// Mock data for user roles
const userRoles = [
  {
    id: "1",
    name: "System Administrator",
    permissions: ["all"],
    users: 3,
  },
  {
    id: "2",
    name: "Tenant Administrator",
    permissions: ["tenant.manage", "tenant.view", "operator.manage", "operator.view", "booking.manage", "booking.view"],
    users: 12,
  },
  {
    id: "3",
    name: "Operator",
    permissions: ["operator.view", "booking.view", "booking.update"],
    users: 48,
  },
  {
    id: "4",
    name: "Customer Support",
    permissions: ["booking.view", "booking.update", "customer.view", "customer.manage"],
    users: 8,
  },
  {
    id: "5",
    name: "Finance Manager",
    permissions: ["finance.view", "finance.manage", "report.view"],
    users: 5,
  },
]

export default function SecurityPage() {
  const { toast } = useToast()
  const [mfaRequired, setMfaRequired] = useState(true)
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true,
    expiryDays: 90,
  })

  const handleSaveAuthentication = () => {
    toast({
      title: "Authentication settings saved",
      description: "Authentication settings have been updated successfully",
    })
  }

  const handleSaveRoles = () => {
    toast({
      title: "Role settings saved",
      description: "Role settings have been updated successfully",
    })
  }

  const handleSaveAudit = () => {
    toast({
      title: "Audit settings saved",
      description: "Audit settings have been updated successfully",
    })
  }

  const handleClearLogs = () => {
    toast({
      title: "Logs cleared",
      description: "Security logs have been cleared successfully",
    })
  }

  return (
    <SidebarWrapper>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">Security Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Security Report
            </Button>
            <Button size="sm">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Security Scan
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue="authentication" className="space-y-4">
            <TabsList>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              <TabsTrigger value="encryption">Encryption</TabsTrigger>
            </TabsList>

            <TabsContent value="authentication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Settings</CardTitle>
                  <CardDescription>Configure authentication and password policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Multi-Factor Authentication</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="mfa-required">Require MFA</Label>
                        <p className="text-sm text-muted-foreground">
                          Require multi-factor authentication for all users
                        </p>
                      </div>
                      <Switch id="mfa-required" checked={mfaRequired} onCheckedChange={setMfaRequired} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mfa-methods">MFA Methods</Label>
                      <div className="flex flex-col space-y-2">
                        {[
                          { id: "sms", name: "SMS", enabled: true },
                          { id: "email", name: "Email", enabled: true },
                          { id: "authenticator", name: "Authenticator App", enabled: true },
                          { id: "biometric", name: "Biometric", enabled: false },
                        ].map((method) => (
                          <div key={method.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id={method.id} defaultChecked={method.enabled} />
                              <Label htmlFor={method.id}>{method.name}</Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password Policy</h3>

                    <div className="space-y-2">
                      <Label htmlFor="min-length">Minimum Password Length</Label>
                      <Input
                        id="min-length"
                        type="number"
                        value={passwordPolicy.minLength}
                        onChange={(e) =>
                          setPasswordPolicy({ ...passwordPolicy, minLength: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-uppercase">Require Uppercase</Label>
                        <p className="text-sm text-muted-foreground">Require at least one uppercase letter</p>
                      </div>
                      <Switch
                        id="require-uppercase"
                        checked={passwordPolicy.requireUppercase}
                        onCheckedChange={(checked) =>
                          setPasswordPolicy({ ...passwordPolicy, requireUppercase: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-lowercase">Require Lowercase</Label>
                        <p className="text-sm text-muted-foreground">Require at least one lowercase letter</p>
                      </div>
                      <Switch
                        id="require-lowercase"
                        checked={passwordPolicy.requireLowercase}
                        onCheckedChange={(checked) =>
                          setPasswordPolicy({ ...passwordPolicy, requireLowercase: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-numbers">Require Numbers</Label>
                        <p className="text-sm text-muted-foreground">Require at least one number</p>
                      </div>
                      <Switch
                        id="require-numbers"
                        checked={passwordPolicy.requireNumbers}
                        onCheckedChange={(checked) => setPasswordPolicy({ ...passwordPolicy, requireNumbers: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-special">Require Special Characters</Label>
                        <p className="text-sm text-muted-foreground">Require at least one special character</p>
                      </div>
                      <Switch
                        id="require-special"
                        checked={passwordPolicy.requireSpecial}
                        onCheckedChange={(checked) => setPasswordPolicy({ ...passwordPolicy, requireSpecial: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiry-days">Password Expiry (days)</Label>
                      <Input
                        id="expiry-days"
                        type="number"
                        value={passwordPolicy.expiryDays}
                        onChange={(e) =>
                          setPasswordPolicy({ ...passwordPolicy, expiryDays: Number.parseInt(e.target.value) })
                        }
                      />
                      <p className="text-sm text-muted-foreground">
                        Number of days before password expires (0 for never)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login Attempts</h3>

                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Maximum Login Attempts</Label>
                      <Input id="max-attempts" type="number" defaultValue="5" />
                      <p className="text-sm text-muted-foreground">
                        Number of failed login attempts before account lockout
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                      <Input id="lockout-duration" type="number" defaultValue="30" />
                      <p className="text-sm text-muted-foreground">
                        Duration of account lockout after maximum failed attempts
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveAuthentication}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">System Roles</h3>
                    <Button size="sm">
                      <UserCog className="mr-2 h-4 w-4" />
                      Add New Role
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role Name</TableHead>
                          <TableHead>Users</TableHead>
                          <TableHead>Permissions</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userRoles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell className="font-medium">{role.name}</TableCell>
                            <TableCell>{role.users}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.length > 3 ? (
                                  <>
                                    {role.permissions.slice(0, 2).map((permission, index) => (
                                      <Badge key={index} variant="outline" className="bg-secondary/50">
                                        {permission}
                                      </Badge>
                                    ))}
                                    <Badge variant="outline" className="bg-secondary/50">
                                      +{role.permissions.length - 2} more
                                    </Badge>
                                  </>
                                ) : (
                                  role.permissions.map((permission, index) => (
                                    <Badge key={index} variant="outline" className="bg-secondary/50">
                                      {permission}
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Permission Settings</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="strict-permissions">Strict Permission Enforcement</Label>
                        <p className="text-sm text-muted-foreground">
                          Deny access by default unless explicitly granted
                        </p>
                      </div>
                      <Switch id="strict-permissions" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="role-inheritance">Role Inheritance</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow roles to inherit permissions from parent roles
                        </p>
                      </div>
                      <Switch id="role-inheritance" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveRoles}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>View and manage security audit logs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">Security Events</h3>
                      <p className="text-sm text-muted-foreground">Recent security events and activities</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Logs
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleClearLogs}>
                        <X className="mr-2 h-4 w-4" />
                        Clear Logs
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Severity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {securityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>{log.event}</TableCell>
                            <TableCell>{log.user}</TableCell>
                            <TableCell>{log.ip}</TableCell>
                            <TableCell>{log.timestamp}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  log.severity === "high"
                                    ? "bg-red-500/10 text-red-500"
                                    : log.severity === "medium"
                                      ? "bg-yellow-500/10 text-yellow-500"
                                      : "bg-green-500/10 text-green-500"
                                }
                              >
                                {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Audit Settings</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="log-login-attempts">Log Login Attempts</Label>
                        <p className="text-sm text-muted-foreground">Record all login attempts, successful or failed</p>
                      </div>
                      <Switch id="log-login-attempts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="log-data-access">Log Data Access</Label>
                        <p className="text-sm text-muted-foreground">Record all sensitive data access events</p>
                      </div>
                      <Switch id="log-data-access" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="log-config-changes">Log Configuration Changes</Label>
                        <p className="text-sm text-muted-foreground">Record all system configuration changes</p>
                      </div>
                      <Switch id="log-config-changes" defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="log-retention">Log Retention Period (days)</Label>
                      <Input id="log-retention" type="number" defaultValue="90" />
                      <p className="text-sm text-muted-foreground">Number of days to retain audit logs</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveAudit}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="encryption" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Encryption Settings</CardTitle>
                  <CardDescription>Configure data encryption and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Encryption Status</AlertTitle>
                    <AlertDescription>
                      All sensitive data is currently encrypted using AES-256 encryption.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Encryption</h3>

                    <div className="space-y-2">
                      <Label>Encryption Strength</Label>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">AES-256</span>
                          <span className="text-sm font-medium">Very Strong</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="encrypt-data-at-rest">Encrypt Data at Rest</Label>
                        <p className="text-sm text-muted-foreground">Encrypt all stored data</p>
                      </div>
                      <Switch id="encrypt-data-at-rest" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="encrypt-data-in-transit">Encrypt Data in Transit</Label>
                        <p className="text-sm text-muted-foreground">Enforce HTTPS for all connections</p>
                      </div>
                      <Switch id="encrypt-data-in-transit" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="encrypt-backups">Encrypt Backups</Label>
                        <p className="text-sm text-muted-foreground">Encrypt all system backups</p>
                      </div>
                      <Switch id="encrypt-backups" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Management</h3>

                    <div className="space-y-2">
                      <Label htmlFor="key-rotation">Key Rotation Period (days)</Label>
                      <Input id="key-rotation" type="number" defaultValue="90" />
                      <p className="text-sm text-muted-foreground">Number of days before encryption keys are rotated</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-key-rotation">Automatic Key Rotation</Label>
                        <p className="text-sm text-muted-foreground">Automatically rotate encryption keys</p>
                      </div>
                      <Switch id="auto-key-rotation" defaultChecked />
                    </div>

                    <Button variant="outline" className="w-full">
                      <Lock className="mr-2 h-4 w-4" />
                      Rotate Encryption Keys Now
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarWrapper>
  )
}
