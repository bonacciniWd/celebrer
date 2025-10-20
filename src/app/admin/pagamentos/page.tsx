import { supabaseAdmin } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CreditCard, DollarSign, Clock } from 'lucide-react'

type SearchParams = {
  status?: 'all' | 'pending' | 'completed'
  type?: 'all' | 'fornecedor' | 'espaco'
}

type PaymentRow = {
  id: number
  partner_id: number
  amount: number | null
  status: string
  payment_date: string | null
  created_at: string | null
}

type PartnerInfo = {
  id: number
  name: string
  email?: string | null
  partner_type?: string | null
}

function formatCurrency(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

export default async function PagamentosPage({ searchParams }: { searchParams?: SearchParams | Promise<SearchParams> }) {
  const sp = (await Promise.resolve(searchParams)) as SearchParams | undefined
  const statusFilter = (sp?.status || 'all') as 'all' | 'pending' | 'completed'
  const typeFilter = (sp?.type || 'all') as 'all' | 'fornecedor' | 'espaco'

  // Fetch payments
  const { data: payments } = await supabaseAdmin
    .from('payments')
    .select('id, partner_id, amount, status, payment_date, created_at')
    .order('created_at', { ascending: false })

  // Edge case
  const rows: PaymentRow[] = (payments as PaymentRow[]) || []

  // Build partner map
  const partnerIds = Array.from(new Set(rows.map((r: PaymentRow) => r.partner_id).filter(Boolean))) as number[]
  let partnerMap = new Map<number, { name: string; email?: string | null; partner_type?: string | null }>()
  if (partnerIds.length) {
    const { data: partnersInfo } = await supabaseAdmin
      .from('partners')
      .select('id, name, email, partner_type')
      .in('id', partnerIds)
    ;(partnersInfo as PartnerInfo[] | null)?.forEach((p: PartnerInfo) => partnerMap.set(p.id, { name: p.name, email: p.email || null, partner_type: p.partner_type || null }))
  }

  // Summary metrics
  const completed = rows.filter((r: PaymentRow) => r.status === 'completed')
  const pending = rows.filter((r: PaymentRow) => r.status === 'pending')
  const totalReceived = completed.reduce((sum: number, r: PaymentRow) => sum + (r.amount || 0), 0)
  const totalPending = pending.reduce((sum: number, r: PaymentRow) => sum + (r.amount || 0), 0)

  // Active licenses count (partners approved and paid)
  const { count: activeLicenses } = await supabaseAdmin
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)
    .eq('paid', true)

  // Apply filters
  const filteredByStatus: PaymentRow[] = statusFilter === 'all' ? rows : rows.filter((r: PaymentRow) => r.status === statusFilter)
  const filtered: PaymentRow[] = filteredByStatus.filter((r: PaymentRow) => {
    if (typeFilter === 'all') return true
    const p = partnerMap.get(r.partner_id)
    return p?.partner_type === typeFilter
  })

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Pagamentos</h1>
        <p className="text-gray-300">Licenças de parceiros (assinaturas)</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Recebido</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalReceived)}</div>
            <p className="text-xs text-gray-400">Pagamentos concluídos</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pending.length} • {formatCurrency(totalPending)}</div>
            <p className="text-xs text-gray-400">Aguardando confirmação</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Licenças Ativas</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeLicenses || 0}</div>
            <p className="text-xs text-gray-400">Parceiros aprovados e pagos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter links */}
      <div className="flex gap-2 flex-wrap">
        <a href="/admin/pagamentos?status=all" className={`text-sm px-3 py-1 rounded ${statusFilter==='all' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Todos</a>
        <a href="/admin/pagamentos?status=pending" className={`text-sm px-3 py-1 rounded ${statusFilter==='pending' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Pendentes</a>
        <a href="/admin/pagamentos?status=completed" className={`text-sm px-3 py-1 rounded ${statusFilter==='completed' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Concluídos</a>
        <span className="mx-2 text-gray-500 select-none">•</span>
        <a href={`/admin/pagamentos?status=${statusFilter}&type=all`} className={`text-sm px-3 py-1 rounded ${typeFilter==='all' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Todos os tipos</a>
        <a href={`/admin/pagamentos?status=${statusFilter}&type=fornecedor`} className={`text-sm px-3 py-1 rounded ${typeFilter==='fornecedor' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Fornecedores</a>
        <a href={`/admin/pagamentos?status=${statusFilter}&type=espaco`} className={`text-sm px-3 py-1 rounded ${typeFilter==='espaco' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>Espaços</a>
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-gray-300">Parceiro</TableHead>
              <TableHead className="text-gray-300">Tipo</TableHead>
              <TableHead className="text-gray-300">Valor</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Criado em</TableHead>
              <TableHead className="text-gray-300">Pago em</TableHead>
              <TableHead className="text-gray-300 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p: PaymentRow) => {
              const partner = partnerMap.get(p.partner_id)
              const statusBadge = p.status === 'completed' ? (
                <Badge className="bg-emerald-600 text-white">Concluído</Badge>
              ) : p.status === 'pending' ? (
                <Badge className="bg-amber-600 text-white">Pendente</Badge>
              ) : (
                <Badge className="bg-gray-600 text-white">{p.status}</Badge>
              )
              return (
                <TableRow key={p.id} className="hover:bg-gray-800/50">
                  <TableCell className="text-white">{partner?.name || 'Desconhecido'}</TableCell>
                  <TableCell>
                    {partner?.partner_type ? (
                      partner.partner_type === 'fornecedor' ? (
                        <Badge className="bg-blue-600 text-white capitalize">{partner.partner_type}</Badge>
                      ) : partner.partner_type === 'espaco' ? (
                        <Badge className="bg-purple-600 text-white capitalize">{partner.partner_type}</Badge>
                      ) : (
                        <Badge className="bg-gray-600 text-white capitalize">{partner.partner_type}</Badge>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white">{formatCurrency(p.amount || 0)}</TableCell>
                  <TableCell>{statusBadge}</TableCell>
                  <TableCell className="text-gray-300">{p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : '-'}</TableCell>
                  <TableCell className="text-gray-300">{p.payment_date ? new Date(p.payment_date).toLocaleString('pt-BR') : '-'}</TableCell>
                  <TableCell className="text-right">
                    <a className="text-sm text-blue-400 hover:underline" href={`/admin/parceiros`}>Ver parceiros</a>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400 py-6">Nenhum pagamento encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}