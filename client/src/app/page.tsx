import React from 'react'
import Hero from '../components/Hero'
import Link from 'next/link'
import { ChevronRight, Star, Clock, Truck, ShieldCheck } from 'lucide-react'

const HomePage = () => {
  const categories = [
    { name: 'Cakes', icon: '🎂', count: 12, color: 'bg-pink-100' },
    { name: 'Waffles', icon: '🧇', count: 8, color: 'bg-orange-100' },
    { name: 'Pastries', icon: '🥐', count: 15, color: 'bg-yellow-100' },
  ]

  const featuredProducts = [
    { id: 1, name: 'Chocolate Lava Cake', price: 450, rating: 4.8, image: '/p1.jpg' },
    { id: 2, name: 'Classic Belgian Waffle', price: 280, rating: 4.9, image: '/p2.jpg' },
    { id: 3, name: 'Strawberry Cream Pastry', price: 180, rating: 4.7, image: '/p3.jpg' },
    { id: 4, name: 'Custom Birthday Cake', price: 1200, rating: 5.0, image: '/p4.jpg' },
  ]

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-4xl font-bold text-secondary">Browse by Category</h2>
            <p className="text-secondary/50 mt-2">Discover our delicious range of treats</p>
          </div>
          <Link href="/shop" className="text-accent font-semibold flex items-center gap-1 hover:underline">
            View All Menu <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href={`/shop?cat=${cat.name}`}
              className="group relative h-48 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className={`absolute inset-0 ${cat.color} opacity-40 group-hover:scale-110 transition-transform duration-500`} />
              <div className="relative h-full p-8 flex flex-col justify-center items-center text-center space-y-4">
                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-secondary">{cat.name}</h3>
                  <p className="text-sm text-secondary/60 font-medium">{cat.count} Items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-primary/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-4xl font-bold text-secondary">Today’s Specials</h2>
            <p className="text-secondary/50 max-w-xl mx-auto">Our most loved treats, handpicked just for you. Fresh from the oven to your doorstep.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group">
                <div className="relative h-64 bg-background flex items-center justify-center overflow-hidden">
                   <span className="text-secondary/10 font-heading text-xl">[ Product Image ]</span>
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-secondary shadow-sm">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      {product.rating}
                   </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-secondary group-hover:text-accent transition-colors">{product.name}</h3>
                    <p className="text-accent font-bold text-lg mt-1">Rs.{product.price}</p>
                  </div>
                  <button className="w-full py-3 rounded-xl border border-primary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto">
              <Clock size={32} />
            </div>
            <h4 className="font-bold text-xl text-secondary">Fast Delivery</h4>
            <p className="text-secondary/60 text-sm">We deliver your treats fresh and hot within 45 minutes in the local area.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto">
              <ShieldCheck size={32} />
            </div>
            <h4 className="font-bold text-xl text-secondary">Quality First</h4>
            <p className="text-secondary/60 text-sm">Every ingredient is hand-selected to ensure the highest homemade quality.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto">
              <Truck size={32} />
            </div>
            <h4 className="font-bold text-xl text-secondary">Free Shipping</h4>
            <p className="text-secondary/60 text-sm">Get free delivery on all orders above ₹500. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white space-y-8">
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
           
           <h2 className="font-heading text-4xl md:text-6xl font-bold relative z-10">Wanna make your day <br /> <span className="text-accent italic">Extra Special?</span></h2>
           <p className="text-primary/70 max-w-xl mx-auto relative z-10">Order our custom cakes for birthdays, anniversaries, or just to treat yourself. We bring your sweet dreams to life.</p>
           <div className="relative z-10 flex flex-wrap justify-center gap-6">
              <Link href="/custom-cake" className="btn-primary">Order Custom Cake</Link>
              <Link href="/shop" className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all">Explore Menu</Link>
           </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
