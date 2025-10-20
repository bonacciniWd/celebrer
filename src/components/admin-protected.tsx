"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // If middleware Basic Auth passed, it sets a non-HttpOnly cookie admin_basic=1
      // Honor it here to prevent client-side redirect loops when logging via Basic.
      if (typeof document !== 'undefined' && document.cookie.includes('admin_basic=1')) {
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/parceiros/login")
        return
      }

      const { data: adminData } = await supabase
        .from("admin_users")
        .select()
        .eq("id", session.user.id)
        .single()

      if (!adminData) {
        router.push("/")
      }
    }

    checkAuth()
  }, [router])

  return <>{children}</>
}