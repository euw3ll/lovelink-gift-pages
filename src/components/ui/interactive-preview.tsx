import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Heart, Upload, Sparkles } from "lucide-react";

const InteractivePreview = () => {
  const [previewData, setPreviewData] = useState({
    name1: "",
    name2: "",
    imageUploaded: false
  });

  const handleInputChange = (field: string, value: string) => {
    setPreviewData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-background">
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Input Form */}
          <Card className="border-border/50 shadow-[var(--shadow-soft)]">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Sparkles className="text-primary" size={24} />
                Criar Preview
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
                <Label>Foto do casal</Label>
                <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-lg p-8 text-center cursor-pointer group">
                  <Upload className="mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" size={32} />
                  <p className="text-muted-foreground group-hover:text-primary transition-colors">
                    Clique para fazer upload da foto
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG até 5MB
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-[var(--shadow-love)]"
                size="lg"
              >
                <Heart className="mr-2" size={18} />
                Gerar Preview
              </Button>
            </CardContent>
          </Card>

          {/* Preview Mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-love-subtle to-pink-100 rounded-3xl p-8 shadow-[var(--shadow-soft)] relative overflow-hidden">
              {/* Mockup Phone Frame */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm mx-auto">
                <div className="text-center space-y-4">
                  {/* Profile Picture Placeholder */}
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                    💕
                  </div>
                  
                  {/* Names */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">
                      {previewData.name1 || "Seu Nome"} ❤️ {previewData.name2 || "Amor"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Nossa história de amor
                    </p>
                  </div>

                  {/* Sample Content */}
                  <div className="space-y-3 text-left">
                    <div className="bg-love-subtle rounded-lg p-3">
                      <p className="text-sm text-primary font-medium">💌 Primeira mensagem</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        "Você mudou minha vida de uma forma que eu nunca imaginei..."
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center text-xs">📸</div>
                      <div className="aspect-square bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex items-center justify-center text-xs">💕</div>
                      <div className="aspect-square bg-gradient-to-br from-red-200 to-red-300 rounded-lg flex items-center justify-center text-xs">🎵</div>
                    </div>
                  </div>
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