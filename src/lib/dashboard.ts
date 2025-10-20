import { supabase } from './supabase'
import { DashboardData, ActivityType, ActivityStatus } from '@/types/dashboard'

export async function getDashboardData(): Promise<DashboardData> {
  // Get all partners first
  const { data: partners } = await supabase
    .from('partners')
    .select('*')

  if (!partners) return {
    metrics: {
      totalPartners: 0,
      pendingApprovals: 0,
      monthlyRevenue: 0,
      activeEvents: 0,
      activePartners: 0,
      newRegistrations: 0,
      approvalRate: 0,
      pendingPayments: 0,
      activeSuppliers: 0
    },
    recentActivity: []
  }

  // Calculate metrics using the same logic as admin/parceiros
  const stats = {
    total: partners.length,
    pendentes: partners.filter(p => !p.approved || !p.paid).length,
    aprovados: partners.filter(p => p.approved && !p.paid).length,
    publicados: partners.filter(p => p.approved && p.paid).length,
  }

  // Get active partners (approved and paid)
  const { count: activePartners } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)
    .eq('paid', true)

  // Get new registrations (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const { count: newRegistrations } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString())

  // Calculate approval rate
  const { count: totalProcessed } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .not('approved', 'is', null)

  const { count: approvedCount } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)
  
  const approvalRate = totalProcessed && approvedCount ? (approvedCount / totalProcessed) * 100 : 0

  // Get active suppliers
  const { count: activeSuppliers } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)
    .eq('paid', true)
    .eq('partner_type', 'fornecedor')

  // Get pending payments
  const { count: pendingPayments } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true)
    .eq('paid', false)

  // Get active events
  const { count: activeEvents } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // Calculate monthly revenue
  const currentDate = new Date()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  const { data: monthlyPayments } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'completed')
    .gte('payment_date', firstDayOfMonth.toISOString())
    .lte('payment_date', lastDayOfMonth.toISOString())

  const monthlyRevenue = monthlyPayments?.reduce((acc, payment) => acc + Number(payment.amount), 0) || 0

  // Get recent activities using the most recent partners
  const recentActivity = partners
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(partner => ({
      id: partner.id.toString(),
      type: !partner.approved ? 'approval' : (partner.approved && !partner.paid ? 'payment' : 'registration') as ActivityType,
      partnerName: partner.name,
      date: partner.created_at,
      status: !partner.approved || (partner.approved && !partner.paid) ? 'pending' : 'completed' as ActivityStatus
    }))

  return {
    metrics: {
      totalPartners: stats.total,
      pendingApprovals: stats.pendentes,
      monthlyRevenue,
      activeEvents: activeEvents || 0,
      activePartners: stats.publicados,
      newRegistrations: newRegistrations || 0,
      approvalRate,
      pendingPayments: pendingPayments || 0,
      activeSuppliers: activeSuppliers || 0
    },
    recentActivity
  }
}