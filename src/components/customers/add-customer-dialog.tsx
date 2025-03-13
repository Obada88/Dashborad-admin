'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCustomers } from "@/store/customers"

export function AddCustomerDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    totalSpent: "",
    orders: ""
  })
  const addCustomer = useCustomers((state) => state.addCustomer)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCustomer({
      ...formData,
      orders: parseInt(formData.orders) || 0,
      totalSpent: formData.totalSpent ? `$${formData.totalSpent}` : "$0.00"
    })
    setFormData({ name: "", email: "", location: "", totalSpent: "", orders: "" })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your database. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Customer name"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="customer@example.com"
                type="email"
                className="col-span-3"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                placeholder="City, Country"
                className="col-span-3"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalSpent" className="text-right">
                Total Spent
              </Label>
              <Input
                id="totalSpent"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                className="col-span-3"
                value={formData.totalSpent}
                onChange={(e) => setFormData({ ...formData, totalSpent: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orders" className="text-right">
                Orders
              </Label>
              <Input
                id="orders"
                placeholder="0"
                type="number"
                min="0"
                className="col-span-3"
                value={formData.orders}
                onChange={(e) => setFormData({ ...formData, orders: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 