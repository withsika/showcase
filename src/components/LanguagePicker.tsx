'use client'

import { useState, useRef, useEffect } from 'react'
import { useI18n, Locale } from '@/lib/i18n'

export function LanguagePicker() {
  const { locale, setLocale, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-base font-medium text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
      >
        <span className="uppercase">{locale}</span>
        <svg
          className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleSelect('en')}
              className={`w-full px-4 py-2 text-left text-base hover:bg-gray-50 transition-colors ${
                locale === 'en' ? 'font-semibold text-gray-900' : 'text-gray-600'
              }`}
            >
              {t('language.en')} (EN)
            </button>
            <button
              onClick={() => handleSelect('fr')}
              className={`w-full px-4 py-2 text-left text-base hover:bg-gray-50 transition-colors ${
                locale === 'fr' ? 'font-semibold text-gray-900' : 'text-gray-600'
              }`}
            >
              {t('language.fr')} (FR)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
