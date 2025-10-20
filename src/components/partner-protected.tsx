"use client"
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function PartnerProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    const check = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const user = session?.user || null
        if (!user) {
          router.replace('/parceiros/login?next=' + encodeURIComponent(pathname || '/painel'))
          return
        }
      } finally {
        if (mounted) setReady(true)
      }
    }
    check()
    return () => { mounted = false }
  }, [router, pathname])

  if (!ready) return null
  return <>{children}</>
}
