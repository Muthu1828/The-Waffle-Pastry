'use client'

import React from 'react'
import Link from 'next/link'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'

const SignupPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-background">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden border border-primary/20">
         {/* Decorative circle */}
         <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
         
         <div className="text-center mb-10 space-y-2 relative z-10">
            <h1 className="font-heading text-4xl font-bold text-secondary">Join the Club</h1>
            <p className="text-secondary/50">Start your sweet journey with us today.</p>
         </div>

         <form className="space-y-6 relative z-10">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-secondary/50 ml-1">Full Name</label>
               <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                  <input 
                     type="text" 
                     className="w-full pl-12 pr-4 py-4 bg-background/50 border border-primary/20 rounded-2xl focus:border-accent outline-none transition-all"
                     placeholder="John Doe"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-secondary/50 ml-1">Email</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                  <input 
                     type="email" 
                     className="w-full pl-12 pr-4 py-4 bg-background/50 border border-primary/20 rounded-2xl focus:border-accent outline-none transition-all"
                     placeholder="your@email.com"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-secondary/50 ml-1">Password</label>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                  <input 
                     type="password" 
                     className="w-full pl-12 pr-4 py-4 bg-background/50 border border-primary/20 rounded-2xl focus:border-accent outline-none transition-all"
                     placeholder="••••••••"
                  />
               </div>
            </div>

            <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 group shadow-lg shadow-accent/20">
               Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </form>

         <div className="mt-10 text-center relative z-10">
            <p className="text-secondary/50 text-sm">
               Already have an account? <Link href="/login" className="text-accent font-bold hover:underline">Log in</Link>
            </p>
         </div>
      </div>
    </div>
  )
}

export default SignupPage
