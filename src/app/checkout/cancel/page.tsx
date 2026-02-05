'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export default function CheckoutCancelPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4 py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('cancel.title')}</h1>
        <p className="text-gray-600 mb-6">{t('cancel.message')}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/cart"
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
          >
            {t('cancel.returnToCart')}
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
          >
            {t('cancel.continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  )
}
