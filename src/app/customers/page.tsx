'use client'

import { CustomersTable } from "@/components/customers/customers-table"
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCustomers } from "@/store/customers"
import { useRouter, useSearchParams } from "next/navigation"

export default function CustomersPage() {
  const customers = useCustomers((state) => state.customers)
  const router = useRouter()
  const searchParams = useSearchParams()
  const timeFilter = searchParams.get('time') || '30'
  const spentFilter = searchParams.get('spent') || '$0-$1000'
  
  const getFilteredCount = (days: number, spent: string) => {
    let filtered = customers

    // Apply time filter
    if (days !== -1) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      filtered = filtered.filter(customer => {
        const joinDate = new Date(customer.joinDate)
        return joinDate >= cutoffDate
      })
    }

    // Apply spent filter
    if (spent !== 'all') {
      const [min, max] = spent.split('-').map(v => 
        v === 'inf' ? Infinity : parseFloat(v.replace('$', ''))
      )
      filtered = filtered.filter(customer => {
        const amount = parseFloat(customer.totalSpent.replace('$', '').replace(',', ''))
        return amount >= min && amount < max
      })
    }

    return filtered.length
  }

  const handleTimeFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('time', value)
    router.push(`/customers?${params.toString()}`)
  }

  const handleSpentFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('spent', value)
    router.push(`/customers?${params.toString()}`)
  }

  return (
    <div className="h-full p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-2">
            All Customers <span className="text-gray-500">{customers.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days ({getFilteredCount(7, spentFilter)})</SelectItem>
              <SelectItem value="30">Last 30 Days ({getFilteredCount(30, spentFilter)})</SelectItem>
              <SelectItem value="90">Last 90 Days ({getFilteredCount(90, spentFilter)})</SelectItem>
              <SelectItem value="365">Last Year ({getFilteredCount(365, spentFilter)})</SelectItem>
              <SelectItem value="all">All Time ({getFilteredCount(-1, spentFilter)})</SelectItem>
            </SelectContent>
          </Select>
          <Select value={spentFilter} onValueChange={handleSpentFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Total spent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$0-$1000">$0 - $1,000 ({getFilteredCount(parseInt(timeFilter), '$0-$1000')})</SelectItem>
              <SelectItem value="$1000-$5000">$1,000 - $5,000 ({getFilteredCount(parseInt(timeFilter), '$1000-$5000')})</SelectItem>
              <SelectItem value="$5000-$10000">$5,000 - $10,000 ({getFilteredCount(parseInt(timeFilter), '$5000-$10000')})</SelectItem>
              <SelectItem value="$10000-inf">$10,000+ ({getFilteredCount(parseInt(timeFilter), '$10000-inf')})</SelectItem>
            </SelectContent>
          </Select>
          <AddCustomerDialog />
        </div>
      </div>
      <CustomersTable />
    </div>
  )
} 