'use client'

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Archive,
  ArchiveX,
  Forward,
  Inbox,
  MessagesSquare,
  Search,
  Star,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MessageDialog } from "@/components/messages/message-dialog"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"

// Mock data for messages
const initialMessages = [
  {
    id: 1,
    sender: "John Smith",
    email: "john.smith@example.com",
    subject: "Order #1234 Inquiry",
    preview: "I have a question about my recent order...",
    date: "2024-03-15T10:30:00",
    status: "unread",
    category: "support",
    isStarred: false,
    isArchived: false
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Product Availability",
    preview: "When will the wireless headphones be back in stock?",
    date: "2024-03-15T09:15:00",
    status: "read",
    category: "inquiry",
    isStarred: false,
    isArchived: false
  },
  {
    id: 3,
    sender: "Mike Wilson",
    email: "mike.wilson@example.com",
    subject: "Bulk Order Request",
    preview: "We're interested in placing a bulk order for...",
    date: "2024-03-14T16:45:00",
    status: "read",
    category: "sales",
    isStarred: false,
    isArchived: false
  },
  {
    id: 4,
    sender: "Emma Davis",
    email: "emma.d@example.com",
    subject: "Return Request #5678",
    preview: "I would like to initiate a return for my recent purchase...",
    date: "2024-03-14T14:20:00",
    status: "unread",
    category: "support",
    isStarred: false,
    isArchived: false
  },
  {
    id: 5,
    sender: "Alex Thompson",
    email: "alex.t@example.com",
    subject: "Partnership Opportunity",
    preview: "I represent a company that would be interested in...",
    date: "2024-03-14T11:00:00",
    status: "read",
    category: "business",
    isStarred: false,
    isArchived: false
  }
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === "all" || message.category === filter
    const isNotArchived = !message.isArchived

    return matchesSearch && matchesFilter && isNotArchived
  })

  const stats = {
    total: messages.filter(m => !m.isArchived).length,
    unread: messages.filter(m => m.status === "unread" && !m.isArchived).length,
    support: messages.filter(m => m.category === "support" && !m.isArchived).length,
    sales: messages.filter(m => m.category === "sales" && !m.isArchived).length
  }

  const handleMessageClick = (message: typeof messages[0]) => {
    setSelectedMessage(message)
    setDialogOpen(true)
    if (message.status === "unread") {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, status: "read" } : m
      ))
    }
  }

  const handleStar = (e: React.MouseEvent, messageId: number) => {
    e.stopPropagation()
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, isStarred: !m.isStarred } : m
    ))
    toast({
      description: "Message status updated",
    })
  }

  const handleArchive = (e: React.MouseEvent, messageId: number) => {
    e.stopPropagation()
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, isArchived: true } : m
    ))
    toast({
      description: "Message archived",
    })
  }

  const handleDelete = (e: React.MouseEvent, messageId: number) => {
    e.stopPropagation()
    setMessages(messages.filter(m => m.id !== messageId))
    toast({
      description: "Message deleted",
      variant: "destructive"
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your communications
          </p>
        </div>
        <Button>
          <MessagesSquare className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <MessagesSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unread}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.support}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <Forward className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sales}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="inquiry">Inquiries</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            {filteredMessages.length} messages found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.map(message => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold truncate">
                      {message.sender}
                    </p>
                    {message.status === "unread" && (
                      <Badge>New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {message.subject}
                  </p>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {message.preview}
                  </p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {message.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(message.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => handleStar(e, message.id)}
                      className={message.isStarred ? "text-yellow-400" : ""}
                    >
                      <Star className="h-4 w-4" fill={message.isStarred ? "currentColor" : "none"} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => handleArchive(e, message.id)}
                    >
                      <ArchiveX className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => handleDelete(e, message.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MessageDialog 
        message={selectedMessage}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
} 