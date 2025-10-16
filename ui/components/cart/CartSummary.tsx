'use client';

import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface CartSummaryProps {
  items: Array<{
    id: number;
    quantity: number;
    price: number;
  }>;
}

export default function CartSummary (
  { items }: CartSummaryProps
) {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-600 font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-600 font-medium">{formatCurrency(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-600">Total</span>
            <span className="text-gray-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/checkout"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors inline-block text-center"
        >
          Proceed to Checkout
        </Link>
      </div>

      <div className="mt-4">
        <Link 
          href="/" 
          className="w-full bg-white text-gray-700 py-3 px-4 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors inline-block text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
