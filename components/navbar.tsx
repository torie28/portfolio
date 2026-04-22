"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"

const navItems = [
  { label: "Experience", section: "features" },
  { label: "Projects", section: "projects" },
  { label: "Skills", section: "skills" },
  
  // { label: "Abount", section: "Aout" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isInHero, setIsInHero] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroSection = document.getElementById('hero')

      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const currentlyInHero = currentScrollY < heroBottom - 100

        setIsInHero(currentlyInHero)

        // Only apply fade logic when not in hero section
        if (!currentlyInHero) {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down and past 100px - hide navbar
            setIsVisible(false)
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show navbar
            setIsVisible(true)
          }
        } else {
          // Always visible when in hero section
          setIsVisible(true)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        top: isInHero ? "1rem" : "0.5rem"
      }}
      transition={{
        duration: isInHero ? 0.6 : 0.3,
        ease: [0.22, 1, 0.36, 1] as const
      }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl transition-all duration-300 ${isInHero ? 'rounded-full' : 'rounded-full'
        }`}
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-4 py-3 rounded-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800"
      >
        {/* Logo */}
        <a href="" className="flex items-center gap-2">
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
          {/* <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            Resume
          </Button> */}
          <Button size="sm" onClick={() => handleNavigation('contact')} className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-4">
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
            {/* <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-zinc-400">Theme</span>
              <ThemeSelector />
            </div> */}
            <hr className="border-zinc-800 my-2" />
            {/* <Button variant="ghost" className="justify-start text-zinc-400 hover:text-white">
              Resume
            </Button> */}
            <Button onClick={() => {
              handleNavigation('contact')
              setMobileMenuOpen(false)
            }} className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full">Contact Me</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
