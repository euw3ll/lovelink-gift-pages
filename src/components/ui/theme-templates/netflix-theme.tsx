import { useState, useMemo, useRef, useEffect } from "react";
import { Play, Pause, Plus, ThumbsUp, Share2, X, Info } from "lucide-react";

interface NetflixMovie {
  cover: string;
  video: string;
  category?: string;
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = useMemo(() => {
    const map = new Map<string, NetflixMovie[]>();
    movies.forEach((m) => {
      const cat = m.category || "Momentos";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(m);
    });
    return Array.from(map.entries());
  }, [movies]);

  useEffect(() => {
    if (!activeVideo) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-red-600 font-bold text-2xl">NETFLIX</span>
          <nav className="hidden md:flex gap-4 text-sm">
            {categories.map(([cat]) => (
              <a key={cat} href={`#${cat}`} className="hover:text-gray-300">
                {cat}
              </a>
            ))}
          </nav>
        </div>
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-xs">
          {name1 ? name1[0] : "❤️"}
        </div>
      </div>

      <div className="pt-16">
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
              <button
                className="bg-gray-600/80 text-white px-4 py-1 rounded flex items-center gap-1 text-sm"
                onClick={() => setShowInfo(true)}
              >
                <Info size={14} />
                Mais Info
              </button>
            </div>
          </div>

          {showInfo && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="relative bg-gray-900 p-4 rounded max-w-md text-sm">
                <button className="absolute top-2 right-2" onClick={() => setShowInfo(false)}>
                  <X size={16} />
                </button>
                <h2 className="text-lg font-bold mb-2">{coupleTitle}</h2>
                <p className="text-gray-300">
                  Uma história de amor única entre duas pessoas especiais.
                  Repleta de momentos inesquecíveis, risadas e muito carinho.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content Rows */}
        <div className="p-4 space-y-6">
          {categories.map(([cat, list]) => (
            <div key={cat} id={cat} className="space-y-2">
              <h3 className="text-lg font-semibold">{cat}</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {list.map((movie, index) => (
                  <div
                    key={index}
                    className="relative w-48 flex-shrink-0 aspect-video bg-gray-800 rounded overflow-hidden"
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
                        onClick={() => {
                          setActiveVideo(movie.video);
                          setIsPlaying(true);
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition"
                      >
                        <Play />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

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

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl">
            <video ref={videoRef} src={activeVideo} autoPlay className="w-full h-auto rounded" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={togglePlay} className="bg-black/60 rounded-full p-4 text-white">
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
            </div>
            <button onClick={() => setActiveVideo(null)} className="absolute top-2 right-2 text-white">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetflixTheme;