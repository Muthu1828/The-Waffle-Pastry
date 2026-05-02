'use client'

import React from 'react'
import { LayoutDashboard, ShoppingBag, Users, TrendingUp, DollarSign, Package } from 'lucide-react'
import Link from 'next/link'

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Revenue', value: '₹1,24,500', icon: <DollarSign />, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Total Orders', value: '154', icon: <ShoppingBag />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Customers', value: '890', icon: <Users />, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Active Products', value: '42', icon: <Package />, color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  const recentOrders = [
    { id: '#1024', customer: 'Rahul Sharma', amount: '₹1,220', status: 'Processing', date: '2 mins ago' },
    { id: '#1023', customer: 'Priya Patel', amount: '₹450', status: 'Delivered', date: '1 hour ago' },
    { id: '#1022', customer: 'Amit Kumar', amount: '₹850', status: 'Shipped', date: '3 hours ago' },
  ]

  return (
    <div className="flex min-h-screen bg-background/50">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white p-8 hidden md:block">
         <div className="mb-12">
            <span className="font-heading text-xl font-bold">Admin <span className="text-accent">Panel</span></span>
         </div>
         <nav className="space-y-4">
            <Link href="/admin/dashboard" className="flex items-center gap-3 text-accent font-bold">
               <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 text-primary/70 hover:text-white transition-colors">
               <Package size={20} /> Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 text-primary/70 hover:text-white transition-colors">
               <ShoppingBag size={20} /> Orders
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 text-primary/70 hover:text-white transition-colors">
               <Users size={20} /> Customers
            </Link>
         </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12">
         <header className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-secondary">Dashboard Overview</h1>
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <p className="text-sm font-bold text-secondary">Admin User</p>
                  <p className="text-xs text-secondary/40">Super Admin</p>
               </div>
               <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white font-bold">A</div>
            </div>
         </header>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((item) => (
               <div key={item.name} className="bg-white p-8 rounded-3xl shadow-sm border border-primary/10">
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                     {item.icon}
                  </div>
                  <p className="text-secondary/40 text-sm font-bold uppercase tracking-widest mb-1">{item.name}</p>
                  <p className="text-2xl font-bold text-secondary">{item.value}</p>
               </div>
            ))}
         </div>

         {/* Recent Orders Table */}
         <div className="bg-white rounded-3xl shadow-sm border border-primary/10 overflow-hidden">
            <div className="p-8 border-b border-primary/10 flex justify-between items-center">
               <h3 className="text-xl font-bold text-secondary">Recent Orders</h3>
               <Link href="/admin/orders" className="text-accent text-sm font-bold hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-background/50 text-secondary/40 text-xs font-bold uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-4">Order ID</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Amount</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10 text-sm">
                     {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                           <td className="px-8 py-6 font-bold text-secondary">{order.id}</td>
                           <td className="px-8 py-6 text-secondary/70">{order.customer}</td>
                           <td className="px-8 py-6 font-bold text-secondary">{order.amount}</td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                 order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                                 order.status === 'Processing' ? 'bg-orange-100 text-orange-600' : 
                                 'bg-blue-100 text-blue-600'
                              }`}>
                                 {order.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-secondary/40">{order.date}</td>
                           <td className="px-8 py-6">
                              <button className="text-accent font-bold hover:underline">Details</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </main>
    </div>
  )
}

export default AdminDashboard
