'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAdmin } = useAuth()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-16 h-16 transition-transform group-hover:scale-110 duration-300 flex items-center justify-center">
               <img 
                  src="/logo.png" 
                  alt="The Waffle Pastry" 
                  className="w-full h-full object-contain"
               />
            </div>
            <div className="flex flex-col">
               <span className="font-heading text-xl font-bold text-secondary leading-none">
                 The Waffle <span className="text-accent">Pastry</span>
               </span>
               <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-bold">Cake 'N' Pastry</span>
            </div>
          </Link>

          {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-secondary/60 font-bold hover:text-accent transition-colors">
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin/products" className="text-accent font-bold px-4 py-2 border-2 border-accent rounded-full hover:bg-accent hover:text-white transition-all text-sm">
                  Admin Panel
                </Link>
              )}
            </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative text-secondary hover:text-accent transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <Link href="/login" className="text-secondary hover:text-accent transition-colors">
              <User size={24} />
            </Link>
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
