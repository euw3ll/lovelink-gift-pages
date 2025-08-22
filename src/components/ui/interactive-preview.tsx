// src/components/ui/interactive-preview.tsx

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Upload, Sparkles } from "lucide-react";
import { ThemeType } from "@/lib/themes";

// CORREÇÃO: Importando todos os novos componentes de PREVIEW
import NetflixPreview from "./theme-previews/NetflixPreview";
import SpotifyPreview from "./theme-previews/SpotifyPreview";
import PolaroidPreview from "./theme-previews/PolaroidPreview";
import InstagramPreview from "./theme-previews/InstagramPreview";
import LoveLetterPreview from "./theme-previews/LoveLetterPreview";
import LoveMapPreview from "./theme-previews/LoveMapPreview";

const InteractivePreview = () => {
  const [previewData, setPreviewData] = useState({
    name1: "",
    name2: "",
    selectedTheme: "netflix" as ThemeType,
    uploadedImage: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (value: ThemeType) => {
    setPreviewData((prev) => ({ ...prev, selectedTheme: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewData((prev) => ({
          ...prev,
          uploadedImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderThemePreview = () => {
    // Agora passamos as props simples diretamente para cada preview
    const props = {
      name1: previewData.name1,
      name2: previewData.name2,
      uploadedImage: previewData.uploadedImage,
    };

    switch (previewData.selectedTheme) {
      case "netflix":
        return <NetflixPreview {...props} />;
      case "spotify":
        return <SpotifyPreview {...props} />;
      case "polaroid":
        return <PolaroidPreview {...props} />;
      case "instagram":
        return <InstagramPreview {...props} />;
      case "love-letter":
        return <LoveLetterPreview {...props} />;
      case "love-map":
        return <LoveMapPreview {...props} />;
      default:
        return <div>Selecione um tema</div>;
    }
  };

  return (
    <section id="preview" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Teste Agora Mesmo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como fica incrível! Digite seus nomes e faça upload de uma foto
            para visualizar a mágica
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          <Card className="border-border/50">
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
                    placeholder="Ex: João"
                    value={previewData.name1}
                    onChange={(e) => handleInputChange("name1", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name2">Nome da pessoa amada</Label>
                  <Input
                    id="name2"
                    placeholder="Ex: Maria"
                    value={previewData.name2}
                    onChange={(e) => handleInputChange("name2", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme-select">Escolha o tema</Label>
                <Select
                  value={previewData.selectedTheme}
                  onValueChange={handleThemeChange}
                >
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
                  className="border-2 border-dashed border-border hover:border-primary/50 p-8 text-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload
                    className="mx-auto mb-4 text-muted-foreground"
                    size={32}
                  />
                  <p className="text-muted-foreground">
                    {previewData.uploadedImage
                      ? "Foto carregada!"
                      : "Clique para fazer upload"}
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-pink-500"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Heart className="mr-2" size={18} />
                Quero esse!
              </Button>
            </CardContent>
          </Card>
          <div className="relative">
            <div className="bg-gradient-to-br from-love-subtle to-pink-100 rounded-3xl p-4">
              <div className="w-full max-w-md mx-auto overflow-hidden">
                <div className="scale-90 origin-top">
                  {renderThemePreview()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePreview;
