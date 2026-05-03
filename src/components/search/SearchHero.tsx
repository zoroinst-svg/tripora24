"use client"

import { useState, useRef, useEffect, createContext, useContext } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { PlaneIcon, HotelIcon, PackageIcon, SwapIcon, SearchIcon, MapPinIcon, ChevronDownIcon, UsersIcon, MinusIcon, PlusIcon, CarIcon, GlobeIcon, BuildingIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { smartSearch, type SearchResult } from "@/lib/utils/airports"
import { useI18n } from "@/lib/i18n/context"

// Portal dropdown — renders in <body> so nothing clips it
function DropdownPortal({ anchorRef, open, children, width = 340, align = "left" }: {
  anchorRef: React.RefObject<HTMLDivElement | null>
  open: boolean
  children: React.ReactNode
  width?: number
  align?: "left" | "right"
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        setPos({ top: rect.bottom + window.scrollY + 8, left: 16 })
      } else {
        setPos({
          top: rect.bottom + window.scrollY + 8,
          left: align === "right"
            ? Math.max(16, rect.right + window.scrollX - width)
            : rect.left + window.scrollX,
        })
      }
    }
  }, [open, anchorRef, width, align])

  if (!open || typeof document === "undefined") return null

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return createPortal(
    <div
      data-dropdown-portal
      className="rounded-2xl border bg-background shadow-2xl overflow-y-auto"
      style={{
        position: "absolute",
        top: pos.top,
        left: isMobile ? 16 : pos.left,
        width: isMobile ? "calc(100vw - 32px)" : width,
        maxHeight: 420,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  )
}

// Global popup manager — only one popup open at a time
const PopupContext = createContext<{
  activePopup: string | null
  setActivePopup: (id: string | null) => void
}>({ activePopup: null, setActivePopup: () => {} })

// ============================================
// SMART LOCATION INPUT
// ============================================
function LocationInput({
  id,
  displayValue,
  onChange,
  placeholder,
  label,
  isDestination = false,
}: {
  id: string
  displayValue: string
  onChange: (label: string, code: string, type: string) => void
  placeholder: string
  label: string
  isDestination?: boolean
}) {
  const { activePopup, setActivePopup } = useContext(PopupContext)
  const [query, setQuery] = useState(displayValue)
  const [results, setResults] = useState<SearchResult[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const open = activePopup === id

  // Sync external displayValue changes (e.g., swap)
  useEffect(() => {
    setQuery(displayValue)
  }, [displayValue])

  const handleFocus = () => {
    setResults(smartSearch(query || "", isDestination))
    setActivePopup(id)
  }

  const select = (r: SearchResult) => {
    const display = r.type === "everywhere" ? "Alle Orte" :
      r.type === "country" ? `${r.countryName} (Alle)` :
      r.type === "city" ? `${r.label} (Alle)` :
      `${r.label} (${r.code})`
    setQuery(display)
    onChange(display, r.code, r.type)
    setActivePopup(null)
  }

  const getIcon = (type: string) => {
    if (type === "everywhere") return <GlobeIcon className="h-4 w-4 text-blue-500" />
    if (type === "country") return <GlobeIcon className="h-4 w-4 text-emerald-600" />
    if (type === "city") return <BuildingIcon className="h-4 w-4 text-orange-500" />
    return <PlaneIcon className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <span className="text-[11px] text-muted-foreground font-medium block">{label}</span>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setResults(smartSearch(e.target.value, isDestination)); setActivePopup(id) }}
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => { if (activePopup === id) setActivePopup(null) }, 200)}
        placeholder={placeholder}
        className="block w-full bg-transparent outline-none text-[15px] font-semibold text-foreground placeholder:text-muted-foreground/50 placeholder:font-normal truncate"
      />
      <DropdownPortal anchorRef={ref} open={open && results.length > 0} width={340}>
        {!query && (
          <div className="px-4 pt-3 pb-1 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            {isDestination ? "Beliebte Reiseziele" : "Abflug von"}
          </div>
        )}
        {results.map((r) => (
          <button
            key={`${r.type}::${r.code}`}
            className="w-full text-left px-4 py-2.5 hover:bg-accent/70 transition-colors flex items-center gap-3 cursor-pointer"
            onMouseDown={(e) => { e.preventDefault(); select(r) }}
          >
            <div className="w-9 h-9 rounded-lg bg-muted/80 flex items-center justify-center shrink-0">
              {getIcon(r.type)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{r.label}</div>
              <div className="text-xs text-muted-foreground truncate">{r.sublabel}</div>
            </div>
            {r.type === "country" && r.airportCount && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0 font-medium">{r.airportCount}</span>
            )}
            {r.type === "airport" && (
              <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded shrink-0 font-bold">{r.code}</span>
            )}
            {r.type === "everywhere" && (
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full shrink-0 font-medium">Weltweit</span>
            )}
          </button>
        ))}
      </DropdownPortal>
    </div>
  )
}

// ============================================
// MINI CALENDAR (with optional day prices)
// ============================================
function MiniCalendar({ value, onChange, originCode, destCode }: {
  value: string; onChange: (d: string) => void
  originCode?: string; destCode?: string
}) {
  const today = new Date()
  const selected = value ? new Date(value) : null
  const [viewMonth, setViewMonth] = useState(selected ? selected.getMonth() : today.getMonth())
  const [viewYear, setViewYear] = useState(selected ? selected.getFullYear() : today.getFullYear())
  const [dayPrices, setDayPrices] = useState<Record<string, number>>({})
  const [loadingPrices, setLoadingPrices] = useState(false)

  // Fetch day prices when route is set
  useEffect(() => {
    if (!originCode || !destCode || originCode.length !== 3 || destCode.length !== 3) return
    const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`
    setLoadingPrices(true)
    fetch(`/api/flights/calendar?origin=${originCode}&destination=${destCode}&month=${monthKey}&mode=month`)
      .then((r) => r.json())
      .then((data) => setDayPrices(data.prices || {}))
      .catch(() => setDayPrices({}))
      .finally(() => setLoadingPrices(false))
  }, [originCode, destCode, viewMonth, viewYear])

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7
  const monthName = new Date(viewYear, viewMonth).toLocaleDateString("de-DE", { month: "long", year: "numeric" })
  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

  const prev = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) } else setViewMonth(viewMonth - 1) }
  const next = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) } else setViewMonth(viewMonth + 1) }

  const selectDay = (day: number) => {
    onChange(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`)
  }

  const isPast = (day: number) => new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const isSelected = (day: number) => selected && day === selected.getDate() && viewMonth === selected.getMonth() && viewYear === selected.getFullYear()
  const isToday = (day: number) => day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()

  // Find cheapest price in current month
  const monthDayKeys = Object.keys(dayPrices).filter(k => k.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`))
  const cheapestPrice = monthDayKeys.length > 0 ? Math.min(...monthDayKeys.map(k => dayPrices[k])) : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center cursor-pointer text-lg">&lsaquo;</button>
        <span className="text-sm font-semibold">{monthName}</span>
        <button onClick={next} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center cursor-pointer text-lg">&rsaquo;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {weekDays.map((d) => <div key={d} className="text-[10px] font-medium text-muted-foreground py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const price = dayPrices[dateKey]
          const isCheapest = price && price === cheapestPrice
          return (
            <button
              key={day}
              disabled={isPast(day)}
              onMouseDown={(e) => { e.preventDefault(); selectDay(day) }}
              className={`flex flex-col items-center justify-center min-h-[44px] rounded-lg text-sm font-medium transition-all cursor-pointer
                ${isSelected(day) ? "bg-primary text-white" : ""}
                ${isToday(day) && !isSelected(day) ? "border-2 border-primary text-primary" : ""}
                ${isPast(day) ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-muted"}
              `}
            >
              <span>{day}</span>
              {price && !isPast(day) && (
                <span className={`text-[9px] font-semibold ${isCheapest ? "text-emerald-500" : "text-muted-foreground"} ${isSelected(day) ? "text-white/90" : ""}`}>
                  {price}€
                </span>
              )}
            </button>
          )
        })}
      </div>
      {loadingPrices && (
        <p className="text-xs text-muted-foreground text-center mt-3">Preise werden geladen...</p>
      )}
    </div>
  )
}

// ============================================
// DATE PICKER (Konkrete Daten / Flexible Monate)
// ============================================
function DatePicker({
  id,
  label,
  value,
  flexMonth,
  onChange,
  onFlexChange,
  placeholder,
  originCode,
  destCode,
}: {
  id: string
  label: string
  value: string
  flexMonth: string
  onChange: (v: string) => void
  onFlexChange: (v: string) => void
  placeholder: string
  originCode?: string
  destCode?: string
}) {
  const { activePopup, setActivePopup } = useContext(PopupContext)
  const [mode, setMode] = useState<"exact" | "flex">("exact")
  const ref = useRef<HTMLDivElement>(null)
  const open = activePopup === id
  const [monthPrices, setMonthPrices] = useState<Record<string, number>>({})

  const months = [] as { value: string; label: string; year: string }[]
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    months.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("de-DE", { month: "long" }),
      year: String(d.getFullYear()),
    })
  }

  // Fetch month prices in flex mode
  useEffect(() => {
    if (mode !== "flex" || !open || !originCode || !destCode || originCode.length !== 3 || destCode.length !== 3) return
    fetch(`/api/flights/calendar?origin=${originCode}&destination=${destCode}&mode=year`)
      .then((r) => r.json())
      .then((data) => setMonthPrices(data.prices || {}))
      .catch(() => {})
  }, [mode, open, originCode, destCode])

  const display = flexMonth
    ? `${months.find((m) => m.value === flexMonth)?.label || ""} ${months.find((m) => m.value === flexMonth)?.year || ""}`
    : value
      ? new Date(value).toLocaleDateString("de-DE", { day: "numeric", month: "short" })
      : ""

  // Find cheapest month for badge
  const cheapestMonth = Object.entries(monthPrices).reduce<{ key: string; price: number } | null>((acc, [k, v]) => {
    if (!acc || v < acc.price) return { key: k, price: v }
    return acc
  }, null)

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div className="cursor-pointer" onClick={() => setActivePopup(open ? null : id)}>
        <span className="text-[11px] text-muted-foreground font-medium block">{label}</span>
        <div className="text-[15px] font-semibold truncate text-foreground">
          {display || <span className="text-muted-foreground/50 font-normal">{placeholder}</span>}
        </div>
      </div>

      <DropdownPortal anchorRef={ref} open={open} width={380} align="right">
        <div className="p-5">
          <div className="flex gap-1 bg-muted rounded-lg p-1 mb-4">
            <button
              onMouseDown={(e) => { e.preventDefault(); setMode("exact") }}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${mode === "exact" ? "bg-background shadow text-foreground" : "text-muted-foreground"}`}
            >Konkrete Daten</button>
            <button
              onMouseDown={(e) => { e.preventDefault(); setMode("flex") }}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${mode === "flex" ? "bg-background shadow text-foreground" : "text-muted-foreground"}`}
            >Flexible Reisedaten</button>
          </div>
          {mode === "exact" ? (
            <MiniCalendar
              value={value}
              onChange={(d) => { onChange(d); onFlexChange(""); setActivePopup(null) }}
              originCode={originCode}
              destCode={destCode}
            />
          ) : (
            <div>
              <div className="text-sm font-semibold mb-3">Monat wählen</div>
              <div className="grid grid-cols-3 gap-2">
                {months.map((m) => {
                  const price = monthPrices[m.value]
                  const isCheapest = cheapestMonth?.key === m.value
                  return (
                    <button
                      key={m.value}
                      onMouseDown={(e) => { e.preventDefault(); onFlexChange(m.value); onChange(""); setActivePopup(null) }}
                      className={`relative px-2 py-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                        flexMonth === m.value
                          ? "border-primary bg-primary/10 text-primary"
                          : isCheapest
                          ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="text-[10px] text-muted-foreground">{m.year}</div>
                      <div className="text-xs font-semibold">{m.label}</div>
                      {price && (
                        <div className={`text-[11px] font-bold mt-1 ${isCheapest ? "text-emerald-600" : "text-muted-foreground"}`}>
                          ab {price}€
                        </div>
                      )}
                      {isCheapest && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          Günstigster
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              {!originCode || !destCode ? (
                <p className="text-xs text-muted-foreground mt-4 text-center">Wähle erst ein Reiseziel um Preise zu sehen</p>
              ) : Object.keys(monthPrices).length === 0 ? (
                <p className="text-xs text-muted-foreground mt-4 text-center">Preise werden geladen...</p>
              ) : null}
            </div>
          )}
        </div>
      </DropdownPortal>
    </div>
  )
}

// ============================================
// PASSENGER SELECTOR
// ============================================
function PassengerSelector({ id, value, cabinClass, onChange, onClassChange }: {
  id: string; value: number; cabinClass: string; onChange: (v: number) => void; onClassChange: (v: string) => void
}) {
  const { activePopup, setActivePopup } = useContext(PopupContext)
  const ref = useRef<HTMLDivElement>(null)
  const open = activePopup === id
  const classes = ["Economy", "Premium Economy", "Business", "First"]

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div className="cursor-pointer" onClick={() => setActivePopup(open ? null : id)}>
        <span className="text-[11px] text-muted-foreground font-medium block">Reisende & Kabinenklasse</span>
        <div className="text-[15px] font-semibold truncate text-foreground">
          {value} {value === 1 ? "Erwachsener" : "Erwachsene"}, {cabinClass}
        </div>
      </div>
      <DropdownPortal anchorRef={ref} open={open} width={288} align="right">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Erwachsene</div>
              <div className="text-xs text-muted-foreground">Ab 16 Jahre</div>
            </div>
            <div className="flex items-center gap-3">
              <button onMouseDown={(e) => { e.preventDefault(); onChange(Math.max(1, value - 1)) }} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-accent cursor-pointer"><MinusIcon className="h-3 w-3" /></button>
              <span className="text-base font-bold w-4 text-center">{value}</span>
              <button onMouseDown={(e) => { e.preventDefault(); onChange(Math.min(9, value + 1)) }} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-accent cursor-pointer"><PlusIcon className="h-3 w-3" /></button>
            </div>
          </div>
          <div className="border-t pt-3">
            <div className="text-sm font-semibold mb-2">Kabinenklasse</div>
            <div className="grid grid-cols-2 gap-2">
              {classes.map((c) => (
                <button
                  key={c}
                  onMouseDown={(e) => { e.preventDefault(); onClassChange(c) }}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-all ${cabinClass === c ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-muted-foreground/30"}`}
                >{c}</button>
              ))}
            </div>
          </div>
          <Button className="w-full mt-4" size="sm" onMouseDown={(e) => { e.preventDefault(); setActivePopup(null) }}>Fertig</Button>
        </div>
      </DropdownPortal>
    </div>
  )
}

// ============================================
// MAIN HERO
// ============================================
export function SearchHero() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "packages" | "cars">("flights")
  const [tripType, setTripType] = useState<"return" | "oneway">("return")
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [originLabel, setOriginLabel] = useState("")
  const [originCode, setOriginCode] = useState("")
  const [destLabel, setDestLabel] = useState("")
  const [destCode, setDestCode] = useState("")
  const [depDate, setDepDate] = useState("")
  const [retDate, setRetDate] = useState("")
  const [depFlex, setDepFlex] = useState("")
  const [retFlex, setRetFlex] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState("Economy")

  // Close popups on outside click (but NOT when clicking inside a portal dropdown)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-search-bar]") && !target.closest("[data-dropdown-portal]")) {
        setActivePopup(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Auto-fill return month when departure month is selected (and return is empty)
  useEffect(() => {
    if (depFlex && !retFlex && !retDate && tripType === "return") {
      setRetFlex(depFlex)
    }
  }, [depFlex, retFlex, retDate, tripType])

  // Auto-fill return date (+7 days) when departure date selected and return empty
  useEffect(() => {
    if (depDate && !retDate && !retFlex && tripType === "return") {
      const d = new Date(depDate)
      d.setDate(d.getDate() + 7)
      setRetDate(d.toISOString().split("T")[0])
    }
  }, [depDate, retDate, retFlex, tripType])

  const swap = () => {
    const tl = originLabel; const tc = originCode
    setOriginLabel(destLabel); setOriginCode(destCode)
    setDestLabel(tl); setDestCode(tc)
  }

  const handleSearch = () => {
    setActivePopup(null)
    const params = new URLSearchParams()
    if (originCode) params.set("from", originCode)
    if (destCode && destCode !== "EVERYWHERE") params.set("to", destCode)
    if (depDate) params.set("dep", depDate)
    else if (depFlex) params.set("dep", depFlex)
    if (tripType === "return") {
      if (retDate) params.set("ret", retDate)
      else if (retFlex) params.set("ret", retFlex)
    }
    if (passengers > 1) params.set("pax", String(passengers))

    if (activeTab === "flights") router.push(`/fluege?${params}`)
    else if (activeTab === "hotels") router.push(`/hotels?${params}`)
    else router.push(`/pauschalreisen?${params}`)
  }

  const { t } = useI18n()

  const tabs = [
    { id: "flights" as const, label: t("nav.flights"), icon: PlaneIcon },
    { id: "hotels" as const, label: t("nav.hotels"), icon: HotelIcon },
    { id: "packages" as const, label: t("nav.packages"), icon: PackageIcon },
    { id: "cars" as const, label: t("nav.carRental"), icon: CarIcon },
  ]

  return (
    <PopupContext.Provider value={{ activePopup, setActivePopup }}>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#031a32] via-[#05203c] to-[#0a3d6e] py-12 md:py-20 text-white">
        {/* Animated background layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#F08C3D]/15 blur-3xl animate-blob" />
          <div className="absolute top-20 -right-20 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-blob" style={{ animationDelay: "10s" }} />
          {/* Plane silhouette flying across */}
          <div className="absolute top-10 hidden md:block">
            <PlaneIcon className="h-8 w-8 text-white/15 animate-plane-fly" />
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          {/* Live badge */}
          <div className="mb-5 animate-fade-in-down">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs font-medium text-white/90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live • 1.2M+ Preise heute analysiert
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 animate-fade-in-up">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer shrink-0 border ${
                  activeTab === tab.id
                    ? "bg-white text-[#05203c] shadow-lg shadow-black/20 border-white scale-105"
                    : "bg-white/5 text-white/80 hover:bg-white/15 border-white/10 hover:border-white/20"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-[1.05] tracking-tight animate-fade-in-up stagger-2">
            {t("hero.headline")}
          </h1>
          <p className="text-base md:text-lg text-blue-100/80 mb-6 max-w-2xl animate-fade-in-up stagger-3">
            Vergleiche in Sekunden über 500 Airlines und 2 Millionen Hotels — mit Echtzeit-Preisanalyse.
          </p>

          {/* Trip type */}
          {(activeTab === "flights" || activeTab === "packages") && (
            <div className="mb-3 animate-fade-in-up stagger-4">
              <button
                onClick={() => setTripType(tripType === "return" ? "oneway" : "return")}
                className="flex items-center gap-2 text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg px-4 py-2 cursor-pointer transition-all border border-white/10"
              >
                {tripType === "return" ? t("hero.roundTrip") : t("hero.oneWay")}
                <ChevronDownIcon className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* SEARCH BAR */}
          <div className="bg-white dark:bg-card text-foreground rounded-2xl shadow-premium-lg ring-1 ring-black/5 animate-fade-in-up stagger-5" data-search-bar>
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Von */}
              <div className="relative flex-1 px-5 py-3 border-b md:border-b-0 md:border-r border-border min-w-0">
                <LocationInput
                  id="origin"
                  displayValue={originLabel}
                  onChange={(label, code) => { setOriginLabel(label); setOriginCode(code) }}
                  placeholder={t("hero.cityOrAirport")}
                  label={t("hero.fromLabel")}
                />
              </div>

              {/* Swap */}
              <div className="hidden md:flex items-center -mx-5 z-10">
                <button onClick={swap} className="w-10 h-10 rounded-full border-2 border-border bg-background flex items-center justify-center hover:bg-accent transition-colors cursor-pointer shadow-sm">
                  <SwapIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Nach */}
              <div className="relative flex-1 px-5 py-3 border-b md:border-b-0 md:border-r border-border min-w-0">
                <LocationInput
                  id="dest"
                  displayValue={destLabel}
                  onChange={(label, code) => { setDestLabel(label); setDestCode(code) }}
                  placeholder={t("hero.cityOrAirport")}
                  label={t("hero.toLabel")}
                  isDestination
                />
              </div>

              {/* Hinflug */}
              <div className="relative flex-1 px-5 py-3 border-b md:border-b-0 md:border-r border-border min-w-0">
                <DatePicker
                  id="dep"
                  label={t("hero.departure")}
                  value={depDate}
                  flexMonth={depFlex}
                  onChange={setDepDate}
                  onFlexChange={setDepFlex}
                  placeholder={t("hero.addDate")}
                  originCode={originCode}
                  destCode={destCode}
                />
              </div>

              {/* Rückflug */}
              {tripType === "return" && (
                <div className="relative flex-1 px-5 py-3 border-b md:border-b-0 md:border-r border-border min-w-0">
                  <DatePicker
                    id="ret"
                    label={t("hero.return")}
                    value={retDate}
                    flexMonth={retFlex}
                    onChange={setRetDate}
                    onFlexChange={setRetFlex}
                    placeholder={t("hero.addDate")}
                    originCode={destCode}
                    destCode={originCode}
                  />
                </div>
              )}

              {/* Reisende */}
              <div className="relative px-5 py-3 border-b md:border-b-0 md:border-r border-border min-w-0 md:w-60">
                <PassengerSelector id="pax" value={passengers} cabinClass={cabinClass} onChange={setPassengers} onClassChange={setCabinClass} />
              </div>

              {/* Search */}
              <div className="p-2 flex items-center">
                <Button
                  onClick={handleSearch}
                  className="h-full rounded-xl px-8 text-base font-semibold gap-2 w-full md:w-auto min-h-[52px] bg-[#F08C3D] hover:bg-[#F08C3D]/90 text-white shadow-lg shadow-[#F08C3D]/30 hover:shadow-xl hover:shadow-[#F08C3D]/40 transition-all hover:-translate-y-0.5"
                  size="xl"
                >
                  <SearchIcon className="h-5 w-5" />
                  <span className="md:hidden">Suchen</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-xs text-blue-100/70 animate-fade-in-up stagger-6">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              100% kostenlos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Keine versteckten Gebühren
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SSL-verschlüsselt
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-12 text-center">
            {[
              { val: "1.2M+", label: t("hero.stats.analyzed") },
              { val: "47%", label: t("hero.stats.savings") },
              { val: "500+", label: t("hero.stats.airlines") },
              { val: "24/7", label: t("hero.stats.realtime") },
            ].map((s, i) => (
              <div
                key={s.val}
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-4 hover:bg-white/10 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${600 + i * 80}ms` }}
              >
                <div className="text-xl md:text-2xl font-bold text-white">{s.val}</div>
                <div className="text-[11px] md:text-xs text-blue-200/70 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />
      </section>
    </PopupContext.Provider>
  )
}
