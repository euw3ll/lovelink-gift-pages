import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ana & Carlos",
      emoji: "💕",
      text: "Nunca vi meu namorado chorar de emoção até ele ver a página que criei. Foi o presente mais especial que já demos um para o outro!",
      rating: 5,
      relation: "2 anos juntos"
    },
    {
      name: "Marina & João",
      emoji: "🥰",
      text: "Usamos no nosso aniversário de 5 anos. A página com tema Spotify das nossas músicas ficou perfeita. Amigos pedem o link até hoje!",
      rating: 5,
      relation: "5 anos juntos"
    },
    {
      name: "Lucas & Rafael",
      emoji: "❤️",
      text: "Como casal gay, é difícil achar presentes românticos que nos representem. O LoveLink foi perfeito, totalmente inclusivo e lindo!",
      rating: 5,
      relation: "3 anos juntos"
    },
    {
      name: "Fernanda & Miguel",
      emoji: "💖",
      text: "Estamos em relacionamento à distância. A página virou nosso cantinho virtual especial que visitamos sempre que sentimos saudade.",
      rating: 5,
      relation: "Relacionamento à distância"
    },
    {
      name: "Camila & Pedro",
      emoji: "✨",
      text: "Usei para pedir em casamento! Coloquei todas nossas fotos e no final o pedido. Ela disse SIM chorando! Melhor investimento da vida.",
      rating: 5,
      relation: "Noivos felizes"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-love-subtle/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Casais{" "}
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Apaixonados
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como o LoveLink está transformando relacionamentos e criando momentos inesquecíveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-soft)] group"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="text-primary/30 group-hover:text-primary/50 transition-colors" size={24} />
                  <div className="text-2xl">{testimonial.emoji}</div>
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className="fill-amber-400 text-amber-400" 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="pt-2 border-t border-border/50">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.relation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-love-subtle rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              {['💕', '🥰', '❤️', '💖', '✨'].map((emoji, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Mais de 2.500 casais já criaram seus presentes especiais
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;