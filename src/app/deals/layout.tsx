import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Reise-Deals | Tripora24",
  description: "Die besten aktuellen Reise-Schnäppchen — Flüge, Hotels und Pauschalreisen mit bis zu 74% Ersparnis. Sortiert nach Deal-Score.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
