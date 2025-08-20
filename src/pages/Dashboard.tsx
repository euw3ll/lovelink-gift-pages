import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeDashboard, {
  ThemeType,
} from "@/components/ui/theme-templates/theme-dashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeType>("netflix");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (data: unknown) => {
    console.log("Saved data:", data);
  };

  return (
    <div className="container mx-auto flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>Criar Nova Página</Button>
      </div>
      <div className="max-w-xs">
        <Select value={theme} onValueChange={(value: ThemeType) => setTheme(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tema" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="netflix">Netflix</SelectItem>
            <SelectItem value="spotify">Spotify</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="polaroid">Polaroid</SelectItem>
            <SelectItem value="love-letter">Love Letter</SelectItem>
            <SelectItem value="love-map">Love Map</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ThemeDashboard theme={theme} onSubmit={handleSubmit} />
    </div>
  );
};

export default Dashboard;
