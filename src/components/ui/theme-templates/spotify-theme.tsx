import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SpotifySong {
  title: string;
  artist: string;
  audio?: string;
  duration?: string;
}

interface SpotifyThemeProps {
  name1: string;
  name2: string;
  coverImage?: string;
  songs?: SpotifySong[];
}

const defaultSongs: SpotifySong[] = [
  { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
  { title: "All of Me", artist: "John Legend", duration: "4:29" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
  { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" },
];

const SpotifyTheme = ({ name1, name2, coverImage, songs = [] }: SpotifyThemeProps) => {
  const playlistName = name1 && name2 ? `${name1} & ${name2}` : "Nossa Playlist";
  const songList = songs.length > 0 ? songs : defaultSongs;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songList[currentIndex] || null;

  // Load song when index changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (currentSong.audio) {
      audioRef.current.src = currentSong.audio;
      if (isPlaying) {
        audioRef.current
          .play()
          .then(() => {})
          .catch(() => {});
      }
    }
  }, [currentIndex, currentSong, isPlaying]);

  // Time updates
  const handleNext = useCallback(() => {
    if (songList.length === 0) return;
    let nextIndex = currentIndex + 1;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songList.length);
    } else if (nextIndex >= songList.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  }, [currentIndex, isShuffle, songList.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        handleNext();
      }
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleNext, isRepeat]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const playSongAt = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // handleNext defined with useCallback above

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime > 5) {
      audio.currentTime = 0;
      return;
    }
    let prevIndex = currentIndex - 1;
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * songList.length);
    } else if (prevIndex < 0) {
      prevIndex = songList.length - 1;
    }
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

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
      <div className="p-6 flex flex-col md:flex-row gap-6 items-end">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl flex items-center justify-center flex-shrink-0">
          {coverImage ? (
            <img
              src={coverImage}
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
            {name1 || "Você"} • {songList.length} músicas
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center gap-4">
        <button
          className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause size={20} className="text-black" />
          ) : (
            <Play size={20} className="text-black ml-1" />
          )}
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
        
        {songList.map((song, index) => (
          <div
            key={index}
            className={`grid grid-cols-12 gap-4 py-2 rounded group text-sm cursor-pointer hover:bg-white/10 ${
              index === currentIndex ? "text-green-400" : ""
            }`}
            onClick={() => playSongAt(index)}
          >
            <div className="col-span-1 text-gray-400 group-hover:hidden">
              {index === currentIndex && isPlaying ? "" : index + 1}
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
      <div className="bg-gray-900 p-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 bg-green-400 rounded flex items-center justify-center text-black text-xs">
            💕
          </div>
          <div>
            <div className="text-sm font-medium">
              {currentSong?.title || "Selecione uma música"}
            </div>
            <div className="text-xs text-gray-400">{currentSong?.artist}</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
          <div className="flex items-center gap-4">
            <Shuffle
              size={16}
              onClick={() => setIsShuffle(!isShuffle)}
              className={isShuffle ? "text-green-400" : "text-gray-400"}
            />
            <SkipBack size={16} onClick={handlePrevious} className="cursor-pointer" />
            <button onClick={togglePlay} className="p-1 rounded-full bg-white text-black">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <SkipForward size={16} onClick={handleNext} className="cursor-pointer" />
            <Repeat
              size={16}
              onClick={() => setIsRepeat(!isRepeat)}
              className={isRepeat ? "text-green-400" : "text-gray-400"}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 0}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="hidden md:block w-32" />
      </div>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default SpotifyTheme;