import React from 'react'
import './styles.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
