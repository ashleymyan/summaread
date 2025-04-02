"use client"

import { FileUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface UploadModalProps {
  onClose: () => void
}

export function UploadModal({ onClose }: UploadModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-primary font-serif text-xl">Add a new book</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-start h-14 border-border hover:border-accent hover:bg-accent/10 bg-background rounded-lg"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <FileUp className="mr-3 h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Select From File</span>
            <input id="file-upload" type="file" className="hidden" />
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start h-14 border-border hover:border-accent hover:bg-accent/10 bg-background rounded-lg"
          >
            <Search className="mr-3 h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Search in Library</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

