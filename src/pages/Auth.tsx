import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Heart, Sparkles, Mail, Lock } from "lucide-react";

interface AuthProps {
  initialMode?: "login" | "register";
}

const Auth = ({ initialMode = "login" }: AuthProps) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // CORREÇÃO: A URL agora é dinâmica baseada no modo (login ou register)
      const endpoint = mode === "login" ? "login" : "register";
      const res = await fetch(`http://localhost:4000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro de autenticação");
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Erro de rede. Por favor, tente novamente.");
    }
  };

  // CORREÇÃO: Definição das variáveis para os textos dinâmicos
  const title = mode === "login" ? "Acesse sua conta" : "Crie sua história";
  const description =
    mode === "login"
      ? "Que bom te ver de volta!"
      : "Comece a criar presentes inesquecíveis.";
  const buttonText = mode === "login" ? "Entrar" : "Criar Conta";
  const switchText =
    mode === "login" ? "Não tem uma conta?" : "Já possui uma conta?";
  const switchLinkText = mode === "login" ? "Registre-se" : "Entrar";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-love-subtle via-background to-background overflow-hidden p-4">
      {/* Elementos decorativos animados */}
      <Heart
        className="absolute top-20 left-10 text-primary/10 animate-pulse"
        size={48}
      />
      <Sparkles
        className="absolute bottom-16 right-10 text-primary/15 animate-ping"
        size={32}
      />
      <Heart
        className="absolute bottom-1/3 left-1/4 text-primary/5 animate-pulse"
        size={24}
      />

      <Card className="w-full max-w-md shadow-[var(--shadow-love)] z-10 animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-pink-500 rounded-full flex items-center justify-center mb-4">
            <Heart className="text-white" size={32} />
          </div>
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-[var(--shadow-love)] text-lg py-6 rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              {buttonText}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {switchText}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="font-semibold text-primary hover:underline focus:outline-none"
              >
                {switchLinkText}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
