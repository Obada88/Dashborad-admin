'use client'

import { Suspense } from "react"
import { ProductsTable } from "@/components/products/products-table"
import { AddProductDialog } from "@/components/products/add-product-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProducts } from "@/store/products"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  "Electronics",
  "Wearables",
  "Gaming",
  "Accessories",
  "Audio",
  "Computers",
  "Mobile",
  "Storage"
]

function ProductsContent() {
  const products = useProducts((state) => state.products)
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category') || 'all'
  const stockFilter = searchParams.get('stock') || 'all'
  
  const getFilteredCount = (category: string, status: string) => {
    return products.filter(product => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesStatus = status === 'all' || product.status === status
      return matchesCategory && matchesStatus
    }).length
  }

  const handleCategoryFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('category', value)
    router.push(`/products?${params.toString()}`)
  }

  const handleStockFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('stock', value)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="h-full p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-2">
            All Products <span className="text-gray-500">{products.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={categoryFilter} onValueChange={handleCategoryFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories ({getFilteredCount('all', stockFilter)})</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category} ({getFilteredCount(category, stockFilter)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={handleStockFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stock status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status ({getFilteredCount(categoryFilter, 'all')})</SelectItem>
              <SelectItem value="In Stock">In Stock ({getFilteredCount(categoryFilter, 'In Stock')})</SelectItem>
              <SelectItem value="Low Stock">Low Stock ({getFilteredCount(categoryFilter, 'Low Stock')})</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock ({getFilteredCount(categoryFilter, 'Out of Stock')})</SelectItem>
            </SelectContent>
          </Select>
          <AddProductDialog />
        </div>
      </div>
      <ProductsTable />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="h-full p-6">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  )
} 
