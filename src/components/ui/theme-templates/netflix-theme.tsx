// Caminho: src/components/ui/theme-templates/netflix-theme.tsx

import { useState } from "react";
// CORREÇÃO 1: Adicionamos a importação que faltava para todos os ícones.
import { Play, Plus, ThumbsUp, Share2, X } from "lucide-react";

// CORREÇÃO 2: Removemos a interface local e vamos usar a padrão para consistência.
// Lembre-se que o arquivo 'types.ts' deve existir na mesma pasta.
import { ThemeComponentProps } from "./types";

// Tipos específicos para este tema, se necessário no futuro
interface NetflixMovie {
  cover: string;
  video: string;
}

// Usamos a ThemeComponentProps e adicionamos props específicas se necessário
// (Neste caso, não precisamos de props extras por enquanto)
const NetflixTheme = ({
  name1,
  name2,
  uploadedImage,
  caption,
}: ThemeComponentProps) => {
  const coupleTitle = name1 && name2 ? `${name1} & ${name2}` : "Nossa História";
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans">
      {/* Netflix Header */}
      <div className="bg-black p-4 flex items-center justify-between border-b border-gray-800">
        <div className="text-red-600 font-bold text-xl uppercase tracking-widest">
          Netflix
        </div>
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-xs font-bold">
          {name1 ? name1[0] : "❤️"}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-red-900 via-black to-red-900 flex items-center justify-center overflow-hidden">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt={`Capa de ${coupleTitle}`}
              className="w-full h-full object-cover opacity-70"
            />
          ) : (
            <div className="text-6xl opacity-50">💕</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{coupleTitle}</h1>
          <p className="text-sm text-gray-300">Romance • 2025 • 4K</p>
          <div className="flex gap-2">
            <button className="bg-white text-black px-4 py-1 rounded flex items-center gap-2 text-sm font-semibold hover:bg-gray-200 transition-colors">
              <Play size={16} className="fill-black" />
              Assistir
            </button>
            <button className="bg-gray-700/80 text-white px-4 py-1 rounded flex items-center gap-2 text-sm hover:bg-gray-600/80 transition-colors">
              <Plus size={16} />
              Minha Lista
            </button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-green-400">
            <ThumbsUp size={16} />
            <span>98% Relevante para você</span>
          </div>
        </div>

        <p className="text-sm text-gray-300">
          {caption ||
            `Uma história de amor única entre ${name1 || "duas pessoas"} e ${
              name2 || "muito especiais"
            }. Repleta de momentos inesquecíveis, risadas e muito carinho.`}
        </p>

        {/* Player fake para vídeos */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
            <div className="relative w-full max-w-2xl">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 text-white hover:opacity-70 transition-opacity"
              >
                <X size={24} />
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetflixTheme;
