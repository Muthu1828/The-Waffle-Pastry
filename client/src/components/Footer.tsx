import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
               </div>
               <span className="font-heading text-xl font-bold text-white leading-none">
                  The Waffle <span className="text-accent">Pastry</span>
               </span>
            </div>
            <p className="text-primary/70 text-sm leading-relaxed">
              Serving handcrafted gourmet waffles, elegant cakes, and artisanal pastries since 2024. Every bite is a piece of heaven.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop" className="hover:text-accent transition-colors">Menu / Shop</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="/custom-cake" className="hover:text-accent transition-colors">Custom Cake Order</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop?cat=Waffles" className="hover:text-accent transition-colors">Gourmet Waffles</Link></li>
              <li><Link href="/shop?cat=Cakes" className="hover:text-accent transition-colors">Elegant Cakes</Link></li>
              <li><Link href="/shop?cat=Pastries" className="hover:text-accent transition-colors">French Pastries</Link></li>
              <li><Link href="/shop?cat=Specials" className="hover:text-accent transition-colors">Today's Specials</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Store Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-primary/70">
                <MapPin size={18} className="text-accent shrink-0" />
                <span>123 Bakery Lane, Sweet Town, 110001</span>
              </li>
              <li className="flex items-center space-x-3 text-primary/70">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-primary/70">
                <Mail size={18} className="text-accent shrink-0" />
                <span>hello@thewafflepastry.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary/40">
          <p>© 2024 The Waffle Pastry. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
