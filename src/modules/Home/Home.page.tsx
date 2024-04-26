import Footer from '@/modules/Home/components/Footer';
import Header from '@/modules/Home/components/Header';

import styles from './Home.page.module.css';

function HomePage() {
  return (
    <div>
      <Header />

      <main className={styles.main}>Coming soon</main>

      <Footer />
    </div>
  );
}

export default HomePage;
