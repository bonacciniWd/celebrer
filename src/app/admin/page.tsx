import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Building, Home } from "lucide-react"
import AdminTopCards from '@/components/admin/AdminTopCards'
import AdminTopCardsSkeleton from '@/components/admin/AdminTopCards.skeleton'
import AdminOverview from '@/components/admin/AdminOverview'
import AdminOverviewSkeleton from '@/components/admin/AdminOverview.skeleton'
import AdminRecentActivity from '@/components/admin/AdminRecentActivity'
import AdminRecentActivitySkeleton from '@/components/admin/AdminRecentActivity.skeleton'
import AdminQuickActions from '@/components/admin/AdminQuickActions'
import AdminQuickActionsSkeleton from '@/components/admin/AdminQuickActions.skeleton'
import { Suspense } from 'react'

export default async function AdminDashboard() {

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-300">
          Visão geral da plataforma Celebrer
        </p>
      </div>

      {/* Cards principais com Suspense */}
      <Suspense fallback={<AdminTopCardsSkeleton />}>
        <AdminTopCards />
      </Suspense>

      {/* Seção de estatísticas (pode ganhar Suspense em blocos futuros) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Suspense fallback={<AdminOverviewSkeleton />}>
          <AdminOverview />
        </Suspense>
        <Suspense fallback={<AdminRecentActivitySkeleton />}>
          <AdminRecentActivity />
        </Suspense>
      </div>

      {/* Ações rápidas */}
      <Suspense fallback={<AdminQuickActionsSkeleton />}>
        <AdminQuickActions />
      </Suspense>
    </div>
  )
}
