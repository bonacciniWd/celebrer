"use client"

import { Menu, Bell, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

const getTitleFromPath = (path: string) => {
  const map: Record<string, string> = {
    "/painel": "Dashboard",
    "/painel/configuracoes": "Configurações",
    "/painel/pagamentos": "Pagamentos",
    "/painel/eventos": "Eventos",
    "/painel/fornecedores": "Fornecedores",
    "/painel/ajuda": "Ajuda",
  }
  return map[path] || "Painel"
}

export function PainelHeader() {
  const pathname = usePathname() ?? "/painel"
  const title = getTitleFromPath(pathname)
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="md:hidden text-white hover:bg-gray-700" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/painel" className="text-gray-300 hover:text-white">
                Painel
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block text-gray-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <div className="relative flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full rounded-lg bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pl-8 md:w-[200px] lg:w-[320px] focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notificações</span>
        </Button>
      </div>
    </header>
  )
}
