'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getCart } from '@/app/cart/actions/cartActions';
import { 
  getAddressesByUserId,
  deleteAddress,
  saveAddress as saveAddressService 
} from '@/services/address';
import { createCheckoutSession, getCheckoutDataService, CheckoutData } from '@/services/checkout/checkoutService';
import { getCustomerByEmail } from '@/repository/customerRepository';
import { CreateAddressData } from '@/services/address';

/**
 * Get checkout data for a user
 */
export async function getCheckoutData(): Promise<CheckoutData> {
  const session = await auth();
  const customer = await getCustomerByEmail(session?.user?.email || '');
  
  if (!session?.user?.email || !customer?.id) {
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
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  try {
    await saveAddressService(session.user.id, addressData);
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
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  try {
    await deleteAddress(addressId, session.user.id);
    revalidatePath('/checkout');

    return { success: true };
  } catch (error) {
    console.error('Error deleting address:', error);
    return { success: false, error: 'Failed to delete address' };
  }
}

export async function createCheckoutSession(
  billingAddressId: number,
  shippingAddressId: number
): Promise<{ success: boolean; sessionUrl?: string; orderNumber?: string; error?: string }> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  try {
    const cart = await getCart();

    if (!cart || cart.quoteItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const [billingAddress, shippingAddress] = await Promise.all([
      getAddressesByUserId(session.user.id).then(addresses => 
        addresses.find(addr => addr.id === billingAddressId)
      ),
      getAddressesByUserId(session.user.id).then(addresses => 
        addresses.find(addr => addr.id === shippingAddressId)
      )
    ]);

    if (!billingAddress || !shippingAddress) {
      throw new Error('Invalid addresses');
    }

    // Use checkout service to create checkout session
    const result = await createCheckoutSession({
      userId: session.user.id,
      userEmail: session.user.email,
      billingAddressId,
      shippingAddressId
    });

    return result;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create checkout session' 
    };
  }
}