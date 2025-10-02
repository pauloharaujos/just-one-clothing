# Just One Dollar - Ecommerce Platform

A modern ecommerce platform built with Next.js 15+, featuring product management, user authentication, and a clean, responsive design.

## 🚀 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## ✨ Features

- **Product Management**: Dynamic product pages with SEO-friendly URLs
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Mobile-first approach with modern UI
- **Image Management**: Organized product image storage
- **404 Handling**: Custom not-found pages

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── (catalog)/         # Route groups
│   ├── customer/          # User authentication pages
│   └── globals.css        # Global styles
├── ui/components/         # Reusable UI components
├── repository/           # Database access layer
├── prisma/              # Database schema and migrations
├── public/              # Static assets
│   └── product/images/   # Product images organized by ID
└── docs/                # Detailed documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd just-one-dollar

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and other configs

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📚 Documentation

For detailed documentation, see the [docs/](./docs/) folder:

- **[Architecture Overview](./docs/architecture.md)** - Database schema, file structure, and technical implementation
- **[Product Management](./docs/product-management.md)** - How products and images are stored and managed
- **[API Reference](./docs/api-reference.md)** - Repository functions and data access patterns
- **[Development Guide](./docs/development.md)** - Best practices and conventions

## 🔮 Roadmap

- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Product categories and filtering
- [ ] Search functionality
- [ ] Admin dashboard
- [ ] Payment integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ using Next.js and modern web technologies*