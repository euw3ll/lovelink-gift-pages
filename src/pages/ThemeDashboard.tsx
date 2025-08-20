import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeDashboardForm, { ThemeType } from "@/components/ui/theme-templates/theme-dashboard";

interface ThemeInfo {
  id: ThemeType;
  name: string;
  description: string;
  color: string;
  emoji: string;
}

const themes: ThemeInfo[] = [
  {
    id: "netflix",
    name: "Netflix & Chill",
    description: "Crie sua própria série romântica",
    color: "from-red-600 to-red-800",
    emoji: "🎬",
  },
  {
    id: "spotify",
    name: "Spotify Love",
    description: "Playlist dos seus momentos juntos",
    color: "from-green-500 to-green-700",
    emoji: "🎵",
  },
  {
    id: "polaroid",
    name: "Álbum Polaroid",
    description: "Memórias em fotos vintage",
    color: "from-amber-400 to-orange-500",
    emoji: "📸",
  },
  {
    id: "instagram",
    name: "Instagram Stories",
    description: "Stories que ficam para sempre",
    color: "from-purple-500 to-pink-500",
    emoji: "📱",
  },
  {
    id: "love-letter",
    name: "Carta de Amor",
    description: "Elegância clássica e atemporal",
    color: "from-rose-400 to-pink-600",
    emoji: "💌",
  },
  {
    id: "love-map",
    name: "Mapa do Amor",
    description: "Lugares especiais da relação",
    color: "from-blue-500 to-cyan-500",
    emoji: "🗺️",
  },
];

const ThemeDashboardPage = () => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  if (selectedTheme) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <Button variant="outline" onClick={() => setSelectedTheme(null)}>
          Voltar
        </Button>
        <ThemeDashboardForm theme={selectedTheme} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Escolha um Tema</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <Card
            key={theme.id}
            className="group overflow-hidden hover:shadow-[var(--shadow-love)] transition-all duration-500 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30"
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
                <p className="text-muted-foreground text-sm">{theme.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeDashboardPage;

