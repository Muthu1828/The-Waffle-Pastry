'use client'

import React from 'react'
import { FileText, ShoppingBag, Truck, AlertCircle } from 'lucide-react'

const TermsOfService = () => {
  return (
    <div className="bg-background min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText size={32} />
          </div>
          <h1 className="font-heading text-5xl font-bold text-secondary">Terms of Service</h1>
          <p className="text-secondary/50 font-medium uppercase tracking-widest text-xs">Last Updated: May 2026</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-primary/10 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <ShoppingBag size={20} className="text-accent" /> 1. Acceptance of Terms
            </h2>
            <p className="text-secondary/70 leading-relaxed">
              By accessing or using The Waffle Pastry website, you agree to be bound by these Terms of Service. If you do not agree to all the terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <Truck size={20} className="text-accent" /> 2. Delivery & Orders
            </h2>
            <p className="text-secondary/70 leading-relaxed">
              Orders are subject to availability. Delivery times are estimates and may vary based on your location and kitchen traffic. Delivery fees are calculated based on your distance from our bakery as selected during checkout.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <AlertCircle size={20} className="text-accent" /> 3. Refunds & Cancellations
            </h2>
            <p className="text-secondary/70 leading-relaxed">
              Due to the perishable nature of our products, we generally do not accept returns. If you are unsatisfied with your order, please contact us within 1 hour of delivery for a resolution.
            </p>
          </section>

          <section className="bg-secondary p-8 md:p-12 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-bold mb-4">Ownership</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              All content on this website, including text, images, and brand design, is the property of The Waffle Pastry and is protected by copyright laws.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
