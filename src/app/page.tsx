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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('home.title')}</h1>
        <p className="text-gray-600">{t('home.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{t(product.nameKey as TranslationKey)}</h3>
              <p className="text-sm text-gray-500 mb-3">{t(product.descriptionKey as TranslationKey)}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
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
