import { Metadata } from 'next';
import { getCheckoutData } from './actions/checkoutActions';
import CheckoutContainer from '@/ui/components/checkout/CheckoutContainer';
import CheckoutHeader from '@/ui/components/checkout/CheckoutHeader';
import CheckoutFooter from '@/ui/components/checkout/CheckoutFooter';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkout | Just One Dollar',
  description: 'Complete your order securely',
};

export default async function CheckoutPage() {
  const checkoutData = await getCheckoutData();

  return (
    <div className="min-h-screen flex flex-col">
      <CheckoutHeader />
      <main className="flex-1 mx-auto max-w-max px-4 sm:px-6 lg:px-12 py-8">
        <CheckoutContainer 
          checkout={checkoutData}
        />
      </main>
      <CheckoutFooter />
    </div>
  );
}
