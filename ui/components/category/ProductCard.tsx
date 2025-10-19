'use client';

import Link from 'next/link';
import CloudinaryImage from '@/ui/components/CloudinaryImage';
import { formatCurrency } from '@/lib/utils';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <Link href={`/${product.url}`} className="block">
        <div className="aspect-square w-full bg-gray-200 overflow-hidden">
          <CloudinaryImage
            sku={product.sku}
            alt={product.name}
            width={384}
            height={531}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/${product.url}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 text-sm text-gray-500">{product.sku}</p>
        <p className="mt-2 text-lg font-semibold text-indigo-600">
          {formatCurrency(product.price)}
        </p>
        
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
