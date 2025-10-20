import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AdminProtected from "@/components/admin-protected"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProtected>
      <div className="admin-layout min-h-screen overflow-hidden">
        <SidebarProvider>
        <AdminSidebar variant="sidebar" />
        <SidebarInset className="sidebar-inset border-0">
          <AdminHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    </AdminProtected>
  )
}
