'use client'

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait for the auth state to be loaded from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      if (parsedUser.role !== 'admin') {
        router.push('/')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
           <Loader2 className="animate-spin text-accent mx-auto" size={48} />
           <p className="text-secondary font-bold uppercase tracking-widest text-xs">Authenticating Admin...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
