'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, updateQuantity, removeFromCart, getCartTotal, clearCart, CartItem } from '@/lib/cart'
import { formatPrice } from '@/lib/products'

// Declare Sika SDK type
declare global {
  interface Window {
    Sika: new (publicKey: string) => {
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

type CheckoutMode = 'redirect' | 'embedded'

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>('embedded')
  const [sdkLoaded, setSdkLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCart(getCart())
    
    const handleUpdate = () => setCart(getCart())
    window.addEventListener('cart-updated', handleUpdate)
    return () => window.removeEventListener('cart-updated', handleUpdate)
  }, [])

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart(updateQuantity(productId, quantity))
  }

  const handleRemove = (productId: string) => {
    setCart(removeFromCart(productId))
  }

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email')
      return
    }

    // For embedded mode, check if SDK is loaded
    if (checkoutMode === 'embedded' && !sdkLoaded) {
      alert('Payment SDK is still loading. Please try again.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          email,
        }),
      })

      const data = await response.json()

      if (!data.reference) {
        alert(data.error || 'Failed to create checkout')
        setIsLoading(false)
        return
      }

      if (checkoutMode === 'redirect') {
        // Redirect flow - navigate to checkout URL
        if (data.checkout_url) {
          localStorage.removeItem('sika_demo_cart')
          window.location.href = data.checkout_url
        } else {
          alert('Failed to get checkout URL')
          setIsLoading(false)
        }
      } else {
        // Embedded flow - open modal using Sika SDK
        const sika = new window.Sika('sika_test_pk_demo')
        
        sika.checkout({
          reference: data.reference,
          onSuccess: (result) => {
            console.log('Payment successful:', result)
            clearCart()
            router.push(`/checkout/success?reference=${result.reference}`)
          },
          onCancel: () => {
            console.log('Payment cancelled')
            setIsLoading(false)
          },
          onError: (error) => {
            console.error('Payment error:', error)
            alert(error.message || 'Payment failed')
            setIsLoading(false)
          },
          onLoad: () => {
            // Modal is now visible, stop the button loading state
            setIsLoading(false)
          },
        })
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong')
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-700">Home</Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">Cart</li>
            </ol>
          </nav>

          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. 
              Explore our collection to find something you love.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const total = getCartTotal(cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Load Sika SDK */}
      <Script 
        src="https://js.withsika.com/v1/sika.js" 
        onLoad={() => setSdkLoaded(true)}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">Home</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Cart</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Shopping Cart 
          <span className="text-gray-500 font-normal text-lg ml-2">
            ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-6">
                  {/* Product Image */}
                  <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <Link 
                          href={`/products/${item.product.id}`}
                          className="font-semibold text-gray-900 hover:text-amber-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1 capitalize">{item.product.category}</p>
                      </div>
                      <p className="font-bold text-gray-900 hidden sm:block">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-l-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 h-8 flex items-center justify-center border-y border-gray-200 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-r-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="font-bold text-gray-900 sm:hidden">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Link */}
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700 mt-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  />
                  <button className="px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try <span className="font-medium">MALIKA15</span> for 15% off
                </p>
              </div>

              {/* Summary Lines */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">{formatPrice(total)}</span>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email for receipt
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Checkout Mode Toggle */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Checkout Experience
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutMode('embedded')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      checkoutMode === 'embedded'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Embedded
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutMode('redirect')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      checkoutMode === 'redirect'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Redirect
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {checkoutMode === 'embedded' 
                    ? 'Pay without leaving this page' 
                    : 'Redirect to Sika checkout page'}
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-amber-500 text-white py-3.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1 text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Protected
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Easy Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
