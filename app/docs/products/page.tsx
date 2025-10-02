import Link from 'next/link';

export default function Products() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Management</h1>
        <p className="text-xl text-gray-600">
          Learn how products and images are stored, managed, and displayed in the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗄️ Database Design</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Table Structure</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Product {
  id          Int     @id @default(autoincrement())
  name        String  -- Product display name
  sku         String  -- Stock Keeping Unit identifier
  url         String  @unique -- SEO-friendly URL slug
  description String  -- Product description
  price       Float   -- Product price
  visible     Boolean @default(true) -- Show/hide product
  productImageLinks ProductImageLink[] -- Relationship to images
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Management</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Image {
  id        Int      @id @default(autoincrement())
  filename  String   -- Only filename (e.g., "product-image.webp")
  altText   String?  -- Accessibility alt text
  type      String?  -- Image type/category
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  productImageLinks ProductImageLink[]
}

model ProductImageLink {
  productId Int
  imageId   Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  image     Image   @relation(fields: [imageId], references: [id], onDelete: Cascade)
  
  @@id([productId, imageId])
  @@index([productId])
  @@index([imageId])
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📁 File Organization</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Image Storage Structure</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`public/product/images/
├── 1/                          # Product ID 1
│   ├── product-image-01.webp
│   ├── product-image-02.webp
│   └── ...
├── 2/                          # Product ID 2
│   ├── product-image-01.webp
│   └── ...
└── ...`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Naming Conventions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Directory</h4>
                  <p className="text-sm text-gray-600">Use product ID as folder name</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Files</h4>
                  <p className="text-sm text-gray-600">Descriptive names with webp extension</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Database</h4>
                  <p className="text-sm text-gray-600">Store only filename (not full path)</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Alt Text</h4>
                  <p className="text-sm text-gray-600">Always provide alt text for accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Implementation Details</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">URL Construction</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pattern</h4>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">const imageUrl = `/product/images/${product.id}/${image.filename}`;</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">// Product ID: 1</code><br />
                      <code className="text-green-400">// Image filename: "t-shirt-front.webp"</code><br />
                      <code className="text-green-400">// Result: "/product/images/1/t-shirt-front.webp"</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Queries</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Get Product by URL Key</h4>
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
}`}
                    </pre>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Get Recommended Products</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`export async function getRecommendedProducts(limit: number = 4) {
  return prisma.product.findMany({
    where: { visible: true },
    take: limit,
    include: {
      productImageLinks: {
        include: { image: true }
      }
    },
    orderBy: { id: 'asc' }
  });
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Image Handling</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Implementation</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">ProductPage Component</h4>
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
                  <h4 className="font-semibold text-gray-900 mb-2">Homepage Products Component</h4>
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

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Next.js Image Component</h4>
                  <p className="text-sm text-gray-600">Automatic optimization and responsive images</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">WebP Format</h4>
                  <p className="text-sm text-gray-600">Better compression and quality</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Responsive Images</h4>
                  <p className="text-sm text-gray-600">Automatic responsive image generation</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Lazy Loading</h4>
                  <p className="text-sm text-gray-600">Images load as needed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Best Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Store Only Filenames</h4>
                  <p className="text-sm text-gray-600">Don't store full paths in database</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Use Relationships</h4>
                  <p className="text-sm text-gray-600">Leverage Prisma relationships for data integrity</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Index Foreign Keys</h4>
                  <p className="text-sm text-gray-600">Ensure proper indexing for performance</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cascade Deletes</h4>
                  <p className="text-sm text-gray-600">Proper cleanup when products are deleted</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">File Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Organize by Product ID</h4>
                  <p className="text-sm text-gray-600">Use product ID as folder name</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Consistent Naming</h4>
                  <p className="text-sm text-gray-600">Use descriptive, consistent filenames</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">WebP Format</h4>
                  <p className="text-sm text-gray-600">Use modern image formats for better performance</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Alt Text</h4>
                  <p className="text-sm text-gray-600">Always provide alt text for accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Data Flow</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Page Rendering</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>URL Parsing: Extract <code className="bg-gray-200 px-2 py-1 rounded">productUrlKey</code> from URL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Database Query: Fetch product with images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Image URL Construction: Build image paths dynamically</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Component Rendering: Render product with images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                    <span>Error Handling: Show 404 if product not found</span>
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Homepage Product Display</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>Query Products: Fetch recommended products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Image Processing: Process each product's images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Grid Rendering: Render product grid</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Link Generation: Create links to product pages</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/images" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🖼️ Image Management</h3>
            <p className="text-gray-600 text-sm">Detailed guide to image handling and optimization.</p>
          </Link>

          <Link 
            href="/docs/api" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🔧 API Reference</h3>
            <p className="text-gray-600 text-sm">Complete reference for product-related functions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
