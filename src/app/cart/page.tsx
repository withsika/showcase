'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCart, updateQuantity, removeFromCart, CartItem } from '@/lib/cart'
import { getProduct, formatPrice } from '@/lib/products'

export default function CartPage() {
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products to get started</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200 mb-6">
        {cartItems.map((item) => (
          <div key={item.productId} className="p-4 flex gap-4">
            <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-500">{formatPrice(item.product.price)}</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="ml-auto text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold text-gray-900">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        </div>

        <Link
          href={email ? `/checkout?email=${encodeURIComponent(email)}` : '#'}
          onClick={(e) => {
            if (!email) {
              e.preventDefault()
              alert('Please enter your email address')
            }
          }}
          className="block w-full py-3 bg-emerald-600 text-white text-center font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
