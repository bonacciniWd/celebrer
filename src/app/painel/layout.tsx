import PartnerProtected from '@/components/partner-protected'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { PainelHeader } from '@/components/painel-header'

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <PartnerProtected>
      <div className="dark min-h-screen bg-gray-900 text-white overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-slate-900">
            <div className="flex flex-1 flex-col">
              <PainelHeader />
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </PartnerProtected>
  )
}
