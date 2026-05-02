'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

const CartPage = () => {
  const { cartItems, removeFromCart, decrementQty, addToCart, clearCart, subtotal } = useCart()
  const [location, setLocation] = useState('Local') // Default location

  // Delivery fee based on location
  const deliveryFees: { [key: string]: number } = {
    'Local': 50,
    'City': 100,
    'Outskirts': 250
  }

  const deliveryFee = cartItems.length > 0 ? deliveryFees[location] : 0
  const total = subtotal + deliveryFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[80vh]">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-[#4A2C2A] text-white rounded-2xl flex items-center justify-center shadow-lg">
           <ShoppingBag size={24} />
        </div>
        <h1 className="font-heading text-4xl font-bold text-secondary">Your Sweet Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-primary/10">
           <div className="text-6xl mb-6">🛒</div>
           <h2 className="text-2xl font-bold text-secondary mb-4">Your cart is empty!</h2>
           <p className="text-secondary/50 mb-10 max-w-sm mx-auto">Looks like you haven't added any treats yet. Let's find something delicious!</p>
           <Link href="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
               {cartItems.map((item: any) => (
                 <motion.div 
                   key={item._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, x: -100 }}
                   className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-[2rem] border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
                 >
                    <div className="w-24 h-24 bg-background rounded-2xl overflow-hidden flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                       <h3 className="font-bold text-lg text-secondary">{item.name}</h3>
                       <p className="text-accent font-bold">Rs. {item.price}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-background px-4 py-2 rounded-xl">
                       <button 
                         onClick={() => decrementQty(item._id)}
                         className="p-1 hover:text-red-500 transition-colors"
                        >
                          <Minus size={16} />
                       </button>
                       <span className="font-bold text-secondary w-4 text-center">{item.qty}</span>
                       <button 
                         onClick={() => addToCart(item)}
                         className="p-1 hover:text-accent transition-colors"
                       >
                          <Plus size={16} />
                       </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                       <p className="font-bold text-secondary">Rs. {item.price * item.qty}</p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-3 text-secondary/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                       <Trash2 size={20} />
                    </button>
                 </motion.div>
               ))}
            </AnimatePresence>
            
            <button 
              onClick={clearCart}
              className="text-sm font-bold text-secondary/40 hover:text-red-500 uppercase tracking-widest ml-4 transition-colors"
            >
               Empty Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
             <div className="bg-white rounded-[2.5rem] p-8 border border-primary/10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
                <h2 className="text-xl font-bold text-secondary mb-8">Order Summary</h2>
                
                <div className="space-y-4 text-sm font-medium">
                   <div className="flex justify-between text-secondary/60">
                      <span>Subtotal</span>
                      <span className="text-secondary">Rs. {subtotal}</span>
                   </div>
                   
                   <div className="space-y-3">
                      <div className="flex justify-between text-secondary/60 items-center">
                         <span className="flex items-center gap-2"><Truck size={14} /> Delivery Location</span>
                         <select 
                           value={location}
                           onChange={(e) => setLocation(e.target.value)}
                           className="bg-background border-none text-secondary font-bold text-xs p-1 rounded-lg outline-none cursor-pointer"
                         >
                            <option value="Local">Local (Rs. 50)</option>
                            <option value="City">City (Rs. 100)</option>
                            <option value="Outskirts">Outskirts (Rs. 250)</option>
                         </select>
                      </div>
                   </div>

                   <div className="border-t border-primary/10 pt-4 flex justify-between text-lg font-bold text-secondary">
                      <span>Total</span>
                      <span className="text-accent text-2xl">Rs. {total}</span>
                   </div>
                </div>

                <button className="w-full btn-primary py-5 mt-10 flex items-center justify-center gap-2 group shadow-xl shadow-accent/20">
                   Checkout Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
             
             <p className="text-[10px] text-secondary/30 text-center font-bold uppercase tracking-widest px-4">
                Prices include all taxes. Secure payments powered by Razorpay.
             </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
