'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useI18n } from '@/lib/i18n'

function SuccessContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4 py-16">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('success.title')}</h1>
        <p className="text-gray-600 mb-6">{t('success.message')}</p>

        {reference && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-xs text-gray-500 mb-1">{t('success.reference')}</p>
            <code className="text-sm font-mono text-gray-900">{reference}</code>
          </div>
        )}

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
        >
          {t('success.continueShopping')}
        </Link>

        <p className="text-xs text-gray-400 mt-8">
          {t('success.demo')}
        </p>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
