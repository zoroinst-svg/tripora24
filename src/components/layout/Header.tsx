"use client"

import Link from "next/link"
import { useState } from "react"
import { HelpCircle, Globe, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05203c] text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/trivoralogo.png"
            alt="Tripora24"
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            Tripora<span className="text-[#F08C3D]">24</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
            <HelpCircle className="h-4 w-4" />
            Hilfe
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
            <Heart className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
            <User className="h-4 w-4" />
            Anmelden
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#05203c] p-4">
          <nav className="flex flex-col gap-1">
            <Link href="/fluege" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">Flüge</Button>
            </Link>
            <Link href="/hotels" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">Hotels</Button>
            </Link>
            <Link href="/pauschalreisen" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">Pauschalreisen</Button>
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">Blog</Button>
            </Link>
            <Link href="/alerts" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">Preis-Alerts</Button>
            </Link>
            <div className="border-t border-white/10 my-2" />
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-2">
              <User className="h-4 w-4" /> Anmelden
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
