'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCart, updateQuantity, removeFromCart, CartItem } from '@/lib/cart'
import { getProduct, formatPrice } from '@/lib/products'
import { useI18n } from '@/lib/i18n'
import { TranslationKey } from '@/lib/i18n/translations'

export default function CartPage() {
  const { t } = useI18n()
  const [cart, setCart] = useState<CartItem[]>([])
  const [email, setEmail] = useState('')

  useEffect(() => {
    const updateCart = () => setCart(getCart())
    updateCart()
    window.addEventListener('cart-updated', updateCart)
    return () => window.removeEventListener('cart-updated', updateCart)
  }, [])

  const cartItems = cart.map(item => {
    const product = getProduct(item.productId)
    return product ? { ...item, product } : null
  }).filter(Boolean) as { productId: string; quantity: number; product: NonNullable<ReturnType<typeof getProduct>> }[]

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t('cart.empty')}</h1>
        <p className="text-base text-gray-600 mb-6">{t('cart.emptySubtitle')}</p>
        <Link
          href="/"
          className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white text-base font-medium rounded-lg hover:bg-emerald-700"
        >
          {t('cart.continueShopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">{t('cart.title')}</h1>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200 mb-6">
        {cartItems.map((item) => (
          <div key={item.productId} className="p-3 sm:p-4">
            <div className="flex gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={t(item.product.nameKey as TranslationKey)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">{t(item.product.nameKey as TranslationKey)}</h3>
                    <p className="text-base text-gray-500">{formatPrice(item.product.price)}</p>
                  </div>
                  <span className="font-semibold text-gray-900 text-base whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-base"
                  >
                    -
                  </button>
                  <span className="text-base font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-base"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-auto text-base text-red-600 hover:text-red-700"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
          <span>{t('cart.total')}</span>
          <span>{formatPrice(total)}</span>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
            {t('cart.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('cart.emailPlaceholder')}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        </div>

        <Link
          href={email ? `/checkout?email=${encodeURIComponent(email)}` : '#'}
          onClick={(e) => {
            if (!email) {
              e.preventDefault()
              alert(t('cart.emailRequired'))
            }
          }}
          className="block w-full py-2.5 sm:py-3 bg-emerald-600 text-white text-center text-base font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          {t('cart.proceedToCheckout')}
        </Link>
      </div>
    </div>
  )
}
