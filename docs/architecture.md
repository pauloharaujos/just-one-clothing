# Architecture Overview

This document provides a comprehensive overview of the Just One Dollar ecommerce platform architecture.

## 🏗️ Database Schema

### Product Management

```sql
-- Products table
Product {
  id: Int (Primary Key, Auto-increment)
  name: String
  sku: String
  url: String (Unique) -- Used for SEO-friendly URLs
  description: String
  price: Float
  visible: Boolean (Default: true)
  productImageLinks: ProductImageLink[] -- Many-to-many relationship
}

-- Images table
Image {
  id: Int (Primary Key, Auto-increment)
  filename: String -- Stores only filename (e.g., "product-image.webp")
  altText: String? -- Optional alt text for accessibility
  type: String? -- Optional image type
  createdAt: DateTime
  updatedAt: DateTime
  productImageLinks: ProductImageLink[]
}

-- Junction table for Product-Image relationship
ProductImageLink {
  productId: Int (Foreign Key to Product)
  imageId: Int (Foreign Key to Image)
  product: Product
  image: Image
  @@id([productId, imageId])
  @@index([productId])
  @@index([imageId])
}
```

### User Management

```sql
-- Users table (NextAuth.js compatible)
User {
  id: String (Primary Key, CUID)
  name: String?
  email: String (Unique)
  password: String?
  emailVerified: DateTime?
  image: String?
  accounts: Account[]
  sessions: Session[]
  authenticators: Authenticator[]
  createdAt: DateTime
  updatedAt: DateTime
}

-- Supporting tables for authentication
Account, Session, VerificationToken, Authenticator
```

## 📁 File Structure

### Public Assets
```
public/
├── product/
│   └── images/
│       ├── 1/
│       │   └── product-image-01.webp
│       ├── 2/
│       │   └── product-image-02.webp
│       └── ...
├── just-one-dollar-logo.png
└── ...
```

### Application Structure
```
app/
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
├── layout.tsx                    -- Root layout
├── page.tsx                      -- Homepage
└── globals.css                   -- Global styles
```

### Component Architecture
```
ui/components/
├── Header.tsx                    -- Site navigation
├── Footer.tsx                    -- Site footer
├── home/
│   └── Products.tsx              -- Homepage product grid
└── product/
    └── ProductPage.tsx           -- Product detail component
```

## 🔧 Technical Implementation

### Route Structure

#### Product Pages
- **Route Groups**: `(catalog)` and `(product)` don't affect URL structure
- **Dynamic Segments**: `[productUrlKey]` creates parameter for product lookup
- **URL Pattern**: `/{productUrlKey}` (e.g., `/t-shirt1`)
- **Server Components**: Data fetching happens on the server

#### Authentication Routes
- **Login**: `/customer/login`
- **Account**: `/customer/account`
- **Protected Routes**: Handled by NextAuth.js middleware

### Data Access Layer

#### Repository Pattern
All database access is centralized in the `repository/` folder:

```typescript
// productRepository.ts
export async function getProductByUrlKey(productUrlKey: string)
export async function getRecommendedProducts(limit: number = 4)
```

#### Prisma Integration
- **Schema**: Defined in `prisma/schema.prisma`
- **Client**: Generated client in `prisma/generated/`
- **Migrations**: Version-controlled database changes

### Image Management Strategy

1. **Database Storage**: Only filename stored in `Image.filename` field
2. **File System**: Images organized by product ID in `/public/product/images/{productId}/`
3. **URL Construction**: Dynamic path building: `/product/images/{productId}/{filename}`
4. **Relationship**: Many-to-many between products and images via `ProductImageLink`

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (600/700 for buttons, 500 for focus states)
- **Neutral**: Gray scale (50-900) for text and backgrounds
- **Background**: White with subtle gray accents

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Hierarchy**: Clear heading and body text distinction
- **Accessibility**: Proper contrast ratios

### Component Styling
- **Buttons**: Rounded corners, hover states, focus rings
- **Forms**: Subtle backgrounds, proper focus states
- **Cards**: Clean borders, hover effects
- **Images**: Consistent aspect ratios, object-fit

## 🔒 Security Considerations

### Authentication
- **NextAuth.js**: Industry-standard authentication library
- **Session Management**: Secure session handling
- **CSRF Protection**: Built-in CSRF protection
- **Password Hashing**: Secure password storage

### Data Validation
- **TypeScript**: Compile-time type checking
- **Prisma**: Runtime data validation
- **Input Sanitization**: Proper input handling

### File Upload Security
- **Path Validation**: Secure file path construction
- **File Type Validation**: Restricted file types
- **Access Control**: Proper file access permissions

## 🚀 Performance Optimizations

### Next.js Features
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting
- **Static Generation**: Pre-rendered pages where possible

### Database Optimizations
- **Indexes**: Proper database indexes on foreign keys
- **Query Optimization**: Efficient Prisma queries
- **Connection Pooling**: Database connection management

### Asset Optimization
- **Image Formats**: WebP format for better compression
- **CDN Ready**: Assets structured for CDN deployment
- **Caching**: Proper cache headers and strategies

## 🔄 Data Flow

### Product Page Rendering
1. User visits `/{productUrlKey}`
2. Next.js extracts `productUrlKey` from URL
3. Server component calls `getProductByUrlKey(productUrlKey)`
4. Prisma queries database with product images
5. Component renders with fetched data
6. If product not found, `notFound()` triggers custom 404

### Homepage Product Loading
1. User visits homepage
2. Server component calls `getRecommendedProducts(4)`
3. Prisma fetches first 4 visible products with images
4. Component renders product grid
5. Each product links to its individual PDP

## 📊 Scalability Considerations

### Database Scaling
- **Indexes**: Proper indexing for query performance
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized Prisma queries

### File Storage Scaling
- **CDN Integration**: Ready for CDN deployment
- **Image Optimization**: Automatic image optimization
- **Storage Structure**: Organized file structure

### Application Scaling
- **Server Components**: Reduced client-side processing
- **Static Generation**: Pre-rendered content where possible
- **Edge Deployment**: Ready for edge deployment

---

*This architecture document is maintained alongside the codebase. Please update it when making architectural changes.*
