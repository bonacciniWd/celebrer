"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  ClipboardListIcon,
  FileTextIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  UserCheckIcon,
  CreditCardIcon,
  BuildingIcon,
  CalendarIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin Celebrer",
    email: "admin@celebrer.com",
    avatar: "/logo.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Parceiros",
      url: "/admin/parceiros",
      icon: UsersIcon,
    },
    {
      title: "Aprovações",
      url: "/admin/aprovacoes",
      icon: UserCheckIcon,
    },
    {
      title: "Pagamentos",
      url: "/admin/pagamentos",
      icon: CreditCardIcon,
    },
    {
      title: "Relatórios",
      url: "/admin/relatorios",
      icon: BarChartIcon,
    },
    {
      title: "Eventos",
      url: "/admin/eventos",
      icon: CalendarIcon,
    },
    {
      title: "Fornecedores",
      url: "/admin/fornecedores",
      icon: BuildingIcon,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/admin/configuracoes",
      icon: SettingsIcon,
    },
    {
      title: "Ajuda",
      url: "/admin/ajuda",
      icon: HelpCircleIcon,
    },
    {
      title: "Buscar",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Documentos",
      url: "/admin/documentos",
      icon: FileTextIcon,
    },
    {
      name: "Relatórios",
      url: "/admin/relatorios",
      icon: ClipboardListIcon,
    },
  ],
}

type AdminSidebarProps = React.ComponentProps<typeof Sidebar> & {
  renderInSheet?: boolean
}

export function AdminSidebar({ renderInSheet = false, ...props }: AdminSidebarProps) {
  const [userInfo, setUserInfo] = useState(data.user)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session && mounted) {
        setUserInfo({
          name: session.user.user_metadata?.name || data.user.name,
          email: session.user.email || data.user.email,
          avatar: data.user.avatar,
        })
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  if (renderInSheet) {
    // Inline rendering for mobile Sheet to avoid nested Sheet components.
    return (
      <div className="flex h-full w-full flex-col bg-gray-900">
        <div className="bg-gray-800 border-b border-gray-700 p-2">
          <a href="/admin" className="flex items-center gap-2 text-white hover:text-gray-200">
            <ArrowUpCircleIcon className="h-5 w-5" />
            <span className="text-base font-semibold">Celebrer Admin</span>
          </a>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-900">
          <NavMain items={data.navMain} showQuickCreate={false} />
        </div>
        <div className="bg-gray-800 border-t border-gray-700">
          <div className="px-2 py-2">
            <NavSecondary items={data.navSecondary} />
          </div>
          <NavUser user={userInfo} />
        </div>
      </div>
    )
  }

  return (
    <Sidebar collapsible="offcanvas" className="bg-gray-900 border-r border-gray-700" {...props}>
      <SidebarHeader className="bg-gray-800 border-b border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 text-white hover:bg-gray-700"
            >
              <a href="/admin">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Celebrer Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
  <NavMain items={data.navMain} showQuickCreate={false} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-gray-800 border-t border-gray-700">
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  )
}
