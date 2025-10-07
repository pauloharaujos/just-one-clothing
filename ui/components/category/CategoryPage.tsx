import { Category } from '@/repository/categoryRepository';
import Breadcrumb from './Breadcrumb';
import ProductList from './ProductList';
import { Product } from './types';

interface CategoryPageProps {
  category: Category;
  products: Product[];
}

export default function CategoryPage({ category, products }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb category={category} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl">{category.description}</p>
          )}
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
