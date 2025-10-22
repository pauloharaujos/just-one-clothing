import HeaderWrapper from "@/ui/components/HeaderWrapper";
import Footer from "@/ui/components/Footer";
import TopBanner from '@/ui/cms/top-banner';
import Sidebar from "@/ui/components/customer/account/Sidebar";
import OrderDetails from "@/ui/components/customer/order/OrderDetails";
import { getOrderByOrderNumberService } from '@/services/checkout/checkoutService';
import { getCustomerFromSession } from '@/lib/utils';
import { redirect, notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const user = await getCustomerFromSession();
  
  if (!user) {
    redirect('/customer/login');
  }

  const resolvedParams = await params;
  const order = await getOrderByOrderNumberService(resolvedParams.orderNumber, user.id);

  if (!order) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBanner />
      <HeaderWrapper />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="py-8">
          <Sidebar />
          <main className="mt-8">
            <OrderDetails order={order} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
