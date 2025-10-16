import CartItem from '@/ui/components/cart/CartItem';
import CartSummary from '@/ui/components/cart/CartSummary';
import EmptyCart from '@/ui/components/cart/EmptyCart';
import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';
import { getCart } from '@/app/cart/actions/cartActions';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shopping Cart | Just One Dollar',
  description: 'Review your items and proceed to checkout',
};

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.quoteItems.length === 0) {
    return (
      <div>
        <HeaderWrapper />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <EmptyCart />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <HeaderWrapper />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">
            {cart.quoteItems.length} item{cart.quoteItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
              </div>
              <div className="divide-y divide-gray-200 px-6">
                {cart.quoteItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary items={cart.quoteItems} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
