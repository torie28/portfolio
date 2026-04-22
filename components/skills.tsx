"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Database, Globe, Smartphone, Server, Palette, Cloud, Cpu } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const skills = [
  {
    category: "Frontend",
    icon: Code,
    technologies: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "Next.js", level: 92, color: "bg-gray-800" },
      { name: "Vue.js", level: 85, color: "bg-green-500" },
      { name: "TypeScript", level: 90, color: "bg-blue-600" },
      { name: "TailwindCSS", level: 93, color: "bg-cyan-500" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    technologies: [
      { name: "Node.js", level: 88, color: "bg-green-600" },
      { name: "Laravel", level: 82, color: "bg-red-500" },
      { name: "Python", level: 85, color: "bg-yellow-500" },
      { name: "Express.js", level: 87, color: "bg-gray-700" },
      { name: "Django", level: 78, color: "bg-green-700" },
    ],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    technologies: [
      { name: "React Native", level: 80, color: "bg-blue-400" },
      { name: "Flutter", level: 75, color: "bg-blue-500" },
      { name: "Swift", level: 70, color: "bg-orange-500" },
      { name: "Kotlin", level: 72, color: "bg-purple-500" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    technologies: [
      { name: "MongoDB", level: 85, color: "bg-green-500" },
      { name: "PostgreSQL", level: 88, color: "bg-blue-700" },
      { name: "MySQL", level: 83, color: "bg-orange-600" },
      { name: "Redis", level: 80, color: "bg-red-600" },
      { name: "Firebase", level: 82, color: "bg-yellow-600" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    technologies: [
      { name: "AWS", level: 85, color: "bg-orange-500" },
      { name: "Docker", level: 83, color: "bg-blue-500" },
      { name: "Kubernetes", level: 75, color: "bg-blue-600" },
      { name: "Vercel", level: 90, color: "bg-black" },
      { name: "Netlify", level: 88, color: "bg-cyan-600" },
    ],
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    technologies: [
      { name: "Figma", level: 85, color: "bg-purple-500" },
      { name: "Adobe XD", level: 78, color: "bg-pink-500" },
      { name: "Sketch", level: 75, color: "bg-orange-500" },
      { name: "Framer", level: 82, color: "bg-blue-500" },
    ],
  },
]

function SkillBar({ level, color }: { level: number; color: string }) {
  return (
    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-24 px-4 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-instrument-sans)" }}
          >
            Technologies & Skills
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A comprehensive overview of the programming languages, frameworks, and tools I use to build modern applications.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skillCategory, index) => {
            const Icon = skillCategory.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700">
                    <Icon className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{skillCategory.category}</h3>
                </div>

                <div className="space-y-4">
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
                        <span className="text-xs text-zinc-500">{tech.level}%</span>
                      </div>
                      <SkillBar level={tech.level} color={tech.color} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-zinc-300">20+ Technologies</span>
            </div>
            <div className="w-px h-4 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-zinc-300">4+ Years Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
