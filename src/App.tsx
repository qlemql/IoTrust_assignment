import { BannerCarousel } from './components/banner';
import { FavoritesList } from './components/favorites';
import { useBanners } from './hooks/useBanners';

const App = () => {
  const { data: banners = [], isLoading: isBannersLoading } = useBanners();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <section className="pt-4">
          <BannerCarousel banners={banners} isLoading={isBannersLoading} />
        </section>

        <section className="mt-6">
          <FavoritesList />
        </section>
      </main>
    </div>
  );
};

export default App;
