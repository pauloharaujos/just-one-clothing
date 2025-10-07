# Services Directory

This directory contains business logic services that can be reused across the application.

## MetadataService

Handles all metadata generation for SEO, Open Graph, Twitter Cards, and JSON-LD structured data.

### Usage Examples:

```typescript
import { metadataService } from '@/services/metadataService';

// Generate metadata for a product
const productMetadata = await metadataService.generateMetadata({
  rewrite: productRewrite,
  product: productData
});

// Generate JSON-LD for a product
const productJsonLd = metadataService.generateProductJsonLd(
  product, 
  'https://justonedollar.com/product-slug'
);

// Generate JSON-LD for a category with breadcrumb
const categoryJsonLd = metadataService.generateCategoryJsonLd(
  category, 
  'https://justonedollar.com/category-slug',
  breadcrumbArray
);
```

### Benefits:

- **Single Responsibility**: Only handles metadata generation
- **Reusable**: Can be used in pages, API routes, or components
- **Testable**: Easy to unit test with mock data
- **Type Safe**: Full TypeScript support
- **Consistent**: Ensures all metadata follows the same patterns
