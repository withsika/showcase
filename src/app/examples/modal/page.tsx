'use client'

import { useState } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'CheckoutModal.tsx',
    language: 'typescript',
    content: `'use client'

import { useState, useEffect } from 'react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  checkoutUrl: string
}

export function CheckoutModal({ isOpen, onClose, checkoutUrl }: CheckoutModalProps) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for messages from the checkout iframe
      if (event.data.type === 'sika:checkout:complete') {
        onClose()
        // Handle successful payment
        window.location.href = '/success?reference=' + event.data.reference
      }
      if (event.data.type === 'sika:checkout:cancel') {
        onClose()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <iframe
          src={checkoutUrl}
          className="w-full h-[600px] border-0"
          title="Sika Checkout"
        />
      </div>
    </div>
  )
}`,
  },
  {
    filename: 'page.tsx',
    language: 'typescript',
    content: `'use client'

import { useState } from 'react'
import { CheckoutModal } from './CheckoutModal'

export default function ProductPage() {
  const [showModal, setShowModal] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'customer@example.com',
          amount: 2500,
          description: 'Product Purchase',
        }),
      })

      const { checkout_url } = await response.json()
      setCheckoutUrl(checkout_url)
      setShowModal(true)
    } catch (error) {
      console.error('Failed to create checkout:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleBuy} disabled={loading}>
        {loading ? 'Loading...' : 'Buy Now'}
      </button>
      
      <CheckoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        checkoutUrl={checkoutUrl}
      />
    </div>
  )
}`,
  },
]

function ModalDemo() {
  const [showModal, setShowModal] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@example.com',
          amount: 2500,
          description: 'Showcase Demo - Modal Checkout',
        }),
      })

      const data = await response.json()
      
      if (data.checkout_url) {
        setCheckoutUrl(data.checkout_url)
        setShowModal(true)
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

  return (
    <div className="max-w-md mx-auto">
      {/* Product Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <svg className="w-24 h-24 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="p-6">
          <div className="text-sm text-purple-600 font-medium mb-1">Digital Product</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Design System Template</h3>
          <p className="text-gray-600 text-sm mb-4">
            Complete Figma design system with 200+ components, documentation, and examples.
          </p>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">GHS 25.00</div>
            <button
              onClick={handleBuy}
              disabled={loading}
              className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </>
              ) : (
                'Buy Now'
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Checkout opens in a modal overlay without leaving this page
      </p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowModal(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <iframe
              src={checkoutUrl}
              className="w-full h-[600px] border-0"
              title="Sika Checkout"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function ModalExamplePage() {
  return (
    <ExampleLayout
      title="Modal Overlay"
      description="Open checkout in a modal overlay without leaving the page. Great for reducing cart abandonment."
      difficulty="Easy"
      tags={['Client-side', 'iframe', 'Best for: SaaS, Digital products']}
      code={code}
    >
      <ModalDemo />
    </ExampleLayout>
  )
}
