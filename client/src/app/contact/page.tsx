'use client'

import React from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const ContactPage = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-primary/20 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-secondary">Get in Touch</h1>
          <p className="text-secondary/60 mt-6 max-w-2xl mx-auto text-lg">
            Have a question or a custom request? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
          {/* Contact Info Sidebar */}
          <div className="bg-secondary p-12 text-white space-y-12">
            <div>
               <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
               <p className="text-primary/70">Fill out the form and our team will get back to you within 24 hours.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent">
                   <Phone size={24} />
                </div>
                <div>
                   <p className="text-xs text-primary/50 uppercase font-bold tracking-widest">Call Us</p>
                   <p className="font-bold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent">
                   <Mail size={24} />
                </div>
                <div>
                   <p className="text-xs text-primary/50 uppercase font-bold tracking-widest">Email Us</p>
                   <p className="font-bold">hello@thewafflepastry.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent">
                   <MapPin size={24} />
                </div>
                <div>
                   <p className="text-xs text-primary/50 uppercase font-bold tracking-widest">Visit Us</p>
                   <p className="font-bold">123 Bakery Lane, Sweet Town</p>
                </div>
              </div>
            </div>

            <div className="pt-12 flex gap-4">
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-lg">📸</span>
               </div>
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-lg">💬</span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 p-12 bg-white">
            <form className="space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Full Name</label>
                     <input type="text" className="w-full bg-background border-b-2 border-primary/20 p-3 focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Email Address</label>
                     <input type="email" className="w-full bg-background border-b-2 border-primary/20 p-3 focus:border-accent outline-none transition-colors" placeholder="john@example.com" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Subject</label>
                  <input type="text" className="w-full bg-background border-b-2 border-primary/20 p-3 focus:border-accent outline-none transition-colors" placeholder="How can we help?" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary/50">Message</label>
                  <textarea className="w-full bg-background border-b-2 border-primary/20 p-3 focus:border-accent outline-none transition-colors min-h-[150px]" placeholder="Your message here..." />
               </div>
               
               <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
               </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Embed Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
         <div className="h-96 bg-primary/10 rounded-3xl overflow-hidden flex items-center justify-center text-secondary/20 font-bold">
            [ Google Maps Embed ]
         </div>
      </section>
    </div>
  )
}

export default ContactPage
