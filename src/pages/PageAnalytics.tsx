import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Eye, Users, ArrowLeft } from "lucide-react";

// Dados mocados para o gráfico e os cartões.
const mockAnalyticsData = {
  totalViews: 150,
  uniqueVisitors: 85,
  dailyViews: [
    { day: "Seg", views: 10 },
    { day: "Ter", views: 25 },
    { day: "Qua", views: 15 },
    { day: "Qui", views: 40 },
    { day: "Sex", views: 30 },
    { day: "Sáb", views: 20 },
    { day: "Dom", views: 10 },
  ],
};

const PageAnalytics = () => {
  const navigate = useNavigate();
  const { pageId } = useParams(); // Futuramente, usaremos este ID para buscar dados reais.

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link
          to="/dashboard/my-pages"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Minhas Páginas
        </Link>

        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Analytics da Página
          </h2>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua página de presente. (ID da página:{" "}
            {pageId})
          </p>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Visualizações
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyticsData.totalViews}
              </div>
              <p className="text-xs text-muted-foreground">
                Desde a publicação
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visitantes Únicos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyticsData.uniqueVisitors}
              </div>
              <p className="text-xs text-muted-foreground">
                Pessoas diferentes que viram
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Visualizações */}
        <Card>
          <CardHeader>
            <CardTitle>Visualizações na Última Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalyticsData.dailyViews}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar
                    dataKey="views"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PageAnalytics;
