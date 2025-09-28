
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import TopBanner from '@/app/ui/cms/top-banner';
import Sidebar from "@/app/ui/components/account/Sidebar";
import CustomerInfo from "@/app/ui/components/account/CustomerInfo";
import { auth } from '@/auth';
import { getCustomerByEmail } from '@/app/repository/customerRepository';

export default async function AccountPage() {
  const session = await auth();
  let user = null;

  if (session?.user?.email) {
    user = await getCustomerByEmail(session.user.email);
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBanner />
      <Header />
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
