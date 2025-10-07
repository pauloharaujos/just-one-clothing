import { Metadata } from 'next';
import { UrlRewrite, resolvePath } from '@/repository/urlRewriteRepository';
import { getProductById } from '@/repository/productRepository';
import { Category, getCategoryById } from '@/repository/categoryRepository';

// Define Product type locally since it's not exported from the repository
type Product = {
  id: number;
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
  productImageLinks: Array<{
    image: {
      filename: string;
    };
  }>;
};

export interface MetadataContext {
  rewrite: UrlRewrite;
  product?: Product;
  category?: Category;
}

export class MetadataService {
  private baseUrl = 'https://justonedollar.com';

  /**
   * Generate metadata for a given path - handles all data fetching internally
   */
  async generateMetadataForPath(path: string): Promise<Metadata> {
    const rewrite = await resolvePath(path);
    
    if (!rewrite) {
      return this.generateNotFoundMetadata();
    }

    // Handle redirects - metadata doesn't matter for redirects
    if (rewrite.redirectType && rewrite.targetPath && rewrite.requestPath !== rewrite.targetPath) {
      return {};
    }

    // Fetch the target entity
    let product, category;
    if (rewrite.targetType === 'PRODUCT') {
      product = await getProductById(rewrite.targetId);
    } else if (rewrite.targetType === 'CATEGORY') {
      category = await getCategoryById(rewrite.targetId);
    }

    return this.generateMetadata({ 
      rewrite, 
      product: product || undefined, 
      category: category || undefined 
    });
  }

  /**
   * Generate metadata for a resolved URL rewrite
   */
  async generateMetadata(context: MetadataContext): Promise<Metadata> {
    const { rewrite, product, category } = context;

    // Handle redirects - metadata doesn't matter for redirects
    if (rewrite.redirectType && rewrite.targetPath && rewrite.requestPath !== rewrite.targetPath) {
      return {};
    }

    const canonical = this.getCanonicalUrl(rewrite);

    if (rewrite.targetType === 'PRODUCT' && product) {
      return this.generateProductMetadata(product, canonical);
    }

    if (rewrite.targetType === 'CATEGORY' && category) {
      return this.generateCategoryMetadata(category, canonical);
    }

    return this.generateNotFoundMetadata();
  }

  /**
   * Generate metadata for a product
   */
  private generateProductMetadata(product: Product, canonical: string): Metadata {
    return {
      title: product.name,
      description: product.description,
      alternates: {
        canonical: canonical,
      },
      openGraph: {
        title: product.name,
        description: product.description,
        type: 'website',
        url: canonical,
        images: this.getProductImages(product),
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: this.getProductImages(product),
      },
      other: {
        'product:price:amount': product.price.toString(),
        'product:price:currency': 'USD',
        'product:availability': product.visible ? 'in stock' : 'out of stock',
      },
    };
  }

  /**
   * Generate metadata for a category
   */
  private generateCategoryMetadata(category: Category, canonical: string): Metadata {
    const description = category.description || `Browse ${category.name} products`;

    return {
      title: category.name,
      description: description,
      alternates: {
        canonical: canonical,
      },
      openGraph: {
        title: category.name,
        description: description,
        type: 'website',
        url: canonical,
      },
      twitter: {
        card: 'summary',
        title: category.name,
        description: description,
      },
    };
  }

  /**
   * Generate metadata for 404 pages
   */
  private generateNotFoundMetadata(): Metadata {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  /**
   * Get canonical URL from rewrite
   */
  private getCanonicalUrl(rewrite: UrlRewrite): string {
    return rewrite.isCanonical 
      ? `${this.baseUrl}${rewrite.requestPath}` 
      : `${this.baseUrl}${rewrite.targetPath || rewrite.requestPath}`;
  }

  /**
   * Get product images for Open Graph
   */
  private getProductImages(product: Product): string[] {
    if (!product.productImageLinks || product.productImageLinks.length === 0) {
      return [];
    }

    return product.productImageLinks
      .slice(0, 4) // Limit to 4 images for Open Graph
      .map((link: any) => link.image.filename)
      .filter(Boolean);
  }

  /**
   * Generate JSON-LD structured data for products
   */
  generateProductJsonLd(product: Product, canonical: string): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      sku: product.sku,
      url: canonical,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: product.visible ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
      image: this.getProductImages(product),
    };
  }

  /**
   * Generate JSON-LD structured data for categories
   */
  generateCategoryJsonLd(category: Category, canonical: string, breadcrumb?: Category[]): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: category.name,
      description: category.description || `Browse ${category.name} products`,
      url: canonical,
      mainEntity: {
        '@type': 'ItemList',
        name: category.name,
        description: category.description || `Browse ${category.name} products`,
      },
      breadcrumb: breadcrumb ? {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: this.baseUrl,
          },
          ...breadcrumb.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: item.name,
            item: `${this.baseUrl}/${item.url}`,
          })),
        ],
      } : undefined,
    };
  }
}

// Export singleton instance
export const metadataService = new MetadataService();
