import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

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
      const res = await fetch(`http://localhost:4000/api/${mode}`, {
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
      setError("Erro de rede");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-love-subtle via-background to-background overflow-hidden p-4">
      <Heart className="absolute top-20 left-10 text-love opacity-20 animate-pulse" />
      <Sparkles className="absolute bottom-16 right-10 text-love opacity-25 animate-ping" />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex justify-center gap-2">
          <Button
            variant={mode === "login" ? "default" : "outline"}
            onClick={() => setMode("login")}
            className="w-full"
          >
            Entrar
          </Button>
          <Button
            variant={mode === "register" ? "default" : "outline"}
            onClick={() => setMode("register")}
            className="w-full"
          >
            Registrar
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
          <div
            className={`flex w-[200%] transition-transform duration-500 ${mode === "login" ? "translate-x-0" : "-translate-x-1/2"}`}
          >
            <form onSubmit={handleSubmit} className="w-1/2 space-y-4 pr-6">
              <h1 className="text-2xl font-bold text-center">Login</h1>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && mode === "login" && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
            <form onSubmit={handleSubmit} className="w-1/2 space-y-4 pl-6">
              <h1 className="text-2xl font-bold text-center">Registrar</h1>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && mode === "register" && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

