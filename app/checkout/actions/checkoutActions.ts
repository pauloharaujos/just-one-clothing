'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { 
  deleteAddress,
  saveAddress as saveAddressService 
} from '@/services/address/addressService';
import { getCheckoutDataService, CheckoutData } from '@/services/checkout/checkoutService';
import { getCustomerByEmail } from '@/repository/customerRepository';
import { CreateAddressData } from '@/services/address/addressService';

/**
 * Get checkout data for a user
 */
export async function getCheckoutData(): Promise<CheckoutData> {
  const session = await auth();
    
  if (!session?.user?.email) {
    redirect('/customer/login?callbackUrl=/checkout');
  }

  const customer = await getCustomerByEmail(session?.user?.email);

  if (!customer?.id) {
    throw new Error('User not authenticated');
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
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('User not authenticated');
  }

  const customer = await getCustomerByEmail(session?.user?.email);

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
  const session = await auth();
  
  if (!session?.user?.email) {
    throw new Error('User not authenticated');
  }

  const customer = await getCustomerByEmail(session?.user?.email);

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
 * Proceed to payment
 */
export async function placeOrder(
  shippingAddressId: number,
  billingAddressId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await validateCheckout(shippingAddressId, billingAddressId);
    return { success: true };
  } catch (error) {
    console.error('Error proceeding to payment:', error);
    return { success: false, error: 'Failed to proceed to payment' };
  }
}