'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface Message {
  id: number
  sender: string
  email: string
  subject: string
  preview: string
  date: string
  status: string
  category: string
}

interface MessageDialogProps {
  message: Message | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MessageDialog({ message, open, onOpenChange }: MessageDialogProps) {
  if (!message) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle>{message.subject}</DialogTitle>
              <Badge variant="secondary">{message.category}</Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDate(message.date)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            From: {message.sender} &lt;{message.email}&gt;
          </div>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {message.preview}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 