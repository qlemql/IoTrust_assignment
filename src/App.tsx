import { BannerCarousel } from './components/banner';
import { useBanners } from './hooks/useBanners';

const App = () => {
  const { data: banners = [], isLoading } = useBanners();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        <section className="pt-4">
          <BannerCarousel banners={banners} isLoading={isLoading} />
        </section>
      </main>
    </div>
  );
};

export default App;
