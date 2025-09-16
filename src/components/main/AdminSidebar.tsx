"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Handshake, 
  BookOpen, 
  Camera, 
  FileText, 
  Users, 
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "../../../public/favicon.ico"

const adminMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "LPK Management", url: "/admin/lpk", icon: Building2 },
  { title: "Partnership Management", url: "/admin/partnerships", icon: Handshake },
  { title: "Training Management", url: "/admin/training", icon: BookOpen },
  { title: "Documentation Management", url: "/admin/documentation", icon: Camera },
  { title: "Curriculum Management", url: "/admin/curriculum", icon: FileText },
  { title: "Widyaiswara Management", url: "/admin/widyaiswara", icon: Users },
];
import Image from "next/image";

export function AdminSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => pathname === path;

  const getNavCls = (active: boolean) =>
    active
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
     
      <div className="flex h-14 items-center border-b px-4">
        <SidebarTrigger className="mr-2" />
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Image width={30} height={30} alt="logo" src={Logo}> 

            </Image>
            <span className="font-semibold text-foreground">Admin Panel</span>
          </div>
        )}
      </div>


      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={getNavCls(isActive(item.url))}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menu System */}
      </SidebarContent>
    </Sidebar>
  );
}
