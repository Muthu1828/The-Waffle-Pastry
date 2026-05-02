import '../styles/globals.css'
import { Playfair_Display, Poppins, Lobster } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const lobster = Lobster({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lobster'
})

export const metadata = {
  title: {
    default: 'The Waffle Pastry | Gourmet Waffles & Premium Cakes',
    template: '%s | The Waffle Pastry'
  },
  description: 'Experience the best gourmet waffles, artisanal cakes, and delicious pastries in town. Handcrafted with love, every single day.',
  keywords: ['bakery', 'waffles', 'cakes', 'pastries', 'online cake delivery', 'best waffles near me', 'the waffle pastry'],
  authors: [{ name: 'The Waffle Pastry' }],
  creator: 'The Waffle Pastry',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://thewafflepastry.com',
    title: 'The Waffle Pastry | Gourmet Waffles & Premium Cakes',
    description: 'Experience the best gourmet waffles, artisanal cakes, and delicious pastries in town.',
    siteName: 'The Waffle Pastry',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Waffle Pastry',
    description: 'Best waffles and cakes in town.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${lobster.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-center" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
