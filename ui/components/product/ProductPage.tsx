'use client';

import { useState, useTransition } from 'react';
import { formatCurrency } from '@/lib/utils';
import { addToCart } from '@/app/cart/actions/cartActions';
import CloudinaryImage from '@/ui/components/CloudinaryImage';

interface ProductPageProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    sku: string;
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const quantity = Number(formData.get('quantity')) || 1;
    
    startTransition(async () => {
      const result = await addToCart(product.id, quantity);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Item added to cart!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to add item to cart' });
        setTimeout(() => setMessage(null), 5000);
      }
    });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
            <CloudinaryImage
              sku={product.sku}
              alt={product.name}
              width={384}
              height={531}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(product.price)}</p>
          </div>

          <form onSubmit={handleAddToCart} className="flex flex-col gap-3">
            <div className="grid grid-cols-[auto,1fr] items-center gap-3 w-full max-w-xs">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
              <select 
                id="quantity" 
                name="quantity" 
                defaultValue={1}
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                {[1,2,3,4,5].map(q => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Adding...' : 'Add to cart'}
            </button>
            
            {message && (
              <div className={`text-sm px-3 py-2 rounded-md ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
          </form>

          <div className="prose max-w-none">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
