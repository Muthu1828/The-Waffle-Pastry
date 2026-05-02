'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-background">
      {/* Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[100%] bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[60%] bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wide uppercase"
            >
              Homemade with Love
            </motion.span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-secondary leading-tight">
              Deliciousness <br />
              <span className="text-accent italic">In Every Bite</span>
            </h1>
            <p className="text-secondary/70 text-lg md:text-xl max-w-lg leading-relaxed">
              Experience the perfect crunch of our gourmet waffles and the silky sweetness of our premium cakes. Freshly baked, every single day.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-primary flex items-center gap-2 group">
              Order Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="px-6 py-3 rounded-full border border-secondary/20 text-secondary font-medium hover:bg-secondary/5 transition-colors">
              Our Story
            </Link>
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">50+</p>
              <p className="text-xs text-secondary/50 uppercase tracking-wider">Flavors</p>
            </div>
            <div className="w-[1px] h-10 bg-secondary/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">10k+</p>
              <p className="text-xs text-secondary/50 uppercase tracking-wider">Happy Foodies</p>
            </div>
            <div className="w-[1px] h-10 bg-secondary/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">4.9</p>
              <p className="text-xs text-secondary/50 uppercase tracking-wider">Avg Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full aspect-square rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] overflow-hidden shadow-2xl border-8 border-white"
          >
            <div className="w-full h-full bg-primary relative">
               <div className="absolute inset-0 flex items-center justify-center text-secondary/20 font-heading text-4xl">
                  {/* Hero image placeholder or actual image if provided */}
                  [ Bakery Hero Image ]
               </div>
            </div>
          </motion.div>
          
          {/* Decorative badges */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center p-2 z-20 border-2 border-primary/20"
          >
            <div className="w-full h-full rounded-full border border-dashed border-accent flex items-center justify-center text-[10px] font-bold text-accent text-center uppercase tracking-tighter">
              Best <br /> Seller
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="absolute -bottom-6 left-12 bg-white px-6 py-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-primary/20"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
               🍰
            </div>
            <div>
               <p className="text-xs text-secondary/50 font-bold uppercase tracking-widest">New Arrival</p>
               <p className="text-sm font-bold text-secondary">Berry Bliss Waffle</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
