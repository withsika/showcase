# Sika Checkout Showcase

A collection of examples demonstrating different ways to integrate Sika checkout into your application. From simple redirects to embedded forms, find the integration pattern that works best for you.

## Live Demo

**[showcase.withsika.com](https://showcase.withsika.com)**

## Examples

| Example | Description | Difficulty |
|---------|-------------|------------|
| [Redirect](/examples/redirect) | Classic checkout flow - redirect to hosted payment page | Easy |
| [Modal](/examples/modal) | Open checkout in a modal overlay | Easy |
| [Inline](/examples/inline) | Embed checkout directly into your page | Medium |
| [Popup](/examples/popup) | Open checkout in a popup window | Easy |
| [Buy Button](/examples/buy-button) | One-click purchase buttons | Easy |
| [Donation](/examples/donation) | Custom amount with preset options | Medium |
| [Vanilla JS](/examples/vanilla-js) | Pure HTML/JS without frameworks | Easy |

## Getting Started

### Prerequisites

- Node.js 18+
- A Sika account with API credentials ([Get one here](https://dashboard.withsika.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/withsika/showcase.git
cd showcase

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your Sika credentials:

```env
# Sika API (use staging for testing)
SIKA_API_URL=https://api.staging.withsika.com
SIKA_CHECKOUT_URL=https://pay.staging.withsika.com
SIKA_SECRET_KEY=sika_test_sk_your_secret_key

# Your app's public URL (for redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the showcase.

## Integration Patterns

### 1. Redirect (Server-side)

The simplest integration - redirect customers to Sika's hosted checkout page.

```typescript
// Server-side: Initialize checkout
const response = await fetch('https://api.withsika.com/checkout/initialize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SIKA_SECRET_KEY}`,
  },
  body: JSON.stringify({
    email: 'customer@example.com',
    amount: 5000, // GHS 50.00 in pesewas
    description: 'Order #12345',
    success_url: 'https://yoursite.com/success?reference={reference}',
    cancel_url: 'https://yoursite.com/cancel',
  }),
})

const { checkout_url } = await response.json()

// Client-side: Redirect to checkout
window.location.href = checkout_url
```

### 2. Modal (iframe)

Open checkout in a modal overlay without leaving the page.

```typescript
// Initialize checkout, then show modal with iframe
<iframe src={checkout_url} className="w-full h-[600px]" />
```

### 3. Popup (window.open)

Open checkout in a new browser window.

```typescript
window.open(checkout_url, 'SikaCheckout', 'width=450,height=700')
```

## Project Structure

```
src/
├── app/
│   ├── api/checkout/         # API route to initialize checkout
│   ├── checkout/
│   │   ├── success/          # Success page after payment
│   │   └── cancel/           # Cancel page for abandoned checkouts
│   ├── examples/
│   │   ├── redirect/         # Redirect checkout example
│   │   ├── modal/            # Modal overlay example
│   │   ├── inline/           # Inline embed example
│   │   ├── popup/            # Popup window example
│   │   ├── buy-button/       # One-click buy button example
│   │   ├── donation/         # Donation form example
│   │   └── vanilla-js/       # Vanilla JavaScript example
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Showcase landing page
├── components/
│   └── ExampleLayout.tsx     # Shared example layout with code viewer
└── lib/
    └── sika.ts               # Sika API client
```

## Test Cards

Use these test cards in staging:

| Card Number | Description |
|-------------|-------------|
| `4084 0840 8408 4081` | Successful payment |
| `4000 0000 0000 0002` | Declined card |

Use any future expiry date and any 3-digit CVV.

## Deployment

### Cloudflare Pages (Recommended)

```bash
npm run cf:deploy
```

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/withsika/showcase&env=SIKA_API_URL,SIKA_SECRET_KEY,NEXT_PUBLIC_BASE_URL)

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SIKA_API_URL` | Sika API endpoint | `https://api.withsika.com` |
| `SIKA_CHECKOUT_URL` | Sika checkout page | `https://pay.withsika.com` |
| `SIKA_SECRET_KEY` | Your Sika secret key | `sika_live_sk_...` |
| `NEXT_PUBLIC_BASE_URL` | Your app's public URL | `https://yoursite.com` |

## Resources

- [Sika Documentation](https://docs.withsika.com)
- [Sika Dashboard](https://dashboard.withsika.com)
- [API Reference](https://api.withsika.com/docs)

## License

MIT
