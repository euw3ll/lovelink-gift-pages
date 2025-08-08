import { Heart, Mail, Shield, FileText, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Como Funciona", href: "#como-funciona" },
      { name: "Temas", href: "#temas" },
      { name: "Exemplos", href: "#exemplos" },
      { name: "Preços", href: "#precos" }
    ],
    support: [
      { name: "Central de Ajuda", href: "#ajuda" },
      { name: "FAQ", href: "#faq" },
      { name: "Contato", href: "#contato" },
      { name: "Status", href: "#status" }
    ],
    legal: [
      { name: "Termos de Uso", href: "#termos" },
      { name: "Política de Privacidade", href: "#privacidade" },
      { name: "Cookies", href: "#cookies" },
      { name: "LGPD", href: "#lgpd" }
    ]
  };

  const socialLinks = [
    { name: "Instagram", href: "#", emoji: "📷" },
    { name: "TikTok", href: "#", emoji: "🎵" },
    { name: "YouTube", href: "#", emoji: "📺" },
    { name: "Twitter", href: "#", emoji: "🐦" }
  ];

  return (
    <footer className="bg-gradient-to-b from-love-subtle/30 to-background border-t border-border/50">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                LoveLink
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Transformando amor em experiências digitais únicas. Crie presentes especiais que ficam para sempre no coração de quem você ama.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-love-subtle hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.name}
                >
                  <span className="text-sm group-hover:text-white transition-colors">
                    {social.emoji}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart size={16} className="text-primary" />
                Produto
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <HeadphonesIcon size={16} className="text-primary" />
                Suporte
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h4 className="text-xl font-semibold flex items-center justify-center gap-2">
              <Mail className="text-primary" size={20} />
              Receba dicas de relacionamento
            </h4>
            <p className="text-muted-foreground text-sm">
              Dicas exclusivas para fortalecer relacionamentos e criar momentos especiais
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Button className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90">
                <Heart size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-background/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © 2024 LoveLink. Feito com{" "}
              <Heart className="inline w-4 h-4 text-primary mx-1" />
              para casais apaixonados.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="text-green-500" size={16} />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="text-blue-500" size={16} />
                <span>LGPD Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;