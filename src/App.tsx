import { useState } from 'react';
import { BannerCarousel } from './components/banner';
import { FavoritesList } from './components/favorites';
import { ServiceList, ServiceDetailSheet } from './components/services';
import { useBanners } from './hooks/useBanners';
import type { Service } from './types';

const App = () => {
  const { data: banners = [], isLoading: isBannersLoading } = useBanners();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50">
      <main className="flex flex-col pb-6">
        <section>
          <BannerCarousel banners={banners} isLoading={isBannersLoading} />
        </section>

        <section className="mt-6">
          <FavoritesList />
        </section>

        <section className="mt-6 min-h-[60vh]">
          <ServiceList onServiceSelect={handleServiceSelect} />
        </section>
      </main>

      <ServiceDetailSheet
        service={selectedService}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default App;
