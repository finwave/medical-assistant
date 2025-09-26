"use client"

import { useTheme } from 'next-themes'
import { IconContext } from "react-icons";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

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
    <button
      className="button_visual rounded-full icon_padding_theme"
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
  )
}