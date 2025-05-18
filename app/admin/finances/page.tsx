"use client"

import { useState } from "react"
import { SidebarWrapper } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { addDays } from "date-fns"
import { Download, FileDown, Filter, RefreshCw, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock data for transactions
const transactions = [
  {
    id: "1",
    date: "2025-05-18",
    description: "Commission from Abay Bus",
    amount: 12500.75,
    status: "completed",
    tenant: "Abay Bus",
  },
  {
    id: "2",
    date: "2025-05-17",
    description: "Commission from Selam Bus",
    amount: 8750.5,
    status: "completed",
    tenant: "Selam Bus",
  },
  {
    id: "3",
    date: "2025-05-16",
    description: "Booking fee revenue",
    amount: 4500.25,
    status: "completed",
    tenant: "System",
  },
  {
    id: "4",
    date: "2025-05-15",
    description: "Commission from Ethio Bus",
    amount: 6250.0,
    status: "pending",
    tenant: "Ethio Bus",
  },
  {
    id: "5",
    date: "2025-05-14",
    description: "Cancellation fee revenue",
    amount: 1800.5,
    status: "completed",
    tenant: "System",
  },
]

// Mock data for payouts
const payouts = [
  {
    id: "1",
    date: "2025-05-18",
    tenant: "Abay Bus",
    amount: 112500.25,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "2",
    date: "2025-05-18",
    tenant: "Selam Bus",
    amount: 78750.5,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "3",
    date: "2025-05-17",
    tenant: "Ethio Bus",
    amount: 56250.0,
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "4",
    date: "2025-05-16",
    tenant: "Habesha Bus",
    amount: 28900.75,
    status: "failed",
    method: "Bank Transfer",
  },
  {
    id: "5",
    date: "2025-05-15",
    tenant: "Addis Bus",
    amount: 168750.5,
    status: "completed",
    method: "Bank Transfer",
  },
]

export default function FinancesPage() {
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  // Filter transactions based on search query and status
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.tenant.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleRefreshData = () => {
    toast({
      title: "Data refreshed",
      description: "Financial data has been refreshed",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Export started",
      description: "Financial data export has been initiated",
    })
  }

  return (
    <SidebarWrapper>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">Financial Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button variant="outline" size="icon" onClick={handleRefreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleExportData}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 2,345,678</div>
                <p className="text-xs text-muted-foreground">+12.5% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commission Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 1,234,567</div>
                <p className="text-xs text-muted-foreground">+15.2% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Booking Fee Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 876,543</div>
                <p className="text-xs text-muted-foreground">+8.7% from previous period</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 234,567</div>
                <p className="text-xs text-muted-foreground">3 tenants pending</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Monthly revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <LineChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Revenue Sources</CardTitle>
                    <CardDescription>Revenue breakdown by source</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChart />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Top Performing Tenants</CardTitle>
                    <CardDescription>Tenants generating the most revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { tenant: "Abay Bus", revenue: "ETB 1,245,678", growth: "+12%" },
                        { tenant: "Selam Bus", revenue: "ETB 987,654", growth: "+8%" },
                        { tenant: "Ethio Bus", revenue: "ETB 876,543", growth: "+15%" },
                        { tenant: "Addis Bus", revenue: "ETB 765,432", growth: "-3%" },
                        { tenant: "Habesha Bus", revenue: "ETB 654,321", growth: "+5%" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.tenant}</div>
                            <div className="text-sm text-muted-foreground">{item.revenue}</div>
                          </div>
                          <div className={item.growth.startsWith("+") ? "text-green-500" : "text-red-500"}>
                            {item.growth}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Revenue by Tenant</CardTitle>
                    <CardDescription>Comparison of tenant revenue</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <BarChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View and manage all financial transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search transactions..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Tenant</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No transactions found matching your criteria
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.description}</TableCell>
                              <TableCell>{transaction.tenant}</TableCell>
                              <TableCell className="font-medium">ETB {transaction.amount.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    transaction.status === "completed"
                                      ? "bg-green-500/10 text-green-500"
                                      : transaction.status === "pending"
                                        ? "bg-yellow-500/10 text-yellow-500"
                                        : "bg-red-500/10 text-red-500"
                                  }
                                >
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong>{" "}
                    transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Payouts</CardTitle>
                  <CardDescription>Manage payouts to tenant bus companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search payouts..." className="pl-8" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Tenant</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payouts.map((payout) => (
                          <TableRow key={payout.id}>
                            <TableCell>{payout.date}</TableCell>
                            <TableCell>{payout.tenant}</TableCell>
                            <TableCell className="font-medium">ETB {payout.amount.toFixed(2)}</TableCell>
                            <TableCell>{payout.method}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  payout.status === "completed"
                                    ? "bg-green-500/10 text-green-500"
                                    : payout.status === "pending"
                                      ? "bg-yellow-500/10 text-yellow-500"
                                      : "bg-red-500/10 text-red-500"
                                }
                              >
                                {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>{payouts.length}</strong> payouts
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                  <CardDescription>Generate and download financial reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Revenue Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Detailed breakdown of all revenue sources including commissions, booking fees, and
                          cancellation fees.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Tenant Performance Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Comparative analysis of tenant performance, revenue generation, and growth trends.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Payout Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Summary of all payouts made to tenants, including status and payment methods.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Tax Report</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive tax report for accounting and compliance purposes.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <FileDown className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarWrapper>
  )
}
