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
    heroVideo: "",
    movies: [{ cover: "", video: "" }],
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
            <div>
              <Label>Link da Playlist</Label>
              <Input
                value={genericData.playlist || ""}
                onChange={(e) =>
                  setGenericData({ ...genericData, playlist: e.target.value })
                }
                placeholder="URL da playlist"
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
