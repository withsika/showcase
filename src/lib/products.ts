export interface Product {
  id: string
  name: string
  description: string
  price: number // in pesewas (GHS minor units)
  image: string
}

export const products: Product[] = [
  {
    id: 'tshirt',
    name: 'Classic T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 4500, // GHS 45.00
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: 'hoodie',
    name: 'Cozy Hoodie',
    description: 'Warm and stylish hoodie',
    price: 8500, // GHS 85.00
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
  },
  {
    id: 'cap',
    name: 'Baseball Cap',
    description: 'Adjustable snapback cap',
    price: 2500, // GHS 25.00
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
  },
  {
    id: 'bag',
    name: 'Tote Bag',
    description: 'Eco-friendly canvas tote',
    price: 3500, // GHS 35.00
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function formatPrice(amount: number): string {
  return `GHS ${(amount / 100).toFixed(2)}`
}
