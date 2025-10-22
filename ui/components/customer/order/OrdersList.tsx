import Link from 'next/link';
import { OrderWithDetails } from '@/repository/orderRepository';
import CloudinaryImage from '@/ui/components/CloudinaryImage';
import { getStatusColor, formatDate, formatCurrency } from './orderUtils';

interface OrdersListProps {
  orders: OrderWithDetails[] | null;
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="text-center py-16 px-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">When you place an order, it will appear here with all the details you need to track your purchase.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/customer/order/${order.orderNumber}`}
            className="group block bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      Order #{order.orderNumber}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(order.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {formatCurrency(order.total)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total amount
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Items:</span>
                <div className="flex -space-x-2">
                  {order.orderItems.slice(0, 3).map((item, index) => (
                    <div key={item.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-white">
                      <CloudinaryImage
                        sku={item.sku}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.orderItems.length > 3 && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                      +{order.orderItems.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
