import { Card } from "@/components/ui/card";
import { Play, Plus, ThumbsUp, Share2 } from "lucide-react";

interface NetflixThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
}

const NetflixTheme = ({ name1, name2, uploadedImage }: NetflixThemeProps) => {
  const coupleTitle = name1 && name2 ? `${name1} & ${name2}` : "Nossa História";
  
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans">
      {/* Netflix Header */}
      <div className="bg-black p-4 flex items-center justify-between border-b border-gray-800">
        <div className="text-red-600 font-bold text-xl">NETFLIX</div>
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-xs">
          {name1 ? name1[0] : "❤️"}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-red-900 to-red-700 flex items-center justify-center">
          {uploadedImage ? (
            <img 
              src={uploadedImage} 
              alt="Casal" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl">💕</div>
          )}
        </div>
        
        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <h1 className="text-2xl font-bold">{coupleTitle}</h1>
          <p className="text-sm text-gray-300">Romance • 2024 • HD</p>
          <div className="flex gap-2">
            <button className="bg-white text-black px-4 py-1 rounded flex items-center gap-1 text-sm font-semibold">
              <Play size={14} />
              Assistir
            </button>
            <button className="bg-gray-600/80 text-white px-4 py-1 rounded flex items-center gap-1 text-sm">
              <Plus size={14} />
              Minha Lista
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Nossos Momentos Especiais</h3>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video bg-gray-800 rounded flex items-center justify-center text-xs">
                Ep {i}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} />
            <span>98% compatível</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 size={16} />
            <span>Compartilhar</span>
          </div>
        </div>

        <p className="text-sm text-gray-300">
          Uma história de amor única entre duas pessoas especiais. 
          Repleta de momentos inesquecíveis, risadas e muito carinho.
        </p>
      </div>
    </div>
  );
};

export default NetflixTheme;