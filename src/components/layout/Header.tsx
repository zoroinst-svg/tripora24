"use client"

import Link from "next/link"
import { useState } from "react"
import { HelpIcon, HeartIcon, UserIcon, MenuIcon, CloseIcon, BookOpenIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { LocaleSelector } from "./LocaleSelector"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05203c] text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img src="/trivoralogo.png" alt="Tripora24" className="h-9 w-9 object-contain" />
          <span className="text-xl font-bold tracking-tight text-white">
            Tripora<span className="text-[#F08C3D]">24</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
              <BookOpenIcon className="h-4 w-4" />
              {t("common.blog")}
            </Button>
          </Link>
          <Link href="#faq">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
              <HelpIcon className="h-4 w-4" />
              {t("common.help")}
            </Button>
          </Link>
          <Link href="/alerts">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10" title={t("nav.priceAlerts")}>
              <HeartIcon className="h-4 w-4" />
            </Button>
          </Link>
          <LocaleSelector />
          <ThemeToggle />
          <Link href="/profil">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
              <UserIcon className="h-4 w-4" />
              {t("common.login")}
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#05203c] p-4">
          <nav className="flex flex-col gap-1">
            {[
              { href: "/fluege", label: "Flüge" },
              { href: "/hotels", label: "Hotels" },
              { href: "/pauschalreisen", label: "Pauschalreisen" },
              { href: "/blog", label: "Blog" },
              { href: "/alerts", label: "Preis-Alerts" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">{item.label}</Button>
              </Link>
            ))}
            <div className="border-t border-white/10 my-2" />
            <Link href="/profil" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-2">
                <UserIcon className="h-4 w-4" /> Anmelden
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
