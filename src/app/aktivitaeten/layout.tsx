import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Touren, Aktivitäten & Tickets weltweit | Tripora24",
  description: "Erlebnisse, Stadtführungen, Skip-the-line Tickets und Aktivitäten weltweit buchen. Über 60.000 Erlebnisse — kostenlose Stornierung, sofortige Bestätigung.",
  alternates: { canonical: "/aktivitaeten" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
