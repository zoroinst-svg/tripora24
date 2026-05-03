"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { HelpIcon, HeartIcon, UserIcon, MenuIcon, CloseIcon, BookOpenIcon, PlaneIcon, HotelIcon, PackageIcon, BellIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { LocaleSelector } from "./LocaleSelector"
import { useI18n } from "@/lib/i18n/context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useI18n()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  const navLinks = [
    { href: "/fluege", label: t("nav.flights"), icon: PlaneIcon },
    { href: "/hotels", label: t("nav.hotels"), icon: HotelIcon },
    { href: "/pauschalreisen", label: t("nav.packages"), icon: PackageIcon },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full text-white transition-all duration-300 ${
        scrolled
          ? "bg-[#05203c]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-[#05203c] border-b border-white/5"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#F08C3D]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/trivoralogo.png"
              alt="Tripora24"
              className="relative h-9 w-9 object-contain transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Tripora<span className="text-[#F08C3D]">24</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#F08C3D] rounded-full transition-all duration-300 ${
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Right side desktop */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/blog" className="hidden md:block">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
              <BookOpenIcon className="h-4 w-4" />
              <span className="hidden xl:inline">{t("common.blog")}</span>
            </Button>
          </Link>
          <Link href="#faq" className="hidden lg:block">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
              <HelpIcon className="h-4 w-4" />
              <span className="hidden xl:inline">{t("common.help")}</span>
            </Button>
          </Link>
          <Link href="/alerts">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 relative" title={t("nav.priceAlerts")}>
              <BellIcon className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#F08C3D] animate-pulse-soft" />
            </Button>
          </Link>
          <LocaleSelector />
          <ThemeToggle />
          <Link href="/profil">
            <Button size="sm" className="gap-2 bg-white/10 hover:bg-white text-white hover:text-[#05203c] border border-white/20 hover:border-white transition-all ml-1">
              <UserIcon className="h-4 w-4" />
              <span>{t("common.login")}</span>
            </Button>
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-1">
          <Link href="/alerts">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#F08C3D]" />
            </Button>
          </Link>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 relative w-10 h-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <span className={`absolute transition-all duration-300 ${mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}>
              <MenuIcon className="h-5 w-5" />
            </span>
            <span className={`absolute transition-all duration-300 ${mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}>
              <CloseIcon className="h-5 w-5" />
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile menu — full-screen drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[#05203c]/98 backdrop-blur-xl transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-1 overflow-y-auto h-full pb-32">
          {[
            { href: "/fluege", label: t("nav.flights"), icon: PlaneIcon },
            { href: "/hotels", label: t("nav.hotels"), icon: HotelIcon },
            { href: "/pauschalreisen", label: t("nav.packages"), icon: PackageIcon },
            { href: "/deals", label: t("nav.deals"), icon: HeartIcon },
            { href: "/blog", label: t("common.blog"), icon: BookOpenIcon },
            { href: "/alerts", label: t("nav.priceAlerts"), icon: BellIcon },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-white text-base font-medium hover:bg-white/10 active:bg-white/15 transition-colors animate-fade-in-up`}
              style={{ animationDelay: `${i * 50}ms`, opacity: mobileMenuOpen ? undefined : 0 }}
            >
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </span>
              {item.label}
            </Link>
          ))}

          <div className="border-t border-white/10 my-4" />

          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-white/60">Sprache & Währung</span>
            <LocaleSelector />
          </div>

          <Link href="/profil" onClick={() => setMobileMenuOpen(false)} className="mt-4">
            <Button className="w-full justify-center gap-2 h-12 text-base bg-[#F08C3D] hover:bg-[#F08C3D]/90 text-white border-none">
              <UserIcon className="h-5 w-5" /> {t("common.login")}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
