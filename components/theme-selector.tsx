"use client"

import { useTheme } from "next-themes"
import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeSelector() {
  const { setTheme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
      onClick={() => setTheme("dark")}
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark Mode</span>
    </Button>
  )
}
