import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme(defaultTheme: Theme = "system") {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    return (localStorage.getItem("theme") as Theme) ?? defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const root = document.documentElement

    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", systemDark)
      setResolvedTheme(systemDark ? "dark" : "light")
    } else {
      root.classList.toggle("dark", theme === "dark")
      setResolvedTheme(theme)
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (theme !== "system") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("dark", e.matches)
      setResolvedTheme(e.matches ? "dark" : "light")
    }

    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme])

  return { theme, setTheme, resolvedTheme }
}
