import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malika | Checkout Demo",
  description: "Demo store showcasing Sika checkout integration",
};

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
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
            Demo store powered by{' '}
            <a href="https://withsika.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
              Sika
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
