import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hotels vergleichen | Tripora24",
  description: "Finde die besten Hotel-Deals weltweit. Preisvergleich über Booking.com, Agoda und mehr — mit Deal-Score für objektive Bewertung.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
