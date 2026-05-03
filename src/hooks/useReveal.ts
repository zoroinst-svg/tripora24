"use client"

import { useEffect } from "react"

/**
 * Activates `.reveal` and `.reveal-scale` elements via IntersectionObserver
 * by adding `.in-view` once they enter the viewport.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    const elements = document.querySelectorAll(".reveal, .reveal-scale")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
