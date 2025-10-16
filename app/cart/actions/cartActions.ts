'use server';

import { revalidatePath } from 'next/cache';
import { 
  CartResult,
  getCart as getCartService,
  addToCart as addToCartService,
  updateCartItemQuantity as updateCartItemQuantityService,
  removeFromCart as removeFromCartService,
  getCartItemCount as getCartItemCountService
} from '@/services/cart/cartService';
import { QuoteWithItems } from '@/repository/quoteRepository';

/**
 * Get the current cart
 */
export async function getCart(): Promise<QuoteWithItems | null> {
  try {
    return getCartService();
  } catch (error) {
    console.error('Error getting cart:', error);
    return null;
  }
}

/**
 * Add a product to the cart
 */
export async function addToCart(
  productId: number,
  quantity: number = 1
): Promise<CartResult> {
  try {
    return addToCartService(productId, quantity);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add item to cart' };
  }
}

/**
 * Update the quantity of a cart item
 */
export async function updateCartItemQuantity(
  quoteItemId: number,
  quantity: number
): Promise<CartResult> {
  try {
    const result = await updateCartItemQuantityService(quoteItemId, quantity);

    if (result.success) {
      revalidatePath('/cart');
    }

    return result;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return { success: false, error: 'Failed to update cart item quantity' };
  }
}

/**
 * Remove an item from the cart
 */
export async function removeFromCart(quoteItemId: number): Promise<CartResult> {
  try {
    const result = await removeFromCartService(quoteItemId);

    if (result.success) {
      revalidatePath('/cart');
    }
  
    return result;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove item from cart' };
  }
}


/**
 * Get cart item count for display in header
 */
export async function getCartItemCount(): Promise<number> {
  try {
    return getCartItemCountService();
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
}
