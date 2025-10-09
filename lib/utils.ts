/**
 * Utility functions for the Just One Dollar application
 */

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
