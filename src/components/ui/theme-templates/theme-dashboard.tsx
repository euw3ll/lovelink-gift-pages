// Caminho: src/components/ui/theme-templates/theme-dashboard.tsx

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Tipos que definem os temas e os dados que cada um pode ter
export type ThemeType =
  | "netflix"
  | "spotify"
  | "instagram"
  | "polaroid"
  | "love-letter"
  | "love-map";

// Estrutura unificada para os dados do formulário
interface FormData {
  // Campos comuns a todos os temas
  name1: string;
  name2: string;
  uploadedImage: string;
  caption: string;
  date: string;

  // Campos específicos de cada tema
  themeSpecific: {
    heroVideo?: string;
    songs?: {
      title: string;
      artist: string;
      audio: string;
      duration: string;
    }[];
    // Adicionar outros campos específicos aqui no futuro
  };
}

interface ThemeDashboardProps {
  theme: ThemeType;
  initialData?: Partial<FormData>; // Permite carregar dados iniciais para edição
  onSubmit?: (data: FormData) => void;
}

const ThemeDashboard = ({
  theme,
  initialData,
  onSubmit,
}: ThemeDashboardProps) => {
  // ESTADO UNIFICADO: Em vez de vários useStates, agora temos um só!
  const [formData, setFormData] = useState<FormData>({
    name1: initialData?.name1 || "",
    name2: initialData?.name2 || "",
    uploadedImage: initialData?.uploadedImage || "",
    caption: initialData?.caption || "",
    date: initialData?.date || "",
    themeSpecific: {
      heroVideo: initialData?.themeSpecific?.heroVideo || "",
      songs: initialData?.themeSpecific?.songs || [],
    },
  });

  // Atualiza o formulário se o tema ou os dados iniciais mudarem
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  // Handler genérico para atualizar campos comuns
  const handleCommonChange = (
    field: keyof Omit<FormData, "themeSpecific">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função que renderiza os campos específicos de cada tema
  const renderThemeSpecificFields = () => {
    switch (theme) {
      case "netflix":
        return (
          <div>
            <Label>Vídeo de Destaque (URL)</Label>
            <Input
              value={formData.themeSpecific.heroVideo}
              onChange={(e) =>
                setFormData((f) => ({
                  ...f,
                  themeSpecific: {
                    ...f.themeSpecific,
                    heroVideo: e.target.value,
                  },
                }))
              }
              placeholder="https://exemplo.com/video.mp4"
            />
          </div>
        );
      case "spotify":
        // A lógica para adicionar/remover/editar músicas seria mais complexa,
        // mas aqui está um placeholder para o nome da playlist.
        return (
          <div>
            <Label>Playlist</Label>
            <Textarea
              value={
                formData.themeSpecific.songs
                  ?.map((s) => `${s.title} - ${s.artist}`)
                  .join("\\n") || ""
              }
              placeholder="Cole aqui a lista de músicas"
              readOnly
            />
            <p className="text-xs text-muted-foreground mt-1">
              Edição de músicas será adicionada no futuro.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Este tema utiliza apenas os campos comuns.
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-medium">
        Editando Tema:{" "}
        <span className="font-bold capitalize text-primary">{theme}</span>
      </h3>

      {/* Campos Comuns */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Seu nome</Label>
          <Input
            value={formData.name1}
            onChange={(e) => handleCommonChange("name1", e.target.value)}
          />
        </div>
        <div>
          <Label>Nome da pessoa amada</Label>
          <Input
            value={formData.name2}
            onChange={(e) => handleCommonChange("name2", e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label>URL da Imagem Principal</Label>
        <Input
          value={formData.uploadedImage}
          onChange={(e) => handleCommonChange("uploadedImage", e.target.value)}
        />
      </div>
      <div>
        <Label>Legenda</Label>
        <Textarea
          value={formData.caption}
          onChange={(e) => handleCommonChange("caption", e.target.value)}
        />
      </div>
      <div>
        <Label>Data</Label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => handleCommonChange("date", e.target.value)}
        />
      </div>

      <hr />

      {/* Campos Específicos */}
      <div className="space-y-2">
        <h4 className="font-medium">Configurações Específicas do Tema</h4>
        {renderThemeSpecificFields()}
      </div>

      <Button type="submit" className="w-full">
        Salvar Alterações
      </Button>
    </form>
  );
};

export default ThemeDashboard;
