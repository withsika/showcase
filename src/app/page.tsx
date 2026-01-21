import Image from 'next/image'
import Link from 'next/link'
import { ProductCard, ProductCardCompact } from '@/components/ProductCard'
import { 
  categories, 
  getFeaturedProducts, 
  getNewArrivals, 
  getBestSellers,
  formatPrice 
} from '@/lib/products'

function HeroSection() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1611091004178-7f10b2b44cf7?w=1920&h=1080&fit=crop"
          alt="African fashion"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full mb-4">
            New Collection 2026
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Celebrate African
            <span className="text-amber-400"> Heritage</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Discover our curated collection of authentic African fashion, handcrafted 
            by skilled artisans across the continent. From stunning Ankara prints to 
            elegant Kente designs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="px-8 py-3.5 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/collections/women"
              className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Women&apos;s Fashion
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Artisan Partners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Authentic</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of African fashion and lifestyle products
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-3">{category.description}</p>
                <span className="inline-flex items-center text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Shop Now
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Handpicked pieces our customers love</p>
          </div>
          <Link
            href="/collections"
            className="mt-4 sm:mt-0 text-amber-600 font-medium hover:text-amber-700 inline-flex items-center"
          >
            View All
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PromoBanner() {
  return (
    <section className="py-16 sm:py-20 bg-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              First Order Discount
            </h2>
            <p className="text-amber-100 text-lg mb-2">
              Use code <span className="font-bold text-white">MALIKA15</span> for 15% off your first order
            </p>
            <p className="text-amber-200 text-sm">
              *Valid for new customers only. Minimum order GH₵ 100
            </p>
          </div>
          <Link
            href="/collections"
            className="px-8 py-4 bg-white text-amber-600 font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Shop Now & Save
          </Link>
        </div>
      </div>
    </section>
  )
}

function NewArrivals() {
  const newProducts = getNewArrivals()

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-3">
              Just Dropped
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
            <p className="text-gray-600">Fresh styles added to our collection</p>
          </div>
          <Link
            href="/collections?filter=new"
            className="mt-4 sm:mt-0 text-amber-600 font-medium hover:text-amber-700 inline-flex items-center"
          >
            See All New
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BestSellers() {
  const bestSellers = getBestSellers()

  return (
    <section className="py-16 sm:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Customer Favorites</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our most loved pieces, chosen by customers just like you
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/collections?filter=bestseller"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
          >
            View All Best Sellers
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function TrustBadges() {
  const badges = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On orders over GH₵ 200',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Protected by Sika',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Easy Returns',
      description: '14-day return policy',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Here to help',
    },
  ]

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="text-amber-600">{badge.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Join the Malika Family
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, 
            and stories from our artisan partners.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustBadges />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
      <NewArrivals />
      <BestSellers />
      <Newsletter />
    </div>
  )
}
