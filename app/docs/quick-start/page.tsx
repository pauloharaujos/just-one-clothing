import Link from 'next/link';

export default function QuickStart() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Start</h1>
        <p className="text-xl text-gray-600">
          Get up and running with the Just One Dollar platform in minutes.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">Before you begin, make sure you have the following installed:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Node.js</strong> - Version 18 or higher
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>PostgreSQL</strong> - Database server
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <strong>Git</strong> - Version control
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Clone the Repository</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">git clone &lt;repository-url&gt;</code>
                <br />
                <code className="text-green-400">cd just-one-dollar</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Install Dependencies</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npm install</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Set Up Environment Variables</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">cp .env.example .env.local</code>
              </div>
              <p className="text-gray-600 mt-2">Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env.local</code> with your database URL and other configurations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Setup</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Generate Prisma Client</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npx prisma generate</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Push Schema to Database</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npx prisma db push</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. (Optional) Seed Database</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npx prisma db seed</code>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Running the Application</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Development Server</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npm run dev</code>
              </div>
              <p className="text-gray-600 mt-2">Visit <code className="bg-gray-100 px-2 py-1 rounded text-sm">http://localhost:3000</code> to see the application.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build for Production</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">npm run build</code>
                <br />
                <code className="text-green-400">npm start</code>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Structure</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`├── app/                    # Next.js App Router
│   ├── (catalog)/         # Route groups
│   ├── customer/          # User authentication pages
│   ├── docs/              # Documentation pages
│   └── globals.css        # Global styles
├── ui/components/         # Reusable UI components
├── repository/           # Database access layer
├── prisma/              # Database schema and migrations
├── public/              # Static assets
│   └── product/images/  # Product images organized by ID
└── docs/                # Documentation files`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/docs/architecture" 
              className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">🏗️ Architecture Overview</h3>
              <p className="text-gray-600 text-sm">Learn about the system design and database schema.</p>
            </Link>

            <Link 
              href="/docs/products" 
              className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">🛍️ Product Management</h3>
              <p className="text-gray-600 text-sm">Understand how products and images are managed.</p>
            </Link>

            <Link 
              href="/docs/api" 
              className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">🔧 API Reference</h3>
              <p className="text-gray-600 text-sm">Explore the repository functions and data types.</p>
            </Link>

            <Link 
              href="/docs/setup" 
              className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">👨‍💻 Development Setup</h3>
              <p className="text-gray-600 text-sm">Detailed development environment configuration.</p>
            </Link>
          </div>
        </section>

        <div className="mt-12 p-6 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-2">🎉 You're Ready!</h3>
          <p className="text-green-700 mb-4">
            You now have the Just One Dollar platform running locally. Start exploring the codebase and building new features!
          </p>
          <Link 
            href="/docs/architecture" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
          >
            Explore Architecture →
          </Link>
        </div>
      </div>
    </div>
  );
}
