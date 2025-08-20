import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Upload, Sparkles } from "lucide-react";
import NetflixTheme from "./theme-templates/netflix-theme";
import SpotifyTheme from "./theme-templates/spotify-theme";
import PolaroidTheme from "./theme-templates/polaroid-theme";
import InstagramTheme from "./theme-templates/instagram-theme";
import LoveLetterTheme from "./theme-templates/love-letter-theme";
import LoveMapTheme from "./theme-templates/love-map-theme";

const InteractivePreview = () => {
  const [previewData, setPreviewData] = useState({
    name1: "",
    name2: "",
    selectedTheme: "netflix",
    uploadedImage: null as string | null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setPreviewData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewData(prev => ({ 
          ...prev, 
          uploadedImage: e.target?.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderThemePreview = () => {
    const themeProps = {
      name1: previewData.name1,
      name2: previewData.name2,
      coverImage: previewData.uploadedImage
    };

    switch (previewData.selectedTheme) {
      case "netflix":
        return <NetflixTheme {...themeProps} />;
      case "spotify":
        return <SpotifyTheme {...themeProps} />;
      case "polaroid":
        return <PolaroidTheme {...themeProps} />;
      case "instagram":
        return <InstagramTheme {...themeProps} />;
      case "love-letter":
        return <LoveLetterTheme {...themeProps} />;
      case "love-map":
        return <LoveMapTheme {...themeProps} />;
      default:
        return <NetflixTheme {...themeProps} />;
    }
  };

  return (
    <section id="preview" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Teste{" "}
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Agora Mesmo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como fica incrível! Digite seus nomes e faça upload de uma foto para visualizar a mágica
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center animate-fade-in">
          {/* Input Form */}
          <Card className="border-border/50 shadow-[var(--shadow-soft)] hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Sparkles className="text-primary" size={24} />
                Personalizar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name1">Seu nome</Label>
                  <Input
                    id="name1"
                    placeholder="Digite seu nome"
                    value={previewData.name1}
                    onChange={(e) => handleInputChange("name1", e.target.value)}
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name2">Nome da pessoa amada</Label>
                  <Input
                    id="name2"
                    placeholder="Nome especial"
                    value={previewData.name2}
                    onChange={(e) => handleInputChange("name2", e.target.value)}
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme-select">Escolha o tema</Label>
                <Select value={previewData.selectedTheme} onValueChange={(value) => handleInputChange("selectedTheme", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="netflix">Netflix & Chill</SelectItem>
                    <SelectItem value="spotify">Spotify Love</SelectItem>
                    <SelectItem value="polaroid">Álbum Polaroid</SelectItem>
                    <SelectItem value="instagram">Instagram Stories</SelectItem>
                    <SelectItem value="love-letter">Carta de Amor</SelectItem>
                    <SelectItem value="love-map">Mapa do Amor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Foto do casal</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div 
                  className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-lg p-8 text-center cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" size={32} />
                  <p className="text-muted-foreground group-hover:text-primary transition-colors">
                    {previewData.uploadedImage ? "Foto carregada! Clique para trocar" : "Clique para fazer upload da foto"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG até 5MB
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-[var(--shadow-love)]"
                size="lg"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="mr-2" size={18} />
                Quero esse!
              </Button>
            </CardContent>
          </Card>

          {/* Preview Mockup */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-gradient-to-br from-love-subtle to-pink-100 rounded-3xl p-4 shadow-[var(--shadow-soft)] relative overflow-hidden hover:shadow-[var(--shadow-love)] transition-shadow duration-500">
              {/* Theme Preview */}
              <div className="w-full max-w-md mx-auto overflow-hidden">
                <div className="scale-90 origin-top">
                  {renderThemePreview()}
                </div>
              </div>

              {/* Floating decorations */}
              <div className="absolute top-4 right-4 text-primary/30 animate-pulse">
                <Heart size={20} />
              </div>
              <div className="absolute bottom-4 left-4 text-pink-400/30 animate-bounce">
                <Sparkles size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePreview;