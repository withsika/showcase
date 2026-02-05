import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sika Checkout Showcase",
  description: "Explore different ways to integrate Sika checkout into your application - redirect, modal, inline embed, popup, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://showcase.withsika.com",
    siteName: "Sika Checkout Showcase",
    title: "Sika Checkout Showcase",
    description: "Explore different ways to integrate Sika checkout into your application.",
  },
};

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Sika</span>
              <span className="text-gray-500 ml-1">Showcase</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#examples" className="text-sm text-gray-600 hover:text-gray-900">
              Examples
            </Link>
            <a 
              href="https://docs.withsika.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/withsika/showcase" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
          </nav>

          <a
            href="https://dashboard.withsika.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Get API Keys
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold">Sika</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <a href="https://withsika.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Website
            </a>
            <a href="https://docs.withsika.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Docs
            </a>
            <a href="https://dashboard.withsika.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Dashboard
            </a>
            <a href="https://github.com/withsika" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
          </div>

          <p className="text-sm">
            &copy; {new Date().getFullYear()} Sika. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-gray-50`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
