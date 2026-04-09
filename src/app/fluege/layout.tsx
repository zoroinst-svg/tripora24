import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Günstige Flüge finden | Tripora24",
  description: "Vergleiche Flugpreise von hunderten Airlines. Unsere Deal-Engine findet automatisch die günstigsten Flüge ab Deutschland, Österreich und der Schweiz.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
