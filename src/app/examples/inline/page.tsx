'use client'

import { useState, useEffect } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'InlineCheckout.tsx',
    language: 'typescript',
    content: `'use client'

import { useEffect, useRef } from 'react'

interface InlineCheckoutProps {
  checkoutUrl: string
  onComplete?: (reference: string) => void
  onCancel?: () => void
}

export function InlineCheckout({ checkoutUrl, onComplete, onCancel }: InlineCheckoutProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sika:checkout:complete') {
        onComplete?.(event.data.reference)
      }
      if (event.data.type === 'sika:checkout:cancel') {
        onCancel?.()
      }
      // Auto-resize iframe based on content height
      if (event.data.type === 'sika:checkout:resize') {
        if (iframeRef.current) {
          iframeRef.current.style.height = event.data.height + 'px'
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onComplete, onCancel])

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <iframe
        ref={iframeRef}
        src={checkoutUrl}
        className="w-full min-h-[500px] border-0"
        title="Sika Checkout"
      />
    </div>
  )
}`,
  },
  {
    filename: 'page.tsx',
    language: 'typescript',
    content: `'use client'

import { useState, useEffect } from 'react'
import { InlineCheckout } from './InlineCheckout'

export default function CheckoutPage() {
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function createCheckout() {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'customer@example.com',
            amount: 10000,
            description: 'Order #12345',
          }),
        })

        const { checkout_url } = await response.json()
        setCheckoutUrl(checkout_url)
      } catch (error) {
        console.error('Failed to create checkout:', error)
      } finally {
        setLoading(false)
      }
    }

    createCheckout()
  }, [])

  if (loading) {
    return <div>Loading checkout...</div>
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div>
        <h2>Order Summary</h2>
        {/* Your order items here */}
      </div>

      {/* Embedded Checkout */}
      <div>
        <h2>Payment</h2>
        <InlineCheckout
          checkoutUrl={checkoutUrl}
          onComplete={(ref) => {
            window.location.href = '/success?reference=' + ref
          }}
          onCancel={() => {
            window.location.href = '/cart'
          }}
        />
      </div>
    </div>
  )
}`,
  },
]

function InlineDemo() {
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const initializeCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@example.com',
          amount: 10000,
          description: 'Showcase Demo - Inline Checkout',
        }),
      })

      const data = await response.json()
      
      if (data.checkout_url) {
        setCheckoutUrl(data.checkout_url)
        setShowCheckout(true)
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Failed to create checkout:', error)
      alert('Failed to create checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sika:checkout:complete') {
        alert('Payment complete! Reference: ' + event.data.reference)
        setShowCheckout(false)
      }
      if (event.data.type === 'sika:checkout:cancel') {
        setShowCheckout(false)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      {!showCheckout ? (
        <div className="text-center">
          {/* Order Preview */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Pro Plan</span>
                <span className="text-gray-900">GHS 85.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Premium Support Add-on</span>
                <span className="text-gray-900">GHS 15.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>GHS 100.00</span>
              </div>
            </div>
          </div>

          <button
            onClick={initializeCheckout}
            disabled={loading}
            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            The checkout form will appear inline below
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-6">
          {/* Order Summary Sidebar */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 rounded-xl p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Pro Plan</span>
                  <span className="text-gray-900">GHS 85.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Premium Support</span>
                  <span className="text-gray-900">GHS 15.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>GHS 100.00</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowCheckout(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                &larr; Back to order
              </button>
            </div>
          </div>

          {/* Inline Checkout */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <iframe
                src={checkoutUrl}
                className="w-full h-[550px] border-0"
                title="Sika Checkout"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function InlineExamplePage() {
  return (
    <ExampleLayout
      title="Inline Embed"
      description="Embed the checkout form directly into your page for a seamless, integrated experience."
      difficulty="Medium"
      tags={['Client-side', 'iframe', 'Best for: Custom checkout flows']}
      code={code}
    >
      <InlineDemo />
    </ExampleLayout>
  )
}
