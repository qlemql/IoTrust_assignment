import { useState } from 'react';
import { BannerCarousel } from './components/banner';
import { FavoritesList } from './components/favorites';
import { ServiceList, ServiceDetailSheet } from './components/services';
import { ErrorBoundary } from './components/common';
import { useBanners } from './hooks/useBanners';
import type { Service } from './types';

const App = () => {
  const { data: banners = [], isLoading: isBannersLoading, isError: isBannersError } = useBanners();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-y-auto bg-gray-50">
        <main className="flex flex-col pb-6">
          <section>
            <BannerCarousel
              banners={banners}
              isLoading={isBannersLoading}
              isError={isBannersError}
            />
          </section>

          <section className="mt-6">
            <ErrorBoundary>
              <FavoritesList />
            </ErrorBoundary>
          </section>

          <section className="mt-6 min-h-[60vh]">
            <ErrorBoundary>
              <ServiceList onServiceSelect={handleServiceSelect} />
            </ErrorBoundary>
          </section>
        </main>

        <ServiceDetailSheet
          service={selectedService}
          onClose={handleCloseDetail}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
