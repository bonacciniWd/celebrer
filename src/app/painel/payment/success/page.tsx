"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Confirmando seu pagamento...')

  useEffect(() => {
    let cancelled = false
    const sessionId = searchParams?.get('session_id') || null

    async function start() {
      try {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token || null
        if (!token) { router.push('/parceiros/login'); return }

        // 1) Tenta confirmar diretamente com o Stripe via backend (idempotente)
        if (sessionId) {
          try {
            const res = await fetch(`/api/payment/confirm?session_id=${encodeURIComponent(sessionId)}`, {
              headers: { Authorization: `Bearer ${token}` },
              cache: 'no-store'
            })
            if (res.ok) {
              const data = await res.json()
              if (data?.activated) {
                if (!cancelled) router.replace('/painel')
                return
              }
            }
          } catch (_) {
            // ignora e segue para o polling
          }
        }

        // 2) Fallback: polling do perfil até paid=true (limite de tentativas)
        let attempts = 0
        const maxAttempts = 60
        const check = async () => {
          try {
            const resp = await fetch(`/api/partner/profile?ts=${Date.now()}` , {
              headers: { Authorization: `Bearer ${token}` },
              cache: 'no-store'
            })
            const data = await resp.json()
            if (data?.partner?.paid) {
              if (!cancelled) router.replace('/painel')
              return
            }
            attempts += 1
            if (attempts >= maxAttempts) {
              if (!cancelled) router.replace('/painel')
              return
            }
            setTimeout(check, 1000)
          } catch (_) {
            attempts += 1
            if (attempts >= maxAttempts) {
              if (!cancelled) router.replace('/painel')
              return
            }
            setTimeout(check, 1000)
          }
        }
        check()
      } catch (_) {
        if (!cancelled) router.replace('/painel')
      }
    }

    // pequena mensagem com session id para debug
    if (sessionId) setMessage(`Pagamento confirmado. Sessão ${sessionId}. Ativando sua conta...`)
    start()
    return () => { cancelled = true }
  }, [router, searchParams])

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold text-white">Pagamento recebido</h1>
        <p className="text-gray-300">{message}</p>
        <p className="text-gray-400 text-sm">Isso pode levar alguns segundos enquanto processamos o webhook.</p>
      </div>
    </main>
  )
}
