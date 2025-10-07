"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Category } from '@/repository/categoryRepository';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { data: session } = useSession();
    const isLoggedIn = session;

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-12 lg:py-8">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <a href="/" className="flex items-center">
                        <span className="sr-only">Just One Dollar</span>
                        <Image 
                            src="/just-one-dollar-logo.png" 
                            alt="Just One Dollar" 
                            width={120}
                            height={38}
                            className="h-8 w-auto" 
                        />
                    </a>
                </div>
                {/* Hamburger menu for mobile */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 focus:outline-none"
                        aria-label="Open main menu"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {/* Navigation for desktop */}
                <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
                    {/* Product categories with dropdowns */}
                    {categories.map((category) => (
                        <div key={category.id} className="relative group">
                            <Link href={`/${category.url}`} className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-gray-700 focus:outline-none">
                                {category.name}
                                {category.children.length > 0 && (
                                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5 text-gray-400">
                                        <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                )}
                            </Link>
                            {/* Dropdown - hidden by default, show on hover */}
                            {category.children.length > 0 && (
                                <>
                                    {/* Invisible bridge to prevent hover loss */}
                                    <div className="absolute left-0 top-full w-full h-2 opacity-0 group-hover:opacity-100"></div>
                                    <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-xl bg-white shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
                                        <div className="p-4 grid gap-2">
                                            {category.children.map(child => (
                                                <Link key={child.id} href={`/${child.url}`} className="block rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-50">
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
                {/* Log in / My Account button */}
                <div className="hidden lg:flex items-center justify-end flex-1">
                    <Link href={isLoggedIn ? "/customer/account" : "/customer/login"} className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                        {isLoggedIn ? "My Account" : "Log in"} <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            <div className={mobileMenuOpen ? "fixed inset-0 z-50 bg-black bg-opacity-30" : "hidden"}>
                <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-lg p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <a href="/" className="flex items-center">
                            <span className="sr-only">Just One Dollar</span>
                            <Image src="/just-one-dollar-logo.png" alt="Just One Dollar" width={100} height={32} className="h-8 w-auto" />
                        </a>
                        <button
                            type="button"
                            className="rounded-md p-2 text-gray-700 focus:outline-none"
                            aria-label="Close menu"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {/* Product categories with dropdowns for mobile */}
                        {categories.map(category => (
                            <details key={category.id}>
                                <summary className="flex items-center gap-2 text-sm font-semibold text-gray-900 cursor-pointer">
                                    {category.name}
                                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5 text-gray-400">
                                        <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                </summary>
                                <div className="pl-4 pt-2 flex flex-col gap-2">
                                    {category.children.map(child => (
                                        <Link key={child.id} href={`/${child.url}`} className="text-sm text-gray-700 py-1">{child.name}</Link>
                                    ))}
                                </div>
                            </details>
                        ))}
                        <Link href={isLoggedIn ? "/customer/account" : "/customer/login"} className="text-sm font-semibold text-gray-900">{isLoggedIn ? "My Account" : "Log in"} <span aria-hidden="true">&rarr;</span></Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}