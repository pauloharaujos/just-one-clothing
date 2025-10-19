'use client';

import Link from 'next/link';
import CloudinaryImage from '@/ui/components/CloudinaryImage';
import { useState, useTransition } from 'react';
import { formatCurrency } from '@/lib/utils';
import { updateCartItemQuantity, removeFromCart } from '@/app/cart/actions/cartActions';

interface CartItemProps {
  item: {
    id: number;
    quantity: number;
    price: number;
    product: {
      id: number;
      name: string;
      sku: string;
      url: string;
      price: number;
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isPending, startTransition] = useTransition();

  const subtotal = item.price * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setQuantity(newQuantity);
    startTransition(async () => {
      await updateCartItemQuantity(item.id, newQuantity);
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      await removeFromCart(item.id);
    });
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-20 h-20">
        <Link href={`/${item.product.url}`}>
          <CloudinaryImage
            sku={item.product.sku}
            alt={item.product.name}
            width={384}
            height={531}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      </div>

      <div className="flex-1 min-w-0">
        <Link href={`/${item.product.url}`} className="text-sm font-medium text-gray-900 hover:text-gray-700">
          {item.product.name}
        </Link>
        <p className="text-sm text-gray-500">SKU: {item.product.sku}</p>
        <p className="text-sm text-gray-500">Price: {formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={isPending || quantity <= 1}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : (
            "−"
          )}
        </button>
        <span className="w-8 text-center text-gray-800 text-sm font-medium">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={isPending}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : (
            "+"
          )}
        </button>
      </div>

      <div className="text-sm font-medium text-gray-900 w-20 text-right">
        {formatCurrency(subtotal)}
      </div>

      <button
        onClick={handleRemove}
        disabled={isPending}
        className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
