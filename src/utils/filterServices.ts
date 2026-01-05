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
