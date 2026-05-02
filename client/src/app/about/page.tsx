import React from 'react'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-primary/20 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-secondary">Our Story</h1>
          <p className="text-secondary/60 mt-6 max-w-2xl mx-auto text-lg">
            From a small home kitchen to the most loved bakery in town, our journey has been flavored with love and passion.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-secondary/5 rounded-3xl overflow-hidden shadow-2xl border-8 border-white flex items-center justify-center text-secondary/10 font-heading text-2xl">
              [ Story Image 1 ]
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent rounded-3xl rotate-12 -z-10" />
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent font-bold uppercase tracking-widest text-sm">Since 2024</span>
              <h2 className="font-heading text-4xl font-bold text-secondary">A Passion for Baking</h2>
              <p className="text-secondary/70 leading-relaxed">
                The Waffle Pastry started with a simple idea: that waffles shouldn't just be a breakfast item, and cakes shouldn't just be for birthdays. They should be gourmet experiences that bring joy to everyday life.
              </p>
              <p className="text-secondary/70 leading-relaxed">
                Our founders, obsessed with the perfect Belgian waffle crunch and the lightest French pastry layers, spent years perfecting recipes that combine traditional techniques with modern, bold flavors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="space-y-2">
                  <h4 className="font-bold text-secondary text-lg">100% Homemade</h4>
                  <p className="text-sm text-secondary/50">No preservatives, no shortcuts. Just pure, natural ingredients.</p>
               </div>
               <div className="space-y-2">
                  <h4 className="font-bold text-secondary text-lg">Baked Daily</h4>
                  <p className="text-sm text-secondary/50">Everything is baked fresh every morning to ensure peak flavor.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-secondary text-white py-24 mt-24 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-5 pointer-events-none" />
         <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
            <h2 className="font-heading text-4xl font-bold">Our Philosophy</h2>
            <p className="text-primary/70 text-xl leading-relaxed italic font-heading">
              "We don't just sell food; we create memories. Each pastry is a testament to our commitment to quality, creativity, and the simple joy of sharing something sweet with the ones you love."
            </p>
            <div className="w-16 h-[2px] bg-accent mx-auto" />
            <p className="font-bold uppercase tracking-widest text-accent">The Waffle Pastry Team</p>
         </div>
      </section>
    </div>
  )
}

export default AboutPage
