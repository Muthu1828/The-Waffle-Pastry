'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, ChevronRight, Star, ShoppingBag, Loader2 } from 'lucide-react'
import API from '../../lib/api'
import { toast } from 'react-hot-toast'

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Cakes', 'Waffles', 'Pastries']

  useEffect(() => {
    fetchProducts()
  }, [])

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
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
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-10 hidden lg:block">
           <div className="space-y-4">
              <h3 className="font-bold text-secondary flex items-center gap-2">
                 <Filter size={18} /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                 {categories.map(cat => (
                    <button 
                       key={cat}
                       onClick={() => setActiveCategory(cat)}
                       className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-accent text-white shadow-lg' : 'text-secondary/60 hover:bg-primary/5'}`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>
        </aside>

        {/* Mobile Filters */}
        <div className="lg:hidden flex overflow-x-auto gap-4 pb-4 no-scrollbar">
           {categories.map(cat => (
              <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold border ${activeCategory === cat ? 'bg-accent border-accent text-white' : 'bg-white border-primary/20 text-secondary/60'}`}
              >
                 {cat}
              </button>
           ))}
        </div>

        {/* Products Grid */}
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
                 {filteredProducts.map(product => (
                    <div key={product._id} className="card group">
                       <div className="relative h-64 bg-primary/5 flex items-center justify-center overflow-hidden">
                          <span className="text-secondary/10 font-heading text-xl">[ {product.name} ]</span>
                          
                          {/* Quick View Button */}
                          <div className="absolute inset-0 bg-secondary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button className="bg-white text-secondary px-6 py-2 rounded-full font-bold shadow-lg hover:bg-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                Quick View
                             </button>
                          </div>
                       </div>
                       <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <p className="text-xs text-secondary/40 font-bold uppercase tracking-widest mb-1">{product.category}</p>
                                <h3 className="font-bold text-secondary text-lg">{product.name}</h3>
                             </div>
                             <p className="text-accent font-bold text-xl">Rs.{product.price}</p>
                          </div>
                          
                          <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
                             Add to Cart <ShoppingBag size={18} />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
