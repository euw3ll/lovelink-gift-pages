import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ThemeDashboardPage from "./pages/ThemeDashboard";
import MyPages from "./pages/MyPages";
import SubscriptionPage from "./pages/Subscription"; // Importar a página de Assinatura
import PageAnalytics from "./pages/PageAnalytics"; // Importar a página de Analytics

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Auth initialMode="login" />} />
          <Route path="/register" element={<Auth initialMode="register" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/themes" element={<ThemeDashboardPage />} />
          <Route path="/dashboard/my-pages" element={<MyPages />} />
          {/* ROTAS ADICIONADAS ABAIXO */}
          <Route
            path="/dashboard/subscription"
            element={<SubscriptionPage />}
          />
          <Route
            path="/dashboard/page/:pageId/analytics"
            element={<PageAnalytics />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
