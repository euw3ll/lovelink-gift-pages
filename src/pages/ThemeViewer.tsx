// src/pages/ThemeViewer.tsx

import { useParams } from "react-router-dom";
import NetflixTheme from "@/components/ui/theme-templates/netflix-theme";
// Importe outros temas aqui no futuro
// import SpotifyTheme from "@/components/ui/theme-templates/spotify-theme";

import { themeRegistry } from "@/lib/themes";
import { NetflixThemeData } from "@/components/ui/theme-templates/types";

// Esta página irá renderizar um presente salvo
const ThemeViewer = () => {
  const { pageId } = useParams<{ pageId: string }>();

  // --- LÓGICA DE DADOS (MOCKADA POR ENQUANTO) ---
  // No futuro, você faria uma chamada à API aqui usando o `pageId`
  // para buscar os dados salvos do presente.
  // Por agora, vamos usar os dados padrão do tema Netflix.
  const mockNetflixData: NetflixThemeData =
    themeRegistry.netflix.getDefaultData();

  // Populando com alguns dados de exemplo para melhor visualização
  mockNetflixData.name1 = "Seu Nome";
  mockNetflixData.name2 = "Amor";
  mockNetflixData.bannerTitle = "Nossa História de Amor";
  mockNetflixData.bannerDescription =
    "Uma série de momentos inesquecíveis, risadas e muito carinho, com um final feliz garantido.";

  // Adicione a lógica aqui para carregar dados de outros temas se necessário

  const renderTheme = () => {
    // No futuro, você terá uma variável `themeType` vinda da sua API.
    const themeType = "netflix"; // Mockado por enquanto

    switch (themeType) {
      case "netflix":
        return <NetflixTheme data={mockNetflixData} />;
      // case "spotify":
      //   return <SpotifyTheme data={mockSpotifyData} />;
      default:
        return (
          <div>
            Tema para a página '{pageId || "desconhecida"}' não encontrado.
          </div>
        );
    }
  };

  return <div className="w-full min-h-screen bg-black">{renderTheme()}</div>;
};

export default ThemeViewer;
