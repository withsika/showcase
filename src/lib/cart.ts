export interface CartItem {
  productId: string
  quantity: number
}

const CART_KEY = 'sika-cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(CART_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export function addToCart(productId: string): void {
  const cart = getCart()
  const existing = cart.find(item => item.productId === productId)
  
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ productId, quantity: 1 })
  }
  
  saveCart(cart)
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter(item => item.productId !== productId)
  saveCart(cart)
}

export function updateQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }
  
  const cart = getCart()
  const item = cart.find(item => item.productId === productId)
  if (item) {
    item.quantity = quantity
    saveCart(cart)
  }
}

export function clearCart(): void {
  saveCart([])
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}
