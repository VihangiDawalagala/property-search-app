import { Inter, Playfair_Display } from "next/font/google"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata = {
  title: "HomeFind - Property Search Made Easy",
  description: "Find your dream home with our comprehensive property search",
  generator: "vihangi",
  icons: {
    icon: [
      {
        url: "/in-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/n.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        {children}
        <Toaster />
        
      </body>
    </html>
  )
}
