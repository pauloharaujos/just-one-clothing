
import { 
  getQuote,
  getQuoteItemCount,
  addItemToQuote, 
  updateQuoteItemQuantity, 
  removeQuoteItem,
  QuoteWithItems 
} from '@/repository/quoteRepository';
import { getProductById } from '@/repository/productRepository';
import { getCustomerFromSession } from '@/lib/utils';

export interface CartResult {
  success: boolean;
  error?: string;
  quote?: QuoteWithItems;
}

/**
 * Get the current cart
 */
export async function getCart(): Promise<QuoteWithItems> {
  const customer = await getCustomerFromSession();

  if (!customer?.id) {
    throw new Error('User must be logged in to access cart');
  }

  return await getQuote(customer.id);
}

/**
 * Add a product to the cart
 */
export async function addToCart(
  productId: number,
  quantity: number = 1
): Promise<CartResult> {
    const customer = await getCustomerFromSession();

    if (!customer?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    const product = await getProductById(productId);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    if (!product.visible) {
      return { success: false, error: 'Product is not available' };
    }

    const quote = await getQuote(customer.id);
    
    await addItemToQuote(quote.id, productId, quantity, product.price);

    return { success: true };
}

/**
 * Update the quantity of a cart item
 */
export async function updateCartItemQuantity(
  quoteItemId: number,
  quantity: number
): Promise<CartResult> {
    await updateQuoteItemQuantity(quoteItemId, quantity);
    return { success: true };
}

/**
 * Remove an item from the cart
 */
export async function removeFromCart(quoteItemId: number): Promise<CartResult> {
  await removeQuoteItem(quoteItemId);
  return { success: true };
}


/**
 * Get cart item count for display in header
 */
export async function getCartItemCount(): Promise<number> {
  const customer = await getCustomerFromSession();
    
  if (!customer?.id) {
    return 0;
  }

  const cart = await getQuoteItemCount(customer.id);

  return cart ?? 0;
}