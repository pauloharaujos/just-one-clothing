'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getCustomerFromSession } from '@/lib/utils';
import { CreateAddressData } from '@/services/address/addressService';
import { 
  deleteAddress,
  saveAddress as saveAddressService 
} from '@/services/address/addressService';
import { 
  getCheckoutDataService,
  CheckoutData,
  placeOrderService
} from '@/services/checkout/checkoutService';

/**
 * Get checkout data for a user
 */
export async function getCheckoutData(): Promise<CheckoutData> {
  const customer = await getCustomerFromSession();
  let checkoutData: CheckoutData;

  if (!customer?.id) {
    redirect('/customer/login?callbackUrl=/checkout');
  }

  try {
    checkoutData = await getCheckoutDataService(customer.id);
  } catch (error) {
    console.error('Error getting checkout data:', error);
    throw new Error('Failed to load checkout data');
  }

  if (!checkoutData.hasCartItems) {
    redirect('/cart');
  }

  return checkoutData;
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
 * Place order and redirect to Stripe checkout
 */
export async function placeOrder(
  shippingAddressId: number,
  billingAddressId: number
): Promise<{ success: boolean; error?: string }> {
  const customer = await getCustomerFromSession();
  let stripeCheckoutUrl: string;

  if (!customer?.id) {
    throw new Error('User not authenticated');
  }

  try {
    stripeCheckoutUrl = await placeOrderService(
      customer.id,
      customer.email,
      shippingAddressId,
      billingAddressId
    );

  } catch (error) {
    console.error('Error placing order:', error);
    return { success: false, error: 'Failed to place order. Please try again.' };
  }

  revalidatePath('/checkout');
  redirect(stripeCheckoutUrl);
}