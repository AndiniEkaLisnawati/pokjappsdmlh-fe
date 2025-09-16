"use client"

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/main/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full justify-end">
        <AdminSidebar />

        <ContentArea>
          <Header />
          <main className="flex-1 p-6 bg-muted/30 overflow-auto">{children}</main>
        </ContentArea>
      </div>
    </SidebarProvider>
  );
}

function ContentArea({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();

  return (
    <div
      className={`flex flex-col transition-all duration-300`}
      style={{
        width: state === "collapsed" ? "calc(100% - 3.5rem)" : "calc(100% - 16rem)",
      }}
    >
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-foreground">POKJA PPSDMLH</h2>
        <Badge variant="secondary">Admin Panel</Badge>
      </div>

      <div className="flex items-center space-x-4">
    
      
        <Link href={"/"}>
        <Button variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
         </Link>
      </div>
    </header>
  );
}
