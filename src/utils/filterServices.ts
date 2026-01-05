import type { Service, Language, Platform, Environment } from '../types';

interface FilterConfig {
  language: Language;
  platform: Platform;
  environment: Environment;
}

export const shouldShowService = (service: Service, config: FilterConfig): boolean => {
  const { language, platform, environment } = config;

  return (
    service.supportedLanguages.includes(language) &&
    service.supportedPlatforms.includes(platform) &&
    service.supportedEnvironments.includes(environment)
  );
};

export const filterServices = (services: Service[], config: FilterConfig): Service[] =>
  services.filter((service) => shouldShowService(service, config));

export const searchServices = (
  services: Service[],
  searchQuery: string,
  language: Language
): Service[] => {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return services;

  return services.filter((service) => {
    const name = service.name[language].toLowerCase();
    const description = service.description[language].toLowerCase();
    return name.includes(query) || description.includes(query);
  });
};

export const filterAndSearchServices = (
  services: Service[],
  config: FilterConfig,
  searchQuery: string
): Service[] => {
  const filtered = filterServices(services, config);
  return searchServices(filtered, searchQuery, config.language);
};
