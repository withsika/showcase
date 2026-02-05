'use client'

import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        {t('footer.poweredBy')}{' '}
        <a href="https://withsika.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
          Sika
        </a>
      </div>
    </footer>
  )
}
