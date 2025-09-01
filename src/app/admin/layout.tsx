"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Home, Images, MessageSquare, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/admin"><Home /><span>Dashboard</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Messages">
                 <Link href="/admin/messages"><MessageSquare /><span>Messages</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Galerie">
                <Link href="/admin/gallery"><Images /><span>Galerie</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Boutique">
                <Link href="/admin/shop"><ShoppingCart /><span>Boutique</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} asChild tooltip="Déconnexion">
                <Link href="#"><LogOut /><span>Déconnexion</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="md:hidden mb-4">
                <SidebarTrigger/>
            </div>
            {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
