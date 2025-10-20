import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Calendar } from "lucide-react"
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminTopCards() {
  const { data: partners } = await supabaseAdmin.from('partners').select('*')
  type Partner = { approved: boolean | null; paid?: boolean | null }
  const total = partners?.length ?? 0
  const publicados = (partners || []).filter((p: Partner) => p.approved === true && p.paid).length
  const monthlyRevenue = publicados * 1558.80

  // Simple static placeholder for eventos (if needed wire later)
  const eventosAtivos = 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total de Parceiros</CardTitle>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{total}</div>
          <p className="text-xs text-gray-400">Contagem total cadastrada</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Receita Mensal</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyRevenue)}
          </div>
          <p className="text-xs text-gray-400">Estimativa baseada em publicados</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Eventos Ativos</CardTitle>
          <Calendar className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{eventosAtivos}</div>
          <p className="text-xs text-gray-400">Este mês</p>
        </CardContent>
      </Card>
    </div>
  )
}
