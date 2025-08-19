import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Heart, Crown, Zap } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Mensal",
      price: "R$ 19",
      period: "/mês",
      description: "Perfeito para experimentar",
      features: [
        "1 página de presente",
        "Temas básicos",
        "Upload de fotos (até 50)",
        "Link compartilhável",
        "Suporte por email"
      ],
      buttonText: "Começar Grátis",
      icon: Heart,
      color: "default"
    },
    {
      name: "Anual",
      price: "R$ 149",
      period: "/ano",
      originalPrice: "R$ 228",
      description: "Mais popular entre casais",
      features: [
        "Páginas ilimitadas",
        "Todos os temas premium",
        "Upload ilimitado de mídia",
        "Vídeos personalizados",
        "Analytics de visualização",
        "Domínio personalizado",
        "Suporte prioritário"
      ],
      buttonText: "Melhor Custo-Benefício",
      icon: Crown,
      color: "popular",
      badge: "Mais Popular",
      savings: "35% OFF"
    },
    {
      name: "Vitalício",
      price: "R$ 297",
      period: "única",
      description: "Amor para sempre",
      features: [
        "Tudo do plano anual",
        "Acesso vitalício",
        "Atualizações futuras grátis",
        "Backup na nuvem",
        "Themes exclusivos",
        "Sem mensalidades"
      ],
      buttonText: "Para Sempre",
      icon: Zap,
      color: "lifetime",
      badge: "Melhor Valor"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-love-subtle/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Planos{" "}
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Para Todos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para expressar seu amor de forma única e inesquecível
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.color === "popular";
            const isLifetime = plan.color === "lifetime";
            
            return (
              <Card 
                key={index} 
                className={`relative transition-all duration-300 hover:scale-105 ${
                  isPopular 
                    ? "border-primary shadow-[var(--shadow-love)] ring-2 ring-primary/20" 
                    : "border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      className={`${
                        isPopular 
                          ? "bg-gradient-to-r from-primary to-pink-500 text-white" 
                          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      } px-4 py-1 text-sm font-medium shadow-lg`}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isPopular 
                      ? "bg-gradient-to-r from-primary to-pink-500 text-white shadow-[var(--shadow-love)]"
                      : isLifetime
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "bg-love-subtle text-primary"
                  }`}>
                    <Icon size={28} />
                  </div>

                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {plan.savings}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check 
                          size={18} 
                          className={`mt-0.5 flex-shrink-0 ${
                            isPopular ? "text-primary" : "text-green-500"
                          }`} 
                        />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full transition-all duration-300 ${
                      isPopular
                        ? "bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-[var(--shadow-love)] text-white"
                        : isLifetime
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                        : "bg-love-subtle text-primary hover:bg-primary hover:text-white"
                    }`}
                    size="lg"
                  >
                    <Heart className="mr-2" size={18} />
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Money back guarantee */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-green-500">✓</span>
            Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;