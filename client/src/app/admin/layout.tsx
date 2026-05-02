'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from '../../components/AdminSidebar'
import AdminGuard from '../../components/AdminGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // If it's the login page, don't show the sidebar or guard yet
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background/50">
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </AdminGuard>
  )
}
