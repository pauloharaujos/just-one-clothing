import { notFound, redirect, permanentRedirect } from 'next/navigation';
import { resolvePath } from '@/repository/urlRewriteRepository';
import { getProductById } from '@/repository/productRepository';
import { getCategoryById, getProductsByCategory } from '@/repository/categoryRepository';
import ProductPage from '@/ui/components/product/ProductPage';
import CategoryPage from '@/ui/components/category/CategoryPage';
import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';
import { metadataService } from '@/services/metadataService';
import { Metadata } from 'next';

export const revalidate = 300; // 5 minutes

export async function generateMetadata({ params }: { params: Promise<{ segments?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const path = '/' + (resolvedParams.segments?.join('/') ?? '');
  return metadataService.generateMetadataForPath(path);
}

export default async function Page({ params }: { params: Promise<{ segments?: string[] }> }) {
  const resolvedParams = await params;
  const path = '/' + (resolvedParams.segments?.join('/') ?? '');
  const rewrite = await resolvePath(path);
  
  if (!rewrite) {
    notFound();
  }

  // Handle redirects
  if (rewrite.redirectType && rewrite.targetPath && rewrite.requestPath !== rewrite.targetPath) {
    if (rewrite.redirectType === 301) {
      permanentRedirect(rewrite.targetPath);
    }
    redirect(rewrite.targetPath);
  }

  if (rewrite.targetType === 'PRODUCT') {
    const product = await getProductById(rewrite.targetId);
    if (!product) {
      notFound();
    }

    return (
      <div>
        <HeaderWrapper />
        <ProductPage product={product} />
        <Footer />
      </div>
    );
  }

  if (rewrite.targetType === 'CATEGORY') {
    const category = await getCategoryById(rewrite.targetId);
    if (!category) {
      notFound();
    }

    const products = await getProductsByCategory(rewrite.targetId);

    return (
      <div>
        <HeaderWrapper />
        <CategoryPage category={category} products={products} />
        <Footer />
      </div>
    );
  }

  notFound();
}
