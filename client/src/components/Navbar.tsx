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
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-primary/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-16 h-16 transition-transform group-hover:scale-110 duration-500">
               <img 
                  src="/logo.png" 
                  alt="The Waffle Pastry" 
                  className="w-full h-full object-contain"
               />
            </div>
            <div className="flex flex-col">
               <span className="font-heading text-2xl font-bold text-secondary leading-none tracking-tight">
                 The Waffle <span className="text-accent">Pastry</span>
               </span>
               <span className="text-[9px] uppercase tracking-[0.4em] text-secondary/40 font-black mt-2 ml-1">Est. 2026 • Cake 'N' Pastry</span>
            </div>
          </Link>

          {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-secondary/60 font-bold hover:text-accent transition-all text-sm uppercase tracking-widest">
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin/products" className="text-accent font-bold px-5 py-2 border-2 border-accent rounded-full hover:bg-accent hover:text-white transition-all text-xs uppercase tracking-widest">
                  Manage Shop
                </Link>
              )}
            </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative text-secondary hover:text-accent transition-colors p-2">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                {cartCount}
              </span>
            </Link>
            
            {user ? (
               <div className="flex items-center gap-5 border-l border-primary/20 pl-6">
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-black text-secondary leading-none uppercase tracking-tighter">{user.name}</span>
                     <span className="text-[9px] text-accent font-bold uppercase tracking-widest mt-1">
                        {user.role}
                     </span>
                  </div>
                  <button 
                     onClick={() => { logout(); window.location.href = '/' }}
                     className="px-4 py-2 bg-secondary/5 hover:bg-red-500/10 text-secondary border border-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                     Sign Out
                  </button>
               </div>
            ) : (
               <Link href="/login" className="bg-secondary text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all">
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
