import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
  BarChart2,
  FileText,
} from "lucide-react"; // Ícone importado
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator, // Separador adicionado para organização
} from "@/components/ui/dropdown-menu";

import { themeRegistry, ThemeType } from "@/lib/themes";

interface Page {
  id: string;
  title: string;
  theme: ThemeType;
  created_at: string;
  views: number;
}

const themeEmojis: Record<ThemeType, string> = {
  netflix: "🎬",
  spotify: "🎵",
  instagram: "📸",
  polaroid: "📸",
  "love-letter": "💌",
  "love-map": "🗺️",
};

const MyPages = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("/api/pages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPages(data))
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Minhas Páginas</h2>
          <p className="text-muted-foreground">
            Gerencie todas as suas criações em um só lugar.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/themes")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Nova Página
        </Button>
      </div>

      {pages.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id} className="flex flex-col">
              <CardHeader className="p-0 relative">
                <div className="aspect-video w-full bg-muted rounded-t-lg flex items-center justify-center">
                  <span className="text-5xl">{themeEmojis[page.theme]}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <Badge variant="secondary" className="mb-2">
                  {themeRegistry[page.theme].name}
                </Badge>
                <CardTitle className="text-lg mb-1">{page.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Criado em: {new Date(page.created_at).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Visualizações: {page.views}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="mr-2 h-4 w-4" /> Visualizar
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => navigate(`/dashboard/page/${page.id}/analytics`)}
                    >
                      <BarChart2 className="mr-2 h-4 w-4" /> Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Gerenciar página
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">
            Nenhuma página criada ainda
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Que tal criar seu primeiro presente digital agora?
          </p>
          <Button
            className="mt-6"
            onClick={() => navigate("/dashboard/themes")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Minha Primeira Página
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyPages;
