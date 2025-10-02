# API Reference

This document provides a comprehensive reference for the repository functions and data access patterns used in the Just One Dollar ecommerce platform.

## 📚 Repository Functions

### Product Repository (`repository/productRepository.ts`)

#### `getProductByUrlKey(productUrlKey: string)`

Fetches a single product by its URL key, including associated images.

**Parameters:**
- `productUrlKey` (string): The URL slug of the product (e.g., "t-shirt1")

**Returns:**
```typescript
Promise<Product | null>
```

**Product Type:**
```typescript
{
  id: number;
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
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
```

**Usage:**
```typescript
import { getProductByUrlKey } from '@/repository/productRepository';

const product = await getProductByUrlKey('t-shirt1');
if (product) {
  console.log('Product found:', product.name);
} else {
  console.log('Product not found');
}
```

**Database Query:**
```sql
SELECT p.*, pil.*, i.*
FROM Product p
LEFT JOIN ProductImageLink pil ON p.id = pil.productId
LEFT JOIN Image i ON pil.imageId = i.id
WHERE p.url = 't-shirt1'
```

---

#### `getRecommendedProducts(limit: number = 4)`

Fetches a specified number of visible products for homepage display, ordered by ID.

**Parameters:**
- `limit` (number, optional): Number of products to return (default: 4)

**Returns:**
```typescript
Promise<Product[]>
```

**Usage:**
```typescript
import { getRecommendedProducts } from '@/repository/productRepository';

// Get default 4 products
const products = await getRecommendedProducts();

// Get 8 products
const moreProducts = await getRecommendedProducts(8);
```

**Database Query:**
```sql
SELECT p.*, pil.*, i.*
FROM Product p
LEFT JOIN ProductImageLink pil ON p.id = pil.productId
LEFT JOIN Image i ON pil.imageId = i.id
WHERE p.visible = true
ORDER BY p.id ASC
LIMIT 4
```

---

## 🔧 Data Access Patterns

### Prisma Client Usage

#### Basic Setup
```typescript
import prisma from '@/prisma/prismaClient';

// All repository functions use this pattern
export async function someFunction() {
  return prisma.modelName.findMany({
    // query options
  });
}
```

#### Common Query Patterns

**Find Single Record:**
```typescript
const product = await prisma.product.findUnique({
  where: { url: 't-shirt1' }
});
```

**Find Multiple Records:**
```typescript
const products = await prisma.product.findMany({
  where: { visible: true },
  take: 10
});
```

**Include Related Data:**
```typescript
const product = await prisma.product.findUnique({
  where: { url: 't-shirt1' },
  include: {
    productImageLinks: {
      include: { image: true }
    }
  }
});
```

**Order Results:**
```typescript
const products = await prisma.product.findMany({
  orderBy: { id: 'asc' }
});
```

**Filter Results:**
```typescript
const visibleProducts = await prisma.product.findMany({
  where: { visible: true }
});
```

---

## 🖼️ Image Handling Patterns

### Image URL Construction

**Pattern:**
```typescript
const imageUrl = `/product/images/${product.id}/${image.filename}`;
```

**Example:**
```typescript
// Product ID: 1
// Image filename: "t-shirt-front.webp"
// Result: "/product/images/1/t-shirt-front.webp"
```

### Image Access in Components

**ProductPage Component:**
```typescript
const image = product.productImageLinks[0]?.image;

{image ? (
  <Image
    src={`/product/images/${product.id}/${image.filename}`}
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
)}
```

**Homepage Products Component:**
```typescript
{products.map((product) => {
  const image = product.productImageLinks[0]?.image;
  return (
    <div key={product.id}>
      {image ? (
        <Image
          src={`/product/images/${product.id}/${image.filename}`}
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
})}
```

---

## 🔄 Error Handling Patterns

### Product Not Found

**Repository Level:**
```typescript
export async function getProductByUrlKey(productUrlKey: string) {
  return prisma.product.findUnique({
    where: { url: productUrlKey },
    include: {
      productImageLinks: {
        include: { image: true }
      }
    }
  });
  // Returns null if not found
}
```

**Component Level:**
```typescript
export default async function Page({ params }: { params: { productUrlKey: string } }) {
  const product = await getProductByUrlKey(params.productUrlKey);

  if (!product) {
    notFound(); // Triggers custom 404 page
  }

  return <ProductPage product={product} />;
}
```

### Database Connection Errors

**Prisma Error Handling:**
```typescript
try {
  const product = await getProductByUrlKey('t-shirt1');
  return product;
} catch (error) {
  console.error('Database error:', error);
  throw error; // Let Next.js handle the error
}
```

---

## 📊 Type Definitions

### Product Types

```typescript
// Base Product type
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
}
```

### Image Types

```typescript
interface Image {
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
}
```

---

## 🚀 Performance Considerations

### Database Optimization

**Indexes:**
```sql
-- Product table indexes
CREATE INDEX idx_product_url ON Product(url);
CREATE INDEX idx_product_visible ON Product(visible);

-- ProductImageLink table indexes
CREATE INDEX idx_product_image_link_product_id ON ProductImageLink(productId);
CREATE INDEX idx_product_image_link_image_id ON ProductImageLink(imageId);
```

**Query Optimization:**
```typescript
// Efficient query with proper includes
const product = await prisma.product.findUnique({
  where: { url: productUrlKey },
  include: {
    productImageLinks: {
      include: { image: true }
    }
  }
});
```

### Image Optimization

**Next.js Image Component:**
```typescript
<Image
  src={imageUrl}
  alt={altText}
  width={800}
  height={800}
  className="h-full w-full object-contain"
  priority={isAboveFold} // Set priority for above-the-fold images
/>
```

---

## 🔍 Debugging

### Common Debug Patterns

**Log Product Data:**
```typescript
console.log('Product:', JSON.stringify(product, null, 2));
console.log('Images:', product.productImageLinks);
```

**Log Image URLs:**
```typescript
const imageUrl = `/product/images/${product.id}/${image.filename}`;
console.log('Image URL:', imageUrl);
console.log('Image exists:', fs.existsSync(`public${imageUrl}`));
```

**Database Query Debugging:**
```typescript
// Enable Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## 📝 Best Practices

### Repository Functions

1. **Single Responsibility**: Each function should have one clear purpose
2. **Error Handling**: Always handle potential errors gracefully
3. **Type Safety**: Use TypeScript for all function signatures
4. **Documentation**: Document complex queries and business logic

### Database Queries

1. **Use Includes**: Leverage Prisma's include for related data
2. **Optimize Queries**: Use proper where clauses and limits
3. **Index Usage**: Ensure queries use appropriate indexes
4. **Connection Management**: Let Prisma handle connection pooling

### Image Handling

1. **Consistent Paths**: Use consistent image path construction
2. **Fallback Handling**: Always provide fallbacks for missing images
3. **Accessibility**: Include proper alt text for all images
4. **Performance**: Use Next.js Image component for optimization

---

*This API reference is maintained alongside the codebase. Please update it when adding new functions or changing existing ones.*
