"use client"

import { Bell, Menu, Search } from "lucide-react"
import { usePathname } from "next/navigation"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin-sidebar"

const getTitleFromPath = (path: string) => {
  const pathMap: { [key: string]: string } = {
    '/admin': 'Dashboard',
    '/admin/parceiros': 'Parceiros',
    '/admin/aprovacoes': 'Aprovações',
    '/admin/pagamentos': 'Pagamentos',
    '/admin/relatorios': 'Relatórios',
    '/admin/eventos': 'Eventos',
    '/admin/fornecedores': 'Fornecedores',
    '/admin/configuracoes': 'Configurações',
    '/admin/ajuda': 'Ajuda'
  }
  return pathMap[path] || 'Admin'
}

export function AdminHeader() {
  const pathname = usePathname() ?? "/admin"
  const title = getTitleFromPath(pathname)
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-2 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden text-white hover:bg-gray-700">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0 bg-gray-900">
            {/* Visually hidden title/description for accessibility to satisfy Radix Dialog requirements */}
            <SheetHeader className="sr-only">
              <SheetTitle>Menu de navegação</SheetTitle>
              <SheetDescription>Lista de seções do painel administrativo.</SheetDescription>
            </SheetHeader>
            <AdminSidebar renderInSheet />
          </SheetContent>
        </Sheet>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin" className="text-gray-300 hover:text-white">
                Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block text-gray-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">
                {title}
              </BreadcrumbPage>
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
