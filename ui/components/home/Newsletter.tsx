export default function Newsletter() {
    return (
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Stay in the Loop
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Get the latest updates on new arrivals, exclusive deals, and fashion tips delivered to your inbox.
                    </p>
                    
                    <div className="max-w-md mx-auto">
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-white text-white placeholder-white focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                            />
                            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-sm text-indigo-200 mt-3">
                            No spam, unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

