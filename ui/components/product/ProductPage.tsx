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
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="w-full h-[500px] overflow-hidden rounded-3xl bg-white shadow-2xl">
            <CloudinaryImage
              sku={product.sku}
              alt={product.name}
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-indigo-700">In Stock</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8) • 128 reviews</span>
                </div>
                <div className="text-sm text-gray-500">SKU: {product.sku}</div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                <span className="text-xl text-gray-500 line-through">{formatCurrency(product.price * 1.3)}</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                  Save 23%
                </span>
              </div>
            </div>

            <form onSubmit={handleAddToCart} className="space-y-6">
              <div>
                <label className="text-lg font-semibold text-gray-900 mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-4 py-3 font-semibold text-gray-900">{selectedQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                  <input type="hidden" name="quantity" value={selectedQuantity} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {isPending ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
              
              {message && (
                <div className={`p-4 rounded-2xl border-2 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border-green-200' 
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {message.type === 'success' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    {message.text}
                  </div>
                </div>
              )}
            </form>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg">
                <div className="p-2 rounded-lg bg-green-100">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-500">On orders over $50</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg">
                <div className="p-2 rounded-lg bg-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Easy Returns</div>
                  <div className="text-sm text-gray-500">30-day return policy</div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Material</span>
                <span className="text-gray-900">100% Cotton</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Care Instructions</span>
                <span className="text-gray-900">Machine Wash Cold</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Origin</span>
                <span className="text-gray-900">Made in USA</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-600">Warranty</span>
                <span className="text-gray-900">1 Year</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
