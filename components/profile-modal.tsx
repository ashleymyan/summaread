"use client"

import { BookOpen, Clock, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface ProfileModalProps {
  onClose: () => void
}

export function ProfileModal({ onClose }: ProfileModalProps) {
  const userStats = {
    booksRead: 12,
    hoursRead: 48,
    streak: 7,
    level: 3,
    progress: 65,
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-primary font-serif text-xl">Your Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <Avatar className="h-24 w-24 border-4 border-border">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-serif">JD</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-xl font-serif text-primary">Jane Doe</h3>
            <p className="text-muted-foreground">Avid Reader</p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Level {userStats.level}</span>
              <span>Level {userStats.level + 1}</span>
            </div>
            <Progress value={userStats.progress} className="h-2 bg-muted" indicatorClassName="bg-accent" />
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xl font-serif text-primary">{userStats.booksRead}</p>
              <p className="text-xs text-muted-foreground">Books Read</p>
            </div>

            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xl font-serif text-primary">{userStats.hoursRead}</p>
              <p className="text-xs text-muted-foreground">Hours Read</p>
            </div>

            <div className="bg-background p-4 rounded-lg border border-border text-center">
              <Award className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xl font-serif text-primary">{userStats.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

