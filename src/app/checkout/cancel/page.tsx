import Link from 'next/link'

export default function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>
}) {
  return (
    <CancelContent searchParams={searchParams} />
  )
}

async function CancelContent({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>
}) {
  const { reference } = await searchParams

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-4 py-16">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Checkout Cancelled
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          You cancelled the checkout process. No payment was made.
          Feel free to try again or explore other examples.
        </p>

        {reference && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 inline-block">
            <p className="text-sm text-gray-500 mb-1">Reference</p>
            <code className="text-lg font-mono font-semibold text-gray-900">{reference}</code>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-4">Handling Cancellations</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              When a user cancels checkout, they&apos;re redirected to your <code className="bg-gray-100 px-1 rounded">cancel_url</code>. 
              Here&apos;s what you might want to do:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Keep cart items for the user to try again
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Show alternative payment methods
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Optionally send an abandoned cart email
              </li>
            </ul>
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
            This was a test checkout. No payment was attempted.
          </p>
        </div>
      </div>
    </div>
  )
}
