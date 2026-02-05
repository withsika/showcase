'use client'

import { useI18n, Locale } from '@/lib/i18n'

export function LanguagePicker() {
  const { locale, setLocale, t } = useI18n()

  const toggleLocale = () => {
    const newLocale: Locale = locale === 'en' ? 'fr' : 'en'
    setLocale(newLocale)
  }

  return (
    <button
      onClick={toggleLocale}
      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
      title={locale === 'en' ? t('language.fr') : t('language.en')}
    >
      {locale === 'en' ? 'FR' : 'EN'}
    </button>
  )
}
