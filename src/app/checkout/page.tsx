'use client'

import Script from 'next/script'
import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getCart, clearCart, CartItem } from '@/lib/cart'
import { getProduct, formatPrice } from '@/lib/products'
import { useI18n } from '@/lib/i18n'
import { TranslationKey } from '@/lib/i18n/translations'

// TypeScript declaration for the Sika SDK
declare global {
  interface Window {
    Sika: new (publicKey: string, config?: { checkoutUrl?: string }) => {
      checkout: (options: {
        reference: string
        onSuccess?: (result: { reference: string; status: string }) => void
        onCancel?: () => void
        onError?: (error: { reference: string; status: string; message: string }) => void
        onLoad?: () => void
      }) => void
      close: () => void
    }
  }
}

type CheckoutMode = 'redirect' | 'modal'

function CheckoutContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''
  
  const [mode, setMode] = useState<CheckoutMode>('redirect')
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const cartItems = cart.map(item => {
    const product = getProduct(item.productId)
    return product ? { ...item, product } : null
  }).filter(Boolean) as { productId: string; quantity: number; product: NonNullable<ReturnType<typeof getProduct>> }[]

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleCheckout = useCallback(async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: total,
          description: `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} from Malika`,
        }),
      })

      const data = await response.json()

      if (!data.reference) {
        alert(t('checkout.sessionFailed'))
        return
      }

      if (mode === 'redirect') {
        // Redirect to hosted checkout page
        clearCart()
        window.location.href = data.checkout_url
      } else {
        // Open Sika checkout modal
        const publicKey = process.env.NEXT_PUBLIC_SIKA_PUBLIC_KEY
        if (!publicKey) {
          console.error('NEXT_PUBLIC_SIKA_PUBLIC_KEY is not configured')
          alert(t('checkout.notConfigured'))
          return
        }

        const checkoutUrl = process.env.NEXT_PUBLIC_SIKA_CHECKOUT_URL
        const sika = new window.Sika(publicKey, checkoutUrl ? { checkoutUrl } : undefined)
        sika.checkout({
          reference: data.reference,
          onSuccess: (result) => {
            clearCart()
            router.push(`/checkout/success?reference=${result.reference}`)
          },
          onCancel: () => {
            setLoading(false)
          },
          onError: (error) => {
            console.error('Payment failed:', error.message)
            alert(`${t('checkout.failed')}: ${error.message}`)
            setLoading(false)
          },
          onLoad: () => {
            // Modal has loaded
          },
        })
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(t('checkout.failed'))
    } finally {
      if (mode === 'redirect') {
        setLoading(false)
      }
    }
  }, [email, total, cartItems.length, mode, router, t])

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">{t('cart.empty')}</p>
      </div>
    )
  }

  return (
    <>
      {/* Load Sika SDK */}
      <Script
        src="https://js.withsika.com/v1/sika.js"
        onLoad={() => setSdkReady(true)}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('checkout.title')}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">{t('checkout.orderSummary')}</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between py-2">
                  <span className="text-gray-600">
                    {t(item.product.nameKey as TranslationKey)} x {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                <span className="font-semibold text-gray-900">{t('checkout.total')}</span>
                <span className="font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              {t('checkout.email')}: {email}
            </p>
          </div>

          {/* Checkout Mode Selection */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">{t('checkout.mode')}</h2>
            
            <div className="space-y-3 mb-6">
              <label
                className={`block p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                  mode === 'redirect'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value="redirect"
                  checked={mode === 'redirect'}
                  onChange={() => setMode('redirect')}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mode === 'redirect' ? 'border-emerald-500' : 'border-gray-300'
                  }`}>
                    {mode === 'redirect' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{t('checkout.redirect')}</div>
                    <div className="text-sm text-gray-500">
                      {t('checkout.redirectDescription')}
                    </div>
                  </div>
                </div>
              </label>

              <label
                className={`block p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                  mode === 'modal'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value="modal"
                  checked={mode === 'modal'}
                  onChange={() => setMode('modal')}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mode === 'modal' ? 'border-emerald-500' : 'border-gray-300'
                  }`}>
                    {mode === 'modal' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{t('checkout.modal')}</div>
                    <div className="text-sm text-gray-500">
                      {t('checkout.modalDescription')}
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || (mode === 'modal' && !sdkReady)}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('checkout.processing')}
                </>
              ) : (
                `${t('checkout.pay')} ${formatPrice(total)}`
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              {t('checkout.testCard')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
