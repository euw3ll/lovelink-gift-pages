import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // A verificação de token é importante para proteger a rota.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Olá, Bem-vindo(a) de volta!
          </h2>
          <p className="text-muted-foreground">
            Aqui está um resumo das suas criações.
          </p>
        </div>

        {/* Seção de Cards com Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Páginas Criadas
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Total de presentes digitais criados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visualizações Totais
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">
                Desde a última semana
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Ação Rápida */}
        <div className="mt-6">
          <Card className="border-dashed">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Pronto para criar mais um momento mágico?</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  Clique no botão para começar a criar uma nova página de
                  presente.
                </p>
              </div>
              <Button onClick={() => navigate("/dashboard/themes")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Nova Página
              </Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
