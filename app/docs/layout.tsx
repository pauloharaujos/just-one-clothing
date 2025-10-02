import Link from 'next/link';
import { notFound } from 'next/navigation';

const docsNavigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ]
  },
  {
    title: 'Architecture',
    items: [
      { title: 'Overview', href: '/docs/architecture' },
      { title: 'Database Schema', href: '/docs/database' },
      { title: 'File Structure', href: '/docs/file-structure' },
    ]
  },
  {
    title: 'Product Management',
    items: [
      { title: 'Product System', href: '/docs/products' },
      { title: 'Image Management', href: '/docs/images' },
      { title: 'URL Structure', href: '/docs/urls' },
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Repository Functions', href: '/docs/api' },
      { title: 'Data Types', href: '/docs/types' },
      { title: 'Error Handling', href: '/docs/errors' },
    ]
  },
  {
    title: 'Development',
    items: [
      { title: 'Setup Guide', href: '/docs/setup' },
      { title: 'Best Practices', href: '/docs/practices' },
      { title: 'Deployment', href: '/docs/deployment' },
    ]
  }
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JOD</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Just One Dollar</span>
              </Link>
              <div className="ml-8">
                <span className="text-sm text-gray-500">Documentation</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-8 py-8">
              <nav className="space-y-6">
                {docsNavigation.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="py-8 lg:py-12">
              <div className="prose prose-lg max-w-none">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
