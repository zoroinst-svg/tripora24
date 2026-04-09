import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preis-Alerts | Tripora24",
  description: "Setze einen Zielpreis für deine Wunschroute und werde benachrichtigt sobald der Preis fällt. Kostenlos und in Echtzeit.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
