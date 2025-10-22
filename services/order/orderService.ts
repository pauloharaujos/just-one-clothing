import { getOrdersByUserId, getOrdersCountByUserId } from '@/repository/orderRepository';
import { getCustomerFromSession } from '@/lib/utils';

export interface PaginatedOrdersResult {
  orders: any[] | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Get paginated orders for the current user
 */
export async function getPaginatedOrdersService(
  page: number = 1,
  limit: number = 10
): Promise<PaginatedOrdersResult> {
  const user = await getCustomerFromSession();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const offset = (page - 1) * limit;
  
  const [orders, totalCount] = await Promise.all([
    getOrdersByUserId(user.id, limit, offset),
    getOrdersCountByUserId(user.id)
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  
  return {
    orders,
    totalCount,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}
