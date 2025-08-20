import { useState } from "react";
import { Play, Plus, ThumbsUp, Share2, X } from "lucide-react";

interface NetflixMovie {
  cover: string;
  video: string;
}

interface NetflixThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
  heroVideo?: string;
  movies?: NetflixMovie[];
}

const NetflixTheme = ({
  name1,
  name2,
  uploadedImage,
  heroVideo,
  movies = [],
}: NetflixThemeProps) => {
  const coupleTitle = name1 && name2 ? `${name1} & ${name2}` : "Nossa História";
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
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
          {heroVideo ? (
            <video
              src={heroVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
            />
          ) : uploadedImage ? (
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
            {movies.length > 0
              ? movies.map((movie, index) => (
                  <div
                    key={index}
                    className="relative aspect-video bg-gray-800 rounded overflow-hidden"
                  >
                    {movie.cover ? (
                      <img
                        src={movie.cover}
                        alt={`Filme ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-xs">
                        Filme {index + 1}
                      </div>
                    )}
                    {movie.video && (
                      <button
                        onClick={() => setActiveVideo(movie.video)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition"
                      >
                        <Play />
                      </button>
                    )}
                  </div>
                ))
              : [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-video bg-gray-800 rounded flex items-center justify-center text-xs"
                  >
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
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white"
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
  );
};

export default NetflixTheme;