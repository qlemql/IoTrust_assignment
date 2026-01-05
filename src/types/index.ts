export type Language = 'ko' | 'en';
export type Platform = 'android' | 'ios';
export type Environment = 'dev' | 'stage' | 'prod';

export interface LocalizedText {
  ko: string;
  en: string;
}

export interface Banner {
  id: string;
  imageUrl: LocalizedText;
  description: LocalizedText;
  ctaText: LocalizedText;
  ctaUrl: LocalizedText;
}

export interface Service {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  iconUrl: string;
  url: string;
  networks: string[];
  supportedLanguages: Language[];
  supportedPlatforms: Platform[];
  supportedEnvironments: Environment[];
}

export interface Favorite {
  id: string;
  name: string;
  url: string;
  iconUrl: string;
}

export interface ConfigState {
  language: Language;
  platform: Platform;
  environment: Environment;
  setLanguage: (lang: Language) => void;
  setPlatform: (platform: Platform) => void;
  setEnvironment: (env: Environment) => void;
}

export interface FavoritesState {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
}
