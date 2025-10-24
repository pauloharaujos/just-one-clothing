"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { Category } from '@/repository/categoryRepository';
import CartIcon from '@/ui/components/cart/CartIcon';

interface HeaderProps {
  categories: Category[];
  minicartItemCount: number;
}

export default function Header({ categories, minicartItemCount }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const { data: session } = useSession();
    const isLoggedIn = session;

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setAccountDropdownOpen(false);
            }
        };

        if (accountDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [accountDropdownOpen]);

    return (
        <header className="bg-white border-b border-gray-200 shadow-lg">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12 lg:py-6">
                <div className="flex items-center gap-4">
                    <a href="/" className="flex items-center group">
                        <span className="sr-only">Just One Dollar</span>
                        <Image 
                            src="/logo.svg" 
                            alt="Just One Dollar" 
                            width={200}
                            height={60}
                            className="h-12 w-auto group-hover:scale-105 transition-transform duration-200" 
                        />
                    </a>
                </div>
                <div className="flex lg:hidden items-center gap-3">
                    <CartIcon minicartItemCount={minicartItemCount} />
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
                        aria-label="Open main menu"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className="relative group">
                            <Link href={`/${category.url}`} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-indigo-600 focus:outline-none transition-colors duration-200">
                                {category.name}
                                {category.children && category.children.length > 0 && (
                                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                                        <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                )}
                            </Link>
                            {category.children && category.children.length > 0 && (
                                <>
                                    <div className="absolute left-0 top-full w-full h-2 opacity-0 group-hover:opacity-100"></div>
                                    <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                        <div className="p-4 grid gap-2">
                                            {category.children?.map(child => (
                                                <Link key={child.id} href={`/${child.url}`} className="block rounded-xl p-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="hidden lg:flex items-center justify-end flex-1 gap-4">
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none transition-all duration-200"
                            >
                                <div className="p-1.5 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100">
                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                My Account
                                <svg className={`w-4 h-4 transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {accountDropdownOpen && (
                                <>
                                    <div className="absolute left-0 top-full w-full h-2 opacity-0"></div>
                                    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                                        <div className="py-2">
                                            <Link 
                                                href="/customer/account" 
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                                onClick={() => setAccountDropdownOpen(false)}
                                            >
                                                <div className="p-1.5 rounded-lg bg-indigo-100">
                                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                My Profile
                                            </Link>
                                            <Link 
                                                href="/customer/order" 
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                                onClick={() => setAccountDropdownOpen(false)}
                                            >
                                                <div className="p-1.5 rounded-lg bg-indigo-100">
                                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                </div>
                                                My Orders
                                            </Link>
                                            <Link 
                                                href="/customer/account/settings" 
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                                onClick={() => setAccountDropdownOpen(false)}
                                            >
                                                <div className="p-1.5 rounded-lg bg-indigo-100">
                                                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                Settings
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                                            >
                                                <div className="p-1.5 rounded-lg bg-red-100">
                                                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                </div>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link href="/customer/login" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 flex items-center gap-1 transition-colors duration-200">
                            Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                    )}
                    <CartIcon minicartItemCount={minicartItemCount} />
                </div>
            </nav>
            <div className={mobileMenuOpen ? "fixed inset-0 z-50 bg-black bg-opacity-30" : "hidden"}>
                <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <a href="/" className="flex items-center group">
                            <span className="sr-only">Just One Dollar</span>
                            <Image src="/logo.svg" alt="Just One Dollar" width={150} height={45} className="h-10 w-auto group-hover:scale-105 transition-transform duration-200" />
                        </a>
                        <button
                            type="button"
                            className="rounded-lg p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
                            aria-label="Close menu"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {categories.map(category => (
                            <details key={category.id}>
                                <summary className="flex items-center gap-2 text-sm font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors duration-200 py-2">
                                    {category.name}
                                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-gray-400">
                                        <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                </summary>
                                <div className="pl-4 pt-2 flex flex-col gap-2">
                                    {category.children?.map(child => (
                                        <Link key={child.id} href={`/${child.url}`} className="text-sm text-gray-700 py-2 hover:text-indigo-600 transition-colors duration-200 rounded-lg px-2 hover:bg-indigo-50">{child.name}</Link>
                                    ))}
                                </div>
                            </details>
                        ))}
                        <div className="border-t border-gray-100 pt-4">
                            {isLoggedIn ? (
                                <div className="space-y-2">
                                    <Link href="/customer/account" className="flex items-center gap-3 text-sm font-semibold text-gray-900 hover:text-indigo-600 py-2 transition-colors duration-200">
                                        <div className="p-1.5 rounded-lg bg-indigo-100">
                                            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        My Account
                                    </Link>
                                    <Link href="/customer/order" className="flex items-center gap-3 text-sm text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200">
                                        <div className="p-1.5 rounded-lg bg-indigo-100">
                                            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-3 text-sm text-red-600 hover:text-red-700 py-2 transition-colors duration-200 w-full text-left"
                                    >
                                        <div className="p-1.5 rounded-lg bg-red-100">
                                            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link href="/customer/login" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 flex items-center gap-1 transition-colors duration-200">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}