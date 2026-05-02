'use client'

import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  IndianRupee,
  Loader2,
  ChevronRight
} from 'lucide-react'
import API from '../../../lib/api'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        API.get('/orders/stats'),
        API.get('/orders')
      ])
      setStats(statsRes.data)
      setRecentOrders(ordersRes.data.slice(0, 5))
    } catch (err) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-accent" size={48} />
        <p className="text-secondary/40 font-bold uppercase tracking-widest text-xs">Loading Live Data...</p>
      </div>
    )
  }

  const statCards = [
    { label: 'Total Orders', value: stats?.total, icon: <ShoppingBag />, color: 'bg-blue-500' },
    { label: 'Pending', value: stats?.pending, icon: <Clock />, color: 'bg-orange-500' },
    { label: 'Delivered', value: stats?.delivered, icon: <CheckCircle2 />, color: 'bg-green-500' },
    { label: 'Revenue', value: `₹${stats?.totalRevenue}`, icon: <IndianRupee />, color: 'bg-purple-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-heading text-4xl font-bold text-secondary">Dashboard</h1>
          <p className="text-secondary/50">Real-time monitoring of your bakery business</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline"
        >
          <TrendingUp size={16} /> Refresh Data
        </button>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-8 rounded-[2.5rem] border border-primary/10 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`} />
            <div className={`w-12 h-12 ${card.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20`}>
              {card.icon}
            </div>
            <p className="text-secondary/40 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
            <h3 className="text-3xl font-bold text-secondary">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Orders Monitor */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 border border-primary/10 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-secondary">Recent Orders</h2>
              <Link href="/admin/orders" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order._id} className="flex items-center justify-between p-4 bg-background rounded-2xl hover:bg-primary/5 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-primary/10">
                         <ShoppingBag size={18} className="text-secondary/30" />
                      </div>
                      <div>
                         <p className="font-bold text-secondary text-sm">#{order._id.slice(-6)}</p>
                         <p className="text-[10px] text-secondary/40 font-bold uppercase">{order.user?.name || 'Guest User'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                      <div className="text-right">
                         <p className="font-bold text-secondary text-sm">₹{order.totalPrice}</p>
                         <p className="text-[10px] text-secondary/40 font-bold uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-600' : 
                        order.orderStatus === 'Processing' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                         {order.orderStatus}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Action Center */}
        <div className="space-y-8">
           <div className="bg-secondary rounded-[3rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Quick Actions</h3>
              <div className="space-y-4 relative z-10">
                 <Link href="/admin/products" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all">
                    <span className="font-medium">Manage Products</span>
                    <ChevronRight size={18} />
                 </Link>
                 <Link href="/admin/categories" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all">
                    <span className="font-medium">Manage Categories</span>
                    <ChevronRight size={18} />
                 </Link>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] p-8 border border-primary/10 shadow-sm text-center">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-secondary mb-2">Everything is Smooth</h4>
              <p className="text-sm text-secondary/40">Your server is currently processing requests with zero lag.</p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
