'use client'

import { useState } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'BuyButton.tsx',
    language: 'typescript',
    content: `'use client'

import { useState } from 'react'

interface BuyButtonProps {
  productId: string
  productName: string
  price: number // in minor units (pesewas)
  email?: string
  className?: string
  children?: React.ReactNode
}

export function BuyButton({ 
  productId, 
  productName, 
  price, 
  email,
  className = '',
  children 
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || 'customer@example.com',
          amount: price,
          description: productName,
          metadata: { product_id: productId },
        }),
      })

      const { checkout_url } = await response.json()
      window.location.href = checkout_url
    } catch (error) {
      console.error('Checkout failed:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? 'Loading...' : children || 'Buy Now'}
    </button>
  )
}`,
  },
  {
    filename: 'usage.tsx',
    language: 'typescript',
    content: `import { BuyButton } from './BuyButton'

// Simple usage
<BuyButton
  productId="prod_123"
  productName="Premium Template"
  price={2999} // GHS 29.99
/>

// With custom styling
<BuyButton
  productId="prod_456"
  productName="Starter Pack"
  price={999}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg"
>
  Get Started - GHS 9.99
</BuyButton>

// Pre-filled email
<BuyButton
  productId="prod_789"
  productName="Enterprise License"
  price={49900}
  email={user.email}
>
  Purchase License
</BuyButton>`,
  },
]

function BuyButtonDemo() {
  const [loading, setLoading] = useState<string | null>(null)

  const products = [
    {
      id: 'starter',
      name: 'Starter Template',
      description: 'Perfect for small projects',
      price: 1500,
      features: ['5 pages', 'Basic components', 'Email support'],
      color: 'from-gray-500 to-gray-700',
      buttonColor: 'bg-gray-800 hover:bg-gray-900',
    },
    {
      id: 'pro',
      name: 'Pro Template',
      description: 'Most popular choice',
      price: 3500,
      features: ['15 pages', 'All components', 'Priority support', 'Free updates'],
      color: 'from-emerald-500 to-emerald-700',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large teams',
      price: 9900,
      features: ['Unlimited pages', 'Custom components', 'Dedicated support', 'Source files'],
      color: 'from-purple-500 to-purple-700',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ]

  const handleBuy = async (product: typeof products[0]) => {
    setLoading(product.id)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@example.com',
          amount: product.price,
          description: `Showcase Demo - ${product.name}`,
          metadata: { product_id: product.id },
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
      setLoading(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`relative bg-white rounded-xl border-2 overflow-hidden ${
              product.popular ? 'border-emerald-500' : 'border-gray-200'
            }`}
          >
            {product.popular && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
            )}
            
            <div className={`h-2 bg-gradient-to-r ${product.color}`} />
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  GHS {(product.price / 100).toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm"> one-time</span>
              </div>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(product)}
                disabled={loading === product.id}
                className={`w-full py-3 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${product.buttonColor}`}
              >
                {loading === product.id ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Buy Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        One-click purchase buttons - no cart needed
      </p>
    </div>
  )
}

export default function BuyButtonExamplePage() {
  return (
    <ExampleLayout
      title="Buy Button"
      description="Simple one-click purchase button for single products. Perfect for landing pages and CTAs."
      difficulty="Easy"
      tags={['Client-side', 'Single product', 'Best for: Landing pages, Pricing tables']}
      code={code}
    >
      <BuyButtonDemo />
    </ExampleLayout>
  )
}
