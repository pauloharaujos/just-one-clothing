# Development Guide

This guide covers best practices, conventions, and development workflows for the Just One Dollar ecommerce platform.

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: Version 18 or higher
- **PostgreSQL**: Database server
- **Git**: Version control
- **VS Code**: Recommended editor (with extensions)

### Required VS Code Extensions

- **Prisma**: Database schema highlighting
- **Tailwind CSS IntelliSense**: CSS class autocomplete
- **TypeScript Importer**: Auto-import TypeScript modules
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd just-one-dollar

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit environment variables
# Add your database URL and other configurations
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

## 📁 Project Structure

### Directory Conventions

```
├── app/                    # Next.js App Router
│   ├── (catalog)/         # Route groups (no URL impact)
│   ├── customer/          # User-related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── ui/components/         # Reusable UI components
│   ├── home/             # Homepage-specific components
│   ├── product/          # Product-related components
│   └── customer/         # User-related components
├── repository/           # Data access layer
├── prisma/              # Database schema and migrations
├── public/              # Static assets
│   └── product/images/  # Product images
├── docs/                # Documentation
└── README.md            # Project overview
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (`ProductPage.tsx`)
- **Pages**: lowercase (`page.tsx`)
- **Utilities**: camelCase (`productRepository.ts`)
- **Directories**: lowercase (`ui/components/`)

#### Database
- **Tables**: PascalCase (`Product`, `ProductImageLink`)
- **Fields**: camelCase (`productId`, `imageId`)
- **Indexes**: descriptive names (`idx_product_url`)

#### Code
- **Variables**: camelCase (`productName`, `imageUrl`)
- **Functions**: camelCase (`getProductByUrlKey`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_PRODUCTS`)
- **Types**: PascalCase (`ProductPageProps`)

## 🎨 Styling Guidelines

### Tailwind CSS Conventions

#### Color Usage
```typescript
// Primary colors
'bg-indigo-600'     // Primary buttons
'hover:bg-indigo-700' // Button hover states
'focus:ring-indigo-500' // Focus rings

// Neutral colors
'text-gray-900'     // Primary text
'text-gray-700'     // Secondary text
'text-gray-500'     // Muted text
'bg-gray-50'        // Subtle backgrounds
'border-gray-200'   // Light borders
```

#### Spacing
```typescript
// Consistent spacing scale
'px-4 py-2'         // Small padding
'px-6 py-3'         // Medium padding
'px-8 py-4'         // Large padding
'gap-3'             // Small gaps
'gap-6'             // Medium gaps
'gap-8'             // Large gaps
```

#### Responsive Design
```typescript
// Mobile-first approach
'grid-cols-1'       // Mobile: 1 column
'sm:grid-cols-2'    // Small: 2 columns
'lg:grid-cols-4'    // Large: 4 columns
```

### Component Styling Patterns

#### Button Components
```typescript
// Primary button
className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

// Secondary button
className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
```

#### Form Elements
```typescript
// Input fields
className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
```

#### Card Components
```typescript
// Product cards
className="group relative rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
```

## 🔧 Code Quality

### TypeScript Best Practices

#### Type Definitions
```typescript
// Define interfaces for component props
interface ProductPageProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    productImageLinks: Array<{
      image: {
        filename: string;
        altText?: string | null;
      };
    }>;
  };
}

// Use type assertions carefully
const product = await getProductByUrlKey(params.productUrlKey) as Product;
```

#### Error Handling
```typescript
// Proper error handling in async functions
export async function getProductByUrlKey(productUrlKey: string) {
  try {
    return await prisma.product.findUnique({
      where: { url: productUrlKey },
      include: {
        productImageLinks: {
          include: { image: true }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
```

### Component Development

#### Server Components
```typescript
// Use async for data fetching
export default async function ProductPage({ params }: { params: { productUrlKey: string } }) {
  const product = await getProductByUrlKey(params.productUrlKey);
  
  if (!product) {
    notFound();
  }
  
  return <ProductPage product={product} />;
}
```

#### Client Components
```typescript
// Use "use client" directive when needed
"use client";

import { useState } from 'react';

export default function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

## 🗄️ Database Development

### Schema Changes

#### Adding New Fields
```prisma
model Product {
  id          Int     @id @default(autoincrement())
  name        String
  sku         String
  url         String  @unique
  description String
  price       Float
  visible     Boolean @default(true)
  // New field
  category    String? // Optional field
  productImageLinks ProductImageLink[]
}
```

#### Creating Migrations
```bash
# Generate migration
npx prisma migrate dev --name add_category_to_product

# Apply migration
npx prisma migrate deploy
```

### Data Seeding

#### Seed File Structure
```typescript
// prisma/seed.ts
import { PrismaClient } from './generated';

const prisma = new PrismaClient();

async function main() {
  // Create sample products
  const product = await prisma.product.create({
    data: {
      name: 'Sample Product',
      sku: 'SAMPLE-001',
      url: 'sample-product',
      description: 'A sample product for testing',
      price: 29.99,
      visible: true,
    },
  });
  
  console.log('Created product:', product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## 🖼️ Image Management

### Adding Product Images

#### File Organization
```bash
# Create directory for new product
mkdir public/product/images/5

# Add image files
cp product-image.webp public/product/images/5/
```

#### Database Records
```typescript
// Create image record
const image = await prisma.image.create({
  data: {
    filename: 'product-image.webp',
    altText: 'Product front view',
    type: 'product',
  },
});

// Link to product
await prisma.productImageLink.create({
  data: {
    productId: 5,
    imageId: image.id,
  },
});
```

### Image Optimization

#### Next.js Image Component
```typescript
import Image from 'next/image';

<Image
  src={`/product/images/${product.id}/${image.filename}`}
  alt={image.altText || product.name}
  width={800}
  height={800}
  className="h-full w-full object-contain"
  priority={isAboveFold} // For above-the-fold images
/>
```

## 🧪 Testing

### Component Testing

#### Test Structure
```typescript
// __tests__/ProductPage.test.tsx
import { render, screen } from '@testing-library/react';
import ProductPage from '@/ui/components/product/ProductPage';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'Test description',
  price: 29.99,
  productImageLinks: [{
    image: {
      filename: 'test-image.webp',
      altText: 'Test image',
    },
  }],
};

test('renders product information', () => {
  render(<ProductPage product={mockProduct} />);
  
  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('$29.99')).toBeInTheDocument();
});
```

### Database Testing

#### Test Database Setup
```typescript
// __tests__/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

beforeEach(async () => {
  // Clean database
  await prisma.productImageLink.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
});
```

## 🚀 Deployment

### Environment Variables

#### Production Environment
```bash
# .env.production
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
```

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Database Migration

```bash
# Run migrations in production
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## 🔍 Debugging

### Common Issues

#### Images Not Loading
```typescript
// Debug image paths
console.log('Product ID:', product.id);
console.log('Image filename:', image.filename);
console.log('Constructed URL:', `/product/images/${product.id}/${image.filename}`);
```

#### Database Connection Issues
```typescript
// Test database connection
try {
  await prisma.$connect();
  console.log('Database connected successfully');
} catch (error) {
  console.error('Database connection failed:', error);
}
```

#### TypeScript Errors
```typescript
// Use type assertions when necessary
const product = await getProductByUrlKey(params.productUrlKey) as Product | null;

// Or use type guards
if (product && 'name' in product) {
  // product is definitely a Product
}
```

## 📝 Code Review Checklist

### Before Submitting PR

- [ ] **Types**: All TypeScript types are properly defined
- [ ] **Styling**: Consistent with design system
- [ ] **Database**: Proper indexes and relationships
- [ ] **Images**: Correct path construction and fallbacks
- [ ] **Error Handling**: Graceful error handling
- [ ] **Documentation**: Updated relevant documentation
- [ ] **Testing**: Added tests for new functionality
- [ ] **Performance**: Optimized queries and components

### Review Focus Areas

1. **Code Quality**: Clean, readable, maintainable code
2. **Performance**: Efficient database queries and component rendering
3. **Accessibility**: Proper alt text, semantic HTML, keyboard navigation
4. **Security**: Input validation, proper error handling
5. **Consistency**: Follows established patterns and conventions

---

*This development guide is maintained alongside the codebase. Please update it when adding new development practices or changing existing ones.*
