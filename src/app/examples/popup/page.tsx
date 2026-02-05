'use client'

import { useState, useEffect } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'usePopupCheckout.ts',
    language: 'typescript',
    content: `'use client'

import { useCallback, useEffect, useRef } from 'react'

interface UsePopupCheckoutOptions {
  onComplete?: (reference: string) => void
  onCancel?: () => void
  width?: number
  height?: number
}

export function usePopupCheckout(options: UsePopupCheckoutOptions = {}) {
  const { 
    onComplete, 
    onCancel, 
    width = 450, 
    height = 700 
  } = options
  
  const popupRef = useRef<Window | null>(null)
  const checkIntervalRef = useRef<number | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [])

  // Listen for messages from popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sika:checkout:complete') {
        popupRef.current?.close()
        onComplete?.(event.data.reference)
      }
      if (event.data.type === 'sika:checkout:cancel') {
        popupRef.current?.close()
        onCancel?.()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onComplete, onCancel])

  const openPopup = useCallback((checkoutUrl: string) => {
    // Calculate center position
    const left = (window.innerWidth - width) / 2 + window.screenX
    const top = (window.innerHeight - height) / 2 + window.screenY

    // Open popup
    popupRef.current = window.open(
      checkoutUrl,
      'SikaCheckout',
      \`width=\${width},height=\${height},left=\${left},top=\${top},toolbar=no,menubar=no\`
    )

    // Poll for popup close (in case user closes manually)
    checkIntervalRef.current = window.setInterval(() => {
      if (popupRef.current?.closed) {
        clearInterval(checkIntervalRef.current!)
        onCancel?.()
      }
    }, 500)
  }, [width, height, onCancel])

  return { openPopup }
}`,
  },
  {
    filename: 'page.tsx',
    language: 'typescript',
    content: `'use client'

import { useState } from 'react'
import { usePopupCheckout } from './usePopupCheckout'

export default function ProductPage() {
  const [loading, setLoading] = useState(false)

  const { openPopup } = usePopupCheckout({
    onComplete: (reference) => {
      alert('Payment complete! Reference: ' + reference)
      // Redirect or update UI
    },
    onCancel: () => {
      console.log('Checkout cancelled or closed')
    },
  })

  const handleBuy = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'customer@example.com',
          amount: 7500,
          description: 'Product Purchase',
        }),
      })

      const { checkout_url } = await response.json()
      openPopup(checkout_url)
    } catch (error) {
      console.error('Failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleBuy} disabled={loading}>
      {loading ? 'Opening...' : 'Buy in Popup'}
    </button>
  )
}`,
  },
]

function PopupDemo() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'pending' | 'complete' | 'cancelled'>('idle')

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sika:checkout:complete') {
        setStatus('complete')
      }
      if (event.data.type === 'sika:checkout:cancel') {
        setStatus('cancelled')
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleBuy = async () => {
    setLoading(true)
    setStatus('idle')
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@example.com',
          amount: 7500,
          description: 'Showcase Demo - Popup Checkout',
        }),
      })

      const data = await response.json()
      
      if (data.checkout_url) {
        // Calculate center position
        const width = 450
        const height = 700
        const left = (window.innerWidth - width) / 2 + window.screenX
        const top = (window.innerHeight - height) / 2 + window.screenY

        const popup = window.open(
          data.checkout_url,
          'SikaCheckout',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
        )

        setStatus('pending')

        // Poll for popup close
        const checkInterval = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkInterval)
            if (status === 'pending') {
              setStatus('cancelled')
            }
          }
        }, 500)
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Failed:', error)
      alert('Failed to create checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto text-center">
      {/* Course Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="p-6">
          <div className="text-sm text-blue-600 font-medium mb-1">Online Course</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">React Masterclass</h3>
          <p className="text-gray-600 text-sm mb-4">
            Learn React from scratch with 50+ hours of video content, projects, and certificate.
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">GHS 75.00</span>
              <span className="text-sm text-gray-500 line-through ml-2">GHS 150.00</span>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">50% OFF</span>
          </div>

          <button
            onClick={handleBuy}
            disabled={loading || status === 'pending'}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Opening...
              </>
            ) : status === 'pending' ? (
              <>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Waiting for payment...
              </>
            ) : (
              <>
                Enroll Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {status === 'pending' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            A popup window has opened for checkout. Complete your payment there.
          </p>
        </div>
      )}
      
      {status === 'complete' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium">
            Payment successful! You now have access to the course.
          </p>
        </div>
      )}
      
      {status === 'cancelled' && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Checkout was closed. Click &quot;Enroll Now&quot; to try again.
          </p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Checkout opens in a separate popup window
      </p>
    </div>
  )
}

export default function PopupExamplePage() {
  return (
    <ExampleLayout
      title="Popup Window"
      description="Open checkout in a new browser window. Useful when you need to keep the main page intact."
      difficulty="Easy"
      tags={['Client-side', 'window.open', 'Best for: Desktop-focused apps']}
      code={code}
    >
      <PopupDemo />
    </ExampleLayout>
  )
}
