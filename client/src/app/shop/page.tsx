'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, Star, ShoppingBag, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import API from '../../lib/api'
import { useCart } from '../../context/CartContext'
import { toast } from 'react-hot-toast'

import { useSearchParams } from 'next/navigation'

const ShopPage = () => {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All')
  
  const { addToCart } = useCart()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories')
      setCategories(['All', ...data.map((c: any) => c.name)])
    } catch (err) {
      console.error('Failed to load categories')
    }
  }

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products')
      setProducts(data)
    } catch (err) {
      toast.error('Failed to load menu')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
         <div>
            <h1 className="font-heading text-5xl font-bold text-secondary">Our Sweet Menu</h1>
            <p className="text-secondary/50 mt-2">Handcrafted treats for every occasion</p>
         </div>
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={20} />
            <input 
               type="text" 
               placeholder="Search for cakes, waffles..." 
               className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-primary/20 outline-none focus:border-accent shadow-sm"
            />
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 space-y-10 hidden lg:block">
           <div className="space-y-4">
              <h3 className="font-bold text-secondary flex items-center gap-2">Categories</h3>
              <div className="flex flex-col gap-2">
                 {categories.map(cat => (
                    <button 
                       key={cat}
                       onClick={() => setActiveCategory(cat)}
                       className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-[#E07A5F] text-white shadow-lg' : 'text-secondary/60 hover:bg-primary/5'}`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>
        </aside>

        <div className="flex-1">
           {loading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                 <Loader2 className="animate-spin text-accent" size={48} />
                 <p className="text-secondary/40 font-bold uppercase tracking-widest text-xs">Preheating the oven...</p>
              </div>
           ) : filteredProducts.length === 0 ? (
              <div className="text-center py-32">
                 <p className="text-secondary/40 italic">No treats found in this category yet.</p>
              </div>
           ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                 {filteredProducts.map((product, index) => (
                    <motion.div 
                      key={product._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 3) * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border-2 border-primary/5 hover:border-accent"
                    >
                       <div className="relative h-64 bg-primary/5 overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-secondary/10 font-heading text-xl">No Image</div>
                          )}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-secondary shadow-lg">
                             <Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.9
                          </div>
                       </div>
                       <div className="p-8">
                          <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-2">{product.category}</p>
                          <h3 className="font-heading text-2xl font-bold text-secondary mb-1">{product.name}</h3>
                          <p className="text-accent font-bold text-xl mb-6">Rs. {product.price}</p>
                          
                          <button 
                            onClick={() => addToCart(product)}
                            className="w-full bg-[#4A2C2A] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#E07A5F] transition-all shadow-xl shadow-black/10"
                          >
                             Add to Cart <ShoppingBag size={16} />
                          </button>
                       </div>
                    </motion.div>
                 ))}
              </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
