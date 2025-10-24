export default function Page() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat'
                }}></div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6">
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-indigo-300">New Collection Available</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Fashion for
                            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Everyone
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                            Discover affordable, stylish clothing that makes you look and feel amazing. 
                            Quality fashion without the premium price tag.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                Shop Now
                            </button>
                            <button className="px-8 py-4 border-2 border-gray-400 text-gray-300 hover:border-indigo-400 hover:text-indigo-300 font-semibold rounded-xl transition-all duration-300">
                                View Collection
                            </button>
                        </div>
                        
                        <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">10K+</div>
                                <div className="text-sm text-gray-400">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">500+</div>
                                <div className="text-sm text-gray-400">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">24/7</div>
                                <div className="text-sm text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="relative z-10">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                                    alt="Fashion Collection" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">New Arrivals</div>
                                        <div className="text-xs text-gray-500">50+ items</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">Free Shipping</div>
                                        <div className="text-xs text-gray-500">On orders $50+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}