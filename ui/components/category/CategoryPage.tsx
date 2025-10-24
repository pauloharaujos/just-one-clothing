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
        
        <div className="mb-12">
          <div className="text-center lg:text-left">
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {category.name}
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            
            {category.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>
        
        <ProductList products={products} />
      </div>
    </div>
  );
}
