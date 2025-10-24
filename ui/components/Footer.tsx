import Image from 'next/image';

export default function Page() {
    return (
        <footer className="w-full bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 py-12 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <a href="/" className="flex justify-center lg:justify-start mb-6">
                            <Image 
                                src="/logo.svg" 
                                alt="Just One" 
                                width={200}
                                height={60}
                                className="h-12 w-auto filter brightness-0 invert" 
                            />
                        </a>
                        <p className="py-6 text-sm text-gray-400 lg:max-w-xs text-center lg:text-left leading-relaxed">
                            Your go-to destination for affordable, stylish fashion. We believe everyone deserves to look great without breaking the bank.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href="/contact" className="py-2.5 px-6 h-10 block w-fit bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg text-sm font-semibold text-white mx-auto transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 lg:mx-0">
                                Contact Us
                            </a>
                            <a href="/newsletter" className="py-2.5 px-6 h-10 block w-fit border border-gray-600 rounded-xl text-sm font-semibold text-gray-300 hover:border-indigo-500 hover:text-indigo-400 mx-auto transition-all duration-300 lg:mx-0">
                                Newsletter
                            </a>
                        </div>
                    </div>
                    <div className="lg:mx-auto text-left">
                        <h4 className="text-lg text-white font-semibold mb-7 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            Shop
                        </h4>
                        <ul className="text-sm space-y-4">
                            <li><a href="/women" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Women's Fashion</a></li>
                            <li><a href="/men" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Men's Fashion</a></li>
                            <li><a href="/accessories" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Accessories</a></li>
                            <li><a href="/sale" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Sale & Clearance</a></li>
                            <li><a href="/new-arrivals" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div className="lg:mx-auto text-left">
                        <h4 className="text-lg text-white font-semibold mb-7 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            Support
                        </h4>
                        <ul className="text-sm space-y-4">
                            <li><a href="/help" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Help Center</a></li>
                            <li><a href="/size-guide" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Size Guide</a></li>
                            <li><a href="/shipping" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Shipping Info</a></li>
                            <li><a href="/returns" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Returns & Exchanges</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Contact Support</a></li>
                        </ul>
                    </div>
                    <div className="lg:mx-auto text-left">
                        <h4 className="text-lg text-white font-semibold mb-7 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                            Company
                        </h4>
                        <ul className="text-sm space-y-4">
                            <li><a href="/about" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">About Us</a></li>
                            <li><a href="/careers" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Careers</a></li>
                            <li><a href="/sustainability" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Sustainability</a></li>
                            <li><a href="/press" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Press</a></li>
                            <li><a href="/investors" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Investors</a></li>
                        </ul>
                    </div>
                    <div className="lg:mx-auto text-left">
                        <h4 className="text-lg text-white font-semibold mb-7 flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            Legal
                        </h4>
                        <ul className="text-sm space-y-4">
                            <li><a href="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Terms of Service</a></li>
                            <li><a href="/cookies" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Cookie Policy</a></li>
                            <li><a href="/accessibility" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">Accessibility</a></li>
                        </ul>
                    </div>
                </div>
                <div className="py-8 border-t border-gray-800">
                    <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                            <span>© 2024 Just One. All rights reserved.</span>
                            <div className="flex items-center gap-4 text-xs">
                                <a href="/privacy" className="hover:text-indigo-400 transition-colors duration-200">Privacy</a>
                                <a href="/terms" className="hover:text-indigo-400 transition-colors duration-200">Terms</a>
                                <a href="/cookies" className="hover:text-indigo-400 transition-colors duration-200">Cookies</a>
                            </div>
                        </div>
                        <div className="flex mt-6 space-x-3 sm:justify-center lg:mt-0">
                            <a href="https://twitter.com" className="w-10 h-10 rounded-xl bg-gray-800 flex justify-center items-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com" className="w-10 h-10 rounded-xl bg-gray-800 flex justify-center items-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98z"/>
                                </svg>
                            </a>
                            <a href="https://facebook.com" className="w-10 h-10 rounded-xl bg-gray-800 flex justify-center items-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://youtube.com" className="w-10 h-10 rounded-xl bg-gray-800 flex justify-center items-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="https://pinterest.com" className="w-10 h-10 rounded-xl bg-gray-800 flex justify-center items-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}