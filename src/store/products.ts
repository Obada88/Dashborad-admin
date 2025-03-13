import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  description: string
  price: string
  category: string
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  rating: number
  image: string
  createdAt: string
}

interface ProductsStore {
  products: Product[]
  addProduct: (product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void
}

const initialProducts = [
  {
    id: "PROD-1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: "$299.99",
    category: "Electronics",
    stock: 45,
    status: "In Stock",
    rating: 4.5,
    image: "/products/headphones.jpg",
    createdAt: "2024-01-15"
  },
  {
    id: "PROD-2",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring",
    price: "$199.99",
    category: "Wearables",
    stock: 8,
    status: "Low Stock",
    rating: 4.8,
    image: "/products/watch.jpg",
    createdAt: "2024-02-01"
  },
  {
    id: "PROD-3",
    name: "Portable Power Bank",
    description: "20000mAh high-capacity portable charger",
    price: "$49.99",
    category: "Accessories",
    stock: 0,
    status: "Out of Stock",
    rating: 4.2,
    image: "/products/powerbank.jpg",
    createdAt: "2024-01-20"
  },
  {
    id: "PROD-4",
    name: "Wireless Gaming Mouse",
    description: "RGB gaming mouse with programmable buttons",
    price: "$79.99",
    category: "Gaming",
    stock: 32,
    status: "In Stock",
    rating: 4.7,
    image: "/products/mouse.jpg",
    createdAt: "2024-02-10"
  },
  {
    id: "PROD-5",
    name: "4K Webcam",
    description: "Ultra HD webcam for professional streaming",
    price: "$159.99",
    category: "Electronics",
    stock: 15,
    status: "In Stock",
    rating: 4.4,
    image: "/products/webcam.jpg",
    createdAt: "2024-01-25"
  }
] as Product[]

export const useProducts = create(
  persist<ProductsStore>(
    (set) => ({
      products: initialProducts,
      addProduct: (newProduct) => set((state) => ({
        products: [...state.products, {
          ...newProduct,
          id: `PROD-${state.products.length + 1}`,
          price: newProduct.price?.startsWith('$') 
            ? newProduct.price 
            : `$${parseFloat(newProduct.price || '0').toFixed(2)}`,
          stock: parseInt(newProduct.stock?.toString() || '0'),
          status: getStatus(parseInt(newProduct.stock?.toString() || '0')),
          rating: 0,
          image: newProduct.image || "/products/placeholder.jpg",
          createdAt: new Date().toISOString().split('T')[0]
        } as Product]
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(product => product.id !== id)
      })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map(product => 
          product.id === id
            ? {
                ...product,
                ...updatedProduct,
                price: updatedProduct.price
                  ? (updatedProduct.price.startsWith('$')
                    ? updatedProduct.price
                    : `$${parseFloat(updatedProduct.price).toFixed(2)}`)
                  : product.price,
                stock: updatedProduct.stock !== undefined
                  ? parseInt(updatedProduct.stock.toString())
                  : product.stock,
                status: updatedProduct.stock !== undefined
                  ? getStatus(parseInt(updatedProduct.stock.toString()))
                  : product.status
              }
            : product
        )
      }))
    }),
    {
      name: 'products-storage',
    }
  )
)

function getStatus(stock: number): Product['status'] {
  if (stock <= 0) return 'Out of Stock'
  if (stock <= 10) return 'Low Stock'
  return 'In Stock'
} 