import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';
import NotFoundContent from '@/ui/components/NotFoundContent';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />
      <NotFoundContent />
      <Footer />
    </div>
  );
}
