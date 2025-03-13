import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Customer {
  name: string
  email: string
  location: string
  countryCode: string
  orders: number
  lastOrder: string
  totalSpent: string
  refunds: string
  isFavorite: boolean
  image: string
  joinDate: string
}

interface CustomersStore {
  customers: Customer[]
  addCustomer: (customer: Partial<Customer>) => void
  deleteCustomer: (email: string) => void
  updateCustomer: (email: string, updatedCustomer: Partial<Customer>) => void
}

const initialCustomers = [
  {
    name: "Patricia Semklo",
    email: "patricia.semklo@app.com",
    location: "London, UK",
    countryCode: "GB",
    orders: 24,
    lastOrder: "#123567",
    totalSpent: "$2,890.66",
    refunds: "-",
    isFavorite: true,
    image: "/avatars/patricia.jpg",
    joinDate: "2024-01-15"
  },
  {
    name: "Dominik Lamakani",
    email: "dominik.lamakani@gmail.com",
    location: "Dortmund, DE",
    countryCode: "DE",
    orders: 77,
    lastOrder: "#779912",
    totalSpent: "$14,767.04",
    refunds: "4",
    isFavorite: false,
    image: "/avatars/dominik.jpg",
    joinDate: "2023-11-20"
  },
  {
    name: "Ivan Mesaros",
    email: "imivanmes@gmail.com",
    location: "Paris, FR",
    countryCode: "FR",
    orders: 44,
    lastOrder: "#889924",
    totalSpent: "$4,996.00",
    refunds: "1",
    isFavorite: true,
    image: "/avatars/ivan.jpg",
    joinDate: "2023-08-05"
  },
  {
    name: "Maria Martinez",
    email: "martinezhome@gmail.com",
    location: "Bologna, IT",
    countryCode: "IT",
    orders: 29,
    lastOrder: "#897726",
    totalSpent: "$3,220.66",
    refunds: "2",
    isFavorite: false,
    image: "/avatars/maria.jpg",
    joinDate: "2024-02-01"
  },
  {
    name: "Vicky Jung",
    email: "itsvicky@contact.com",
    location: "London, UK",
    countryCode: "GB",
    orders: 22,
    lastOrder: "#123567",
    totalSpent: "$2,890.66",
    refunds: "-",
    isFavorite: true,
    image: "/avatars/vicky.jpg",
    joinDate: "2023-12-10"
  }
]

export const useCustomers = create(
  persist<CustomersStore>(
    (set) => ({
      customers: initialCustomers,
      addCustomer: (newCustomer) => set((state) => ({
        customers: [...state.customers, {
          ...newCustomer,
          orders: parseInt(newCustomer.orders?.toString() || '0'),
          lastOrder: "-",
          totalSpent: typeof newCustomer.totalSpent === 'string' && newCustomer.totalSpent.startsWith('$') 
            ? newCustomer.totalSpent 
            : `$${parseFloat(newCustomer.totalSpent?.toString() || '0').toFixed(2)}`,
          refunds: "-",
          isFavorite: false,
          image: "/avatars/placeholder.jpg",
          countryCode: newCustomer.location?.split(", ")[1] === "UK" ? "GB" : 
                      newCustomer.location?.split(", ")[1] || "US",
          joinDate: new Date().toISOString().split('T')[0]
        } as Customer]
      })),
      deleteCustomer: (email) => set((state) => ({
        customers: state.customers.filter(customer => customer.email !== email)
      })),
      updateCustomer: (email, updatedCustomer) => set((state) => ({
        customers: state.customers.map(customer => 
          customer.email === email
            ? {
                ...customer,
                ...updatedCustomer,
                totalSpent: updatedCustomer.totalSpent
                  ? (updatedCustomer.totalSpent.startsWith('$')
                    ? updatedCustomer.totalSpent
                    : `$${parseFloat(updatedCustomer.totalSpent).toFixed(2)}`)
                  : customer.totalSpent,
                orders: updatedCustomer.orders !== undefined
                  ? parseInt(updatedCustomer.orders.toString())
                  : customer.orders,
                countryCode: updatedCustomer.location
                  ? (updatedCustomer.location.split(", ")[1] === "UK"
                    ? "GB"
                    : updatedCustomer.location.split(", ")[1] || customer.countryCode)
                  : customer.countryCode
              }
            : customer
        )
      }))
    }),
    {
      name: 'customers-storage',
    }
  )
) 