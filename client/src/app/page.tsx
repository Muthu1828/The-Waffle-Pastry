'use client'

import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Link from 'next/link'
import { ChevronRight, Star, Clock, ShieldCheck, ShoppingBag, Loader2 } from 'lucide-react'
import API from '../lib/api'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const router = useRouter()
  const [isPaused, setIsPaused] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products')
        setProducts(data)
      } catch (err) {
        console.error('Failed to load specials')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories')
      // Map basic colors for the first few categories
      const colors = ['bg-pink-100', 'bg-orange-100', 'bg-yellow-100', 'bg-blue-100', 'bg-green-100']
      const icons = ['🎂', '🧇', '🥐', '🍟', '🥤', '🍰']
      const formatted = data.map((c: any, i: number) => ({
        name: c.name,
        icon: icons[i % icons.length],
        color: colors[i % colors.length]
      }))
      setCategories(formatted)
    } catch (err) {
      console.error('Failed to load categories')
    }
  }


  return (
    <div className="space-y-24 pb-24 bg-[#FFF8F0]/30 overflow-x-hidden">
      <Hero />

      {/* Categories Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
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
            <button 
              key={cat.name} 
              onClick={() => router.push(`/shop?category=${cat.name}`)}
              className="group relative h-48 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-accent"
            >
              <div className={`absolute inset-0 ${cat.color} opacity-40 group-hover:scale-110 transition-transform duration-500`} />
              <div className="relative h-full p-8 flex flex-col justify-center items-center text-center space-y-4">
                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                <h3 className="font-heading text-2xl font-bold text-secondary">{cat.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Stunning Auto-Slider Specials */}
      <section className="bg-[#4A2C2A]/5 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="font-heading text-5xl font-bold text-[#4A2C2A]"
            >
              Today’s Specials
            </motion.h2>
            <p className="text-secondary/50 max-w-xl mx-auto font-medium italic">Hover to pause and select your favorite treat!</p>
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
           </div>
        ) : (
          <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {/* The Infinite Scrolling Slider */}
            <motion.div 
              className="flex gap-8 px-4"
              initial={{ x: 0 }}
              animate={isPaused ? {} : { x: "-100%" }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ width: "fit-content" }}
            >
              {/* Duplicate products for infinite loop */}
              {[...products, ...products, ...products].map((product, index) => (
                <div 
                   key={`${product._id}-${index}`} 
                   className="w-[320px] flex-shrink-0 bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(224,122,95,0.4)] transition-all duration-500 group border-2 border-[#4A2C2A]/10 hover:border-[#E07A5F] m-2 hover:-translate-y-4 cursor-pointer"
                >
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
                   <div className="p-8 space-y-4">
                      <div>
                        <h3 className="font-bold text-secondary text-lg group-hover:text-accent transition-colors truncate">{product.name}</h3>
                        <p className="text-accent font-black text-xl mt-1">Rs. {product.price}</p>
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
            </motion.div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: <Clock size={32} />, title: "Fast Delivery", desc: "Fresh and hot in 45 mins." },
            { icon: <ShieldCheck size={32} />, title: "Quality First", desc: "Hand-selected ingredients." },
            { icon: <Star size={32} />, title: "Top Rated", desc: "Loved by 10k+ foodies." }
          ].map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto">
                {feature.icon}
              </div>
              <h4 className="font-bold text-xl text-secondary">{feature.title}</h4>
              <p className="text-secondary/60 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-[#4A2C2A] rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white space-y-8 shadow-2xl"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl -z-0" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0" />
           
           <h2 className="font-heading text-4xl md:text-6xl font-bold relative z-10">Wanna make your day <br /> <span className="text-[#E07A5F] italic">Extra Special?</span></h2>
           <div className="relative z-10 flex flex-wrap justify-center gap-6 pt-4">
              <Link href="/shop" className="bg-[#E07A5F] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-black/20 hover:scale-105 transition-all">Order Custom Cake</Link>
           </div>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
