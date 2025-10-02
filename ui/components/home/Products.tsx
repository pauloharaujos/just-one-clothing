import Image from 'next/image';
import Link from 'next/link';
import { getRecommendedProducts } from '@/repository/productRepository';

function formatCurrency(value: number) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export default async function Products() {
    const products = await getRecommendedProducts(4);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => {
                        const image = product.productImageLinks[0]?.image;
                        return (
                            <div key={product.id} className="group relative">
                                <div className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 overflow-hidden">
                                    {image ? (
                                        <Image 
                                            src={`/product/images/${product.id}/${image.filename}`}
                                            alt={image.altText || product.name}
                                            width={180}
                                            height={180}
                                            className="h-full w-full object-cover" 
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link href={`/${product.url}`}>
                                                <span aria-hidden="true" className="absolute inset-0"></span>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.sku}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}