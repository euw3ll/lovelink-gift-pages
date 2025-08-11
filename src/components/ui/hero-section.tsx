import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-mockup.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-love-subtle via-background to-background overflow-hidden">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 text-love opacity-20 animate-pulse" size={24} />
        <Heart className="absolute top-40 right-20 text-love opacity-30 animate-bounce" size={16} />
        <Sparkles className="absolute bottom-32 left-1/4 text-love opacity-25 animate-pulse" size={20} />
        <Heart className="absolute top-1/3 left-1/3 text-love opacity-15 animate-ping" size={12} />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out]">Crie</span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.1s_both]">uma</span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.2s_both]">surpresa</span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.3s_both]">digital</span>{" "}
                <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent inline-block animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                  inesquecível
                </span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.5s_both]">para</span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.6s_both]">quem</span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.7s_both]">você</span>{" "}
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.8s_both]">ama.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in px-4 md:px-0" style={{ animationDelay: "0.9s" }}>
                LoveLink é a plataforma que transforma seus sentimentos em páginas personalizadas únicas. 
                Crie presentes digitais com fotos, vídeos e mensagens especiais.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "1.1s" }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-[var(--shadow-love)] text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="mr-2" size={20} />
                Comece Agora
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-love-subtle text-lg px-8 py-6 rounded-full transition-all duration-300"
                onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Exemplos
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">💕</div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">🥰</div>
                  <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">❤️</div>
                </div>
                <span>+2.5k casais felizes</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="LoveLink App Preview" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-love)] transition-shadow duration-500"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-love-subtle rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;