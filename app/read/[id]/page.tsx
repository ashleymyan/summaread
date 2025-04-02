"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp, Home, Highlighter, BookMarked, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/dark-mode-provider"

// Sample book content
const bookContent = {
  title: "John's Origins",
  chapter: {
    number: 11,
    title: "John died",
  },
  content: `
    The room fell silent as the doctor delivered the news. John, who had been the pillar of strength for so many, had finally succumbed to his illness. It wasn't unexpected, but the finality of it still shocked everyone present.

    Sarah clutched her hands together, her knuckles turning white. She had been preparing for this moment for months, but now that it had arrived, she felt completely unprepared. How would she tell the children? How would they all move forward without him?

    "He went peacefully," the doctor assured them, his voice gentle. "No pain at the end."

    That was something, at least. John had suffered enough in his final weeks. The cancer had ravaged his once-strong body, leaving him a shadow of his former self. But his mind had remained sharp until the very end, and he had made sure to say his goodbyes.

    Outside the hospital room, life continued as normal. People walked by, unaware that for this small group, the world had just stopped turning. That was the strange thing about death – it was earth-shattering for some, and completely inconsequential for others.

    As they gathered John's belongings, each item seemed to hold a piece of him. His watch, still ticking. His glasses, folded neatly on the bedside table. The book he had been reading, a bookmark placed about halfway through – a story he would never finish.
  `,
}

interface Note {
  id: string
  text: string
  highlightedText?: string
  position?: {
    start: number
    end: number
  }
}

export default function ReadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { theme } = useTheme()
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", text: "I can't believe John died :(" },
    {
      id: "2",
      text: "How will this impact John's family? He had so much to live for, I wonder how everyone will react.",
    },
    { id: "3", text: "That was a creative way to introduce conflict, the author really thought through the plot." },
  ])
  const [newNote, setNewNote] = useState("")
  const [showHighlightNote, setShowHighlightNote] = useState(false)
  const [highlightedText, setHighlightedText] = useState("")
  const [highlightNoteText, setHighlightNoteText] = useState("")
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0 })
  const [contentWithHighlights, setContentWithHighlights] = useState<React.ReactNode[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  // Process the content and add highlights
  useEffect(() => {
    renderContentWithHighlights()
  }, [notes])

  const renderContentWithHighlights = () => {
    const paragraphs = bookContent.content
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => p)
    const highlightedParagraphs = paragraphs.map((paragraph, pIndex) => {
      // Find notes that have highlights in this paragraph
      const highlightedNotes = notes.filter((note) => note.highlightedText && paragraph.includes(note.highlightedText))

      if (highlightedNotes.length === 0) {
        return (
          <p key={pIndex} className="mb-5 leading-relaxed text-foreground font-serif">
            {paragraph}
          </p>
        )
      }

      // Simple implementation - this would need to be more sophisticated for overlapping highlights
      let segments: { text: string; isHighlighted: boolean; noteId?: string }[] = [
        { text: paragraph, isHighlighted: false },
      ]

      highlightedNotes.forEach((note) => {
        if (!note.highlightedText) return

        const newSegments: typeof segments = []

        segments.forEach((segment) => {
          if (segment.isHighlighted) {
            newSegments.push(segment)
            return
          }

          const index = segment.text.indexOf(note.highlightedText)
          if (index === -1) {
            newSegments.push(segment)
            return
          }

          if (index > 0) {
            newSegments.push({
              text: segment.text.substring(0, index),
              isHighlighted: false,
            })
          }

          newSegments.push({
            text: note.highlightedText,
            isHighlighted: true,
            noteId: note.id,
          })

          if (index + note.highlightedText.length < segment.text.length) {
            newSegments.push({
              text: segment.text.substring(index + note.highlightedText.length),
              isHighlighted: false,
            })
          }
        })

        segments = newSegments
      })

      return (
        <p key={pIndex} className="mb-5 leading-relaxed text-foreground font-serif">
          {segments.map((segment, sIndex) =>
            segment.isHighlighted ? (
              <span
                key={sIndex}
                className="bg-[hsl(var(--secondary)/30)] cursor-pointer"
                onClick={() => {
                  // Scroll to the note in the notes panel
                  setShowNotes(true)
                  setTimeout(() => {
                    const noteElement = document.getElementById(`note-${segment.noteId}`)
                    if (noteElement) {
                      noteElement.scrollIntoView({ behavior: "smooth" })
                      noteElement.classList.add("highlight-pulse")
                      setTimeout(() => {
                        noteElement.classList.remove("highlight-pulse")
                      }, 2000)
                    }
                  }, 300)
                }}
              >
                {segment.text}
              </span>
            ) : (
              <span key={sIndex}>{segment.text}</span>
            ),
          )}
        </p>
      )
    })

    setContentWithHighlights(highlightedParagraphs)
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
      return
    }

    const selectedText = selection.toString().trim()
    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      setHighlightedText(selectedText)
      setHighlightPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + window.scrollY,
      })
      setShowHighlightNote(true)
    }
  }

  const addHighlightNote = () => {
    if (highlightNoteText.trim() && highlightedText.trim()) {
      const newNoteItem: Note = {
        id: Date.now().toString(),
        text: highlightNoteText,
        highlightedText: highlightedText,
      }

      setNotes([...notes, newNoteItem])
      setHighlightNoteText("")
      setHighlightedText("")
      setShowHighlightNote(false)
      setShowNotes(true)
    }
  }

  const cancelHighlightNote = () => {
    setShowHighlightNote(false)
    setHighlightNoteText("")
    setHighlightedText("")
  }

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now().toString(), text: newNote }])
      setNewNote("")
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="min-h-screen bg-background text-foreground max-w-[768px] mx-auto relative">
      <div className={`main-content ${showNotes ? "notes-open" : ""}`} style={{ height: "1024px", width: "768px" }}>
        <div className="absolute inset-0 coastal-pattern opacity-[0.05] pointer-events-none z-0"></div>

        {/* Header */}
        <header className="p-6 flex justify-between items-center border-b border-border bg-card/90 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/90] hover:bg-[hsl(var(--accent))/10] h-10 w-10 rounded-full"
            onClick={() => router.push("/")}
          >
            <Home className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-serif text-[hsl(var(--primary))]">{bookContent.chapter.title}</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Chapter {bookContent.chapter.number}</p>
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </header>

        {/* Book content */}
        <main className="p-8 max-w-2xl mx-auto relative z-10" onMouseUp={handleTextSelection} ref={contentRef}>
          <div className="prose prose-slate dark:prose-invert">{contentWithHighlights}</div>
        </main>

        {/* Highlight Note Popup */}
        {showHighlightNote && (
          <div
            className="fixed z-50 bg-card border border-border rounded-lg shadow-lg p-4 w-80"
            style={{
              left: `${Math.min(Math.max(highlightPosition.x - 160, 20), window.innerWidth - 320)}px`,
              top: `${Math.min(highlightPosition.y + 10, window.innerHeight - 200)}px`,
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-[hsl(var(--primary))]">Add note to highlight</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))/10]"
                onClick={cancelHighlightNote}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mb-3 p-2 bg-[hsl(var(--muted))] rounded text-xs italic text-[hsl(var(--muted-foreground))]">
              "{highlightedText}"
            </div>
            <Textarea
              placeholder="Write your note..."
              className="mb-3 text-sm resize-none h-20 border-border focus-visible:ring-[hsl(var(--primary))]"
              value={highlightNoteText}
              onChange={(e) => setHighlightNoteText(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={cancelHighlightNote}
                className="text-xs border-border text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))/10]"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={addHighlightNote}
                className="text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))/90]"
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Notes panel */}
      <div
        className={`notes-panel ${showNotes ? "translate-y-0" : "translate-y-[calc(100%-3.5rem)]"}`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Notes handle */}
        <div
          className="notes-handle flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setShowNotes(!showNotes)}
        >
          <div className="flex items-center text-white">
            <BookMarked className="h-5 w-5 mr-2" />
            <span className="font-serif">Notes</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 w-8 rounded-full p-0">
            {showNotes ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>

        {/* Notes content */}
        <div className="p-5 overflow-auto" style={{ maxHeight: "calc(70vh - 3.5rem)" }}>
          <div className="space-y-4 mb-5">
            {notes.map((note) => (
              <div key={note.id} id={`note-${note.id}`} className="note-card relative group">
                <div className="flex">
                  <div className="flex-1">
                    {note.highlightedText && <div className="highlight-text">"{note.highlightedText}"</div>}
                    <p>{note.text}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => deleteNote(note.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start space-x-3">
            <Textarea
              placeholder="Add a note..."
              className="flex-1 border-white/30 focus-visible:ring-white bg-white/10 text-white rounded-lg font-serif placeholder:text-white/70"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button className="coastal-button-secondary" onClick={addNote}>
              <Highlighter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .highlight-pulse {
          animation: pulse 1s ease-in-out;
        }
        
        @keyframes pulse {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(var(--secondary), 0.7);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(var(--secondary), 0);
          }
        }
      `}</style>
    </div>
  )
}

