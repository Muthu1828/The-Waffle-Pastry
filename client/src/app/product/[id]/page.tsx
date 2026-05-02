'use client'

import React, { useState } from 'react'
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Plus, Minus } from 'lucide-react'

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [qty, setQty] = useState(1)
  
  // Mock product data
  const product = {
    _id: params.id,
    name: 'Berry Bliss Waffle',
    price: 320,
    description: 'A decadent Belgian waffle topped with fresh organic strawberries, wild blueberries, and a drizzle of premium white chocolate. Served with a side of homemade whipped cream.',
    category: 'Waffles',
    rating: 4.8,
    reviews: 124,
    stock: 15,
    images: ['/p1.jpg', '/p2.jpg', '/p3.jpg']
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image Gallery */}
        <div className="space-y-6">
           <div className="aspect-square bg-primary/5 rounded-[2rem] overflow-hidden border border-primary/20 flex items-center justify-center text-secondary/10 font-heading text-3xl shadow-lg">
              [ Main Product Image ]
           </div>
           <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                 <div key={i} className="aspect-square bg-white rounded-2xl border border-primary/10 flex items-center justify-center text-secondary/10 cursor-pointer hover:border-accent transition-colors">
                    IMG
                 </div>
              ))}
           </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <span className="bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{product.category}</span>
                 <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="text-secondary font-bold text-sm">{product.rating}</span>
                    <span className="text-secondary/30 text-sm font-medium">({product.reviews} Reviews)</span>
                 </div>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary">{product.name}</h1>
              <p className="text-3xl font-bold text-accent">Rs.{product.price}</p>
           </div>

           <p className="text-secondary/70 leading-relaxed text-lg">
              {product.description}
           </p>

           <div className="space-y-6 pt-4">
              <div className="flex items-center gap-8">
                 <div className="flex items-center border border-primary/20 rounded-2xl p-1 bg-background/50">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors"><Minus size={18} /></button>
                    <span className="w-12 text-center font-bold text-lg">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors"><Plus size={18} /></button>
                 </div>
                 <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    In Stock (Ready to bake)
                 </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="flex-1 btn-primary py-4 flex items-center justify-center gap-2 shadow-xl shadow-accent/20">
                    <ShoppingCart size={20} /> Add to Cart
                 </button>
                 <button className="flex-1 btn-secondary py-4">
                    Buy It Now
                 </button>
              </div>
           </div>

           {/* Features Info */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-primary/10">
              <div className="flex items-start gap-4">
                 <div className="text-accent bg-accent/5 p-2 rounded-lg"><Truck size={20} /></div>
                 <div>
                    <h4 className="font-bold text-secondary text-sm">Express Delivery</h4>
                    <p className="text-xs text-secondary/50">Delivered within 45-60 mins</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="text-accent bg-accent/5 p-2 rounded-lg"><ShieldCheck size={20} /></div>
                 <div>
                    <h4 className="font-bold text-secondary text-sm">Quality Guaranteed</h4>
                    <p className="text-xs text-secondary/50">100% Homemade & Fresh</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="text-accent bg-accent/5 p-2 rounded-lg"><RefreshCw size={20} /></div>
                 <div>
                    <h4 className="font-bold text-secondary text-sm">Easy Returns</h4>
                    <p className="text-xs text-secondary/50">No questions asked policy</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Suggested Products Placeholder */}
      <section className="mt-32 space-y-12">
         <h2 className="font-heading text-3xl font-bold text-secondary text-center">You May Also Like</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="card h-64 flex items-center justify-center text-secondary/10 font-bold">
                  Product {i}
               </div>
            ))}
         </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
