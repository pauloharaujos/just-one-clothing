'use client';

import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const isAccountActive = pathname === '/customer/account';
  const isOrdersActive = pathname === '/customer/order';

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Account</h2>
              <p className="text-xs text-gray-500">Manage your profile & orders</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <a 
              href="/customer/account" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                isAccountActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline">My Account</span>
              {isAccountActive && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </a>
            
            <a 
              href="/customer/order" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                isOrdersActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">My Orders</span>
              {isOrdersActive && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
