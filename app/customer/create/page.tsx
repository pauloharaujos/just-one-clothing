import Header from "@/ui/components/header";
import Footer from "@/ui/components/footer";
import React from "react";
import CreateAccountForm from "@/ui/components/customer/create/CreateAccountForm";

export default function CreateAccountPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center border-x border-gray-200">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="mx-auto max-w-xl bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
            <CreateAccountForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
