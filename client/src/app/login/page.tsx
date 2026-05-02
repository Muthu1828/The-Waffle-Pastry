'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import API from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await API.post('/users/login', { email, password })
      login(data, data.token)
      toast.success(`Welcome back, ${data.name}!`)
      
      if (data.role === 'admin') {
        router.push('/admin/products')
      } else {
        router.push('/')
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-background">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden border border-primary/20">
         {/* Decorative circle */}
         <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
         
         <div className="text-center mb-10 space-y-2 relative z-10">
            <h1 className="font-heading text-4xl font-bold text-secondary">Welcome Back</h1>
            <p className="text-secondary/50">Log in to track your orders and more.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-secondary/50 ml-1">Email</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                  <input 
                     type="email" 
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 bg-background/50 border border-primary/20 rounded-2xl focus:border-accent outline-none transition-all"
                     placeholder="your@email.com"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Password</label>
                  <Link href="/forgot-password" size={18} className="text-xs text-accent hover:underline font-bold">Forgot?</Link>
               </div>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                  <input 
                     type="password" 
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 bg-background/50 border border-primary/20 rounded-2xl focus:border-accent outline-none transition-all"
                     placeholder="••••••••"
                  />
               </div>
            </div>

            <button 
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 group shadow-lg shadow-accent/20 disabled:opacity-50"
            >
               {loading ? (
                 <Loader2 className="animate-spin" size={20} />
               ) : (
                 <>
                   Login to My Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </>
               )}
            </button>
         </form>

         <div className="mt-10 text-center relative z-10">
            <p className="text-secondary/50 text-sm">
               Don't have an account? <Link href="/signup" className="text-accent font-bold hover:underline">Sign up for free</Link>
            </p>
         </div>
      </div>
    </div>
  )
}

export default LoginPage
