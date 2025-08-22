import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";

// Dados mocados para o plano do usuário
const mockSubscription = {
  planName: "Anual",
  status: "Ativo",
  renewsOn: "15 de ago, 2025",
  price: "R$ 149/ano",
  features: [
    "Páginas ilimitadas",
    "Todos os temas premium",
    "Upload ilimitado de mídia",
    "Suporte prioritário",
  ],
};

const SubscriptionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-primary" />
              Meu Plano
            </CardTitle>
            <CardDescription>
              Detalhes sobre sua assinatura e benefícios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-semibold">{mockSubscription.planName}</p>
                <Badge
                  variant={
                    mockSubscription.status === "Ativo"
                      ? "default"
                      : "destructive"
                  }
                  className="mt-1 bg-green-100 text-green-800"
                >
                  {mockSubscription.status}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Renova em {mockSubscription.renewsOn}
                </p>
                <p className="font-semibold">{mockSubscription.price}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Benefícios do seu plano:</h3>
              <ul className="space-y-2">
                {mockSubscription.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button>Gerenciar Assinatura</Button>
            <Button variant="ghost" className="ml-2">
              Cancelar Plano
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
