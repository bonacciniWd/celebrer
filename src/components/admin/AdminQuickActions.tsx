import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Building, Home } from "lucide-react"
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminQuickActions() {
  const { data: partners } = await supabaseAdmin.from('partners').select('*')
  type Partner = { approved: boolean | null; paid?: boolean | null; partner_type?: string | null }
  const list = (partners || []) as Partner[]
  const aprovadosAguardandoPagamento = list.filter(p => p.approved === true && !p.paid).length
  const fornecedoresPublicados = list.filter(p => p.approved === true && p.paid && p.partner_type === 'fornecedor').length
  const espacosPublicados = list.filter(p => p.approved === true && p.paid && p.partner_type === 'espaco').length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Pagamentos</CardTitle>
          <CreditCard className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{aprovadosAguardandoPagamento}</div>
          <p className="text-xs text-gray-400">Aprovados aguardando pagamento</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Fornecedores</CardTitle>
          <Building className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{fornecedoresPublicados}</div>
          <p className="text-xs text-gray-400">Fornecedores ativos (publicados)</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Espaços</CardTitle>
          <Home className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{espacosPublicados}</div>
          <p className="text-xs text-gray-400">Espaços ativos (publicados)</p>
        </CardContent>
      </Card>
    </div>
  )
}
