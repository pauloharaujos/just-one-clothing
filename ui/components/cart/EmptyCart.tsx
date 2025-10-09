import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-24 w-24 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
        />
      </svg>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
      <p className="mt-2 text-sm text-gray-500">
        Start adding some items to your cart to see them here.
      </p>
      
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
