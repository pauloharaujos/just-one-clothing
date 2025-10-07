import { getMainCategoriesForMenu } from '@/repository/categoryRepository';
import Header from './Header';

export default async function HeaderWrapper() {
  const categories = await getMainCategoriesForMenu();
  
  return <Header categories={categories} />;
}
