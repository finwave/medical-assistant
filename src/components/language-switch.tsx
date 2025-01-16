"use client"

import { useState, useEffect } from 'react'
import { setLocaleCookie } from '@/components/set-cookie'

export default function LanguageSwitch() {
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  async function setLanguage(_event_type : string, locale : string) {
    await setLocaleCookie(locale);
    return;
  }

  return (
    <div className="top_selector absolute top-2 right-[3.5rem] lg:top-4 lg:right-[5rem]">
        <div className="space-x-2">
          <button
            id="button_language_en"
            onClick={event => setLanguage(event.type, 'en')}>
            en
          </button>
          <span>|</span>
          <button
            id="button_language_fi"
            onClick={event => setLanguage(event.type, 'fi')}>
            fi
          </button>
        </div>
    </div>
  )
}