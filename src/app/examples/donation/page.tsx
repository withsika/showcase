'use client'

import { useState } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'DonationForm.tsx',
    language: 'typescript',
    content: `'use client'

import { useState } from 'react'

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000] // in pesewas

export function DonationForm() {
  const [amount, setAmount] = useState<number | null>(2500)
  const [customAmount, setCustomAmount] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePresetClick = (preset: number) => {
    setAmount(preset)
    setCustomAmount('')
  }

  const handleCustomChange = (value: string) => {
    setCustomAmount(value)
    const parsed = parseFloat(value) * 100 // Convert to pesewas
    setAmount(isNaN(parsed) ? null : parsed)
  }

  const handleDonate = async () => {
    if (!amount || amount < 100) {
      alert('Please enter a valid amount (min GHS 1.00)')
      return
    }
    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount,
          description: 'Donation',
          metadata: { type: 'donation' },
        }),
      })

      const { checkout_url } = await response.json()
      window.location.href = checkout_url
    } catch (error) {
      console.error('Donation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Preset amounts */}
      <div className="grid grid-cols-4 gap-2">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={\`py-3 rounded-lg border-2 font-medium transition-colors \${
              amount === preset && !customAmount
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 hover:border-gray-300'
            }\`}
          >
            GHS {preset / 100}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Or enter custom amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            GHS
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder="0.00"
            min="1"
            step="0.01"
            className="w-full pl-14 pr-4 py-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Email */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full px-4 py-3 border rounded-lg"
      />

      {/* Submit */}
      <button
        onClick={handleDonate}
        disabled={loading || !amount}
        className="w-full py-3 bg-emerald-600 text-white rounded-lg"
      >
        {loading ? 'Processing...' : \`Donate GHS \${amount ? (amount / 100).toFixed(2) : '0.00'}\`}
      </button>
    </div>
  )
}`,
  },
]

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000]

function DonationDemo() {
  const [amount, setAmount] = useState<number | null>(2500)
  const [customAmount, setCustomAmount] = useState('')
  const [email, setEmail] = useState('demo@example.com')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePresetClick = (preset: number) => {
    setAmount(preset)
    setCustomAmount('')
  }

  const handleCustomChange = (value: string) => {
    setCustomAmount(value)
    const parsed = parseFloat(value) * 100
    setAmount(isNaN(parsed) || parsed <= 0 ? null : Math.round(parsed))
  }

  const handleDonate = async () => {
    if (!amount || amount < 100) {
      alert('Please enter a valid amount (min GHS 1.00)')
      return
    }
    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount,
          description: 'Showcase Demo - Donation',
          metadata: { 
            type: 'donation',
            donor_name: name || 'Anonymous',
            message: message || '',
          },
        }),
      })

      const data = await response.json()
      
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        alert('Failed to create donation session')
      }
    } catch (error) {
      console.error('Donation failed:', error)
      alert('Failed to process donation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const displayAmount = amount ? (amount / 100).toFixed(2) : '0.00'

  return (
    <div className="max-w-md mx-auto">
      {/* Cause Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Support Our Cause</h3>
        <p className="text-gray-600 text-sm">
          Your donation helps us continue making a difference in our community. Every contribution counts!
        </p>
      </div>

      {/* Donation Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        {/* Preset Amounts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select amount
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                  amount === preset && !customAmount
                    ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                GHS {preset / 100}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter custom amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              GHS
            </span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="0.00"
              min="1"
              step="0.01"
              className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave a message <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message of support..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleDonate}
          disabled={loading || !amount || amount < 100 || !email}
          className="w-full py-4 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Donate GHS {displayAmount}
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          Secure payment powered by Sika
        </p>
      </div>
    </div>
  )
}

export default function DonationExamplePage() {
  return (
    <ExampleLayout
      title="Donation Form"
      description="Custom amount input with preset quick-select options. Ideal for nonprofits and tipping."
      difficulty="Medium"
      tags={['Custom amounts', 'Variable pricing', 'Best for: Nonprofits, Tips, Fundraising']}
      code={code}
    >
      <DonationDemo />
    </ExampleLayout>
  )
}
