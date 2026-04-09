export interface DealScore {
  score: number // 0-100 (how much cheaper than average)
  label: string
  color: string
  bgColor: string
  textColor: string
  description: string
}

export function calculateDealScore(currentPrice: number, averagePrice: number): DealScore {
  if (averagePrice <= 0) {
    return { score: 0, label: "Kein Vergleich", color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-600", description: "Keine Preishistorie verfügbar" }
  }

  const percentCheaper = ((averagePrice - currentPrice) / averagePrice) * 100
  const score = Math.max(0, Math.min(100, Math.round(percentCheaper)))

  if (score >= 50) {
    return {
      score,
      label: "MEGA DEAL",
      color: "gold",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      description: `${score}% unter Durchschnittspreis!`,
    }
  }
  if (score >= 25) {
    return {
      score,
      label: "Super Deal",
      color: "green",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-800",
      description: `${score}% unter Durchschnittspreis`,
    }
  }
  if (score >= 10) {
    return {
      score,
      label: "Guter Preis",
      color: "lightgreen",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      description: `${score}% unter Durchschnittspreis`,
    }
  }
  if (score >= 0) {
    return {
      score,
      label: "Normaler Preis",
      color: "gray",
      bgColor: "bg-gray-100",
      textColor: "text-gray-600",
      description: "Im üblichen Preisbereich",
    }
  }
  return {
    score: 0,
    label: "Teuer",
    color: "red",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    description: `${Math.abs(score)}% über Durchschnittspreis`,
  }
}

export function getDealEmoji(score: number): string {
  if (score >= 50) return ""
  if (score >= 25) return ""
  if (score >= 10) return ""
  return ""
}
