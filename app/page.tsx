import Header from '@/ui/components/header';
import Footer from '@/ui/components/footer';
import TopBanner from '@/ui/cms/top-banner';
import HomeBanner from '@/ui/cms/home-banner';
import Products from '@/ui/components/home/products';

export default function Home() {
  return (
    <div>
      <TopBanner/>
      <Header />
      <HomeBanner />
      <Products />
      <Footer />
    </div>
  );
}
