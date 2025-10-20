"use client"
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Skeleton } from '@/components/ui/skeleton'

export default function PainelParceiro() {
  const [status, setStatus] = useState<{ approved: boolean; paid: boolean } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const token = session?.access_token
        if (!token) return
        const res = await fetch(`/api/partner/profile?ts=${Date.now()}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
        const data = await res.json()
        if (!mounted) return
        if (data?.partner) setStatus({ approved: !!data.partner.approved, paid: !!data.partner.paid })
      } finally { if (mounted) setLoading(false) }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <div>
          {loading ? (
            <>
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-64 mt-2" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Seu Painel</h1>
              <p className="text-gray-400 text-xs">Resumo da sua conta e ações rápidas.</p>
            </>
          )}
        </div>
        {loading ? (
          <Skeleton className="h-6 w-24" />
        ) : status ? (
          <Badge className={status.paid ? 'bg-emerald-600 text-white hover:bg-gray-900 text-xs md:text-sm' : 'bg-amber-600 text-white text-xs md:text-sm hover:bg-gray-900'}>
            {status.paid ? 'Assinatura ativa' : 'Pagamento pendente'}
          </Badge>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {loading ? (
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </>
        ) : (
        <>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 text-sm">
            Gerencie suas informações públicas
            <div className="mt-4">
              <Button asChild size="sm" className="w-full"> 
                <a href="/painel/configuracoes">Editar perfil</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">Pagamentos</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            Consulte seu plano e faturas
            <div className="mt-4">
              <Button asChild size="sm" className="w-full">
                <a href="/painel/pagamentos">Ver pagamentos</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">Eventos</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            Oportunidades e agenda
            <div className="mt-4">
              <Button asChild size="sm" className="w-full">
                <a href="/painel/eventos">Abrir eventos</a>
              </Button>
            </div>
          </CardContent>
        </Card>

         <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">Ajuda</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            Tire dúvidas e fale conosco
            <div className="mt-4">
              <Button asChild size="sm" className="w-full">
                <a href="/painel/ajuda">Central de ajuda</a>
              </Button>
            </div>
          </CardContent>
        </Card>
        </>
        )}
      </div>

      {!loading && status && !status.approved && (
        <div className="mt-6 p-4 rounded border border-amber-600/40 bg-amber-900/20 text-amber-200">
          Seu cadastro está em análise. Em breve entraremos em contato.
        </div>
      )}

      {!loading && status && status.approved && !status.paid && (
        <div className="mt-6 p-4 rounded border border-amber-600/40 bg-amber-900/20 text-amber-200">
          Pagamento pendente. <a className="underline" href="/painel/payment">Ativar assinatura</a>
        </div>
      )}
    </div>
  )
}


