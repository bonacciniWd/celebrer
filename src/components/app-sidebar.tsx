"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  CreditCardIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
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
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/painel",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Configurações",
      url: "/painel/configuracoes",
      icon: SettingsIcon,
    },
    {
      title: "Pagamentos",
      url: "/painel/pagamentos",
      icon: CreditCardIcon,
    },
    {
      title: "Eventos",
      url: "/painel/eventos",
      icon: ListIcon,
    },
    {
      title: "Fornecedores",
      url: "/painel/fornecedores",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "Ajuda",
      url: "/painel/ajuda",
      icon: HelpCircleIcon,
    },
    {
      title: "Pesquisar",
      url: "/fornecedores",
      icon: SearchIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userInfo, setUserInfo] = useState(data.user)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      try {
        const token = session.access_token
        const res = await fetch(`/api/partner/profile?ts=${Date.now()}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
        const json = await res.json()
        const partner = json?.partner
        if (!mounted) return
        setUserInfo({
          name: partner?.name || session.user.user_metadata?.name || data.user.name,
          email: session.user.email || data.user.email,
          avatar: partner?.profile_image || partner?.cover_image || data.user.avatar,
        })
      } catch {
        // fallback to auth metadata
        if (!mounted) return
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

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/painel">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Celebrer Painel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} showQuickCreate={false} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  )
}
