'use server';

import { revalidatePath } from 'next/cache';
import { 
  CartResult,
  getCart as getCartService,
  addToCart as addToCartService,
  updateCartItemQuantity as updateCartItemQuantityService,
  removeFromCart as removeFromCartService,
  mergeGuestCartToUser as mergeGuestCartToUserService,
  getCartItemCount as getCartItemCountService
} from '@/services/cart/cartService';
import { QuoteWithItems } from '@/repository/quoteRepository';

/**
 * Get the current cart
 */
export async function getCart(): Promise<QuoteWithItems | null> {
  return getCartService();
}

/**
 * Add a product to the cart
 */
export async function addToCart(
  productId: number,
  quantity: number = 1
): Promise<CartResult> {
  return addToCartService(productId, quantity);
}

/**
 * Update the quantity of a cart item
 */
export async function updateCartItemQuantity(
  quoteItemId: number,
  quantity: number
): Promise<CartResult> {
  const result = await updateCartItemQuantityService(quoteItemId, quantity);

  if (result.success) {
    revalidatePath('/cart');
  }

  return result;
}

/**
 * Remove an item from the cart
 */
export async function removeFromCart(quoteItemId: number): Promise<CartResult> {
  const result = await removeFromCartService(quoteItemId);

  if (result.success) {
    revalidatePath('/cart');
  }

  return result;
}

/**
 * Merge guest cart to user when they log in
 */
export async function mergeGuestCartToUser(userId: string): Promise<CartResult> {
  const result = await mergeGuestCartToUserService(userId);

  if (result.success) {
    revalidatePath('/cart');
  }

  return result;
}

/**
 * Get cart item count for display in header
 */
export async function getCartItemCount(): Promise<number> {
  return getCartItemCountService();
}
