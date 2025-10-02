import Link from 'next/link';

export default function Architecture() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Architecture Overview</h1>
        <p className="text-xl text-gray-600">
          Understanding the system design, database schema, and technical implementation of the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏗️ Database Schema</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Management</h3>
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
}

model Image {
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

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Management</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`model User {
  id            String          @id @default(cuid())
  name          String?
  email         String          @unique
  password      String?
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  authenticators Authenticator[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

-- Supporting tables for NextAuth.js
model Account, Session, VerificationToken, Authenticator`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📁 File Structure</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Public Assets</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`public/
├── product/
│   └── images/
│       ├── 1/                          # Product ID 1
│       │   ├── product-image-01.webp
│       │   └── product-image-02.webp
│       ├── 2/                          # Product ID 2
│       │   └── product-image-01.webp
│       └── ...
├── just-one-dollar-logo.png
└── ...`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Structure</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`app/
├── (catalog)/
│   └── (product)/
│       └── [productUrlKey]/
│           ├── page.tsx          -- Product detail page
│           └── not-found.tsx     -- Custom 404 page
├── customer/
│   ├── login/
│   │   └── page.tsx
│   └── account/
│       └── page.tsx
├── docs/                        -- Documentation pages
├── layout.tsx                   -- Root layout
├── page.tsx                     -- Homepage
└── globals.css                  -- Global styles`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Component Architecture</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`ui/components/
├── Header.tsx                    -- Site navigation
├── Footer.tsx                    -- Site footer
├── home/
│   └── Products.tsx              -- Homepage product grid
└── product/
    └── ProductPage.tsx           -- Product detail component`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Technical Implementation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Route Structure</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Product Pages</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Route Groups:</strong> <code className="bg-gray-100 px-2 py-1 rounded">(catalog)</code> and <code className="bg-gray-100 px-2 py-1 rounded">(product)</code> don't affect URL structure</li>
                    <li>• <strong>Dynamic Segments:</strong> <code className="bg-gray-100 px-2 py-1 rounded">[productUrlKey]</code> creates parameter for product lookup</li>
                    <li>• <strong>URL Pattern:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/{productUrlKey}</code> (e.g., <code className="bg-gray-100 px-2 py-1 rounded">/t-shirt1</code>)</li>
                    <li>• <strong>Server Components:</strong> Data fetching happens on the server</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Authentication Routes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Login:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/customer/login</code></li>
                    <li>• <strong>Account:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/customer/account</code></li>
                    <li>• <strong>Protected Routes:</strong> Handled by NextAuth.js middleware</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Access Layer</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Repository Pattern</h4>
                  <p className="text-sm text-gray-600 mb-2">All database access is centralized in the <code className="bg-gray-100 px-2 py-1 rounded">repository/</code> folder:</p>
                  <div className="bg-gray-50 rounded p-3">
                    <code className="text-sm text-gray-700">// productRepository.ts</code><br />
                    <code className="text-sm text-gray-700">export async function getProductByUrlKey(productUrlKey: string)</code><br />
                    <code className="text-sm text-gray-700">export async function getRecommendedProducts(limit: number = 4)</code>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Prisma Integration</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Schema:</strong> Defined in <code className="bg-gray-100 px-2 py-1 rounded">prisma/schema.prisma</code></li>
                    <li>• <strong>Client:</strong> Generated client in <code className="bg-gray-100 px-2 py-1 rounded">prisma/generated/</code></li>
                    <li>• <strong>Migrations:</strong> Version-controlled database changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Image Management Strategy</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">1. Database Storage</h4>
                <p className="text-sm text-gray-600">Only filename stored in <code className="bg-gray-100 px-2 py-1 rounded">Image.filename</code> field</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">2. File System</h4>
                <p className="text-sm text-gray-600">Images organized by product ID in <code className="bg-gray-100 px-2 py-1 rounded">/public/product/images/{productId}/</code></p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">3. URL Construction</h4>
                <p className="text-sm text-gray-600">Dynamic path building: <code className="bg-gray-100 px-2 py-1 rounded">/product/images/{productId}/{filename}</code></p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">4. Relationship</h4>
                <p className="text-sm text-gray-600">Many-to-many between products and images via <code className="bg-gray-100 px-2 py-1 rounded">ProductImageLink</code></p>
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
                    <span>User visits <code className="bg-gray-200 px-2 py-1 rounded">/{productUrlKey}</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Next.js extracts <code className="bg-gray-200 px-2 py-1 rounded">productUrlKey</code> from URL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Server component calls <code className="bg-gray-200 px-2 py-1 rounded">getProductByUrlKey(productUrlKey)</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Prisma queries database with product images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                    <span>Component renders with fetched data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">6</span>
                    <span>If product not found, <code className="bg-gray-200 px-2 py-1 rounded">notFound()</code> triggers custom 404</span>
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Homepage Product Loading</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>User visits homepage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Server component calls <code className="bg-gray-200 px-2 py-1 rounded">getRecommendedProducts(4)</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Prisma fetches first 4 visible products with images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Component renders product grid</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                    <span>Each product links to its individual PDP</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/products" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🛍️ Product Management</h3>
            <p className="text-gray-600 text-sm">Learn how products and images are stored and managed.</p>
          </Link>

          <Link 
            href="/docs/api" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🔧 API Reference</h3>
            <p className="text-gray-600 text-sm">Explore the repository functions and data types.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
