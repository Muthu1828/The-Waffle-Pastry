'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import API from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const validatePassword = (pass: string) => {
    return {
      length: pass.length >= 8,
      number: /\d/.test(pass),
      special: /[!@#$%^&*]/.test(pass)
    }
  }

  const passStatus = validatePassword(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passStatus.length || !passStatus.number || !passStatus.special) {
      toast.error('Please meet all password requirements')
      return
    }

    setLoading(true)
    try {
      const { data } = await API.post('/users', formData)
      login(data, data.token)
      toast.success('Account created! Welcome to the family.')
      router.push('/')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-background">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden border border-primary/20">
         <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
         
         <div className="text-center mb-10 space-y-2 relative z-10">
            <h1 className="font-heading text-4xl font-bold text-secondary">Join the Club</h1>
            <p className="text-secondary/50">Start your sweet journey with us today.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-secondary/50 ml-1">Full Name</label>
               <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                  <input 
                     type="text" required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                     type="email" required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                     type="password" required
                     value={formData.password}
                     onChange={(e) => setFormData({...formData, password: e.target.value})}
                     className="w-full pl-12 pr-4 py-4 bg-background/50 border border-primary/20 rounded-2xl focus:border-accent outline-none transition-all"
                     placeholder="••••••••"
                  />
               </div>
               
               {/* Password Requirements */}
               <div className="grid grid-cols-1 gap-2 mt-4 p-4 bg-background/50 rounded-xl border border-primary/10">
                  <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${passStatus.length ? 'text-green-500' : 'text-secondary/30'}`}>
                     {passStatus.length ? <CheckCircle2 size={12} /> : <XCircle size={12} />} At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${passStatus.number ? 'text-green-500' : 'text-secondary/30'}`}>
                     {passStatus.number ? <CheckCircle2 size={12} /> : <XCircle size={12} />} At least 1 number
                  </div>
                  <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${passStatus.special ? 'text-green-500' : 'text-secondary/30'}`}>
                     {passStatus.special ? <CheckCircle2 size={12} /> : <XCircle size={12} />} 1 special character (!@#)
                  </div>
               </div>
            </div>

            <button 
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 group shadow-lg shadow-accent/20 disabled:opacity-50"
            >
               {loading ? <Loader2 className="animate-spin" /> : (
                 <>Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
               )}
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
