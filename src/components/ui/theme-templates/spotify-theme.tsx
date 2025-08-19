import { Card } from "@/components/ui/card";
import { Play, Heart, MoreHorizontal, Shuffle, SkipBack, SkipForward, Repeat } from "lucide-react";

interface SpotifyThemeProps {
  name1: string;
  name2: string;
  uploadedImage?: string;
}

const SpotifyTheme = ({ name1, name2, uploadedImage }: SpotifyThemeProps) => {
  const playlistName = name1 && name2 ? `${name1} & ${name2}` : "Nossa Playlist";
  
  const songs = [
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
    { title: "All of Me", artist: "John Legend", duration: "4:29" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
    { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" }
  ];

  return (
    <div className="bg-gradient-to-b from-green-900 to-black text-white rounded-lg overflow-hidden min-h-[400px] font-sans">
      {/* Spotify Header */}
      <div className="bg-black/50 p-4 flex items-center justify-between">
        <div className="text-green-400 font-bold text-xl flex items-center gap-2">
          <div className="w-6 h-6 bg-green-400 rounded-full"></div>
          Spotify
        </div>
      </div>

      {/* Playlist Header */}
      <div className="p-6 flex gap-6 items-end">
        <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl flex items-center justify-center flex-shrink-0">
          {uploadedImage ? (
            <img 
              src={uploadedImage} 
              alt="Playlist Cover" 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-6xl">💕</div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wider">Playlist</p>
          <h1 className="text-4xl md:text-6xl font-bold">{playlistName}</h1>
          <p className="text-gray-300">
            {name1 || "Você"} • {songs.length} músicas, aproximadamente 18 min
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
          <Play size={20} className="text-black ml-1" />
        </button>
        <Heart size={24} className="text-green-400" />
        <MoreHorizontal size={24} className="text-gray-400" />
      </div>

      {/* Songs List */}
      <div className="px-6">
        <div className="grid grid-cols-12 gap-4 text-xs text-gray-400 border-b border-gray-800 pb-2 mb-2">
          <div className="col-span-1">#</div>
          <div className="col-span-8">TÍTULO</div>
          <div className="col-span-3 text-right">DURAÇÃO</div>
        </div>
        
        {songs.map((song, index) => (
          <div 
            key={index} 
            className="grid grid-cols-12 gap-4 py-2 hover:bg-white/10 rounded group text-sm"
          >
            <div className="col-span-1 text-gray-400 group-hover:hidden">
              {index + 1}
            </div>
            <div className="col-span-1 hidden group-hover:block">
              <Play size={14} />
            </div>
            <div className="col-span-8">
              <div className="font-medium">{song.title}</div>
              <div className="text-xs text-gray-400">{song.artist}</div>
            </div>
            <div className="col-span-3 text-right text-gray-400">
              {song.duration}
            </div>
          </div>
        ))}
      </div>

      {/* Player Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-400 rounded flex items-center justify-center text-black text-xs">
            💕
          </div>
          <div>
            <div className="text-sm font-medium">Perfect</div>
            <div className="text-xs text-gray-400">Ed Sheeran</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Shuffle size={16} className="text-gray-400" />
          <SkipBack size={16} />
          <Play size={16} />
          <SkipForward size={16} />
          <Repeat size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SpotifyTheme;