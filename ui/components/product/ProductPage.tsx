import Image from 'next/image';

interface ProductPageProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    productImageLinks: Array<{
      image: {
        filename: string;
        altText?: string | null;
      };
    }>;
  };
}

function formatCurrency(value: number) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export default function ProductPage({ product }: ProductPageProps) {
  const image = product.productImageLinks[0]?.image;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
            {image ? (
              <Image
                src={`/product/images/${product.id}/${image.filename}`}
                alt={image.altText || product.name}
                width={800}
                height={800}
                className="h-full w-full object-contain"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">No image</div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(product.price)}</p>
          </div>

          <div className="grid grid-cols-[auto,1fr] items-center gap-3 w-full max-w-xs">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
            <select id="quantity" name="quantity" className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
              {[1,2,3,4,5].map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add to cart
            </button>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
