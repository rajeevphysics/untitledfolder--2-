"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuCursor from "./menu-cursor"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setIsMenuOpen(false)
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    smoothScrollTo(targetId)
  }

  return (
    <>
      <MenuCursor isMenuOpen={isMenuOpen} />

      <header
        className={`fixed top-0 left-0 right-0 z-[35] bg-background/80 backdrop-blur-sm ${
          isMobile ? "hidden" : isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <img src="/favicon.jpg" alt="P Logo" width={32} height={32} className="rounded" />
              <span className="text-sm">by Rajeev Persaud</span>
            </Link>

            <nav className="flex items-center gap-12">
              <Link
                href="/about"
                className={`text-lg font-medium hover:opacity-70 transition-opacity ${
                  pathname === "/about" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/timeline"
                className={`text-lg font-medium hover:opacity-70 transition-opacity ${
                  pathname === "/timeline" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Timeline & Projects
              </Link>
              <a
                href="/Rajeev_Persaud_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:opacity-70 transition-opacity"
              >
                CV
              </a>
              <a
                href="https://github.com/rajeevphysics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:opacity-70 transition-opacity flex items-center gap-1"
              >
                GitHub
                <span className="text-xs"></span>
              </a>
              <a
                href="mailto:r3persau@uwaterloo.ca"
                className="text-lg font-medium hover:opacity-70 transition-opacity flex items-center gap-1"
              >
                Contact
                <span className="text-xs"></span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-6 right-6 z-[100] bg-blue-500 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-blue-600 transition-colors ${
          isMobile ? "opacity-100" : isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {isMenuOpen ? "CLOSE" : "MENU"}
      </button>

      <div
        className={`fixed inset-0 z-[90] bg-background/95 backdrop-blur-md transition-opacity duration-300 ${
          isMenuOpen && (isMobile || isScrolled) ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`text-4xl font-bold hover:text-blue-500 transition-colors ${
              pathname === "/" ? "text-blue-500" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`text-4xl font-bold hover:text-blue-500 transition-colors ${
              pathname === "/about" ? "text-blue-500" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/timeline"
            onClick={() => setIsMenuOpen(false)}
            className={`text-4xl font-bold hover:text-blue-500 transition-colors ${
              pathname === "/timeline" ? "text-blue-500" : ""
            }`}
          >
            Timeline & Projects
          </Link>
          <a
            href="/Rajeev_Persaud_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-bold hover:text-blue-500 transition-colors"
          >
            CV
          </a>
          <a
            href="https://github.com/rajeevphysics"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-bold hover:text-blue-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:r3persau@uwaterloo.ca"
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-bold hover:text-blue-500 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  )
}
