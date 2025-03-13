'use client'

import { useState, Suspense } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, MoreHorizontal, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCustomers } from "@/store/customers"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UpdateCustomerDialog } from "./update-customer-dialog"
import { Button } from "@/components/ui/button"

function CustomersTableContent() {
  const customers = useCustomers((state) => state.customers)
  const deleteCustomer = useCustomers((state) => state.deleteCustomer)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const timeFilter = searchParams.get('time') || '30'
  const spentFilter = searchParams.get('spent') || '$0-$1000'

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply time filter
    let matchesTime = true
    if (timeFilter !== 'all') {
      const days = parseInt(timeFilter)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      const joinDate = new Date(customer.joinDate)
      matchesTime = joinDate >= cutoffDate
    }

    // Apply spent filter
    let matchesSpent = true
    if (spentFilter) {
      const [min, max] = spentFilter.split('-').map(v => 
        v === 'inf' ? Infinity : parseFloat(v.replace('$', ''))
      )
      const amount = parseFloat(customer.totalSpent.replace('$', '').replace(',', ''))
      matchesSpent = amount >= min && amount < max
    }

    return matchesSearch && matchesTime && matchesSpent
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredCustomers.length} customers found
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="text-center">Refunds</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.email}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Star
                    className={`w-4 h-4 ${
                      customer.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={customer.image} />
                    <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {customer.name}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`fi fi-${customer.countryCode.toLowerCase()}`}></span>
                    {customer.location}
                  </div>
                </TableCell>
                <TableCell className="text-center">{customer.orders}</TableCell>
                <TableCell className="text-blue-500">{customer.lastOrder}</TableCell>
                <TableCell className="text-right text-green-600">{customer.totalSpent}</TableCell>
                <TableCell className="text-center">{customer.refunds}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setUpdateDialogOpen(true)
                        }}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => deleteCustomer(customer.email)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedCustomer && (
        <UpdateCustomerDialog
          customer={selectedCustomer}
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        />
      )}
    </div>
  )
}

export function CustomersTable() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading customer data...</div>}>
      <CustomersTableContent />
    </Suspense>
  )
}
