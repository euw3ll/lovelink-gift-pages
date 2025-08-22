import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  FileText,
  LogOut,
  Heart,
  ChevronDown,
  User,
  CreditCard, // Ícone importado
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Início";
      case "/dashboard/my-pages":
        return "Minhas Páginas";
      case "/dashboard/themes":
        return "Criar Nova Página";
      case "/dashboard/subscription": // Título para a nova página
        return "Minha Assinatura";
      default:
        // Lógica para título dinâmico de analytics
        if (location.pathname.includes("/analytics")) {
          return "Analytics da Página";
        }
        return "Dashboard";
    }
  };

  const userInitial =
    localStorage.getItem("user_email")?.[0]?.toUpperCase() ?? "U";

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              LoveLink
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/dashboard"}
              >
                <Link to="/dashboard">
                  <Home />
                  Início
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/dashboard/my-pages"}
              >
                <Link to="/dashboard/my-pages">
                  <FileText />
                  Minhas Páginas
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* NOVO LINK ADICIONADO ABAIXO */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/dashboard/subscription"}
              >
                <Link to="/dashboard/subscription">
                  <CreditCard />
                  Minha Assinatura
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                Sair
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Usuário</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    email@exemplo.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
