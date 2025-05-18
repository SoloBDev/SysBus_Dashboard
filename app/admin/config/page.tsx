"use client"

import { useState } from "react"
import { SidebarWrapper } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ConfigPage() {
  const { toast } = useToast()
  const [commissionRate, setCommissionRate] = useState(10)
  const [bookingFee, setBookingFee] = useState(25)
  const [cancellationFee, setCancellationFee] = useState(15)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [autoApproval, setAutoApproval] = useState(false)

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully",
    })
  }

  const handleSaveFinancial = () => {
    toast({
      title: "Financial settings saved",
      description: "Financial settings have been updated successfully",
    })
  }

  const handleSaveSystem = () => {
    toast({
      title: "System settings saved",
      description: "System settings have been updated successfully",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Notification settings have been updated successfully",
    })
  }

  const handleMaintenanceToggle = () => {
    const newValue = !maintenanceMode
    setMaintenanceMode(newValue)

    if (newValue) {
      toast({
        title: "Maintenance mode enabled",
        description: "The system is now in maintenance mode. Users will see a maintenance page.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Maintenance mode disabled",
        description: "The system is now back online.",
      })
    }
  }

  return (
    <SidebarWrapper>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">Platform Configuration</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure general platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="Addis Bus System" />
                    <p className="text-sm text-muted-foreground">This name will be displayed throughout the platform</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Support Email</Label>
                    <Input id="contact-email" type="email" defaultValue="support@addisbus.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Support Phone</Label>
                    <Input id="contact-phone" defaultValue="+251 11 123 4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="Africa/Addis_Ababa">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Addis_Ababa">Africa/Addis_Ababa (EAT)</SelectItem>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                        <SelectItem value="Africa/Cairo">Africa/Cairo (EET)</SelectItem>
                        <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="am">Amharic</SelectItem>
                        <SelectItem value="om">Oromo</SelectItem>
                        <SelectItem value="ti">Tigrinya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="ETB">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveGeneral}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Settings</CardTitle>
                  <CardDescription>Configure commission rates and fees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="commission-rate">Platform Commission Rate (%)</Label>
                      <span className="text-sm font-medium">{commissionRate}%</span>
                    </div>
                    <Slider
                      id="commission-rate"
                      min={0}
                      max={30}
                      step={0.5}
                      value={[commissionRate]}
                      onValueChange={(value) => setCommissionRate(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">Commission percentage taken from each booking</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="booking-fee">Booking Fee (ETB)</Label>
                      <span className="text-sm font-medium">ETB {bookingFee}</span>
                    </div>
                    <Slider
                      id="booking-fee"
                      min={0}
                      max={100}
                      step={5}
                      value={[bookingFee]}
                      onValueChange={(value) => setBookingFee(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">Fixed fee added to each booking</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="cancellation-fee">Cancellation Fee (%)</Label>
                      <span className="text-sm font-medium">{cancellationFee}%</span>
                    </div>
                    <Slider
                      id="cancellation-fee"
                      min={0}
                      max={50}
                      step={5}
                      value={[cancellationFee]}
                      onValueChange={(value) => setCancellationFee(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">
                      Percentage of ticket price charged for cancellations
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-methods">Enabled Payment Methods</Label>
                    <div className="flex flex-col space-y-2">
                      {[
                        { id: "telebirr", name: "TeleBirr", enabled: true },
                        { id: "cbe-birr", name: "CBE Birr", enabled: true },
                        { id: "amole", name: "Amole", enabled: true },
                        { id: "cash", name: "Cash", enabled: true },
                        { id: "credit-card", name: "Credit Card", enabled: false },
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

                  <div className="space-y-2">
                    <Label htmlFor="payout-schedule">Payout Schedule</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="payout-schedule">
                        <SelectValue placeholder="Select payout schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">How often tenants receive their payments</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveFinancial}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {maintenanceMode && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Maintenance Mode Active</AlertTitle>
                      <AlertDescription>
                        The system is currently in maintenance mode. All users except administrators will see a
                        maintenance page.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable to put the system in maintenance mode</p>
                    </div>
                    <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={handleMaintenanceToggle} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed error messages and logging</p>
                    </div>
                    <Switch id="debug-mode" checked={debugMode} onCheckedChange={setDebugMode} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-approval">Auto-approve Tenants</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve new tenant registrations</p>
                    </div>
                    <Switch id="auto-approval" checked={autoApproval} onCheckedChange={setAutoApproval} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cache-ttl">Cache TTL (minutes)</Label>
                    <Input id="cache-ttl" type="number" defaultValue="60" />
                    <p className="text-sm text-muted-foreground">Time to live for cached data in minutes</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                    <p className="text-sm text-muted-foreground">User session timeout in minutes of inactivity</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      defaultValue="We're currently performing scheduled maintenance. Please check back soon."
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">Message displayed during maintenance mode</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSystem}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-new-tenant">New Tenant Registration</Label>
                        <p className="text-sm text-muted-foreground">Send email when a new tenant registers</p>
                      </div>
                      <Switch id="email-new-tenant" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-tenant-approval">Tenant Approval</Label>
                        <p className="text-sm text-muted-foreground">Send email when a tenant is approved</p>
                      </div>
                      <Switch id="email-tenant-approval" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-system-alerts">System Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send email for critical system alerts</p>
                      </div>
                      <Switch id="email-system-alerts" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SMS Notifications</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-system-down">System Downtime</Label>
                        <p className="text-sm text-muted-foreground">Send SMS for system downtime</p>
                      </div>
                      <Switch id="sms-system-down" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-security-alerts">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send SMS for security incidents</p>
                      </div>
                      <Switch id="sms-security-alerts" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inapp-tenant-activity">Tenant Activity</Label>
                        <p className="text-sm text-muted-foreground">Show notifications for tenant activity</p>
                      </div>
                      <Switch id="inapp-tenant-activity" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inapp-system-updates">System Updates</Label>
                        <p className="text-sm text-muted-foreground">Show notifications for system updates</p>
                      </div>
                      <Switch id="inapp-system-updates" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inapp-revenue-alerts">Revenue Alerts</Label>
                        <p className="text-sm text-muted-foreground">Show notifications for revenue milestones</p>
                      </div>
                      <Switch id="inapp-revenue-alerts" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Notification Email Recipients</Label>
                    <Input id="notification-email" defaultValue="admin@addisbus.com, alerts@addisbus.com" />
                    <p className="text-sm text-muted-foreground">
                      Comma-separated list of email addresses to receive notifications
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarWrapper>
  )
}
