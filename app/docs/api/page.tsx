import Link from 'next/link';

export default function APIReference() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
        <p className="text-xl text-gray-600">
          Complete reference for repository functions, data types, and integration patterns.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Repository Functions</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Repository (`repository/productRepository.ts`)</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">`getProductByUrlKey(productUrlKey: string)`</h4>
                  <p className="text-gray-600 mb-4">Fetches a single product by its URL key, including associated images.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Parameters:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <code className="bg-gray-100 px-2 py-1 rounded">productUrlKey</code> (string): The URL slug of the product (e.g., "t-shirt1")</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Returns:</h5>
                      <div className="bg-gray-50 rounded p-3">
                        <code className="text-sm text-gray-700">Promise&lt;Product | null&gt;</code>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Usage:</h5>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-green-400">
{`import { getProductByUrlKey } from '@/repository/productRepository';

const product = await getProductByUrlKey('t-shirt1');
if (product) {
  console.log('Product found:', product.name);
} else {
  console.log('Product not found');
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">`getRecommendedProducts(limit: number = 4)`</h4>
                  <p className="text-gray-600 mb-4">Fetches a specified number of visible products for homepage display, ordered by ID.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Parameters:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <code className="bg-gray-100 px-2 py-1 rounded">limit</code> (number, optional): Number of products to return (default: 4)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Returns:</h5>
                      <div className="bg-gray-50 rounded p-3">
                        <code className="text-sm text-gray-700">Promise&lt;Product[]&gt;</code>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Usage:</h5>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-green-400">
{`import { getRecommendedProducts } from '@/repository/productRepository';

// Get default 4 products
const products = await getRecommendedProducts();

// Get 8 products
const moreProducts = await getRecommendedProducts(8);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Data Access Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prisma Client Usage</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Basic Setup</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`import prisma from '@/prisma/prismaClient';

// All repository functions use this pattern
export async function someFunction() {
  return prisma.modelName.findMany({
    // query options
  });
}`}
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Common Query Patterns</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Find Single Record:</h5>
                      <div className="bg-gray-50 rounded p-3">
                        <pre className="text-sm text-gray-700">
{`const product = await prisma.product.findUnique({
  where: { url: 't-shirt1' }
});`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Find Multiple Records:</h5>
                      <div className="bg-gray-50 rounded p-3">
                        <pre className="text-sm text-gray-700">
{`const products = await prisma.product.findMany({
  where: { visible: true },
  take: 10
});`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Include Related Data:</h5>
                      <div className="bg-gray-50 rounded p-3">
                        <pre className="text-sm text-gray-700">
{`const product = await prisma.product.findUnique({
  where: { url: 't-shirt1' },
  include: {
    productImageLinks: {
      include: { image: true }
    }
  }
});`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Image Handling Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image URL Construction</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Pattern:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">const imageUrl = `/product/images/${product.id}/${image.filename}`;</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Example:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">// Product ID: 1</code><br />
                    <code className="text-green-400">// Image filename: "t-shirt-front.webp"</code><br />
                    <code className="text-green-400">// Result: "/product/images/1/t-shirt-front.webp"</code>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Access in Components</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">ProductPage Component:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`const image = product.productImageLinks[0]?.image;

{image ? (
  <Image
    src={\`/product/images/\${product.id}/\${image.filename}\`}
    alt={image.altText || product.name}
    width={800}
    height={800}
    className="h-full w-full object-contain"
    priority
  />
) : (
  <div className="flex h-full w-full items-center justify-center text-gray-400">
    No image
  </div>
)}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Homepage Products Component:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`{products.map((product) => {
  const image = product.productImageLinks[0]?.image;
  return (
    <div key={product.id}>
      {image ? (
        <Image
          src={\`/product/images/\${product.id}/\${image.filename}\`}
          alt={image.altText || product.name}
          width={180}
          height={180}
          className="h-full w-full object-cover"
        />
      ) : (
        <div>No image</div>
      )}
    </div>
  );
})}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Error Handling Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Not Found</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Repository Level:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`export async function getProductByUrlKey(productUrlKey: string) {
  return prisma.product.findUnique({
    where: { url: productUrlKey },
    include: {
      productImageLinks: {
        include: { image: true }
      }
    }
  });
  // Returns null if not found
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Component Level:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`export default async function Page({ params }: { params: { productUrlKey: string } }) {
  const product = await getProductByUrlKey(params.productUrlKey);

  if (!product) {
    notFound(); // Triggers custom 404 page
  }

  return <ProductPage product={product} />;
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Connection Errors</h3>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Prisma Error Handling:</h4>
                <div className="bg-gray-50 rounded p-3">
                  <pre className="text-sm text-gray-700">
{`try {
  const product = await getProductByUrlKey('t-shirt1');
  return product;
} catch (error) {
  console.error('Database error:', error);
  throw error; // Let Next.js handle the error
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Type Definitions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Types</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Base Product type
interface Product {
  id: number;
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
}

// Product with images
interface ProductWithImages extends Product {
  productImageLinks: Array<{
    image: {
      id: number;
      filename: string;
      altText: string | null;
      type: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }>;
}

// Component props
interface ProductPageProps {
  product: ProductWithImages;
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Types</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface Image {
  id: number;
  filename: string;
  altText: string | null;
  type: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductImageLink {
  productId: number;
  imageId: number;
  product: Product;
  image: Image;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Performance Considerations</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Optimization</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Indexes:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`-- Product table indexes
CREATE INDEX idx_product_url ON Product(url);
CREATE INDEX idx_product_visible ON Product(visible);

-- ProductImageLink table indexes
CREATE INDEX idx_product_image_link_product_id ON ProductImageLink(productId);
CREATE INDEX idx_product_image_link_image_id ON ProductImageLink(imageId);`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Query Optimization:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`// Efficient query with proper includes
const product = await prisma.product.findUnique({
  where: { url: productUrlKey },
  include: {
    productImageLinks: {
      include: { image: true }
    }
  }
});`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Optimization</h3>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Next.js Image Component:</h4>
                <div className="bg-gray-50 rounded p-3">
                  <pre className="text-sm text-gray-700">
{`<Image
  src={imageUrl}
  alt={altText}
  width={800}
  height={800}
  className="h-full w-full object-contain"
  priority={isAboveFold} // Set priority for above-the-fold images
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/types" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Types</h3>
            <p className="text-gray-600 text-sm">Complete type definitions and interfaces.</p>
          </Link>

          <Link 
            href="/docs/errors" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">⚠️ Error Handling</h3>
            <p className="text-gray-600 text-sm">Error handling patterns and best practices.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
