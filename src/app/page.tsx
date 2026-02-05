'use client'

import Image from 'next/image'
import { products, formatPrice } from '@/lib/products'
import { addToCart } from '@/lib/cart'
import { useI18n } from '@/lib/i18n'
import { TranslationKey } from '@/lib/i18n/translations'

export default function HomePage() {
  const { t } = useI18n()

  const handleAddToCart = (productId: string) => {
    addToCart(productId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('home.title')}</h1>
        <p className="text-base text-gray-600">{t('home.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={product.image}
                alt={t(product.nameKey as TranslationKey)}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 text-base">{t(product.nameKey as TranslationKey)}</h3>
              <p className="text-base text-gray-500 mb-2 sm:mb-3 line-clamp-2">{t(product.descriptionKey as TranslationKey)}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-bold text-gray-900 text-base">{formatPrice(product.price)}</span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full sm:w-auto px-3 py-1.5 bg-emerald-600 text-white text-base font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {t('home.addToCart')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
