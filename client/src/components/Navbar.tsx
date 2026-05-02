'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const { cartCount } = useCart()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#4A2C2A] border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-16 h-16 bg-white rounded-full p-0.5 overflow-hidden transition-all group-hover:scale-110 duration-500 shadow-[0_0_20px_rgba(224,122,95,0.3)] border-2 border-[#E07A5F]/50">
               <img 
                  src="/logo.png" 
                  alt="The Waffle Pastry" 
                  className="w-full h-full object-cover rounded-full"
               />
            </div>
            <div className="flex flex-col">
               <span className="font-lobster text-3xl text-[#FFF8F0] leading-none drop-shadow-md">
                 The Waffle <span className="text-[#E07A5F]">Pastry</span>
               </span>
               <span className="text-[9px] uppercase tracking-[0.4em] text-[#FFF8F0]/50 font-black mt-2 ml-1">Est. 2026 • Cake 'N' Pastry</span>
            </div>
          </Link>

          {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-[#FFF8F0]/80 font-bold hover:text-[#E07A5F] transition-all text-sm uppercase tracking-widest">
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin/products" className="bg-[#E07A5F] text-white font-bold px-5 py-2 rounded-full hover:bg-white hover:text-[#4A2C2A] transition-all text-xs uppercase tracking-widest shadow-lg shadow-black/20">
                  Manage Shop
                </Link>
              )}
            </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative text-[#FFF8F0] hover:text-[#E07A5F] transition-colors p-2">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-[#E07A5F] text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                {cartCount}
              </span>
            </Link>
            
            {user ? (
               <div className="flex items-center gap-5 border-l border-white/20 pl-6">
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-black text-[#FFF8F0] leading-none uppercase tracking-tighter">{user.name}</span>
                     <span className="text-[9px] text-[#E07A5F] font-bold uppercase tracking-widest mt-1">
                        {user.role}
                     </span>
                  </div>
                  <button 
                     onClick={() => { logout(); window.location.href = '/' }}
                     className="px-4 py-2 bg-white/10 hover:bg-red-500/20 text-[#FFF8F0] border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                     Sign Out
                  </button>
               </div>
            ) : (
               <Link href="/login" className="bg-white/10 text-[#FFF8F0] px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#4A2C2A] transition-all border border-white/10">
                  Login
               </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative text-secondary">
              <ShoppingCart size={24} />
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-primary/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-secondary text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-secondary text-lg font-medium"
              >
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
