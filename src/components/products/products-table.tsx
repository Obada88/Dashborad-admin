'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Search, Star } from "lucide-react"
import { useProducts } from "@/store/products"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UpdateProductDialog } from "./update-product-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ProductsTable() {
  const products = useProducts((state) => state.products)
  const deleteProduct = useProducts((state) => state.deleteProduct)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category') || 'all'
  const stockFilter = searchParams.get('stock') || 'all'

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply category filter
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter

    // Apply stock filter
    const matchesStock = stockFilter === 'all' || product.status === stockFilter

    return matchesSearch && matchesCategory && matchesStock
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800'
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredProducts.length} products found
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.description}</div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right font-medium">{product.price}</TableCell>
                <TableCell className="text-center">{product.stock}</TableCell>
                <TableCell className="text-center">
                  <Badge className={getStatusColor(product.status)} variant="secondary">
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </TableCell>
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
                          setSelectedProduct(product)
                          setUpdateDialogOpen(true)
                        }}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => deleteProduct(product.id)}
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
      {selectedProduct && (
        <UpdateProductDialog
          product={selectedProduct}
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        />
      )}
    </div>
  )
} 