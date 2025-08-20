import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeDashboard, { type ThemeType } from "@/components/ui/theme-templates/theme-dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeType>("netflix");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-xs space-y-2">
        <Label>Tema</Label>
        <Select value={theme} onValueChange={(v) => setTheme(v as ThemeType)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um tema" />
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
      <ThemeDashboard theme={theme} onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default Dashboard;
