# Product Management

This document covers how products and images are stored, managed, and displayed in the Just One Dollar ecommerce platform.

## 🗄️ Database Design

### Product Table Structure

```sql
model Product {
  id          Int     @id @default(autoincrement())
  name        String  -- Product display name
  sku         String  -- Stock Keeping Unit identifier
  url         String  @unique -- SEO-friendly URL slug
  description String  -- Product description
  price       Float   -- Product price
  visible     Boolean @default(true) -- Show/hide product
  productImageLinks ProductImageLink[] -- Relationship to images
}
```

### Image Management

```sql
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
}
```

## 📁 File Organization

### Image Storage Structure

```
public/product/images/
├── 1/                          # Product ID 1
│   ├── product-image-01.webp
│   ├── product-image-02.webp
│   └── ...
├── 2/                          # Product ID 2
│   ├── product-image-01.webp
│   └── ...
└── ...
```

### Naming Conventions

- **Directory**: Use product ID as folder name
- **Files**: Descriptive names with webp extension
- **Database**: Store only filename (not full path)

## 🔧 Implementation Details

### URL Construction

```typescript
// Image URL construction
const imageUrl = `/product/images/${product.id}/${image.filename}`;

// Example:
// Product ID: 1
// Filename: "t-shirt-front.webp"
// Result: "/product/images/1/t-shirt-front.webp"
```

### Database Queries

#### Get Product by URL Key
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
}
```

#### Get Recommended Products
```typescript
export async function getRecommendedProducts(limit: number = 4) {
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
}
```

## 🖼️ Image Handling

### Component Implementation

```typescript
// ProductPage.tsx
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

### Image Optimization

- **Next.js Image Component**: Automatic optimization
- **WebP Format**: Better compression and quality
- **Responsive Images**: Automatic responsive image generation
- **Lazy Loading**: Images load as needed

## 📝 Best Practices

### Database Management

1. **Store Only Filenames**: Don't store full paths in database
2. **Use Relationships**: Leverage Prisma relationships for data integrity
3. **Index Foreign Keys**: Ensure proper indexing for performance
4. **Cascade Deletes**: Proper cleanup when products are deleted

### File Management

1. **Organize by Product ID**: Use product ID as folder name
2. **Consistent Naming**: Use descriptive, consistent filenames
3. **WebP Format**: Use modern image formats for better performance
4. **Alt Text**: Always provide alt text for accessibility

### URL Structure

1. **SEO-Friendly URLs**: Use descriptive URL slugs
2. **Unique URLs**: Ensure each product has a unique URL
3. **Consistent Patterns**: Follow consistent URL patterns
4. **404 Handling**: Provide proper 404 pages for invalid URLs

## 🔄 Data Flow

### Product Page Rendering

1. **URL Parsing**: Extract `productUrlKey` from URL
2. **Database Query**: Fetch product with images
3. **Image URL Construction**: Build image paths dynamically
4. **Component Rendering**: Render product with images
5. **Error Handling**: Show 404 if product not found

### Homepage Product Display

1. **Query Products**: Fetch recommended products
2. **Image Processing**: Process each product's images
3. **Grid Rendering**: Render product grid
4. **Link Generation**: Create links to product pages

## 🛠️ Development Workflow

### Adding New Products

1. **Create Product Record**: Insert into Product table
2. **Upload Images**: Place images in `/public/product/images/{id}/`
3. **Create Image Records**: Insert image records into Image table
4. **Link Products and Images**: Create ProductImageLink records
5. **Test URLs**: Verify product URLs work correctly

### Updating Products

1. **Update Product Data**: Modify Product table fields
2. **Manage Images**: Add/remove images as needed
3. **Update Relationships**: Modify ProductImageLink records
4. **Test Changes**: Verify all changes work correctly

### Deleting Products

1. **Cascade Delete**: ProductImageLink records are automatically deleted
2. **Manual Cleanup**: Remove image files from file system
3. **Image Cleanup**: Delete orphaned Image records
4. **Verify Cleanup**: Ensure no broken references remain

## 🔍 Troubleshooting

### Common Issues

#### Images Not Loading
- **Check File Path**: Verify image files exist in correct location
- **Verify Database**: Ensure Image records have correct filenames
- **Check Relationships**: Verify ProductImageLink records exist

#### 404 Errors
- **URL Validation**: Check if product URL exists in database
- **Case Sensitivity**: Ensure URL case matches database
- **Special Characters**: Avoid special characters in URLs

#### Performance Issues
- **Image Optimization**: Use Next.js Image component
- **Database Indexes**: Ensure proper indexing on foreign keys
- **Query Optimization**: Use efficient Prisma queries

### Debugging Tools

```typescript
// Debug product data
console.log('Product:', product);
console.log('Images:', product.productImageLinks);

// Debug image URLs
const imageUrl = `/product/images/${product.id}/${image.filename}`;
console.log('Image URL:', imageUrl);
```

## 📊 Monitoring

### Key Metrics

- **Product Count**: Total number of products
- **Image Count**: Total number of product images
- **404 Rate**: Percentage of invalid product URLs
- **Image Load Time**: Average image loading performance

### Health Checks

- **Database Connectivity**: Verify database connections
- **File System Access**: Check image file accessibility
- **URL Validity**: Ensure all product URLs are valid
- **Image Optimization**: Monitor image optimization performance

---

*This product management guide is maintained alongside the codebase. Please update it when making changes to product handling.*
