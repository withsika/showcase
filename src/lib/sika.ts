/**
 * Sika API Client
 * 
 * Server-side client for initializing checkouts with the Sika API.
 * This file should only be used in server components or API routes.
 */

const SIKA_API_URL = process.env.SIKA_API_URL || 'https://api.staging.withsika.com'
const SIKA_CHECKOUT_URL = process.env.SIKA_CHECKOUT_URL || 'https://pay.staging.withsika.com'
const SIKA_SECRET_KEY = process.env.SIKA_SECRET_KEY

export interface CheckoutInitResponse {
  checkout_url: string
  reference: string
  payment: {
    id: string
    reference: string
    status: string
    amount: { value: number; formatted: string }
    currency: { code: string; symbol: string }
  }
}

export interface CheckoutInitParams {
  email: string
  amount: number // Amount in minor units (e.g., cents for USD, pesewas for GHS)
  currency?: string // ISO 4217 currency code (default: GHS)
  description?: string
  metadata?: Record<string, string>
  success_url: string
  cancel_url: string
}

/**
 * Initialize a checkout session with the Sika API
 * 
 * @param params - Checkout parameters
 * @returns Checkout response with checkout_url and reference
 */
export async function initializeCheckout(params: CheckoutInitParams): Promise<CheckoutInitResponse> {
  if (!SIKA_SECRET_KEY) {
    throw new Error('SIKA_SECRET_KEY is not configured')
  }

  const response = await fetch(`${SIKA_API_URL}/checkout/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SIKA_SECRET_KEY}`,
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to initialize checkout')
  }

  return response.json()
}

/**
 * Get the base checkout URL for embedding
 * This is used for iframe/modal integrations
 */
export function getCheckoutBaseUrl(): string {
  return SIKA_CHECKOUT_URL
}

/**
 * Build a checkout URL with a reference
 */
export function buildCheckoutUrl(reference: string): string {
  return `${SIKA_CHECKOUT_URL}/${reference}`
}
