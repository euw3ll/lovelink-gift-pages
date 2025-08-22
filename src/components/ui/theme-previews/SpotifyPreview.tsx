// src/components/ui/theme-previews/SpotifyPreview.tsx

import { Play, Heart } from "lucide-react";

interface PreviewProps {
  name1: string;
  name2: string;
  uploadedImage: string | null;
}

const SpotifyPreview = ({ name1, name2, uploadedImage }: PreviewProps) => {
  const playlistName =
    name1 && name2 ? `${name1} & ${name2}` : "Nossa Playlist";

  return (
    <div className="bg-gradient-to-b from-green-900 via-gray-900 to-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans pointer-events-none">
      {/* Cabeçalho */}
      <div className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-end bg-gradient-to-b from-green-800/60 to-transparent">
        <div className="w-40 h-40 bg-gray-800 rounded-md shadow-2xl flex items-center justify-center flex-shrink-0">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt={`Capa da playlist ${playlistName}`}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="text-5xl text-gray-500">🎵</div>
          )}
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-xs font-bold uppercase">Playlist</p>
          <h1 className="text-4xl font-black tracking-tighter break-words">
            {playlistName}
          </h1>
          <p className="text-gray-300 text-xs">
            Criado por {name1 || "Você"} • 4 músicas
          </p>
        </div>
      </div>

      {/* Controles Falsos */}
      <div className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black">
            <Play size={24} className="fill-current ml-1" />
          </div>
          <Heart size={28} className="text-green-500 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPreview;
