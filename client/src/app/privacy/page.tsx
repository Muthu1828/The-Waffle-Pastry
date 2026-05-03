'use client'

import React from 'react'
import { ShieldCheck, Lock, Eye, Globe } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="bg-background min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-heading text-5xl font-bold text-secondary">Privacy Policy</h1>
          <p className="text-secondary/50 font-medium uppercase tracking-widest text-xs">Last Updated: May 2026</p>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-primary/10 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <Lock size={20} className="text-accent" /> 1. Information We Collect
            </h2>
            <p className="text-secondary/70 leading-relaxed">
              We collect information you provide directly to us when you create an account, place an order, or contact us for support. This may include your name, email address, phone number, shipping address, and payment information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <Eye size={20} className="text-accent" /> 2. How We Use Your Information
            </h2>
            <p className="text-secondary/70 leading-relaxed">
              We use the information we collect to process your orders, provide customer support, send you updates about your delivery, and improve our services. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-secondary flex items-center gap-3">
              <Globe size={20} className="text-accent" /> 3. Data Security
            </h2>
            <p className="text-secondary/70 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. All payment transactions are processed through secure gateways (like Razorpay) and we do not store your credit card details on our servers.
            </p>
          </section>

          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <h3 className="font-bold text-secondary mb-2">Contact Us</h3>
            <p className="text-sm text-secondary/60">
              If you have any questions about this Privacy Policy, please contact our support team at <span className="text-accent font-bold">hello@thewafflepastry.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
