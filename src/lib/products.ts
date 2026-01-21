/**
 * Product data for Malika - African Fashion & Lifestyle Store
 * 
 * Note: XOF (CFA Franc) is used as the currency for Togo business.
 * XOF is a zero-decimal currency (factor=1), so prices are stored as actual amounts.
 * Example: 45000 = 45,000 F CFA
 */

export interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  price: number // in XOF (actual amount, zero-decimal currency)
  compareAtPrice?: number // original price for sale items
  image: string
  images?: string[] // additional images
  category: string
  tags?: string[]
  inStock?: boolean
  rating?: number
  reviewCount?: number
  featured?: boolean
  isNew?: boolean
  isBestSeller?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export const categories: Category[] = [
  {
    id: 'cat_women',
    name: 'Women',
    description: 'Elegant dresses, tops, and accessories',
    image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=400&fit=crop',
    slug: 'women',
  },
  {
    id: 'cat_men',
    name: 'Men',
    description: 'Traditional and modern menswear',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=400&fit=crop',
    slug: 'men',
  },
  {
    id: 'cat_accessories',
    name: 'Accessories',
    description: 'Jewelry, bags, and more',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop',
    slug: 'accessories',
  },
  {
    id: 'cat_home',
    name: 'Home & Living',
    description: 'Decor and lifestyle essentials',
    image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=400&fit=crop',
    slug: 'home',
  },
]

export const products: Product[] = [
  // Women's Collection
  {
    id: 'prod_ankara_dress',
    name: 'Ankara Maxi Dress',
    description: 'Stunning floor-length dress featuring vibrant African print patterns.',
    longDescription: 'This breathtaking Ankara maxi dress combines traditional African craftsmanship with contemporary design. Made from premium 100% cotton Ankara fabric, it features a flattering fitted bodice that flows into an elegant full skirt. Perfect for special occasions, weddings, or making a statement at any event. The bold geometric patterns tell a story of African heritage while the modern cut ensures you look effortlessly chic.',
    price: 45000, // 45,000 F CFA
    image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop',
    ],
    category: 'women',
    tags: ['dress', 'ankara', 'occasion'],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    isBestSeller: true,
  },
  {
    id: 'prod_kente_blouse',
    name: 'Kente Print Blouse',
    description: 'Modern blouse with authentic Kente-inspired patterns.',
    longDescription: 'A beautiful fusion of tradition and modernity, this Kente print blouse brings the regal heritage of Ghana to your everyday wardrobe. The lightweight fabric makes it perfect for warm weather, while the timeless patterns ensure you stand out in any setting.',
    price: 22000, // 22,000 F CFA
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop',
    category: 'women',
    tags: ['blouse', 'kente', 'casual'],
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
  },
  {
    id: 'prod_african_wrap_skirt',
    name: 'African Wrap Skirt',
    description: 'Versatile wrap skirt in bold African print.',
    longDescription: 'This versatile wrap skirt is a wardrobe essential. Featuring adjustable ties, it fits multiple sizes and can be styled in various ways. The vibrant African print adds a pop of color to any outfit.',
    price: 18000, // 18,000 F CFA
    image: 'https://images.unsplash.com/photo-1607823489283-1deb240f9e27?w=600&h=600&fit=crop',
    category: 'women',
    tags: ['skirt', 'wrap', 'casual'],
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    isBestSeller: true,
  },
  {
    id: 'prod_dashiki_tunic',
    name: 'Embroidered Dashiki Tunic',
    description: 'Comfortable tunic with intricate hand embroidery.',
    longDescription: 'Experience the artistry of West African embroidery with this stunning Dashiki tunic. Each piece features hand-stitched details around the neckline and sleeves, making every tunic unique.',
    price: 28000, // 28,000 F CFA
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=600&fit=crop',
    category: 'women',
    tags: ['tunic', 'dashiki', 'embroidered'],
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    featured: true,
  },
  
  // Men's Collection
  {
    id: 'prod_agbada_set',
    name: 'Premium Agbada Set',
    description: 'Three-piece traditional Agbada outfit for special occasions.',
    longDescription: 'Make a grand entrance with this premium Agbada set. Consisting of the flowing outer robe (Agbada), inner shirt (Buba), and matching trousers (Sokoto), this outfit is perfect for weddings, ceremonies, and important celebrations. Crafted from rich Damask fabric with elegant embroidery.',
    price: 95000, // 95,000 F CFA
    compareAtPrice: 115000,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=600&fit=crop',
    category: 'men',
    tags: ['agbada', 'traditional', 'occasion'],
    inStock: true,
    rating: 4.9,
    reviewCount: 234,
    featured: true,
    isBestSeller: true,
  },
  {
    id: 'prod_ankara_shirt',
    name: 'Ankara Print Shirt',
    description: 'Modern slim-fit shirt with bold African patterns.',
    longDescription: 'This contemporary Ankara shirt brings African flair to your everyday wardrobe. The slim-fit cut provides a modern silhouette, while the breathable cotton fabric ensures all-day comfort.',
    price: 20000, // 20,000 F CFA
    image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&h=600&fit=crop',
    category: 'men',
    tags: ['shirt', 'ankara', 'casual'],
    inStock: true,
    rating: 4.5,
    reviewCount: 178,
    isNew: true,
  },
  {
    id: 'prod_kaftan_men',
    name: 'Embroidered Kaftan',
    description: 'Elegant kaftan with detailed embroidery work.',
    longDescription: 'This elegant kaftan features exquisite embroidery around the neckline and cuffs. Perfect for Friday prayers, casual outings, or relaxed weekends, it combines comfort with sophistication.',
    price: 35000, // 35,000 F CFA
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
    category: 'men',
    tags: ['kaftan', 'traditional', 'embroidered'],
    inStock: true,
    rating: 4.7,
    reviewCount: 92,
  },
  {
    id: 'prod_senator_suit',
    name: 'Senator Suit',
    description: 'Classic Nigerian Senator style with modern tailoring.',
    longDescription: 'The Senator suit remains a timeless choice for the modern African man. This two-piece set features clean lines and expert tailoring, perfect for business meetings, formal events, or making an impression.',
    price: 55000, // 55,000 F CFA
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    category: 'men',
    tags: ['senator', 'formal', 'suit'],
    inStock: true,
    rating: 4.8,
    reviewCount: 145,
    featured: true,
  },

  // Accessories
  {
    id: 'prod_beaded_necklace',
    name: 'Handcrafted Beaded Necklace',
    description: 'Statement necklace featuring traditional African beadwork.',
    longDescription: 'Each bead in this stunning necklace is hand-selected and strung by skilled artisans. The colorful patterns draw inspiration from various African cultures, creating a unique piece that celebrates the continent\'s rich heritage.',
    price: 15000, // 15,000 F CFA
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
    category: 'accessories',
    tags: ['jewelry', 'necklace', 'beaded'],
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
    isBestSeller: true,
  },
  {
    id: 'prod_ankara_bag',
    name: 'Ankara Tote Bag',
    description: 'Spacious tote bag with vibrant African print exterior.',
    longDescription: 'Carry a piece of Africa wherever you go with this beautiful Ankara tote bag. Featuring a sturdy canvas lining and genuine leather straps, it\'s both practical and stylish. Perfect for shopping, work, or weekend adventures.',
    price: 22000, // 22,000 F CFA
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
    category: 'accessories',
    tags: ['bag', 'tote', 'ankara'],
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
    isNew: true,
  },
  {
    id: 'prod_brass_earrings',
    name: 'Brass Fulani Earrings',
    description: 'Traditional Fulani-inspired brass earrings.',
    longDescription: 'These stunning earrings are inspired by traditional Fulani jewelry. Hand-hammered from solid brass and finished with a protective coating to prevent tarnishing, they add an authentic African touch to any outfit.',
    price: 10000, // 10,000 F CFA
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=600&fit=crop',
    category: 'accessories',
    tags: ['jewelry', 'earrings', 'brass'],
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
    featured: true,
  },
  {
    id: 'prod_leather_sandals',
    name: 'Handmade Leather Sandals',
    description: 'Comfortable leather sandals with traditional beadwork.',
    longDescription: 'These beautiful sandals combine genuine leather craftsmanship with colorful Maasai-inspired beadwork. Each pair is handmade by skilled artisans, ensuring unique details and superior comfort.',
    price: 18000, // 18,000 F CFA
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop',
    category: 'accessories',
    tags: ['shoes', 'sandals', 'leather'],
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
  },

  // Home & Living
  {
    id: 'prod_mudcloth_pillow',
    name: 'Mudcloth Throw Pillow',
    description: 'Authentic Malian mudcloth pillow cover.',
    longDescription: 'Add a touch of African artistry to your home with this authentic mudcloth pillow cover. Made in Mali using traditional techniques passed down through generations, each piece features hand-painted geometric patterns.',
    price: 12000, // 12,000 F CFA
    image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=600&fit=crop',
    category: 'home',
    tags: ['pillow', 'mudcloth', 'decor'],
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    featured: true,
  },
  {
    id: 'prod_kente_table_runner',
    name: 'Kente Table Runner',
    description: 'Handwoven Kente cloth table runner.',
    longDescription: 'Transform your dining table with this magnificent Kente cloth table runner. Handwoven by skilled Ghanaian artisans using traditional techniques, it features the iconic geometric patterns that have made Kente famous worldwide.',
    price: 28000, // 28,000 F CFA
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
    category: 'home',
    tags: ['table', 'kente', 'decor'],
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    isNew: true,
  },
  {
    id: 'prod_basket_set',
    name: 'Woven Storage Basket Set',
    description: 'Set of 3 handwoven baskets in varying sizes.',
    longDescription: 'These beautiful storage baskets are handwoven from natural elephant grass by skilled artisans. Perfect for organizing your home while adding authentic African style. Set includes three nesting sizes.',
    price: 20000, // 20,000 F CFA
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=600&fit=crop',
    category: 'home',
    tags: ['basket', 'storage', 'decor'],
    inStock: true,
    rating: 4.7,
    reviewCount: 134,
    isBestSeller: true,
  },
  {
    id: 'prod_ankara_lampshade',
    name: 'Ankara Drum Lampshade',
    description: 'Vibrant Ankara fabric lampshade to brighten any room.',
    longDescription: 'Light up your space with African style. This drum lampshade is covered in vibrant Ankara fabric, creating a warm and colorful glow when illuminated. Perfect for bedrooms, living rooms, or offices.',
    price: 14000, // 14,000 F CFA
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
    category: 'home',
    tags: ['lighting', 'lampshade', 'ankara'],
    inStock: true,
    rating: 4.6,
    reviewCount: 45,
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.isNew)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller)
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function formatPrice(amount: number): string {
  // XOF is a zero-decimal currency, amount is the actual value
  return `${amount.toLocaleString('fr-TG')} F CFA`
}

export function getCategory(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
