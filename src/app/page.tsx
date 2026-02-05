import Link from 'next/link'

const examples = [
  {
    id: 'redirect',
    title: 'Redirect',
    description: 'Classic checkout flow - redirect customers to a hosted payment page and return them after completion.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    difficulty: 'Easy',
    tags: ['Server-side', 'No JavaScript SDK'],
  },
  {
    id: 'modal',
    title: 'Modal Overlay',
    description: 'Open checkout in a modal overlay without leaving the page. Great for reducing cart abandonment.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    difficulty: 'Easy',
    tags: ['Client-side', 'iframe'],
  },
  {
    id: 'inline',
    title: 'Inline Embed',
    description: 'Embed the checkout form directly into your page for a seamless, integrated experience.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h14a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    difficulty: 'Medium',
    tags: ['Client-side', 'iframe'],
  },
  {
    id: 'popup',
    title: 'Popup Window',
    description: 'Open checkout in a new browser window. Useful when you need to keep the main page intact.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    difficulty: 'Easy',
    tags: ['Client-side', 'window.open'],
  },
  {
    id: 'buy-button',
    title: 'Buy Button',
    description: 'Simple one-click purchase button for single products. Perfect for landing pages and CTAs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    difficulty: 'Easy',
    tags: ['Client-side', 'Single product'],
  },
  {
    id: 'donation',
    title: 'Donation Form',
    description: 'Custom amount input with preset quick-select options. Ideal for nonprofits and tipping.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    difficulty: 'Medium',
    tags: ['Custom amounts', 'Variable pricing'],
  },
  {
    id: 'vanilla-js',
    title: 'Vanilla JavaScript',
    description: 'Pure HTML and JavaScript integration without any framework. Copy-paste ready.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    difficulty: 'Easy',
    tags: ['No framework', 'Copy-paste'],
  },
]

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors[difficulty as keyof typeof colors] || colors.Easy}`}>
      {difficulty}
    </span>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Live Examples
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Sika Checkout
            <span className="text-emerald-600"> Showcase</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Explore different ways to integrate Sika payments into your application. 
            From simple redirects to embedded forms, find the integration pattern that works best for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#examples"
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View Examples
            </a>
            <a
              href="https://docs.withsika.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Read Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Integration Methods Overview */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Integration</h3>
              <p className="text-gray-600 text-sm">
                Copy code snippets and have checkout running in minutes. All examples are production-ready.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Test Mode</h3>
              <p className="text-gray-600 text-sm">
                All examples run in test mode. No real charges are made. Use test cards to simulate payments.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">View Source</h3>
              <p className="text-gray-600 text-sm">
                Every example includes full source code. Click &quot;View Code&quot; to see how it&apos;s implemented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section id="examples" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Examples</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose an integration pattern based on your use case. Each example is fully functional 
              and includes source code you can copy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example) => (
              <Link
                key={example.id}
                href={`/examples/${example.id}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    {example.icon}
                  </div>
                  <DifficultyBadge difficulty={example.difficulty} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {example.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {example.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to accept payments?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Sign up for a Sika account and get your API keys in minutes. 
            Start with test mode, then go live when you&apos;re ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://dashboard.withsika.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Create Free Account
            </a>
            <a
              href="https://docs.withsika.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
