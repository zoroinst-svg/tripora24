import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mein Profil | Tripora24",
  description: "Verwalte deine gespeicherten Suchen, Preis-Alerts und Favoriten.",
  alternates: { canonical: "/profil" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
