import { create } from 'zustand';
import type { ConfigState } from '../types';
import { DEFAULT_LANGUAGE, DEFAULT_PLATFORM, DEFAULT_ENVIRONMENT } from '../constants';

export const useConfigStore = create<ConfigState>((set) => ({
  language: DEFAULT_LANGUAGE,
  platform: DEFAULT_PLATFORM,
  environment: DEFAULT_ENVIRONMENT,
  setLanguage: (language) => set({ language }),
  setPlatform: (platform) => set({ platform }),
  setEnvironment: (environment) => set({ environment }),
}));
