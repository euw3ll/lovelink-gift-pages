// src/components/ui/theme-templates/types.ts

// Estrutura base que todos os temas devem ter
export interface BaseThemeData {
  name1: string;
  name2: string;
}

// Estrutura de dados para o novo tema Netflix
export interface NetflixThemeData extends BaseThemeData {
  profileImage1: string | null;
  profileImage2: string | null;
  bannerImage: string | null;
  bannerTitle: string;
  bannerDescription: string;
  movies: {
    id: number;
    coverImage: string | null;
    videoUrl: string | null;
    title: string;
  }[];
}

// Estrutura de dados para temas mais simples (como os existentes)
export interface SimpleThemeData extends BaseThemeData {
  uploadedImage: string | null;
  caption?: string;
  date?: string;
}

// Tipo união para todos os possíveis dados de tema que o sistema suportará
export type ThemeData = NetflixThemeData | SimpleThemeData;

// Propriedades que cada componente de tema visual irá receber.
// Usamos um tipo genérico para garantir que cada tema receba os dados corretos.
export interface ThemeComponentProps<T extends BaseThemeData = ThemeData> {
  data: T;
}
