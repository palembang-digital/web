import Events from '@/modules/Home/components/Events';
import Footer from '@/modules/Home/components/Footer';
import Header from '@/modules/Home/components/Header';
import Hero from '@/modules/Home/components/Hero';

function HomePage() {
  return (
    <div>
      <Header />

      <Hero />

      <div className="container flex flex-col items-center justify-center px-4 md:px-6 mb-24">
        <Events />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
