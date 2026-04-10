import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { CookieBanner } from "@/components/layout/CookieBanner"
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Tripora24 — Reise-Deals rund um die Uhr",
    template: "%s | Tripora24",
  },
  description: "Tripora24 findet die besten Flüge, Hotels und Pauschalreisen — 24/7. Unsere Deal-Engine analysiert Millionen Preise automatisch und in Echtzeit.",
  keywords: "Flüge günstig, Hotels vergleichen, Pauschalreisen, Reise Deals, Flug Schnäppchen, Hotelvergleich, Tripora24",
  openGraph: {
    title: "Tripora24 — Reise-Deals rund um die Uhr",
    description: "Flüge, Hotels & Pauschalreisen zum Bestpreis. 24/7 Deal-Engine mit Echtzeit-Preisanalyse.",
    type: "website",
    locale: "de_DE",
    siteName: "Tripora24",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tripora24 — Beste Reise-Deals im DACH-Raum",
    description: "Flüge, Hotels & Pauschalreisen zum Bestpreis. 24/7 automatische Deal-Erkennung.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tripora24.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
