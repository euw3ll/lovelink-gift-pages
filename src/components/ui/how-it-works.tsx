import { Palette, Upload, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Palette,
      title: "Escolha um Tema Visual",
      description: "Selecione entre diversos temas românticos como Netflix, Spotify, álbum de polaroids e muito mais.",
      number: "01"
    },
    {
      icon: Upload,
      title: "Personalize com Suas Memórias",
      description: "Adicione fotos especiais, vídeos íntimos e mensagens que tocam o coração da pessoa amada.",
      number: "02"
    },
    {
      icon: Share2,
      title: "Publique e Compartilhe",
      description: "Gere um link único e exclusivo para compartilhar sua surpresa digital de forma segura e privada.",
      number: "03"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como{" "}
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em apenas três passos simples, você cria uma experiência digital única e emocionante
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index} 
                className="relative bg-card hover:bg-love-subtle/30 transition-all duration-300 hover:shadow-[var(--shadow-soft)] border-border/50 hover:border-primary/30 group"
              >
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[var(--shadow-love)]">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-6">
                    <div className="w-16 h-16 mx-auto bg-love-subtle rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon size={32} className="text-primary group-hover:text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Connection Lines - Desktop Only */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <div className="absolute top-20 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/30 to-pink-500/30"></div>
          <div className="absolute top-20 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/30 to-pink-500/30"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;