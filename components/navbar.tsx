"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"

const navItems = [
  { label: "Experience", section: "features" },
  { label: "Skills", section: "skills" },
  { label: "Projects", section: "projects" },
  { label: "Abount", section: "Aout" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-4 py-3 rounded-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-white hidden sm:block">Portfolio</span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.section)}
              className="relative px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-zinc-800 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeSelector />
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            Resume
          </Button>
          <Button size="sm" className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-4">
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-zinc-900/95 backdrop-blur-md border border-zinc-800"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  handleNavigation(item.section)
                  setMobileMenuOpen(false)
                }}
                className="px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors bg-transparent border-none cursor-pointer text-left w-full"
              >
                {item.label}
              </button>
            ))}
            <hr className="border-zinc-800 my-2" />
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-zinc-400">Theme</span>
              <ThemeSelector />
            </div>
            <hr className="border-zinc-800 my-2" />
            <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">
              Resume
            </Button>
            <Button className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full">Contact Me</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
