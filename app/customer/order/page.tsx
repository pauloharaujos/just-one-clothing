import HeaderWrapper from "@/ui/components/HeaderWrapper";
import Footer from "@/ui/components/Footer";
import TopBanner from '@/ui/cms/top-banner';
import Sidebar from "@/ui/components/customer/account/Sidebar";
import OrdersList from "@/ui/components/customer/order/OrdersList";
import Pagination from "@/ui/components/customer/order/Pagination";
import { getPaginatedOrdersService } from '@/services/order/orderService';
import { getCustomerFromSession } from '@/lib/utils';
import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const user = await getCustomerFromSession();
  
  if (!user) {
    redirect('/customer/login');
  }

  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);
  
  if (currentPage < 1) {
    redirect('/customer/order');
  }

  const { orders, totalPages, currentPage: page } = await getPaginatedOrdersService(currentPage, 10);

  // If page is greater than total pages and there are orders, redirect to last page
  if (currentPage > totalPages && totalPages > 0) {
    redirect(`/customer/order?page=${totalPages}`);
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBanner />
      <HeaderWrapper />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="py-8">
          <Sidebar />
          <main className="mt-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="mt-2 text-gray-600">View and track your order history</p>
              </div>
              
              <OrdersList orders={orders} />
              
              {totalPages > 1 && (
                <Pagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  baseUrl="/customer/order" 
                />
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
