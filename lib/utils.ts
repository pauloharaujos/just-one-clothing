/**
 * Utility functions for the Just One Dollar application
 */

import { auth } from '@/auth';
import { getCustomerByEmail } from '@/repository/customerRepository';
import { User } from '@/prisma/generated/client';

/**
 * Formats a number as currency in USD format
 * @param value - The number to format as currency
 * @returns Formatted currency string (e.g., "$29.99")
 */
export function formatCurrency(value: number): string {
  try {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

/**
 * Get customer from session
 */
export async function getCustomerFromSession(): Promise<User | null> {
  const session = await auth();
  const userEmail = session?.user?.email;
  
  if (!userEmail) {
    return null;
  }

  return await getCustomerByEmail(userEmail);
}