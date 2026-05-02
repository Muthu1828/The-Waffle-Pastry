'use client'

import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Link from 'next/link'
import { ChevronRight, Star, Clock, ShieldCheck, ShoppingBag, Loader2 } from 'lucide-react'
import API from '../lib/api'
import { useCart } from '../context/CartContext'
import { toast } from 'react-hot-toast'

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products')
        // Show last 4 products as specials
        setProducts(data.slice(-4))
      } catch (err) {
        console.error('Failed to load specials')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = [
    { name: 'Cakes', icon: '🎂', color: 'bg-pink-100' },
    { name: 'Waffles', icon: '🧇', color: 'bg-orange-100' },
    { name: 'Pastries', icon: '🥐', color: 'bg-yellow-100' },
  ]

  return (
    <div className="space-y-24 pb-24 bg-[#FFF8F0]/30">
      <Hero />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-4xl font-bold text-secondary">Browse by Category</h2>
            <p className="text-secondary/50 mt-2">Discover our delicious range of treats</p>
          </div>
          <Link href="/shop" className="text-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:underline">
            View All Menu <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href={`/shop`}
              className="group relative h-48 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className={`absolute inset-0 ${cat.color} opacity-40 group-hover:scale-110 transition-transform duration-500`} />
              <div className="relative h-full p-8 flex flex-col justify-center items-center text-center space-y-4">
                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                <h3 className="font-heading text-2xl font-bold text-secondary">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#4A2C2A]/5 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-5xl font-bold text-[#4A2C2A]">Today’s Specials</h2>
            <p className="text-secondary/50 max-w-xl mx-auto font-medium">Our most loved treats, handpicked just for you. Fresh from the oven to your doorstep.</p>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-accent" size={48} />
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-primary/10">
                   <div className="relative h-64 bg-background overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary/10">No Image</div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black text-secondary shadow-sm">
                         <Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.9
                      </div>
                   </div>
                   <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-secondary group-hover:text-accent transition-colors truncate">{product.name}</h3>
                        <p className="text-accent font-bold text-lg mt-1">Rs. {product.price}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full py-4 rounded-2xl bg-secondary text-white font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                      >
                        Add to Cart <ShoppingBag size={14} />
                      </button>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4A2C2A] rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white space-y-8 shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl -z-0" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0" />
           
           <h2 className="font-heading text-4xl md:text-6xl font-bold relative z-10">Wanna make your day <br /> <span className="text-[#E07A5F] italic">Extra Special?</span></h2>
           <p className="text-[#FFF8F0]/60 max-w-xl mx-auto relative z-10 font-medium italic">Order our custom cakes for birthdays, anniversaries, or just to treat yourself. We bring your sweet dreams to life.</p>
           <div className="relative z-10 flex flex-wrap justify-center gap-6 pt-4">
              <Link href="/shop" className="bg-[#E07A5F] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-black/20 hover:scale-105 transition-all">Order Custom Cake</Link>
              <Link href="/shop" className="px-10 py-5 bg-white/10 hover:bg-white/20 rounded-full font-bold uppercase tracking-widest text-xs border border-white/10 transition-all">Explore Menu</Link>
           </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
