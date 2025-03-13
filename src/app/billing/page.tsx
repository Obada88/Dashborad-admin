'use client'

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Check } from "lucide-react"

// Mock data for billing history
const billingHistory = [
  {
    id: 1,
    date: "Mar 15, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-001"
  },
  {
    id: 2,
    date: "Feb 15, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-002"
  },
  {
    id: 3,
    date: "Jan 15, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "INV-2024-003"
  }
]

// Mock data for subscription plans
const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals just getting started",
    features: [
      "Up to 10 users",
      "Basic analytics",
      "24-hour support response time",
      "1GB storage"
    ]
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing businesses",
    features: [
      "Up to 100 users",
      "Advanced analytics",
      "4-hour support response time",
      "10GB storage",
      "Custom branding",
      "API access"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Real-time analytics",
      "1-hour support response time",
      "Unlimited storage",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Custom integrations"
    ]
  }
]

export default function BillingPage() {
  const [currentPlan] = useState("Pro")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Badge>Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Pro Plan</div>
            <p className="text-xs text-muted-foreground">Renews on April 15, 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 GB</div>
            <Progress value={42} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">42% of 10GB used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <Progress value={45} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">45% of 100 seats used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$29.00</div>
            <p className="text-xs text-muted-foreground">Due on April 15, 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Your subscription will be charged to this payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <CreditCard className="h-6 w-6" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2024</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => console.log('Update Payment Method clicked')}>Update Payment Method</Button>
        </CardFooter>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your previous invoices and download receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0">
                      {item.invoice}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the best plan for your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-sm font-normal">/month</span>}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={currentPlan === plan.name ? "outline" : "default"}
                  >
                    {currentPlan === plan.name ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 