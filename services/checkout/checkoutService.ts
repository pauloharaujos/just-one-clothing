import { getOrderByOrderNumber, getOrdersByUserId } from '@/repository/orderRepository';
import { getCart } from '@/services/cart/cartService';
import { QuoteWithItems } from '@/repository/quoteRepository';
import { getAddressesByUserId } from '@/services/address/addressService';
import { Address } from '@/prisma/generated';
import { OrderWithDetails } from '@/repository/orderRepository';

export interface CheckoutValidationResult {
  isValid: boolean;
  error?: string;
  cart: QuoteWithItems;
  billingAddress: Address;
  shippingAddress: Address;
}

export interface CheckoutData {
  cart: QuoteWithItems;
  addresses: Address[];
  hasCartItems: boolean;
}

/**
 * Get checkout data for a user (cart + addresses)
 */
export async function getCheckoutDataService(
  userId: string
): Promise<CheckoutData> {
  try {
    const [cart, addresses] = await Promise.all([
      getCart(),
      getAddressesByUserId(userId)
    ]);

    return {
      cart,
      addresses,
      hasCartItems: cart && cart.quoteItems.length > 0
    };
  } catch (error) {
    console.error('Error getting checkout data:', error);
    throw new Error('Failed to load checkout data');
  }
}

/**
 * Gets order details by order number
 */
export async function getOrderByOrderNumberService(
  orderNumber: string,
  userId: string
): Promise<OrderWithDetails | null> {
  const order = await getOrderByOrderNumber(orderNumber);

  if (!order || order.userId !== userId) {
    return null;
  }

  return order;
}

/**
 * Gets user's order history
 */
export async function getOrdersByUserIdService(
  userId: string,
  limit = 20,
  offset = 0
): Promise<OrderWithDetails[] | null> {
  return await getOrdersByUserId(userId, limit, offset);
}

/**
 * Calculates order totals
 */
export function calculateTotals(
  items: Array<{ price: number; quantity: number }>
): { subtotal: number; tax: number; total: number } {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total
  };
}

/**
 * Validates checkout prerequisites
 */
export async function validateCheckout(
  userId: string,
  billingAddressId: number,
  shippingAddressId: number
): Promise<CheckoutValidationResult> {
  const cart = await getCart();
  if (!cart || cart.quoteItems.length === 0) {
    throw new Error('Cart is empty');
  }

  const addresses = await getAddressesByUserId(userId);
  const billingAddress = addresses.find(addr => addr.id === billingAddressId);
  const shippingAddress = addresses.find(addr => addr.id === shippingAddressId);

  if (!billingAddress) {
    console.error('Invalid billing address', billingAddressId);
    console.error('Addresses', addresses);
    throw new Error('Invalid billing address');
  }

  if (!shippingAddress) {
    console.error('Invalid shipping address', shippingAddressId);
    console.error('Addresses', addresses);
    throw new Error('Invalid shipping address');
  }

  return {
    isValid: true,
    cart,
    billingAddress,
    shippingAddress
  };
}
