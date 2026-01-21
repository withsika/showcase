/**
 * Product data for the demo store
 * 
 * Note: XOF (CFA Franc) is a zero-decimal currency.
 * Prices are stored as the actual amount (e.g., 45000 = 45,000 F CFA)
 */

export interface Product {
  id: string
  name: string
  description: string
  price: number // actual amount in XOF (no decimals)
  currency: string
  image: string
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-canceling wireless headphones with 30-hour battery life.',
    price: 45000, // 45,000 F CFA
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: 'prod_2',
    name: 'Smart Watch Pro',
    description: 'Track your fitness, receive notifications, and more with this sleek smartwatch.',
    price: 75000, // 75,000 F CFA
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  },
  {
    id: 'prod_3',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather messenger bag, perfect for work or travel.',
    price: 120000, // 120,000 F CFA
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
  },
  {
    id: 'prod_4',
    name: 'Organic Coffee Beans (1kg)',
    description: 'Premium single-origin coffee beans, freshly roasted for the perfect brew.',
    price: 25000, // 25,000 F CFA
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
  },
  {
    id: 'prod_5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for all Qi-enabled devices. Sleek minimalist design.',
    price: 15000, // 15,000 F CFA
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&h=400&fit=crop',
  },
  {
    id: 'prod_6',
    name: 'Sustainable Water Bottle',
    description: 'Insulated stainless steel bottle that keeps drinks cold for 24 hours.',
    price: 12000, // 12,000 F CFA
    currency: 'XOF',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} F CFA`
}
