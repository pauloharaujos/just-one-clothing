import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';
import TopBanner from '@/ui/cms/top-banner';
import HomeBanner from '@/ui/cms/home-banner';
import Products from '@/ui/components/home/Products';
import Features from '@/ui/components/home/Features';
import Newsletter from '@/ui/components/home/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner/>
      <HeaderWrapper />
      <HomeBanner />
      <Products />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
}
