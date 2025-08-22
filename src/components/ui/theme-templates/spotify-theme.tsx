import { Play, Heart, MoreHorizontal } from "lucide-react";
import { ThemeComponentProps, SimpleThemeData } from "./types";

const SpotifyTheme = ({ data }: ThemeComponentProps<SimpleThemeData>) => {
  const { name1, name2, uploadedImage } = data;
  const playlistName =
    name1 && name2 ? `${name1} & ${name2}` : "Nossa Playlist";

  return (
    <div className="bg-gradient-to-b from-green-900 via-gray-900 to-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans">
      <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-end bg-gradient-to-b from-green-800/60 to-transparent">
        <div className="w-48 h-48 bg-gray-800 rounded-md shadow-2xl flex items-center justify-center flex-shrink-0">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt={`Capa da playlist ${playlistName}`}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="text-6xl text-gray-500">🎵</div>
          )}
        </div>
        <div className="space-y-3 text-center md:text-left">
          <p className="text-sm font-bold uppercase tracking-wider">Playlist</p>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter break-words">
            {playlistName}
          </h1>
          <p className="text-gray-300 text-sm">
            Criado por {name1 || "Você"} • 4 músicas
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <button className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black shadow-lg">
            <Play size={28} className="fill-current ml-1" />
          </button>
          <Heart size={32} className="text-green-500 fill-current" />
          <MoreHorizontal size={32} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SpotifyTheme;
