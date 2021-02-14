/**
 * @function formatCurrency
 * Format number as currency (US Dollars)
 *
 * @param {number} currency
 * @returns {string} number formatted as currency.
 *
 * @example
 *   formatCurrency(0)
 *   // => $0.00
 *
 * @example
 *   formatCurrency(1.5)
 *   // => $1.50
 *
 */

// format number as currency
export function formatCurrency(currency) {
  // format number to US currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(currency);
}
