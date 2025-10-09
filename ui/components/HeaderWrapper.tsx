import { getMainCategoriesForMenu } from '@/repository/categoryRepository';
import { getCartItemCount } from '@/app/cart/actions/cartActions';
import Header from './Header';

export default async function HeaderWrapper() {
  const categories = await getMainCategoriesForMenu();
  const minicartItemCount = await getCartItemCount();
  
  return <Header categories={categories} minicartItemCount={minicartItemCount} />;
}
