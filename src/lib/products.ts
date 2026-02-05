export interface Product {
  id: string
  nameKey: string
  descriptionKey: string
  price: number // in FCFA (XOF has factor 1, no minor units)
  image: string
}

export const products: Product[] = [
  {
    id: 'tshirt',
    nameKey: 'product.tshirt.name',
    descriptionKey: 'product.tshirt.description',
    price: 5000, // 5,000 FCFA
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: 'hoodie',
    nameKey: 'product.hoodie.name',
    descriptionKey: 'product.hoodie.description',
    price: 12000, // 12,000 FCFA
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
  },
  {
    id: 'cap',
    nameKey: 'product.cap.name',
    descriptionKey: 'product.cap.description',
    price: 3500, // 3,500 FCFA
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
  },
  {
    id: 'bag',
    nameKey: 'product.bag.name',
    descriptionKey: 'product.bag.description',
    price: 4500, // 4,500 FCFA
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function formatPrice(amount: number): string {
  // XOF has factor 1 (no minor units), so amount is already in FCFA
  // Use space as thousand separator (French style)
  return `${amount.toLocaleString('fr-FR').replace(/\u202F/g, ' ')} FCFA`
}
