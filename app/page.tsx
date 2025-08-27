import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';
import TopBanner from '@/app/ui/cms/top-banner';
import HomeBanner from '@/app/ui/cms/home-banner';
import Products from '@/app/ui/components/products';

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
