'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import API from '../../../lib/api'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const AdminLoginPage = () => {
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
      
      if (data.role !== 'admin') {
        toast.error('Unauthorized. This portal is for Admins only.')
        setLoading(false)
        return
      }

      login(data, data.token)
      toast.success(`Welcome Master, ${data.name}`)
      router.push('/admin/products')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#4A2C2A]">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-[#E07A5F]" />
         
         <div className="text-center mb-12 space-y-4">
            <div className="mx-auto w-20 h-20 bg-[#4A2C2A] rounded-3xl flex items-center justify-center text-[#E07A5F] shadow-xl">
               <ShieldCheck size={40} />
            </div>
            <h1 className="font-heading text-4xl font-bold text-[#4A2C2A]">Admin Portal</h1>
            <p className="text-secondary/50 font-medium">Strictly authorized personnel only.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-[#4A2C2A]/40 ml-1">Admin Email</label>
               <input 
                  type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 bg-background border border-primary/10 rounded-2xl focus:border-[#E07A5F] outline-none transition-all font-bold text-secondary"
                  placeholder="admin@thewafflepastry.com"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-[#4A2C2A]/40 ml-1">Secret Password</label>
               <input 
                  type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 bg-background border border-primary/10 rounded-2xl focus:border-[#E07A5F] outline-none transition-all font-bold text-secondary"
                  placeholder="••••••••"
               />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#4A2C2A] text-white py-6 rounded-2xl flex items-center justify-center gap-3 group shadow-xl shadow-black/20 hover:bg-[#E07A5F] transition-all disabled:opacity-50"
            >
               {loading ? <Loader2 className="animate-spin" /> : (
                 <span className="font-bold uppercase tracking-[0.2em] text-xs">Authorize Access</span>
               )}
            </button>
         </form>

         <div className="mt-12 text-center">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 hover:text-[#E07A5F] transition-colors">
               Return to Public Site
            </Link>
         </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
