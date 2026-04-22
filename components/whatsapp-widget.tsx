"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsAppWidgetProps {
  phoneNumber?: string
  message?: string
  className?: string
}

export default function WhatsAppWidget({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "255760381510", // Your WhatsApp number
  message = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE || "Hello! I'm interested in your portfolio and would like to get in touch.",
  className,
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }


  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Chat Box */}
      <div
        className={cn(
          "absolute bottom-16 right-0 mb-2 w-80 rounded-2xl bg-white shadow-xl transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform",
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-98 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">WhatsApp Chat</h3>
              <p className="text-sm text-gray-600">We typically reply within minutes</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 hover:bg-gray-200 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <p className={cn(
            "mb-4 text-gray-700 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          )}>
            Hello! 👋 Feel free to reach out to me through WhatsApp. I'm here to help with any questions or collaboration opportunities.
          </p>
          <button
            onClick={handleWhatsAppClick}
            className={cn(
              "w-full rounded-lg bg-gray-800 px-4 py-3 font-medium text-white hover:bg-gray-900 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex items-center justify-center space-x-2",
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            )}
          >
            <MessageCircle className="h-5 w-5" />
            <span>Start Chat on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
          "hover:bg-gray-700 hover:shadow-xl",
          isOpen ? "bg-gray-700" : "bg-gray-800"
        )}
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className={cn(
          "h-6 w-6 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isOpen ? "rotate-90 scale-90" : "rotate-0 scale-100"
        )} />
      </button>

      {/* Subtle shadow effect */}
      <div className={cn(
        "absolute inset-0 rounded-lg bg-gray-600 transition-opacity duration-300 pointer-events-none",
        isOpen ? "opacity-0" : "opacity-10"
      )} />
    </div>
  )
}
