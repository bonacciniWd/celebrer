"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const pathname = usePathname()
            const isActive = pathname === item.url

            // Se a URL for "#", significa que é uma ação, não uma navegação
            const Component = item.url === "#" ? "button" : Link
            const componentProps = item.url === "#" ? {} : { href: item.url }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Component
                    {...componentProps}
                    className={`
                      text-gray-300 hover:text-white hover:bg-gray-700
                      ${isActive ? 'text-white bg-gray-700' : ''}
                    `}
                  >
                    <item.icon className={isActive ? 'text-white' : 'text-gray-400'} />
                    <span className={isActive ? 'text-white' : 'text-gray-300'}>{item.title}</span>
                  </Component>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
