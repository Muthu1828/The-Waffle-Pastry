'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ListChecks, 
  ShoppingBag, 
  LogOut,
  ChevronLeft
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminSidebar = () => {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <ListChecks size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
  ]

  return (
    <aside className="w-64 bg-secondary min-h-screen flex flex-col text-white sticky top-0">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
             <ChevronLeft size={18} />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">Bakery <span className="text-accent">Admin</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ml-4">Management</p>
        {menuItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
              pathname === item.path 
                ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-bold text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
