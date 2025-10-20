import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminRecentActivity() {
  const { data: partners } = await supabaseAdmin.from('partners').select('*')
  type Partner = { id: number; name: string; approved: boolean | null; paid?: boolean | null; created_at: string }
  const sorted = (partners as Partner[] | null)?.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || []
  const recentActivity = sorted.slice(0, 5).map((partner) => ({
    id: partner.id.toString(),
    type: !partner.approved ? 'approval' : (partner.approved && !partner.paid ? 'payment' : 'registration'),
    partnerName: partner.name,
    date: partner.created_at,
    status: !partner.approved || (partner.approved && !partner.paid) ? 'pending' : 'completed'
  }))

  return (
    <Card className="col-span-3 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Atividade Recente</CardTitle>
        <CardDescription className="text-gray-400">Últimas ações realizadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'completed' 
                  ? 'bg-green-500' 
                  : activity.status === 'pending' 
                    ? 'bg-yellow-500' 
                    : 'bg-blue-500'
              }`}></div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">
                  {activity.type === 'approval' 
                    ? activity.status === 'completed' 
                      ? 'Novo parceiro aprovado'
                      : 'Aguardando aprovação'
                    : activity.type === 'payment'
                      ? 'Pagamento confirmado'
                      : 'Novo cadastro'}
                </p>
                <p className="text-xs text-gray-400">{activity.partnerName}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
