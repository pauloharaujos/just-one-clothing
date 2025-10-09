import { auth } from '@/auth';
import { getGuestToken } from './cookieService';
import { 
  getQuote,
  createQuote,
  addItemToQuote, 
  updateQuoteItemQuantity, 
  removeQuoteItem,
  mergeGuestQuoteToUser,
  QuoteWithItems 
} from '@/repository/quoteRepository';
import { getProductById } from '@/repository/productRepository';

export interface CartResult {
  success: boolean;
  error?: string;
  quote?: QuoteWithItems;
}

/**
 * Get the current cart
 */
export async function getCart(): Promise<QuoteWithItems | null> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const guestToken = await getGuestToken();

    let quote = await getQuote(userId, guestToken);
    
    if (!quote) {
      quote = await createQuote(userId, guestToken);
    }
    
    return quote;
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
    const session = await auth();
    const userId = session?.user?.id;
    const guestToken = await getGuestToken();

    const product = await getProductById(productId);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    if (!product.visible) {
      return { success: false, error: 'Product is not available' };
    }

    let quote = await getQuote(userId, guestToken);
    if (!quote) {
      quote = await createQuote(userId, guestToken);
    }
    
    await addItemToQuote(quote.id, productId, quantity, product.price);

    return { success: true };
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
    await updateQuoteItemQuantity(quoteItemId, quantity);
    return { success: true };
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return { success: false, error: 'Failed to update item quantity' };
  }
}

/**
 * Remove an item from the cart
 */
export async function removeFromCart(quoteItemId: number): Promise<CartResult> {
  try {
    await removeQuoteItem(quoteItemId);
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove item from cart' };
  }
}

/**
 * Merge guest cart to user when they log in
 */
export async function mergeGuestCartToUser(userId: string): Promise<CartResult> {
  try {
    const guestToken = await getGuestToken();
    const mergedQuote = await mergeGuestQuoteToUser(guestToken, userId);
    
    if (mergedQuote) {
      return { success: true, quote: mergedQuote };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error merging guest cart:', error);
    return { success: false, error: 'Failed to merge cart' };
  }
}

/**
 * Get cart item count for display in header
 */
export async function getCartItemCount(): Promise<number> {
  try {
    const cart = await getCart();
    if (!cart) return 0;
    
    return cart.quoteItems.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
}
