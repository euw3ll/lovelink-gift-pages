// src/pages/ThemeDashboard.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeForm from "@/components/ui/ThemeForm"; // CORREÇÃO AQUI
import { ThemeType, themeRegistry, ThemeConfig } from "@/lib/themes"; // CORREÇÃO AQUI
import { ThemeData } from "@/components/ui/theme-templates/types";

interface ThemeInfo {
  id: ThemeType;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

// CORREÇÃO AQUI: Adicionamos a tipagem [string, ThemeConfig] para o 'config'
const themes: ThemeInfo[] = Object.entries(themeRegistry).map(
  ([id, config]: [string, ThemeConfig]) => ({
    id: id as ThemeType,
    name: config.name,
    description: config.description,
    color: "from-gray-400 to-gray-600",
    emoji: "✨",
  })
);

const ThemeDashboardPage = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleFormSubmit = async (data: ThemeData) => {
    const token = localStorage.getItem("token");
    if (!token || !selectedTheme) {
      navigate("/login");
      return;
    }
    const dataWithTitle = data as Record<string, unknown> & { bannerTitle?: string };
    const title =
      dataWithTitle.bannerTitle || themeRegistry[selectedTheme].name;
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, theme: selectedTheme, data }),
      });
      if (!res.ok) {
        throw new Error("Falha ao salvar página");
      }
      navigate("/dashboard/my-pages");
    } catch (err) {
      console.error(err);
    }
  };

  if (selectedTheme) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <Button variant="outline" onClick={() => setSelectedTheme(null)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a seleção de temas
        </Button>
        <ThemeForm theme={selectedTheme} onSubmit={handleFormSubmit} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-2">Criar Nova Página</h1>
      <p className="text-muted-foreground text-center mb-8">
        Primeiro, escolha um tema para começar.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <Card
            key={theme.id}
            className="group overflow-hidden hover:shadow-[var(--shadow-love)] transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <CardContent className="p-0">
              <div
                className={`h-40 bg-gradient-to-br ${theme.color} relative flex items-center justify-center text-white overflow-hidden`}
              >
                <div className="text-6xl">{theme.emoji}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {theme.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {theme.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeDashboardPage;
