import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Jalanc Systems LLC — Precision Software Development',
  description:
    'Full-stack development, systems architecture, and digital product consulting. Built to last.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
