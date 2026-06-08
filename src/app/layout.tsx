import type { Metadata } from 'next'
import Script from 'next/script'
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
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D0QF39T0FL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D0QF39T0FL');
          `}
        </Script>
      </body>
    </html>
  )
}
