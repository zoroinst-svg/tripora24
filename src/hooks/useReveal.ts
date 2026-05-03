"use client"

import { useEffect } from "react"

/**
 * Activates `.reveal` and `.reveal-scale` elements via IntersectionObserver
 * by adding `.in-view` once they enter the viewport.
 *
 * Also watches for new `.reveal` / `.reveal-scale` elements added to the DOM
 * after mount (e.g. async-rendered lists) via MutationObserver.
 *
 * Safety net: any reveal element still without `.in-view` after 800ms gets
 * forced visible — handles edge cases where the observer misses an element
 * (e.g. SSR hydration mismatch, prefers-reduced-motion paths).
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return

    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything
      document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => el.classList.add("in-view"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    )

    const observe = (root: ParentNode) => {
      root.querySelectorAll(".reveal, .reveal-scale").forEach((el) => {
        if (!el.classList.contains("in-view")) io.observe(el)
      })
    }
    observe(document)

    // Watch for elements added later (e.g. after async fetches)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          const el = node as Element
          if (el.matches?.(".reveal, .reveal-scale")) {
            if (!el.classList.contains("in-view")) io.observe(el)
          }
          observe(el)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Safety net: force-reveal anything that's still hidden after a moment
    const safety = window.setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => {
        if (!el.classList.contains("in-view")) el.classList.add("in-view")
      })
    }, 1500)

    return () => {
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(safety)
    }
  }, [])
}
