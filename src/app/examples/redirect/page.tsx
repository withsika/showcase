'use client'

import { useState } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'api/checkout/route.ts',
    language: 'typescript',
    content: `import { NextRequest, NextResponse } from 'next/server'

const SIKA_API_URL = process.env.SIKA_API_URL
const SIKA_SECRET_KEY = process.env.SIKA_SECRET_KEY

export async function POST(request: NextRequest) {
  const { email, amount, description } = await request.json()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const response = await fetch(\`\${SIKA_API_URL}/checkout/initialize\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${SIKA_SECRET_KEY}\`,
    },
    body: JSON.stringify({
      email,
      amount,
      description,
      success_url: \`\${baseUrl}/success?reference={reference}\`,
      cancel_url: \`\${baseUrl}/cancel\`,
    }),
  })

  const data = await response.json()
  return NextResponse.json(data)
}`,
  },
  {
    filename: 'CheckoutButton.tsx',
    language: 'typescript',
    content: `'use client'

import { useState } from 'react'

export function CheckoutButton() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'customer@example.com',
          amount: 5000, // GHS 50.00 in pesewas
          description: 'Premium Plan Subscription',
        }),
      })

      const { checkout_url } = await response.json()
      
      // Redirect to Sika checkout
      window.location.href = checkout_url
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Loading...' : 'Checkout'}
    </button>
  )
}`,
  },
]

function RedirectDemo() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('demo@example.com')

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: 5000,
          description: 'Showcase Demo - Redirect Checkout',
        }),
      })

      const data = await response.json()
      
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Product Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white mb-6">
        <div className="text-sm font-medium opacity-80 mb-2">Premium Plan</div>
        <div className="text-4xl font-bold mb-2">GHS 50.00</div>
        <div className="text-sm opacity-80">per month</div>
        <ul className="mt-6 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Unlimited API calls
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Priority support
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Advanced analytics
          </li>
        </ul>
      </div>

      {/* Checkout Form */}
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            placeholder="you@example.com"
          />
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !email}
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Redirecting...
            </>
          ) : (
            <>
              Subscribe Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          You will be redirected to Sika&apos;s secure checkout page
        </p>
      </div>
    </div>
  )
}

export default function RedirectExamplePage() {
  return (
    <ExampleLayout
      title="Redirect Checkout"
      description="Classic checkout flow - redirect customers to a hosted payment page and return them after completion."
      difficulty="Easy"
      tags={['Server-side', 'No JavaScript SDK', 'Best for: Traditional e-commerce']}
      code={code}
    >
      <RedirectDemo />
    </ExampleLayout>
  )
}
