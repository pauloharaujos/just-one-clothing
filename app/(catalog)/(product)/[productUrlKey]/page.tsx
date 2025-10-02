import { notFound } from 'next/navigation';
import { getProductByUrlKey } from '@/repository/productRepository';
import ProductPage from '@/ui/components/product/ProductPage';
import Header from '@/ui/components/Header';
import Footer from '@/ui/components/Footer';

export default async function Page({ params }: { params: { productUrlKey: string } }) {
  const product = await getProductByUrlKey(params.productUrlKey);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Header />
      <ProductPage product={product} />
      <Footer />
    </div>
  );
}
