import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';
import TopBanner from '@/ui/cms/top-banner';
import HomeBanner from '@/ui/cms/home-banner';
import Products from '@/ui/components/home/Products';

export default function Home() {
  return (
    <div>
      <TopBanner/>
      <HeaderWrapper />
      <HomeBanner />
      <Products />
      <Footer />
    </div>
  );
}
