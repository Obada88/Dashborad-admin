import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { TopCountries } from "@/components/dashboard/top-countries"
import { SalesVolume } from "@/components/dashboard/sales-volume"
import { MetricCard } from "@/components/dashboard/metric-card"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Annual Plan"
          value="$24,790"
          trend="+20.1%"
          description="Total Revenue"
        />
        <MetricCard
          title="Annual Advanced"
          value="$17,460"
          trend="+18.2%"
          description="Total Revenue"
        />
        <MetricCard
          title="Annual Professional"
          value="$9,962"
          trend="+7.1%"
          description="Total Revenue"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <TopCountries />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Volume</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesVolume />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 