'use client'

import React from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Berry Bliss Waffle', price: 320, qty: 1, image: '/p1.jpg' },
    { id: 2, name: 'Dark Chocolate Cake', price: 850, qty: 1, image: '/p2.jpg' },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const deliveryFee = 50
  const total = subtotal + deliveryFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-secondary mb-12">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-primary/10 flex items-center gap-6">
                <div className="w-24 h-24 bg-primary/5 rounded-2xl shrink-0 flex items-center justify-center text-secondary/10">
                   IMG
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-secondary text-lg">{item.name}</h3>
                    <button className="text-secondary/30 hover:text-red-500 transition-colors">
                       <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-accent font-bold">Rs.{item.price}</p>
                  
                  <div className="flex items-center gap-4 pt-2">
                     <div className="flex items-center border border-primary/20 rounded-lg">
                        <button className="p-2 hover:bg-primary/5"><Minus size={14} /></button>
                        <span className="px-4 font-bold text-sm">{item.qty}</span>
                        <button className="p-2 hover:bg-primary/5"><Plus size={14} /></button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary text-white p-8 rounded-[2rem] shadow-xl sticky top-28 space-y-8">
               <h3 className="text-2xl font-bold">Order Summary</h3>
               
               <div className="space-y-4 text-primary/70">
                  <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span className="text-white font-bold">Rs.{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Delivery Fee</span>
                     <span className="text-white font-bold">Rs.{deliveryFee}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between text-xl text-white">
                     <span className="font-bold">Total</span>
                     <span className="font-bold text-accent">Rs.{total}</span>
                  </div>
               </div>

               <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  Proceed to Checkout <ArrowRight size={18} />
               </Link>
               
               <p className="text-[10px] text-center text-primary/40 uppercase tracking-widest font-bold">
                  Secure checkout powered by Razorpay
               </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 space-y-8">
           <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-accent mx-auto">
              <ShoppingBag size={48} />
           </div>
           <div className="space-y-2">
              <h2 className="text-3xl font-bold text-secondary">Your cart is empty</h2>
              <p className="text-secondary/50">Looks like you haven't added any treats yet.</p>
           </div>
           <Link href="/shop" className="btn-primary inline-block">
              Start Shopping
           </Link>
        </div>
      )}
    </div>
  )
}

export default CartPage
