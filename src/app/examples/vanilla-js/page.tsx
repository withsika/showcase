'use client'

import { useState } from 'react'
import { ExampleLayout } from '@/components/ExampleLayout'

const code = [
  {
    filename: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sika Checkout - Vanilla JS</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; padding: 2rem; }
    .product-card {
      max-width: 400px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
    }
    .product-image {
      height: 200px;
      background: linear-gradient(135deg, #10b981, #059669);
    }
    .product-content { padding: 1.5rem; }
    .product-title { font-size: 1.25rem; font-weight: bold; }
    .product-price { font-size: 1.5rem; font-weight: bold; margin: 1rem 0; }
    .buy-button {
      width: 100%;
      padding: 0.75rem;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    .buy-button:hover { background: #059669; }
    .buy-button:disabled { opacity: 0.5; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="product-card">
    <div class="product-image"></div>
    <div class="product-content">
      <h2 class="product-title">Premium Widget</h2>
      <p class="product-price">GHS 45.00</p>
      <button class="buy-button" id="buyButton">
        Buy Now
      </button>
    </div>
  </div>

  <script src="checkout.js"></script>
</body>
</html>`,
  },
  {
    filename: 'checkout.js',
    language: 'javascript',
    content: `// Configuration
const API_URL = '/api/checkout'; // Your server endpoint
const PRODUCT = {
  name: 'Premium Widget',
  price: 4500, // GHS 45.00 in pesewas
  email: 'customer@example.com'
};

// Get the buy button
const buyButton = document.getElementById('buyButton');

// Handle click
buyButton.addEventListener('click', async function() {
  // Disable button and show loading state
  buyButton.disabled = true;
  buyButton.textContent = 'Loading...';

  try {
    // Call your server to create checkout session
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: PRODUCT.email,
        amount: PRODUCT.price,
        description: PRODUCT.name,
      }),
    });

    const data = await response.json();

    if (data.checkout_url) {
      // Redirect to Sika checkout
      window.location.href = data.checkout_url;
    } else {
      throw new Error('No checkout URL received');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    alert('Failed to start checkout. Please try again.');
    
    // Reset button
    buyButton.disabled = false;
    buyButton.textContent = 'Buy Now';
  }
});`,
  },
  {
    filename: 'server.js (Node.js)',
    language: 'javascript',
    content: `// Express.js server example
const express = require('express');
const app = express();

app.use(express.json());

// Your Sika API credentials (use environment variables!)
const SIKA_API_URL = process.env.SIKA_API_URL;
const SIKA_SECRET_KEY = process.env.SIKA_SECRET_KEY;
const BASE_URL = process.env.BASE_URL;

app.post('/api/checkout', async (req, res) => {
  const { email, amount, description } = req.body;

  try {
    const response = await fetch(\`\${SIKA_API_URL}/checkout/initialize\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${SIKA_SECRET_KEY}\`,
      },
      body: JSON.stringify({
        email,
        amount,
        description,
        success_url: \`\${BASE_URL}/success?reference={reference}\`,
        cancel_url: \`\${BASE_URL}/cancel\`,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Sika API error:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
  },
]

function VanillaDemo() {
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'demo@example.com',
          amount: 4500,
          description: 'Showcase Demo - Vanilla JS',
        }),
      })

      const data = await response.json()
      
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <div className="flex gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">No Framework Required</h4>
            <p className="text-sm text-blue-700">
              This example shows how to integrate Sika checkout using plain HTML and JavaScript. 
              No React, Vue, or other frameworks needed. Just copy the code and customize for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Product Card (simulating vanilla HTML/CSS) */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
          <svg className="w-20 h-20 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Widget</h3>
          <p className="text-gray-600 text-sm mb-4">
            A high-quality widget for your projects. Built with care and attention to detail.
          </p>
          
          <div className="text-2xl font-bold text-gray-900 mb-4">GHS 45.00</div>

          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Buy Now'}
          </button>
        </div>
      </div>

      {/* Code Preview Hint */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Click &quot;View Code&quot; above to see the full implementation
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            HTML
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            JavaScript
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Node.js
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl mb-2">0</div>
          <div className="text-sm text-gray-600">Dependencies</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl mb-2">&lt;50</div>
          <div className="text-sm text-gray-600">Lines of Code</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl mb-2">3</div>
          <div className="text-sm text-gray-600">Files Total</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl mb-2">5min</div>
          <div className="text-sm text-gray-600">Setup Time</div>
        </div>
      </div>
    </div>
  )
}

export default function VanillaJsExamplePage() {
  return (
    <ExampleLayout
      title="Vanilla JavaScript"
      description="Pure HTML and JavaScript integration without any framework. Copy-paste ready."
      difficulty="Easy"
      tags={['No framework', 'Copy-paste', 'Best for: Simple sites, WordPress, PHP']}
      code={code}
    >
      <VanillaDemo />
    </ExampleLayout>
  )
}
