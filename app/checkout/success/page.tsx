import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getOrderByOrderNumberService } from '@/services/checkout/checkoutService';
import { formatCurrency, getCustomerFromSession } from '@/lib/utils';
import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order Confirmation | Just One Dollar',
  description: 'Thank you for your order',
};

interface SuccessPageProps {
  searchParams: Promise<{
    orderNumber: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const customer = await getCustomerFromSession();
  
  if (!customer?.id) {
    redirect('/');
  }

  const resolvedSearchParams = await searchParams;
  const orderNumber = resolvedSearchParams.orderNumber;
  
  if (!orderNumber) {
    redirect('/');
  }

  try {
    const order = await getOrderByOrderNumberService(orderNumber, customer.id);

    if (!order) {
      redirect('/');
    }

    return (
      <div>
        <HeaderWrapper />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="mt-2 text-gray-600">
              Thank you for your purchase. We&apos;ve received your order and will process it shortly.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
            </div>
            
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Order Information</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-600">Order Number</dt>
                      <dd className="text-sm font-medium text-gray-900">{order.orderNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Order Date</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Status</dt>
                      <dd className="text-sm font-medium text-gray-900 capitalize">{order.status.toLowerCase()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Total</dt>
                      <dd className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Shipping Address</h3>
                  <address className="text-sm text-gray-600 not-italic">
                    <div>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                    {order.shippingAddress.company && (
                      <div>{order.shippingAddress.company}</div>
                    )}
                    <div>{order.shippingAddress.street1}</div>
                    {order.shippingAddress.street2 && (
                      <div>{order.shippingAddress.street2}</div>
                    )}
                    <div>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </div>
                    <div>{order.shippingAddress.country}</div>
                    <div>{order.shippingAddress.phone}</div>
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Items Ordered</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {order.orderItems.map((item) => (
                <div key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatCurrency(order.tax)}</span>
                </div>
                <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              You will receive an email confirmation shortly. We&apos;ll send you another email when your order ships.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/customer/account"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Account
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading Success Page for order:', error);
    redirect('/');
  }
}
