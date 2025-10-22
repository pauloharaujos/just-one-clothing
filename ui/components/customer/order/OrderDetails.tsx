import Link from 'next/link';
import CloudinaryImage from '@/ui/components/CloudinaryImage';
import { OrderWithDetails } from '@/repository/orderRepository';
import { getStatusColor, formatDateDetailed, formatCurrency, formatAddress } from './orderUtils';

interface OrderDetailsProps {
  order: OrderWithDetails;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/customer/order"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors group"
        >
          <div className="p-1 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          Back to My Orders
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Order #{order.orderNumber}</h1>
              <p className="text-indigo-100 mt-1">Placed on {formatDateDetailed(order.createdAt)}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
            <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
              {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {order.orderItems.map((item, index) => (
            <div key={item.id} className="px-8 py-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-gray-200">
                      <CloudinaryImage
                        sku={item.sku}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-gray-600">
                      <span className="font-medium">Qty:</span> {item.quantity}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Price:</span> {formatCurrency(item.price)}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-200">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Billing Address</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {formatAddress(order.billingAddress)}
            </div>
            {order.billingAddress.phone && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {order.billingAddress.phone}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-200">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Shipping Address</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {formatAddress(order.shippingAddress)}
            </div>
            {order.shippingAddress.phone && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {order.shippingAddress.phone}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-gray-900 font-semibold">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Tax</span>
              <span className="text-gray-900 font-semibold">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
