'use client'

import { useProducts } from "@/store/products"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function AnalyticsPage() {
  const products = useProducts((state) => state.products)
  const [timeRange, setTimeRange] = useState('7d')

  const totalProducts = products.length
  const lowStockProducts = products.filter(p => p.status === 'Low Stock').length
  const outOfStockProducts = products.filter(p => p.status === 'Out of Stock').length
  const totalValue = products.reduce((sum, product) => {
    const price = parseFloat(product.price.replace('$', ''))
    return sum + (price * product.stock)
  }, 0)

  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  const categories = [...new Set(products.map(p => p.category))]
  const categoryStats = categories.map(category => ({
    name: category,
    count: products.filter(p => p.category === category).length,
    value: products
      .filter(p => p.category === category)
      .reduce((sum, product) => {
        const price = parseFloat(product.price.replace('$', ''))
        return sum + (price * product.stock)
      }, 0)
  }))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Product performance and inventory metrics
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockProducts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best rated products in your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{product.rating} ★</Badge>
                    <Badge variant={product.status === 'In Stock' ? 'default' : 'destructive'}>
                      {product.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Overview</CardTitle>
            <CardDescription>Products and value by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map(stat => (
                <div key={stat.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stat.name}</p>
                    <p className="text-sm text-muted-foreground">{stat.count} products</p>
                  </div>
                  <div>
                    <Badge variant="secondary">${stat.value.toFixed(2)}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 