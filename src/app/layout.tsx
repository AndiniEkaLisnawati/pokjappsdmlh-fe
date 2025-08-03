import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/main/Header'
import Footer from "@/components/main/Footer"

export const metadata: Metadata = {
  title: 'POKJAPPSDMLH',
  description: 'Next.js dark mode demo', 
  icons: {
    icon: [
      {url: '/favicon.ico'}
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
