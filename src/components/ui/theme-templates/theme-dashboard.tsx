import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ThemeType =
  | "netflix"
  | "spotify"
  | "instagram"
  | "polaroid"
  | "love-letter"
  | "love-map";

interface ThemeDashboardProps {
  theme: ThemeType;
  onSubmit?: (data: unknown) => void;
}

const ThemeDashboard = ({ theme, onSubmit }: ThemeDashboardProps) => {
  const [netflixData, setNetflixData] = useState({
    name1: "",
    name2: "",
    uploadedImage: "",
    heroVideo: "",
    movies: [{ cover: "", video: "" }],
  });

  const [spotifyData, setSpotifyData] = useState({
    name1: "",
    name2: "",
    coverImage: "",
    songs: [{ title: "", artist: "", audio: "", duration: "" }],
  });

  const [instagramData, setInstagramData] = useState({
    name1: "",
    name2: "",
    image: "",
    caption: "",
  });

  const [loveLetterData, setLoveLetterData] = useState({
    name1: "",
    name2: "",
    uploadedImage: "",
  });

  const [loveMapData, setLoveMapData] = useState({
    name1: "",
    name2: "",
    uploadedImage: "",
  });

  const [genericData, setGenericData] = useState<Record<string, string>>({});

  const handleNetflixMovieChange = (
    index: number,
    field: "cover" | "video",
    value: string
  ) => {
    const movies = [...netflixData.movies];
    movies[index] = { ...movies[index], [field]: value };
    setNetflixData({ ...netflixData, movies });
  };

  const addNetflixMovie = () => {
    setNetflixData({
      ...netflixData,
      movies: [...netflixData.movies, { cover: "", video: "" }],
    });
  };

  const renderFields = () => {
    switch (theme) {
      case "netflix":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome 1</Label>
                <Input
                  value={netflixData.name1}
                  onChange={(e) =>
                    setNetflixData({ ...netflixData, name1: e.target.value })
                  }
                  placeholder="Nome 1"
                />
              </div>
              <div>
                <Label>Nome 2</Label>
                <Input
                  value={netflixData.name2}
                  onChange={(e) =>
                    setNetflixData({ ...netflixData, name2: e.target.value })
                  }
                  placeholder="Nome 2"
                />
              </div>
            </div>
            <div>
              <Label>Imagem de capa (URL)</Label>
              <Input
                value={netflixData.uploadedImage}
                onChange={(e) =>
                  setNetflixData({
                    ...netflixData,
                    uploadedImage: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Vídeo de capa (URL)</Label>
              <Input
                value={netflixData.heroVideo}
                onChange={(e) =>
                  setNetflixData({
                    ...netflixData,
                    heroVideo: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Filmes</Label>
              {netflixData.movies.map((movie, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <Input
                    value={movie.cover}
                    onChange={(e) =>
                      handleNetflixMovieChange(index, "cover", e.target.value)
                    }
                    placeholder="URL da capa"
                  />
                  <Input
                    value={movie.video}
                    onChange={(e) =>
                      handleNetflixMovieChange(index, "video", e.target.value)
                    }
                    placeholder="URL do vídeo"
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addNetflixMovie}>
                Adicionar Filme
              </Button>
            </div>
          </div>
        );
      case "spotify":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome 1</Label>
                <Input
                  value={spotifyData.name1}
                  onChange={(e) =>
                    setSpotifyData({ ...spotifyData, name1: e.target.value })
                  }
                  placeholder="Nome 1"
                />
              </div>
              <div>
                <Label>Nome 2</Label>
                <Input
                  value={spotifyData.name2}
                  onChange={(e) =>
                    setSpotifyData({ ...spotifyData, name2: e.target.value })
                  }
                  placeholder="Nome 2"
                />
              </div>
            </div>
            <div>
              <Label>Capa da playlist (URL)</Label>
              <Input
                value={spotifyData.coverImage}
                onChange={(e) =>
                  setSpotifyData({
                    ...spotifyData,
                    coverImage: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Músicas</Label>
              {spotifyData.songs.map((song, index) => (
                <div key={index} className="grid grid-cols-4 gap-2">
                  <Input
                    value={song.title}
                    onChange={(e) => {
                      const songs = [...spotifyData.songs];
                      songs[index] = { ...songs[index], title: e.target.value };
                      setSpotifyData({ ...spotifyData, songs });
                    }}
                    placeholder="Título"
                  />
                  <Input
                    value={song.artist}
                    onChange={(e) => {
                      const songs = [...spotifyData.songs];
                      songs[index] = { ...songs[index], artist: e.target.value };
                      setSpotifyData({ ...spotifyData, songs });
                    }}
                    placeholder="Artista"
                  />
                  <Input
                    value={song.audio}
                    onChange={(e) => {
                      const songs = [...spotifyData.songs];
                      songs[index] = { ...songs[index], audio: e.target.value };
                      setSpotifyData({ ...spotifyData, songs });
                    }}
                    placeholder="URL do áudio"
                  />
                  <Input
                    value={song.duration}
                    onChange={(e) => {
                      const songs = [...spotifyData.songs];
                      songs[index] = { ...songs[index], duration: e.target.value };
                      setSpotifyData({ ...spotifyData, songs });
                    }}
                    placeholder="Duração"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setSpotifyData({
                    ...spotifyData,
                    songs: [
                      ...spotifyData.songs,
                      { title: "", artist: "", audio: "", duration: "" },
                    ],
                  })
                }
              >
                Adicionar Música
              </Button>
            </div>
          </div>
        );
      case "instagram":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome 1</Label>
                <Input
                  value={instagramData.name1}
                  onChange={(e) =>
                    setInstagramData({ ...instagramData, name1: e.target.value })
                  }
                  placeholder="Nome 1"
                />
              </div>
              <div>
                <Label>Nome 2</Label>
                <Input
                  value={instagramData.name2}
                  onChange={(e) =>
                    setInstagramData({ ...instagramData, name2: e.target.value })
                  }
                  placeholder="Nome 2"
                />
              </div>
            </div>
            <div>
              <Label>Imagem do post (URL)</Label>
              <Input
                value={instagramData.image}
                onChange={(e) =>
                  setInstagramData({
                    ...instagramData,
                    image: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Legenda</Label>
              <Input
                value={instagramData.caption}
                onChange={(e) =>
                  setInstagramData({
                    ...instagramData,
                    caption: e.target.value,
                  })
                }
                placeholder="Nossa história..."
              />
            </div>
          </div>
        );
      case "polaroid":
        return (
          <div className="space-y-4">
            <div>
              <Label>Fotos (separadas por vírgula)</Label>
              <Input
                value={genericData.photos || ""}
                onChange={(e) =>
                  setGenericData({ ...genericData, photos: e.target.value })
                }
                placeholder="URL1, URL2, URL3"
              />
            </div>
          </div>
        );
      case "love-letter":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome 1</Label>
                <Input
                  value={loveLetterData.name1}
                  onChange={(e) =>
                    setLoveLetterData({ ...loveLetterData, name1: e.target.value })
                  }
                  placeholder="Nome 1"
                />
              </div>
              <div>
                <Label>Nome 2</Label>
                <Input
                  value={loveLetterData.name2}
                  onChange={(e) =>
                    setLoveLetterData({ ...loveLetterData, name2: e.target.value })
                  }
                  placeholder="Nome 2"
                />
              </div>
            </div>
            <div>
              <Label>Imagem (URL)</Label>
              <Input
                value={loveLetterData.uploadedImage}
                onChange={(e) =>
                  setLoveLetterData({
                    ...loveLetterData,
                    uploadedImage: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
          </div>
        );
      case "love-map":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome 1</Label>
                <Input
                  value={loveMapData.name1}
                  onChange={(e) =>
                    setLoveMapData({ ...loveMapData, name1: e.target.value })
                  }
                  placeholder="Nome 1"
                />
              </div>
              <div>
                <Label>Nome 2</Label>
                <Input
                  value={loveMapData.name2}
                  onChange={(e) =>
                    setLoveMapData({ ...loveMapData, name2: e.target.value })
                  }
                  placeholder="Nome 2"
                />
              </div>
            </div>
            <div>
              <Label>Imagem (URL)</Label>
              <Input
                value={loveMapData.uploadedImage}
                onChange={(e) =>
                  setLoveMapData({
                    ...loveMapData,
                    uploadedImage: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Nenhuma configuração especial para este tema.
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data =
      theme === "netflix"
        ? netflixData
        : theme === "spotify"
        ? spotifyData
        : theme === "instagram"
        ? instagramData
        : theme === "love-letter"
        ? loveLetterData
        : theme === "love-map"
        ? loveMapData
        : genericData;
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderFields()}
      <Button type="submit">Salvar</Button>
    </form>
  );
};

export default ThemeDashboard;
