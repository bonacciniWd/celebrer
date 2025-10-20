import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminOverview() {
  const { data: partners } = await supabaseAdmin.from('partners').select('*')
  type Partner = { approved: boolean | null; paid?: boolean | null; created_at: string }
  const publicados = (partners || []).filter((p: Partner) => p.approved === true && p.paid).length

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const { count: newRegistrations } = await supabaseAdmin
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString())

  const decided = (partners || []).filter((p: Partner) => p.approved !== null).length
  const approved = (partners || []).filter((p: Partner) => p.approved === true).length
  const approvalRate = decided > 0 ? (approved / decided) * 100 : 0

  return (
    <Card className="col-span-4 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Visão Geral</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none text-white">Parceiros Ativos</p>
              <p className="text-sm text-gray-400">Parceiros publicados na plataforma</p>
            </div>
            <div className="text-2xl font-bold text-white">{publicados}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none text-white">Novos Cadastros</p>
              <p className="text-sm text-gray-400">Últimos 30 dias</p>
            </div>
            <div className="text-2xl font-bold text-white">{newRegistrations ?? 0}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none text-white">Taxa de Aprovação</p>
              <p className="text-sm text-gray-400">Parceiros aprovados vs total</p>
            </div>
            <div className="text-2xl font-bold text-white">{approvalRate.toFixed(1)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
