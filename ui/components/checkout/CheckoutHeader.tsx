'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="sr-only">Just One Dollar</span>
            <Image 
              src="/just-one-dollar-logo.png" 
              alt="Just One Dollar" 
              width={120}
              height={38}
              className="h-8 w-auto" 
            />
          </Link>

          <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Secure Checkout</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </div>
    </header>
  );
}
