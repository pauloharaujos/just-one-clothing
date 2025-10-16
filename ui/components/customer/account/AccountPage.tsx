
import HeaderWrapper from "@/ui/components/HeaderWrapper";
import Footer from "@/ui/components/Footer";
import TopBanner from '@/ui/cms/top-banner';
import Sidebar from "@/ui/components/customer/account/Sidebar";
import CustomerInfo from "@/ui/components/customer/account/CustomerInfo";
import { getCustomerFromSession } from '@/lib/utils';

export default async function AccountPage() {
  const user = await getCustomerFromSession();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBanner />
      <HeaderWrapper />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {user ? <CustomerInfo user={user} /> : <div>Could not load customer information.</div>}
        </main>
      </div>
      <Footer />
    </div>
  );
}
