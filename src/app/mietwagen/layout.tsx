import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mietwagen vergleichen weltweit | Tripora24",
  description: "Günstige Mietwagen weltweit ab 8€/Tag. Preisvergleich über 900+ Anbieter wie Sixt, Hertz, Europcar — kostenlose Stornierung bei den meisten Buchungen.",
  alternates: { canonical: "/mietwagen" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
