"use client"

import { Page } from '@/types/enums';
import ThemeSwitch from "@/components/theme-switch"
import LanguageSwitch from "@/components/language-switch";

export default function HeaderMenu(props: any) {
  function setMenuValue(selectedPage: Page) {
    props.setPage(selectedPage);
  }

  return (
    <div className="bg-gray-300 dark:bg-gray-800 header_area">
      <div className="space-x-2 lg:space-x-3 -ml-3 lg:-ml-4">
        <button 
        className="button-transparent"
        onClick={() => setMenuValue(Page.Profile)}>
          Profile
        </button>
        <button 
        className="button-transparent"
        onClick={() => setMenuValue(Page.Assistant)}>
          Assistant
        </button>
      </div>
      <div className="space-x-6 lg:space-x-8">
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
    </div>
  )
}