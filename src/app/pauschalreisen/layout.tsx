import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pauschalreisen günstig buchen | Tripora24",
  description: "Flug + Hotel zum Bestpreis. Unsere Engine kombiniert automatisch die günstigsten Flüge mit den besten Hotels — oft günstiger als klassische Pauschalanbieter.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
