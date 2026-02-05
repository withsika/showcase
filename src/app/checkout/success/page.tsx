import Link from 'next/link'

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>
}) {
  return (
    <SuccessContent searchParams={searchParams} />
  )
}

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>
}) {
  const { reference } = await searchParams

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4 py-16">
        {/* Success Animation */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
          <svg
            className="w-10 h-10 text-emerald-600 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Your test payment was processed successfully. 
          In a real integration, you would verify this payment on your server.
        </p>

        {reference && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 inline-block">
            <p className="text-sm text-gray-500 mb-1">Payment Reference</p>
            <code className="text-lg font-mono font-semibold text-gray-900">{reference}</code>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-4">Implementation Checklist</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Verify payment on your server</p>
                <p className="text-sm text-gray-500">Use the reference to verify the payment status via webhook or API</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Fulfill the order</p>
                <p className="text-sm text-gray-500">Grant access, ship product, or complete the service</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Send confirmation</p>
                <p className="text-sm text-gray-500">Email the customer with order details and receipt</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#examples"
            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try More Examples
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Showcase
          </Link>
        </div>

        {/* Demo Notice */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This was a test payment. No real money was charged.
          </p>
        </div>
      </div>
    </div>
  )
}
