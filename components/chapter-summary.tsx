"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ChapterSummaryProps {
  chapter: {
    number: number
    title: string
    summary: string
  }
  isExpanded: boolean
  onToggle: () => void
}

export function ChapterSummary({ chapter, isExpanded, onToggle }: ChapterSummaryProps) {
  return (
    <Card className="p-5 bg-[#eef3f7] border-[#d6e2eb] shadow-sm rounded-xl">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-serif text-[#1e62ab]">
            Chapter {chapter.number}: {chapter.title}
          </h3>
          <p className={`text-sm text-[#5a7d9a] mt-2 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
            {chapter.summary}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#1e62ab] hover:text-[#184e89] hover:bg-[#d6e2eb] -mt-1 -mr-2 h-8 w-8 rounded-full"
          onClick={onToggle}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  )
}

