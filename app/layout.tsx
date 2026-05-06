import type { Metadata } from 'next'
import { JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '600', '700'],
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Jones Kisaka — Embedded Systems Engineer',
  description: 'Embedded Systems Engineer specialising in IoT, RISC-V, and wireless communication.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} ${sourceSerif4.variable}`}>
        {children}
      </body>
    </html>
  )
}
