import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'POKJAPPSDMLH',
  description: 'Next.js dark mode demo',
  icons: {
    icon: [{ url: '/favicon.ico' }]
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

      <Toaster />
        {children}
       
      </body>
    </html>
  )
}
