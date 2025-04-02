"use client";

import { useState, useEffect } from "react";
import {
  Book as BookIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadModal } from "@/components/upload-modal";
import { ChapterSummary } from "@/components/chapter-summary";
import { SettingsModal } from "@/components/settings-modal";
import { ProfileModal } from "@/components/profile-modal";
import { useTheme } from "@/components/dark-mode-provider";

export type Chapter = {
  number: number;
  title: string;
  text?: string;
  summary?: string;
};

export type Book = {
  id: number;
  title: string;
  subtitle: string;
  lastChapter: Chapter;
};

// Sample data
const initialBooks: Book[] = [
  {
    id: 1,
    title: "John's Origins",
    subtitle: "Book 1",
    favorite: false,
    lastChapter: {
      number: 11,
      title: "John died",
      text: "The room fell silent as the doctor delivered the news. John, who had been the pillar of strength for so many, had finally succumbed to his illness. It wasn't unexpected, but the finality of it still shocked everyone present. Sarah clutched her hands together, her knuckles turning white. She had been preparing for this moment for months, but now that it had arrived, she felt completely unprepared. How would she tell the children? How would they all move forward without him? ‘He went peacefully,’ the doctor assured them, his voice gentle. No pain at the end. John had suffered enough in his final weeks. The cancer had ravaged his once-strong body, leaving him a shadow of his former self. But his mind had remained sharp until the very end, and he had made sure to say his goodbyes. Outside the hospital room, life continued as normal. People walked by, unaware that for this small group, the world had just stopped turning. As they gathered John's belongings, each item seemed to hold a piece of him. His watch, still ticking. His glasses, folded neatly on the bedside table. The book he had been reading, a bookmark placed about halfway through – a story he would never finish.",
    },
  },
  {
    id: 2,
    title: "John Returns",
    subtitle: "Book 2",
    favorite: false,
    lastChapter: {
      number: 7,
      title: "John came back to life",
      text: "After being presumed dead for months, he returned with a new perspective on life and a mission to complete what he started before his apparent demise.",
    },
  },
  {
    id: 3,
    title: "John's Demise?",
    subtitle: "Book 3",
    favorite: false,
    lastChapter: {
      number: 4,
      title: "John died again",
      text: "This time, the circumstances were even more mysterious than before, leaving readers to wonder if this death is permanent or just another twist in his journey.",
    },
  },
  {
    id: 4,
    title: "John's Son",
    subtitle: "Book 4",
    favorite: false,
    lastChapter: {
      number: 2,
      title: "John's son, Johnny",
      text: "In chapter 2, we're introduced to John's son, Johnny. He bears a striking resemblance to his father, both in appearance and in his determined personality.",
    },
  },
];

const readingStats = {
  minutes: 40,
  pages: 53,
  chapters: 2,
  goal: 60,
  progress: 70,
};

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function summarizeBooks() {
      setLoading(true);
      const updatedBooks = await Promise.all(
        books.map(async (book) => {
          if (book.lastChapter.text && !book.lastChapter.summary) {
            try {
              const summary = await generateSummary(book.lastChapter.text);
              return {
                ...book,
                lastChapter: { ...book.lastChapter, summary },
              };
            } catch (error) {
              console.error("Error generating summary:", error);
              return book;
            }
          }
          return book;
        })
      );
      setBooks(updatedBooks);
      setLoading(false);
    }
    summarizeBooks();
  }, []);

  return { books, loading };
}

async function generateSummary(text: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"MYAPIKEY HERE"}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes text — please summarize the text provided in 2 sentences or less.",
        },
        {
          role: "user",
          content: `Summarize this content:\n\n${text}`,
        },
      ],
      max_tokens: 50,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch summary from OpenAI");
  }

  const data = await response.json();
  const summary = data.choices[0].message.content.trim();
  return summary;
}

// ---
// HomeScreen component
export function HomeScreen() {
  const { theme } = useTheme();
  const { books, loading } = useBooks();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [expandedSummary, setExpandedSummary] = useState<number | null>(null);

  const nextBook = () => {
    if (currentBookIndex < books.length - 3) {
      setCurrentBookIndex(currentBookIndex + 1);
    }
  };

  const prevBook = () => {
    if (currentBookIndex > 0) {
      setCurrentBookIndex(currentBookIndex - 1);
    }
  };

  const toggleSummary = (id: number) => {
    setExpandedSummary(expandedSummary === id ? null : id);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground max-w-[768px] mx-auto relative"
      style={{ height: "1024px", width: "768px" }}
    >
      <div className="absolute inset-0 coastal-pattern opacity-[0.08] pointer-events-none z-0"></div>

      {/* Header */}
      <header className="p-8 pb-2 relative z-10">
        <h1 className="text-3xl font-serif text-[hsl(var(--primary))] tracking-wide">
          Welcome back
        </h1>
      </header>

      {/* Reading stats */}
      <section className="p-8 pt-4 relative z-10">
        <Card className="p-6 border-border shadow-sm bg-card rounded-xl pastel-card">
          <div className="flex justify-between items-center mb-5">
            <div className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
              This session, you've read:
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
              Goal:
            </div>
          </div>

          <div className="flex justify-between mb-5">
            <div className="flex space-x-4">
              <div className="bg-[hsl(var(--cobalt-blue-light)/30%)] px-4 py-3 rounded-lg text-[hsl(var(--primary))] font-serif">
                {readingStats.minutes} min
              </div>
              <div className="bg-[hsl(var(--seafoam-green-light)/30%)] px-4 py-3 rounded-lg text-[hsl(var(--primary))] font-serif">
                {readingStats.pages} pgs
              </div>
              <div className="bg-[hsl(var(--pink-light)/30%)] px-4 py-3 rounded-lg text-[hsl(var(--primary))] font-serif">
                {readingStats.chapters} chapters
              </div>
            </div>
            <div className="bg-[hsl(var(--accent))/10] px-4 py-3 rounded-lg text-[hsl(var(--primary))] font-serif">
              {readingStats.goal} min
            </div>
          </div>

          <div className="flex items-center">
            <Progress
              value={readingStats.progress}
              className="flex-1 h-3 bg-[hsl(var(--muted))]"
              indicatorClassName="bg-gradient-to-r from-[hsl(var(--cobalt-blue))] to-[hsl(var(--pink))]"
            />
            <span className="ml-3 text-sm text-[hsl(var(--primary))] font-medium">
              {readingStats.progress}%
            </span>
          </div>
        </Card>
      </section>

      {/* Chapter summary */}
      <section className="px-8 mb-6 relative z-10">
        {loading ? (
          <p>Loading summary...</p>
        ) : (
          <ChapterSummary
            chapter={books[currentBookIndex].lastChapter}
            isExpanded={expandedSummary === books[currentBookIndex].id}
            onToggle={() => toggleSummary(books[currentBookIndex].id)}
          />
        )}
      </section>

      {/* Book carousel */}
      <section className="px-8 mb-8 relative z-10">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-serif text-[hsl(var(--primary))]">
            Your Books
          </h2>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentBookIndex * 33.33}%)` }}
            >
              {books.map((book) => (
                <div key={book.id} className="w-1/3 flex-shrink-0 pr-4">
                  <Card
                    className={`p-5 h-56 flex flex-col justify-between border-border cursor-pointer hover:border-[hsl(var(--secondary))] transition-colors bg-card rounded-xl pastel-card ${
                      book.favorite
                        ? "border-t-2 border-t-[hsl(var(--pink))]"
                        : ""
                    }`}
                    onClick={() => (window.location.href = `/read/${book.id}`)}
                  >
                    {book.favorite && (
                      <div className="absolute top-2 right-2">
                        <Heart className="h-4 w-4 fill-[hsl(var(--pink))] text-[hsl(var(--pink))]" />
                      </div>
                    )}
                    <div className="flex justify-center">
                      <div className="w-16 h-20 bg-[hsl(var(--accent))/10] rounded-sm flex items-center justify-center border-b-2 border-r-2 border-border">
                        <BookIcon className="text-[hsl(var(--primary))] h-8 w-8" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-serif text-[hsl(var(--primary))]">
                        {book.title}
                      </h3>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        {book.subtitle}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {currentBookIndex > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-card border-border text-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))/10] hover:text-[hsl(var(--primary))] z-10 rounded-full h-10 w-10"
              onClick={prevBook}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          {currentBookIndex < books.length - 3 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-card border-border text-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))/10] hover:text-[hsl(var(--primary))] z-10 rounded-full h-10 w-10"
              onClick={nextBook}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Upload button */}
      <section className="px-8 mb-8 relative z-10">
        <Button
          className="w-full bg-gradient-to-r from-[hsl(var(--cobalt-blue))] to-[hsl(var(--pink))] hover:opacity-90 text-[hsl(var(--primary-foreground))] font-serif py-6 rounded-xl shadow-md"
          onClick={() => setShowUploadModal(true)}
        >
          <Plus className="mr-2 h-5 w-5" /> Upload
        </Button>
      </section>

      {/* Footer with settings and profile */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-between bg-card border-t border-border max-w-[768px] mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/90] hover:bg-[hsl(var(--accent))/10] h-12 w-12 rounded-full"
          onClick={() => setShowSettingsModal(true)}
        >
          <Settings className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-[hsl(var(--pink))] hover:text-[hsl(var(--pink))/90] hover:bg-[hsl(var(--pink-light))/30%] h-12 w-12 rounded-full"
          onClick={() => setShowProfileModal(true)}
        >
          <User className="h-6 w-6" />
        </Button>
      </footer>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
}
