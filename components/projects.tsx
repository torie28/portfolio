"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const projects = [
  {
    title: "EPR E-Commerce Platform",
    description: "A comprehensive enterprise resource planning (ERP) e-commerce platform called 'Babaerp' featuring a sophisticated dashboard with real-time analytics, revenue tracking, order management, customer insights, and expense monitoring. The system includes specialized modules for accounting, sales management, purchasing operations, restaurant management, and point-of-sale (POS) functionality, providing businesses with complete operational control and data-driven decision making capabilities.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/Screenshot 2026-04-21 111628.png",
    links: {
      live: "https://epr-41ib.vercel.app/",
      // github: "https://github.com",
    },
    featured: true,
  },
  {
    title: "Capuchin Boys Secondary School",
    description: "Educational website for a Tanzanian boys' secondary school providing quality education and holistic development for young men. Features include school information, admissions, and contact details.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    image: "/Screenshot 2026-04-21 110727.png",
    links: {
      live: "https://capuchinboyssecondaryschool.ac.tz/",
      // github: "https://github.com",
    },
    featured: false,
  },
  {
    title: "Evior Web Design Agency",
    description: "Professional web design and development agency specializing in custom web solutions, business systems, and digital products. Features portfolio showcase, service packages, client testimonials, and contact forms for businesses seeking high-quality digital solutions.",
    tech: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/Screenshot 2026-04-21 113208.png",
    links: {
      live: "https://evior.vercel.app",
      // github: "https://github.com",
    },
    featured: false,
  },
  {
    title: "InvoiceFlow Management System",
    description: "Professional invoice management system developed by Evior, featuring secure authentication, premium invoice creation, and streamlined billing workflows. Designed to help businesses manage their invoicing process efficiently with a modern, user-friendly interface.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/Screenshot 2026-04-21 113623.png",
    links: {
      live: "https://invoice-theta-six.vercel.app/auth/login",
      // github: "https://github.com",
    },
    featured: false,
  },
  {
    title: "Hostel Booking System",
    description: "Comprehensive hostel booking and room allocation platform designed for colleges and universities. Features room selection, booking management, payment processing, and administrative dashboard for efficient hostel operations and student accommodation management.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "/Screenshot 2026-04-21 114543.png",
    links: {
      live: "https://hostelbooking-kappa.vercel.app/",
      // github: "https://github.com",
    },
    featured: false,
  },
  // {
  //   title: "AI Content Generator",
  //   description: "AI-powered content generation tool with multiple templates and customization options.",
  //   tech: ["Next.js", "OpenAI API", "TailwindCSS", "Vercel"],
  //   image: "/placeholder.jpg",
  //   links: {
  //     live: "https://example.com",
  //     github: "https://github.com",
  //   },
  //   featured: false,
  // },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-24 px-4 bg-zinc-900/50">
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
            Featured Projects
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A selection of recent work showcasing my expertise in building modern web applications.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 ${project.featured ? "md:col-span-2 md:row-span-2" : ""
                }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="bg-white text-zinc-950 hover:bg-zinc-200 rounded-full"
                      asChild
                    >
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    {/* <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      asChild
                    >
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button> */}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-zinc-800 rounded-full text-zinc-400 border border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 bg-transparent"
          >
            View All Projects
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </motion.div> */}
      </div>
    </section>
  )
}
