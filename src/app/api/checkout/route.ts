import { NextRequest, NextResponse } from 'next/server'
import { initializeCheckout } from '@/lib/sika'
import { getProduct } from '@/lib/products'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, email } = body

    // Get product details
    const product = getProduct(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get base URL for redirects
    // Use BASE_URL (runtime) or NEXT_PUBLIC_BASE_URL (build time) or fallback
    const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Initialize Sika checkout
    const checkout = await initializeCheckout({
      email,
      amount: product.price,
      description: `Purchase: ${product.name}`,
      metadata: {
        product_id: product.id,
        product_name: product.name,
      },
      success_url: `${baseUrl}/checkout/success?reference={reference}`,
      cancel_url: `${baseUrl}/checkout/cancel?reference={reference}`,
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
