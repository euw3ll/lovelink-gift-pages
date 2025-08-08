import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";

const ThemeGallery = () => {
  const themes = [
    {
      name: "Netflix & Chill",
      description: "Crie sua própria série romântica",
      color: "from-red-600 to-red-800",
      emoji: "🎬"
    },
    {
      name: "Spotify Love",
      description: "Playlist dos seus momentos juntos",
      color: "from-green-500 to-green-700",
      emoji: "🎵"
    },
    {
      name: "Álbum Polaroid",
      description: "Memórias em fotos vintage",
      color: "from-amber-400 to-orange-500",
      emoji: "📸"
    },
    {
      name: "Instagram Stories",
      description: "Stories que ficam para sempre",
      color: "from-purple-500 to-pink-500",
      emoji: "📱"
    },
    {
      name: "Carta de Amor",
      description: "Elegância clássica e atemporal",
      color: "from-rose-400 to-pink-600",
      emoji: "💌"
    },
    {
      name: "Mapa do Amor",
      description: "Lugares especiais da relação",
      color: "from-blue-500 to-cyan-500",
      emoji: "🗺️"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-love-subtle/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Temas{" "}
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Incríveis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha entre diversos temas únicos e criativos para deixar sua surpresa ainda mais especial
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {themes.map((theme, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:shadow-[var(--shadow-love)] transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30"
            >
              <CardContent className="p-0">
                {/* Theme Preview */}
                <div className={`h-40 bg-gradient-to-br ${theme.color} relative flex items-center justify-center text-white overflow-hidden`}>
                  <div className="text-6xl">{theme.emoji}</div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Eye size={16} />
                      Preview
                    </Button>
                  </div>

                  {/* Floating hearts */}
                  <Heart className="absolute top-4 right-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" size={20} />
                </div>

                {/* Theme Info */}
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

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-love-subtle px-8 py-6 rounded-full"
          >
            Ver Todos os Temas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThemeGallery;