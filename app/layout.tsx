import type React from "react"
import "@/app/globals.css"
import { DarkModeProvider } from "@/components/dark-mode-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Reading App</title>
        <meta name="description" content="A beautiful reading application" />
      </head>
      <body>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
