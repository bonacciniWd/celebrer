export interface DashboardMetrics {
  totalPartners: number
  pendingApprovals: number
  monthlyRevenue: number
  activeEvents: number
  activePartners: number
  newRegistrations: number
  approvalRate: number
  pendingPayments: number
  activeSuppliers: number
}

export type ActivityType = 'approval' | 'payment' | 'registration'
export type ActivityStatus = 'pending' | 'completed' | 'failed'

export interface DashboardActivity {
  id: string
  type: ActivityType
  partnerName: string
  date: string
  status: ActivityStatus
}

export interface DashboardData {
  metrics: DashboardMetrics
  recentActivity: DashboardActivity[]
}