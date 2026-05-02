'use client'

import React from 'react'
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react'

const CheckoutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Checkout Form */}
         <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h2 className="text-2xl font-bold text-secondary">Shipping Address</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-primary/20">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Full Name</label>
                     <input type="text" className="w-full bg-background/50 border border-primary/10 rounded-xl p-3 outline-none focus:border-accent" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Phone Number</label>
                     <input type="text" className="w-full bg-background/50 border border-primary/10 rounded-xl p-3 outline-none focus:border-accent" placeholder="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Street Address</label>
                     <input type="text" className="w-full bg-background/50 border border-primary/10 rounded-xl p-3 outline-none focus:border-accent" placeholder="123 Bakery Lane" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">City</label>
                     <input type="text" className="w-full bg-background/50 border border-primary/10 rounded-xl p-3 outline-none focus:border-accent" placeholder="Sweet Town" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Postal Code</label>
                     <input type="text" className="w-full bg-background/50 border border-primary/10 rounded-xl p-3 outline-none focus:border-accent" placeholder="110001" />
                  </div>
               </div>
            </section>

            <section className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h2 className="text-2xl font-bold text-secondary">Payment Method</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border-2 border-accent flex items-center justify-between cursor-pointer">
                     <div className="flex items-center gap-4">
                        <CreditCard className="text-accent" />
                        <div>
                           <p className="font-bold text-secondary">Razorpay</p>
                           <p className="text-xs text-secondary/40">Cards, UPI, Netbanking</p>
                        </div>
                     </div>
                     <CheckCircle2 className="text-accent" />
                  </div>
                  
                  <div className="bg-white/50 p-6 rounded-3xl border border-primary/20 flex items-center gap-4 cursor-not-allowed opacity-50">
                     <Truck className="text-secondary/30" />
                     <div>
                        <p className="font-bold text-secondary/40">Cash on Delivery</p>
                        <p className="text-xs text-secondary/30">Unavailable for current location</p>
                     </div>
                  </div>
               </div>
            </section>
         </div>

         {/* Order Preview */}
         <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] shadow-xl border border-primary/10 overflow-hidden sticky top-28">
               <div className="bg-primary/10 p-8 border-b border-primary/20">
                  <h3 className="text-xl font-bold text-secondary">Order Preview</h3>
               </div>
               
               <div className="p-8 space-y-6">
                   <div className="space-y-4 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-secondary/60">Berry Bliss Waffle (x1)</span>
                        <span className="font-bold text-secondary">Rs.320</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-secondary/60">Dark Chocolate Cake (x1)</span>
                        <span className="font-bold text-secondary">Rs.850</span>
                     </div>
                  </div>
                  
                  <div className="border-t border-primary/10 pt-6 space-y-3 text-sm">
                     <div className="flex justify-between">
                        <span className="text-secondary/40">Subtotal</span>
                        <span className="text-secondary font-bold">Rs.1170</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-secondary/40">Delivery</span>
                        <span className="text-secondary font-bold">Rs.50</span>
                     </div>
                     <div className="flex justify-between text-lg pt-3 border-t border-primary/5">
                        <span className="font-bold text-secondary">Total</span>
                        <span className="font-bold text-accent">Rs.1220</span>
                     </div>
                  </div>

                  <button className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                     Pay Now <ShieldCheck size={18} />
                  </button>
                  
                  <p className="text-[10px] text-center text-secondary/30 uppercase tracking-widest font-bold">
                     Your data is encrypted & secure
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default CheckoutPage
