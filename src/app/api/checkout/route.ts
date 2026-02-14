import { NextRequest, NextResponse } from 'next/server'
import { initializeCheckout } from '@/lib/sika'

interface CheckoutRequest {
  email: string
  amount: number
  description?: string
  metadata?: Record<string, string>
  locale?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CheckoutRequest

    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!body.amount || body.amount < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100' },
        { status: 400 }
      )
    }

    // Get base URL for redirects
    const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Initialize Sika checkout
    const checkout = await initializeCheckout({
      email: body.email,
      amount: body.amount,
      currency: 'XOF',
      description: body.description || 'Malika Store',
      metadata: body.metadata,
      success_url: `${baseUrl}/checkout/success?reference={reference}`,
      cancel_url: `${baseUrl}/checkout/cancel?reference={reference}`,
      locale: body.locale,
    })

    return NextResponse.json(checkout)
  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout' },
      { status: 500 }
    )
  }
}
