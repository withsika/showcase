export type Locale = 'en' | 'fr'

export const translations = {
  en: {
    // Header
    'header.cart': 'Cart',
    
    // Home page
    'home.title': 'Malika',
    'home.subtitle': 'Demo store showcasing Sika checkout',
    'home.addToCart': 'Add to Cart',
    
    // Products
    'product.tshirt.name': 'Classic T-Shirt',
    'product.tshirt.description': 'Comfortable cotton t-shirt',
    'product.hoodie.name': 'Cozy Hoodie',
    'product.hoodie.description': 'Warm and stylish hoodie',
    'product.cap.name': 'Baseball Cap',
    'product.cap.description': 'Adjustable snapback cap',
    'product.bag.name': 'Tote Bag',
    'product.bag.description': 'Eco-friendly canvas tote',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptySubtitle': 'Add some products to get started',
    'cart.continueShopping': 'Continue Shopping',
    'cart.remove': 'Remove',
    'cart.total': 'Total',
    'cart.email': 'Email address',
    'cart.emailPlaceholder': 'you@example.com',
    'cart.emailRequired': 'Please enter your email address',
    'cart.proceedToCheckout': 'Proceed to Checkout',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.orderSummary': 'Order Summary',
    'checkout.total': 'Total',
    'checkout.email': 'Email',
    'checkout.mode': 'Checkout Mode',
    'checkout.redirect': 'Redirect',
    'checkout.redirectDescription': "Go to Sika's hosted checkout page",
    'checkout.modal': 'Modal',
    'checkout.modalDescription': 'Pay without leaving this page',
    'checkout.pay': 'Pay',
    'checkout.processing': 'Processing...',
    'checkout.testCard': 'Test card: 4084 0840 8408 4081',
    'checkout.loadingSdk': 'Loading...',
    'checkout.notConfigured': 'Checkout not configured. Please try redirect mode.',
    'checkout.failed': 'Checkout failed. Please try again.',
    'checkout.sessionFailed': 'Failed to create checkout session',
    
    // Success page
    'success.title': 'Payment Successful!',
    'success.message': 'Thank you for your order.',
    'success.reference': 'Reference',
    'success.continueShopping': 'Continue Shopping',
    'success.demo': 'This is a demo. No real payment was made.',
    
    // Cancel page
    'cancel.title': 'Checkout Cancelled',
    'cancel.message': 'Your payment was not completed.',
    'cancel.returnToCart': 'Return to Cart',
    'cancel.continueShopping': 'Continue Shopping',
    
    // Footer
    'footer.poweredBy': 'Demo store powered by',
    
    // Language
    'language.en': 'English',
    'language.fr': 'Français',
  },
  fr: {
    // Header
    'header.cart': 'Panier',
    
    // Home page
    'home.title': 'Malika',
    'home.subtitle': 'Boutique de démonstration Sika',
    'home.addToCart': 'Ajouter au panier',
    
    // Products
    'product.tshirt.name': 'T-Shirt Classique',
    'product.tshirt.description': 'T-shirt en coton confortable',
    'product.hoodie.name': 'Sweat à Capuche',
    'product.hoodie.description': 'Sweat chaud et élégant',
    'product.cap.name': 'Casquette',
    'product.cap.description': 'Casquette ajustable',
    'product.bag.name': 'Sac Fourre-tout',
    'product.bag.description': 'Sac en toile écologique',
    
    // Cart
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.emptySubtitle': 'Ajoutez des produits pour commencer',
    'cart.continueShopping': 'Continuer vos achats',
    'cart.remove': 'Supprimer',
    'cart.total': 'Total',
    'cart.email': 'Adresse e-mail',
    'cart.emailPlaceholder': 'vous@exemple.com',
    'cart.emailRequired': 'Veuillez entrer votre adresse e-mail',
    'cart.proceedToCheckout': 'Passer à la caisse',
    
    // Checkout
    'checkout.title': 'Paiement',
    'checkout.orderSummary': 'Récapitulatif de commande',
    'checkout.total': 'Total',
    'checkout.email': 'E-mail',
    'checkout.mode': 'Mode de paiement',
    'checkout.redirect': 'Redirection',
    'checkout.redirectDescription': 'Aller sur la page de paiement Sika',
    'checkout.modal': 'Modal',
    'checkout.modalDescription': 'Payer sans quitter cette page',
    'checkout.pay': 'Payer',
    'checkout.processing': 'Traitement...',
    'checkout.testCard': 'Carte de test : 4084 0840 8408 4081',
    'checkout.loadingSdk': 'Chargement...',
    'checkout.notConfigured': 'Paiement non configuré. Veuillez essayer le mode redirection.',
    'checkout.failed': 'Échec du paiement. Veuillez réessayer.',
    'checkout.sessionFailed': 'Échec de la création de la session de paiement',
    
    // Success page
    'success.title': 'Paiement réussi !',
    'success.message': 'Merci pour votre commande.',
    'success.reference': 'Référence',
    'success.continueShopping': 'Continuer vos achats',
    'success.demo': 'Ceci est une démonstration. Aucun paiement réel n\'a été effectué.',
    
    // Cancel page
    'cancel.title': 'Paiement annulé',
    'cancel.message': 'Votre paiement n\'a pas été effectué.',
    'cancel.returnToCart': 'Retour au panier',
    'cancel.continueShopping': 'Continuer vos achats',
    
    // Footer
    'footer.poweredBy': 'Boutique propulsée par',
    
    // Language
    'language.en': 'English',
    'language.fr': 'Français',
  },
} as const

export type TranslationKey = keyof typeof translations.en
