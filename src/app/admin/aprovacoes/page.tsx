import { supabaseAdmin } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import ApprovalsTable from '@/components/admin-approvals-table'

export default async function ApprovacoesPage() {
  const { data: pendingPartners } = await supabaseAdmin
    .from('partners')
    .select('id, name, email, partner_type, created_at')
    .is('approved', null)
    .order('created_at', { ascending: false })

  const pending = pendingPartners || []

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Aprovações</h1>
        <p className="text-gray-300">Gerenciar aprovações de parceiros</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Pendentes ({pending.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ApprovalsTable partners={pending} />
        </CardContent>
      </Card>
    </div>
  )
}