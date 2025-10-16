'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { 
  deleteAddress,
  saveAddress as saveAddressService 
} from '@/services/address/addressService';
import { 
  getCheckoutDataService,
  CheckoutData,
  validateCheckout,
  calculateTotals 
} from '@/services/checkout/checkoutService';
import { getCustomerFromSession } from '@/lib/utils';
import { CreateAddressData } from '@/services/address/addressService';
import { createOrder, generateOrderNumber } from '@/repository/orderRepository';
import { deactivateUserCart } from '@/repository/quoteRepository';
import { OrderWithDetails } from '@/repository/orderRepository';

/**
 * Get checkout data for a user
 */
export async function getCheckoutData(): Promise<CheckoutData> {
  const customer = await getCustomerFromSession();
    
  if (!customer?.id) {
    redirect('/customer/login?callbackUrl=/checkout');
  }

  try {
    const checkoutData = await getCheckoutDataService(customer.id);

    if (!checkoutData.hasCartItems) {
      redirect('/cart');
    }

    return checkoutData;
  } catch (error) {
    console.error('Error getting checkout data:', error);
    throw new Error('Failed to load checkout data');
  }
}

/**
 * Save address for a user
 */
export async function saveAddress(
  addressData: CreateAddressData
): Promise<{ success: boolean; error?: string }> {
  const customer = await getCustomerFromSession();

  if (!customer?.id) {
    throw new Error('User not authenticated');
  }

  try {
    await saveAddressService(customer.id, addressData);
    revalidatePath('/checkout');

    return { success: true };
  } catch (error) {
    console.error('Error saving address:', error);
    return { success: false, error: 'Failed to save address' };
  }
}

/**
 * Delete address for a user
 */
export async function deleteAddressAction(
  addressId: number
): Promise<{ success: boolean; error?: string }> {
  const customer = await getCustomerFromSession();
  
  if (!customer?.id) {
    throw new Error('User not authenticated');
  }

  try {
    await deleteAddress(addressId, customer.id);
    revalidatePath('/checkout');

    return { success: true };
  } catch (error) {
    console.error('Error deleting address:', error);
    return { success: false, error: 'Failed to delete address' };
  }
}

/**
 * Place order and redirect to success page
 */
export async function placeOrder(
  shippingAddressId: number,
  billingAddressId: number
): Promise<{ success: boolean; error?: string }> {
  const customer = await getCustomerFromSession();
  let order: OrderWithDetails;

  if (!customer?.id) {
    throw new Error('User not authenticated');
  }

  try {
    const validation = await validateCheckout(customer.id, billingAddressId, shippingAddressId);

    const totals = calculateTotals(
      validation.cart.quoteItems.map(item => ({
        price: item.price,
        quantity: item.quantity
      }))
    );

    const orderNumber = await generateOrderNumber();

    order = await createOrder({
      orderNumber,
      user: { connect: { id: customer.id } },
      billingAddress: { connect: { id: billingAddressId } },
      shippingAddress: { connect: { id: shippingAddressId } },
      subtotal: totals.subtotal,
      tax: totals.tax,
      total: totals.total,
      status: 'PENDING',
      orderItems: {
        create: validation.cart.quoteItems.map(item => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          price: item.price,
          name: item.product.name,
          sku: item.product.sku
        }))
      }
    });

    await deactivateUserCart(validation.cart.id);
  } catch (error) {
    console.error('Error placing order:', error);
    return { success: false, error: 'Failed to place order. Please try again.' };
  }

  revalidatePath('/checkout');
  redirect(`/checkout/success?orderNumber=${order.orderNumber}`);
}