'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStripe } from '@/lib/stripe-client'
import { supabase } from '@/lib/supabase'

export default function PaymentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [partnerId, setPartnerId] = useState<number | null>(null)
  
  useEffect(() => {
    const loadPartnerInfo = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        console.log('Fetching partner with auth_user_id:', user.id)
        
        // Buscar via API protegida (usa supabaseAdmin no backend)
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token || null
        const resp = await fetch('/api/partner/profile', { headers: { Authorization: `Bearer ${token}` } })
        if (!resp.ok) {
          throw new Error('Falha ao carregar dados do parceiro')
        }
        const { partner } = await resp.json()
        if (!partner?.id) throw new Error('Parceiro não encontrado')
        setPartnerId(partner.id)
        return partner
      } catch (error: any) {
        console.error('Error loading partner:', error)
        throw error
      }
    }

    loadPartnerInfo()
  }, [router])

  const handleCheckout = async () => {
    if (!partnerId) {
      setError('Erro: Informações do parceiro não encontradas')
      return
    }

    try {
      setIsLoading(true)
      setError('')

  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token || null
      if (!token) {
        throw new Error('Não autorizado')
      }

      // Tenta a rota do App Router primeiro; se 404, tenta Pages API
      let response = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ partnerId }),
      })

      if (response.status === 404) {
        response = await fetch('/api/payment/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ partnerId }),
        })
      }

  const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirecionar para o Stripe Checkout via URL (redirectToCheckout deprecated)
      if (data?.url) {
        window.location.href = data.url
      } else if (data?.sessionId) {
        // Fallback (em contas onde URL não vem habilitado)
        window.location.href = `${process.env.NEXT_PUBLIC_URL || ''}/api/stripe/redirect?session_id=${encodeURIComponent(data.sessionId)}`
      } else {
        throw new Error('URL de checkout não disponível')
      }

    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Ative sua Conta
          </CardTitle>
          <CardDescription className="text-gray-400">
            Ative sua conta para começar a oferecer seus serviços na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Plano Anual
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Valor</span>
                  <span className="text-white font-bold">R$ 1.558,80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Período</span>
                  <span className="text-white">12 meses</span>
                </div>
                <div className="pt-4">
                  <Button
                    onClick={handleCheckout}
                    disabled={isLoading || !partnerId}
                    className="w-full"
                  >
                    {isLoading ? 'Processando...' : 'Ativar Agora'}
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded bg-red-900/50 border border-red-500">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <div className="text-sm text-gray-400">
              <p>Ao clicar em "Ativar Agora" você será redirecionado para o checkout seguro do Stripe.</p>
              <p>Após a confirmação do pagamento, sua conta será ativada automaticamente.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}