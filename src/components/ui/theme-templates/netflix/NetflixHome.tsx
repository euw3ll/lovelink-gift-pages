// src/components/ui/theme-templates/netflix/NetflixHome.tsx

import { useState } from "react";
import { Play, Plus, X } from "lucide-react";
import { NetflixThemeData } from "../types";

interface NetflixHomeProps {
  data: NetflixThemeData;
}

const NetflixHome = ({ data }: NetflixHomeProps) => {
  const { bannerImage, bannerTitle, bannerDescription, movies } = data;
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-black text-white min-h-[400px] font-sans">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center">
        <div className="text-red-600 font-bold text-xl uppercase tracking-widest">
          Netflix
        </div>
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-xs font-bold">
          ❤️
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-72">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10 flex flex-col justify-center p-8">
          <h1 className="text-4xl font-extrabold mb-2">
            {bannerTitle || "Nossa História de Amor"}
          </h1>
          <p className="text-sm max-w-md text-gray-200 mb-4">
            {bannerDescription || "Uma série de momentos inesquecíveis."}
          </p>
          <div className="flex gap-2">
            <button className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-semibold hover:bg-gray-200 transition-colors">
              <Play size={20} className="fill-black" />
              Assistir
            </button>
            <button className="bg-gray-700/80 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-600/80 transition-colors">
              <Plus size={20} />
              Minha Lista
            </button>
          </div>
        </div>
        <img
          src={
            bannerImage ||
            "https://via.placeholder.com/1200x480/FF0000/000000?text=Banner"
          }
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
      </div>

      {/* Movie Grid */}
      <div className="p-4 -mt-10 relative z-10">
        <h2 className="font-semibold mb-2">Nossos Momentos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="aspect-[2/3] bg-neutral-800 rounded overflow-hidden cursor-pointer group transition-transform hover:scale-105"
              onClick={() => movie.videoUrl && setActiveVideo(movie.videoUrl)}
            >
              <img
                src={
                  movie.coverImage ||
                  `https://via.placeholder.com/200x300/FF0000/000000?text=${encodeURIComponent(
                    movie.title
                  )}`
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
          <div className="relative w-full max-w-4xl p-4">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-2 right-4 text-white hover:opacity-70 transition-opacity z-10"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded"
                src={`${activeVideo}${
                  activeVideo.includes("youtube.com/embed") ? "?autoplay=1" : ""
                }`}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetflixHome;
