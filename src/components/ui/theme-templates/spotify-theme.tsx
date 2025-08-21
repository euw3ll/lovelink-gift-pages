// Caminho: src/components/ui/theme-templates/spotify-theme.tsx

import {
  Play,
  Heart,
  MoreHorizontal,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
} from "lucide-react";
import { ThemeComponentProps } from "./types";

// Tipo para uma música individual
interface SpotifySong {
  title: string;
  artist: string;
  duration: string;
}

// Lista de músicas padrão para demonstração
const defaultSongs: SpotifySong[] = [
  { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
  { title: "All of Me", artist: "John Legend", duration: "4:29" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
  { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" },
];

const SpotifyTheme = ({ name1, name2, uploadedImage }: ThemeComponentProps) => {
  const playlistName =
    name1 && name2 ? `${name1} & ${name2}` : "Nossa Playlist";
  const songList = defaultSongs; // Usando a lista padrão para o visual

  return (
    <div className="bg-gradient-to-b from-green-900 via-gray-900 to-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans">
      {/* Cabeçalho da Playlist */}
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
            Criado por {name1 || "Você"} • {songList.length} músicas
          </p>
        </div>
      </div>

      {/* Controles e Lista de Músicas */}
      <div className="p-6">
        {/* Controles Principais */}
        <div className="flex items-center gap-6 mb-6">
          <button className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg shadow-green-500/30">
            <Play size={28} className="fill-current ml-1" />
          </button>
          <Heart size={32} className="text-green-500 fill-current" />
          <MoreHorizontal
            size={32}
            className="text-gray-400 hover:text-white"
          />
        </div>

        {/* Cabeçalho da Lista de Músicas */}
        <div className="grid grid-cols-12 gap-4 text-xs text-gray-400 border-b border-white/20 pb-2 mb-2 uppercase tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-8">Título</div>
          <div className="col-span-3 text-right">Duração</div>
        </div>

        {/* Lista de Músicas */}
        <div className="space-y-1">
          {songList.map((song, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-2 hover:bg-white/10 rounded group text-sm items-center cursor-pointer"
            >
              <div className="col-span-1 text-gray-400 text-center group-hover:hidden">
                {index + 1}
              </div>
              <div className="col-span-1 text-gray-400 text-center hidden group-hover:block">
                <Play size={16} className="fill-current" />
              </div>
              <div className="col-span-8">
                <div className="font-medium text-white truncate">
                  {song.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {song.artist}
                </div>
              </div>
              <div className="col-span-3 text-right text-gray-400">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotifyTheme;
