import { NextRequest, NextResponse } from "next/server"

// In-memory store for demo — will be replaced by Supabase
const alerts: Array<{
  id: string
  origin: string
  destination: string
  targetPrice: number
  departureDate?: string
  returnDate?: string
  createdAt: string
}> = []

export async function GET() {
  return NextResponse.json({ alerts })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const alert = {
    id: crypto.randomUUID(),
    origin: body.origin,
    destination: body.destination,
    targetPrice: body.targetPrice,
    departureDate: body.departureDate,
    returnDate: body.returnDate,
    createdAt: new Date().toISOString(),
  }
  alerts.push(alert)
  return NextResponse.json({ alert }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const index = alerts.findIndex((a) => a.id === id)
  if (index >= 0) alerts.splice(index, 1)
  return NextResponse.json({ success: true })
}
