import Link from 'next/link';
import CloudinaryImage from '@/ui/components/CloudinaryImage';
import { getRecommendedProducts } from '@/repository/productRepository';
import { formatCurrency } from '@/lib/utils';

export default async function Products() {
    const products = await getRecommendedProducts();

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 mb-6">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-indigo-700">Featured Products</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Discover Our
                        <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Best Sellers
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Handpicked items that our customers love. Quality fashion at unbeatable prices.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <div className="aspect-square w-full bg-gray-100 overflow-hidden relative">
                                    <CloudinaryImage
                                        sku={product.sku}
                                        alt={product.name}
                                        width={384}
                                        height={531}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <Link 
                                                href={`/${product.url}`}
                                                className="w-full bg-white text-gray-900 font-semibold py-2 px-4 rounded-xl text-center block hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                            New
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                                            <Link href={`/${product.url}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">{product.sku}</p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                                            <span className="text-sm text-gray-500 line-through">{formatCurrency(product.price * 1.2)}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-1">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">(4.8)</span>
                                        </div>
                                    </div>
                                    
                                    <button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="text-center mt-12">
                    <Link 
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        View All Products
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}