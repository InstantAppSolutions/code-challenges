import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import NavBar from '@/components/custom/nav-bar'
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instant-App Challenge',
  description: 'Todo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
