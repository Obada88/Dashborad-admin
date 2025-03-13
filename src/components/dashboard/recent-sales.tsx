import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentSales = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    amount: "$1,999.00",
    status: "Completed",
    initials: "JS"
  },
  {
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    amount: "$1,499.00",
    status: "Processing",
    initials: "SD"
  },
  {
    name: "Michael Brown",
    email: "michael.b@example.com",
    amount: "$2,299.00",
    status: "Completed",
    initials: "MB"
  },
  {
    name: "Lisa Wilson",
    email: "lisa.w@example.com",
    amount: "$899.00",
    status: "Pending",
    initials: "LW"
  }
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <div className="text-sm">{sale.amount}</div>
            <div className={`text-xs ${
              sale.status === "Completed" ? "text-green-500" : 
              sale.status === "Processing" ? "text-blue-500" : "text-yellow-500"
            }`}>
              {sale.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 