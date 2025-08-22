// src/lib/themes.ts

import {
  NetflixThemeData,
  SimpleThemeData,
} from "@/components/ui/theme-templates/types";

// Define os tipos de campos que nosso formulário dinâmico pode renderizar
export type FormFieldType =
  | "text"
  | "textarea"
  | "image_url"
  | "video_url"
  | "date";

// Define a estrutura de um campo individual no formulário
export interface ThemeField {
  id: string; // Corresponde à chave no objeto de dados do tema
  label: string;
  type: FormFieldType;
  placeholder?: string;
}

// Define a estrutura de uma seção do formulário (para agrupar campos)
export interface ThemeFormSection {
  title: string;
  fields: ThemeField[];
}

// Define a estrutura para uma lista de itens (como os 6 filmes da Netflix)
export interface ThemeFieldList {
  id: string; // A chave no objeto de dados (ex: 'movies')
  title: string; // O nome de cada item na lista (ex: "Filme")
  limit: number;
  fields: ThemeField[];
}

// Configuração completa de um tema
export interface ThemeConfig {
  name: string;
  description: string;
  fields?: ThemeFormSection[]; // Campos principais do formulário
  fieldLists?: ThemeFieldList[]; // Listas de campos, como a grade de filmes
  getDefaultData: () => Record<string, unknown>; // Função que retorna a estrutura de dados padrão para um novo item
}

// Tipos de temas disponíveis em todo o sistema
export type ThemeType =
  | "netflix"
  | "spotify"
  | "instagram"
  | "polaroid"
  | "love-letter"
  | "love-map";

// Registro central de todos os temas e suas configurações de formulário
export const themeRegistry: Record<ThemeType, ThemeConfig> = {
  netflix: {
    name: "Netflix & Chill",
    description: "Crie sua própria série romântica",
    fields: [
      {
        title: "Perfis 'Quem está assistindo?'",
        fields: [
          {
            id: "name1",
            label: "Nome do Perfil 1",
            type: "text",
            placeholder: "Seu nome",
          },
          {
            id: "profileImage1",
            label: "Foto do Perfil 1 (URL)",
            type: "image_url",
            placeholder: "https://.../foto1.jpg",
          },
          {
            id: "name2",
            label: "Nome do Perfil 2",
            type: "text",
            placeholder: "Nome da pessoa amada",
          },
          {
            id: "profileImage2",
            label: "Foto do Perfil 2 (URL)",
            type: "image_url",
            placeholder: "https://.../foto2.jpg",
          },
        ],
      },
      {
        title: "Banner Principal",
        fields: [
          {
            id: "bannerImage",
            label: "Imagem de Fundo do Banner (URL)",
            type: "image_url",
          },
          {
            id: "bannerTitle",
            label: "Título do Banner",
            type: "text",
            placeholder: "Ex: Nossa História de Amor",
          },
          {
            id: "bannerDescription",
            label: "Descrição do Banner",
            type: "textarea",
            placeholder: "Uma linda descrição sobre vocês...",
          },
        ],
      },
    ],
    fieldLists: [
      {
        id: "movies",
        title: "Filme", // Usado como prefixo, ex: "Filme 1", "Filme 2"
        limit: 6,
        fields: [
          {
            id: "title",
            label: "Título",
            type: "text",
            placeholder: "Ex: Nossa Primeira Viagem",
          },
          {
            id: "coverImage",
            label: "Imagem de Capa (URL)",
            type: "image_url",
          },
          {
            id: "videoUrl",
            label: "URL do Vídeo",
            type: "video_url",
            placeholder: "https://.../video.mp4",
          },
        ],
      },
    ],
    getDefaultData: (): NetflixThemeData => ({
      name1: "",
      name2: "",
      profileImage1: null,
      profileImage2: null,
      bannerImage: null,
      bannerTitle: "",
      bannerDescription: "",
      movies: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Momento ${i + 1}`,
        coverImage: null,
        videoUrl: null,
      })),
    }),
  },
  // --- Definições placeholder para os outros temas para manter a consistência ---
  spotify: {
    name: "Spotify Love",
    description: "A playlist dos seus momentos",
    fields: [
      {
        title: "Informações Principais",
        fields: [
          { id: "name1", label: "Seu Nome", type: "text" },
          { id: "name2", label: "Nome da Pessoa Amada", type: "text" },
          {
            id: "uploadedImage",
            label: "Capa da Playlist (URL)",
            type: "image_url",
          },
          { id: "caption", label: "Descrição da Playlist", type: "textarea" },
        ],
      },
    ],
    getDefaultData: (): SimpleThemeData => ({
      name1: "",
      name2: "",
      uploadedImage: null,
      caption: "",
    }),
  },
  polaroid: {
    name: "Álbum Polaroid",
    description: "Memórias em fotos vintage",
    fields: [
      {
        title: "Detalhes da Foto",
        fields: [
          { id: "uploadedImage", label: "Sua Foto (URL)", type: "image_url" },
          {
            id: "caption",
            label: "Legenda da Polaroid",
            type: "text",
            placeholder: "Nosso momento especial ❤️",
          },
          { id: "date", label: "Data da Foto", type: "date" },
        ],
      },
    ],
    getDefaultData: (): SimpleThemeData => ({
      name1: "",
      name2: "",
      uploadedImage: null,
      caption: "",
      date: "",
    }),
  },
  instagram: {
    name: "Instagram Stories",
    description: "Stories que ficam para sempre",
    fields: [
      {
        title: "Detalhes do Post",
        fields: [
          { id: "name1", label: "Seu @username", type: "text" },
          { id: "name2", label: "@username da Pessoa Amada", type: "text" },
          {
            id: "uploadedImage",
            label: "Foto do Post (URL)",
            type: "image_url",
          },
          { id: "caption", label: "Legenda", type: "textarea" },
        ],
      },
    ],
    getDefaultData: (): SimpleThemeData => ({
      name1: "",
      name2: "",
      uploadedImage: null,
      caption: "",
    }),
  },
  "love-letter": {
    name: "Carta de Amor",
    description: "Elegância clássica e atemporal",
    fields: [
      {
        title: "Conteúdo da Carta",
        fields: [
          { id: "name1", label: "Remetente (Seu Nome)", type: "text" },
          { id: "name2", label: "Destinatário(a)", type: "text" },
          {
            id: "uploadedImage",
            label: "Foto Anexada (URL)",
            type: "image_url",
          },
          { id: "caption", label: "Corpo da Carta", type: "textarea" },
        ],
      },
    ],
    getDefaultData: (): SimpleThemeData => ({
      name1: "",
      name2: "",
      uploadedImage: null,
      caption: "",
    }),
  },
  "love-map": {
    name: "Mapa do Amor",
    description: "Lugares especiais da relação",
    fields: [
      {
        title: "Detalhes do Mapa",
        fields: [
          { id: "name1", label: "Seu Nome", type: "text" },
          { id: "name2", label: "Nome da Pessoa Amada", type: "text" },
          {
            id: "uploadedImage",
            label: "Foto Central (URL)",
            type: "image_url",
          },
        ],
      },
    ],
    getDefaultData: (): SimpleThemeData => ({
      name1: "",
      name2: "",
      uploadedImage: null,
      caption: "",
    }),
  },
};
