'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCart, clearCart, CartItem } from '@/lib/cart'
import { getProduct, formatPrice } from '@/lib/products'

type CheckoutMode = 'redirect' | 'embed'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  
  const [mode, setMode] = useState<CheckoutMode>('redirect')
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const cartItems = cart.map(item => {
    const product = getProduct(item.productId)
    return product ? { ...item, product } : null
  }).filter(Boolean) as { productId: string; quantity: number; product: NonNullable<ReturnType<typeof getProduct>> }[]

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: total,
          description: `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} from Sika Store`,
        }),
      })

      const data = await response.json()

      if (data.checkout_url) {
        if (mode === 'redirect') {
          clearCart()
          window.location.href = data.checkout_url
        } else {
          setCheckoutUrl(data.checkout_url)
        }
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Listen for checkout completion in embed mode
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sika:checkout:complete') {
        clearCart()
        window.location.href = `/checkout/success?reference=${event.data.reference}`
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (cartItems.length === 0 && !checkoutUrl) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between py-2">
                <span className="text-gray-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">{formatPrice(total)}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Email: {email}
          </p>
        </div>

        {/* Checkout Mode Selection */}
        <div>
          {!checkoutUrl ? (
            <>
              <h2 className="font-semibold text-gray-900 mb-4">Checkout Mode</h2>
              
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
                      <div className="font-medium text-gray-900">Redirect</div>
                      <div className="text-sm text-gray-500">
                        Go to Sika&apos;s hosted checkout page
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    mode === 'embed'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="embed"
                    checked={mode === 'embed'}
                    onChange={() => setMode('embed')}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      mode === 'embed' ? 'border-emerald-500' : 'border-gray-300'
                    }`}>
                      {mode === 'embed' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Embed</div>
                      <div className="text-sm text-gray-500">
                        Pay without leaving this page
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Test card: 4084 0840 8408 4081
              </p>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-gray-900 mb-4">Complete Payment</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <iframe
                  src={checkoutUrl}
                  className="w-full h-[500px] border-0"
                  title="Sika Checkout"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
