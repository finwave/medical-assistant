"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { IconContext } from "react-icons";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode = () => 
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function switchTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else if (theme == "dark") {
      setTheme("light");
    } else if (theme == "system") {
      if (isDarkMode()) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  }

  return (
    <div className="top_selector absolute top-2 right-2 lg:top-4 lg:right-4">
      <button
        className="button_visual rounded-full p-2"
        onClick={switchTheme}>
        <div className="inline dark:hidden">
          <IconContext.Provider value={{ className: "icon_size_theme" }}>
            <FaSun />
          </IconContext.Provider>
        </div>
        <div className="hidden dark:inline">
          <IconContext.Provider value={{ className: "icon_size_theme" }}>
            <FaMoon />
          </IconContext.Provider>
        </div>
      </button>
    </div>
  )
}