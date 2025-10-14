'use client';

import { formatCurrency } from '@/lib/utils';
import { QuoteItemWithProduct } from '@/repository/quoteRepository';

interface CheckoutSummaryProps {
  items: QuoteItemWithProduct[];
  onProceedToPayment?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function CheckoutSummary({ 
  items, 
  onProceedToPayment, 
  disabled = false, 
  loading = false 
}: CheckoutSummaryProps) {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-500">SKU: {item.product.sku}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900 font-medium">Free</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900 font-medium">{formatCurrency(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {onProceedToPayment && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onProceedToPayment}
            disabled={disabled || loading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              !disabled && !loading
                ? 'bg-[#635BFF] hover:bg-[#5A52FF] focus:ring-[#635BFF]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.274 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.344-2.354 1.344-1.985 0-4.226-.921-5.961-1.731L4.354 21.654c.921.404 2.97 1.202 6.811 1.202 2.65 0 4.811-.624 6.341-1.844 1.671-1.265 2.494-3.139 2.494-5.38 0-3.923-2.494-5.76-6.024-7.482z"/>
                </svg>
                Pay with Stripe
              </div>
            )}
          </button>

          {/* Credit Card Flags */}
          <div className="mt-4 flex justify-center items-center space-x-3">
            <div className="flex items-center space-x-4">
              {/* Visa */}
              <img src="/icons/payments/visa.svg" alt="Visa" width="48" height="32" />
              
              {/* Mastercard */}
              <img src="/icons/payments/mastercard.svg" alt="Mastercard" width="48" height="32" />
              
              {/* American Express */}
              <img src="/icons/payments/american-express.svg" alt="American Express" width="48" height="32" />
              
              {/* Discover */}
              <img src="/icons/payments/discover.svg" alt="Discover" width="48" height="32" />
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="#10B981" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              SSL Secured
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="#3B82F6" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Encrypted
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
