"use client"

import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion"
import { useRef } from "react"

const footerLinks = {
  Portfolio: ["Skills", "Projects", "Experience",],
  Connect: ["Email", "LinkedIn",]
  // Resources: ["Blog", "Tutorials", "Open Source", "Speaking", "Mentoring"],
  // Legal: ["Privacy", "Terms", "Cookies", "License"],
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const handleNavigation = (section: string) => {
    // Handle email click
    if (section === "Email") {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);

      if (isIOS) {
        // Try to open Gmail app on iOS first, then fallback to web
        window.location.href = "googlegmail://co?to=pastoriejoe18@gmail.com&subject=Inquiry%20about%20your%20services";
        setTimeout(() => {
          window.location.href = "https://mail.google.com/mail/?view=cm&to=pastoriejoe18@gmail.com&su=Inquiry%20about%20your%20services";
        }, 1000);
      } else if (isAndroid) {
        // Try to open Gmail app on Android first, then fallback to web
        window.location.href = "mailto:pastoriejoe18@gmail.com?subject=Inquiry%20about%20your%20services";
        setTimeout(() => {
          window.location.href = "https://mail.google.com/mail/?view=cm&to=pastoriejoe18@gmail.com&su=Inquiry%20about%20your%20services";
        }, 1000);
      } else {
        // Desktop users - try Gmail web first, then fallback to default email client
        window.open("https://mail.google.com/mail/?view=cm&to=pastoriejoe18@gmail.com&su=Inquiry%20about%20your%20services", "_blank");
      }
      return
    }

    // Handle LinkedIn click
    if (section === "LinkedIn") {
      window.open("https://www.linkedin.com/in/pastorie-joe-5a30342a3/", "_blank");
      return
    }

    // Handle Instagram click
    if (section === "Instagram") {
      window.open("https://www.instagram.com/torie", "_blank");
      return
    }

    // Map "About" to "features" section ID
    const sectionId = section === "Experience" ? "features" : section.toLowerCase()
    console.log(`Navigating to: ${section} -> ${sectionId}`)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log(`Found element:`, element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.log(`Element not found: ${sectionId}`)
    }
  }

  return (
    <footer ref={ref} className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] // Classic easing
          }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="col-span-2 md:col-span-1"
          >
            <motion.a
              href="#"
              className="flex items-center gap-2 mb-4 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg"
                whileHover={{
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-zinc-950 font-bold text-sm">P</span>
              </motion.div>
              <motion.span
                className="font-semibold text-white"
                whileHover={{ color: "#f3f4f6" }}
              >
                Portfolio
              </motion.span>
            </motion.a>
            <motion.p
              className="text-sm text-zinc-500 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building digital experiences that make a difference.
            </motion.p>
            {/* Availability Status */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 cursor-pointer"
              whileHover={{
                scale: 1.05,
                borderColor: "#10b981",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                Available for Work
              </span>
            </motion.div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + (sectionIndex * 0.1),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.h4
                className="text-sm font-semibold text-white mb-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {title}
              </motion.h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + (sectionIndex * 0.1) + (linkIndex * 0.05),
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <motion.button
                      onClick={() => handleNavigation(link)}
                      className="text-sm text-zinc-500 hover:text-white transition-colors text-left relative group"
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <span className="relative z-10">{link}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ x: -100 }}
                        whileHover={{ x: 100 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <motion.p
            className="text-sm text-zinc-500"
            whileHover={{ color: "#d1d5db" }}
            transition={{ duration: 0.2 }}
          >
            &copy; {new Date().getFullYear()} Personal Portfolio. Built with passion.
          </motion.p>
          {/* <div className="flex items-center gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="text-sm text-zinc-500 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -2,
                  scale: 1.05,
                  color: "#ffffff"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {social}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </div> */}
        </motion.div>
      </div>
    </footer>
  )
}
