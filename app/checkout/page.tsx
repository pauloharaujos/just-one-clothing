import { Metadata } from 'next';
import { getCheckoutData } from './actions/checkoutActions';
import CheckoutContainer from '@/ui/components/checkout/CheckoutContainer';
import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkout | Just One Dollar',
  description: 'Complete your order securely',
};

export default async function CheckoutPage() {
  const checkoutData = await getCheckoutData();

  return (
    <div>
      <HeaderWrapper />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">
            Complete your order with secure payment
          </p>
        </div>

        <CheckoutContainer 
          cart={checkoutData}
        />
      </main>
      <Footer />
    </div>
  );
}
