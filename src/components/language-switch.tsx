"use client"

import { setLocaleCookie } from '@/components/set-cookie'

export default function LanguageSwitch() {
  async function setLanguage(_event_type : string, locale : string) {
    await setLocaleCookie(locale);
    return;
  }

  return (
    <span className="space-x-2">
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
    </span>
  )
}