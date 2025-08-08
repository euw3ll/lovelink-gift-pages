import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Lock, CreditCard, Palette, Clock, HeadphonesIcon } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      icon: Shield,
      question: "Meus dados e fotos estão seguros?",
      answer: "Sim! Utilizamos criptografia de ponta e armazenamento seguro na nuvem. Suas informações pessoais e mídias são protegidas com os mais altos padrões de segurança. Apenas você e quem receber o link poderão acessar o conteúdo."
    },
    {
      icon: Palette,
      question: "Posso personalizar completamente minha página?",
      answer: "Absolutamente! Oferecemos diversos temas (Netflix, Spotify, Instagram, etc.) e você pode personalizar cores, textos, adicionar suas próprias fotos, vídeos e mensagens. Cada página é única como seu relacionamento."
    },
    {
      icon: CreditCard,
      question: "Como funcionam os pagamentos?",
      answer: "Aceitamos todos os cartões de crédito e débito através da Stripe, uma das plataformas de pagamento mais seguras do mundo. Oferecemos planos mensais, anuais e vitalícios com garantia de 7 dias."
    },
    {
      icon: Clock,
      question: "Por quanto tempo minha página fica disponível?",
      answer: "Depende do seu plano: Mensal (1 mês), Anual (12 meses) ou Vitalício (para sempre). Mesmo após expirar, você pode reativar facilmente renovando seu plano e todo conteúdo será preservado."
    },
    {
      icon: Lock,
      question: "Posso tornar minha página privada?",
      answer: "Sim! Por padrão, apenas quem tem o link exclusivo pode acessar sua página. Opcionalmente, você pode adicionar senha extra para proteção adicional ou deixar totalmente pública se preferir."
    },
    {
      icon: HeadphonesIcon,
      question: "Que tipo de suporte vocês oferecem?",
      answer: "Oferecemos suporte por email para todos os planos, com tempo de resposta de até 24h. Usuários dos planos anuais e vitalícios têm suporte prioritário com resposta em até 4 horas."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Perguntas{" "}
            <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Esclarecemos as principais dúvidas sobre segurança, personalização e funcionamento da plataforma
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline group py-6">
                    <div className="flex items-center gap-4 text-foreground group-hover:text-primary transition-colors">
                      <div className="w-10 h-10 rounded-full bg-love-subtle group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} />
                      </div>
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 ml-14">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou sua resposta?
          </p>
          <div className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer">
            <HeadphonesIcon size={20} />
            <span className="font-medium">Entre em contato conosco</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;