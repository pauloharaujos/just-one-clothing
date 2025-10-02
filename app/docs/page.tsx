import Link from 'next/link';

export default function DocsHome() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Just One Dollar Documentation
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Complete guide to building and maintaining the Just One Dollar ecommerce platform.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            Next.js 15+
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            TypeScript
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            PostgreSQL
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Prisma
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
            Tailwind CSS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">🚀 Quick Start</h2>
          <p className="text-gray-600 mb-4">
            Get up and running with the platform in minutes. Perfect for new developers joining the project.
          </p>
          <Link 
            href="/docs/quick-start" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Start Building →
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">🏗️ Architecture</h2>
          <p className="text-gray-600 mb-4">
            Understand the system design, database schema, and technical implementation details.
          </p>
          <Link 
            href="/docs/architecture" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Explore Architecture →
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">🛍️ Product Management</h2>
          <p className="text-gray-600 mb-4">
            Learn how products and images are stored, managed, and displayed throughout the platform.
          </p>
          <Link 
            href="/docs/products" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Product System →
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">🔧 API Reference</h2>
          <p className="text-gray-600 mb-4">
            Complete reference for repository functions, data types, and integration patterns.
          </p>
          <Link 
            href="/docs/api" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View API Docs →
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Overview</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Ecommerce Platform</h3>
            <p className="text-gray-600">
              Just One Dollar is built with modern web technologies to provide a fast, scalable, and maintainable ecommerce solution. 
              The platform features dynamic product management, user authentication, and a responsive design that works seamlessly across all devices.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Dynamic product pages with SEO-friendly URLs</li>
              <li>Organized product image management system</li>
              <li>User authentication and account management</li>
              <li>Responsive design with modern UI components</li>
              <li>Database-driven homepage with product recommendations</li>
              <li>Custom 404 handling for better user experience</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <span>Next.js 15+ (App Router)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>PostgreSQL</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span>Prisma ORM</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                <span>NextAuth.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                <span>Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">Need Help?</h3>
        <p className="text-indigo-700 mb-4">
          Can't find what you're looking for? Check out our development guide or reach out to the team.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/docs/setup" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            Development Setup
          </Link>
          <Link 
            href="/docs/practices" 
            className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-50 transition-colors"
          >
            Best Practices
          </Link>
        </div>
      </div>
    </div>
  );
}
