import { VALIDATION_PATTERNS } from '../constants';

/**
 * Validates account number format
 * @param {string} accountNumber - Account number to validate
 * @returns {boolean} - True if valid
 */
export const isValidAccountNumber = (accountNumber) => {
  if (!accountNumber || typeof accountNumber !== 'string') return false;
  const trimmed = accountNumber.trim();
  return trimmed.length > 0 && VALIDATION_PATTERNS.ACCOUNT_NUMBER.test(trimmed);
};

/**
 * Validates customer ID format
 * @param {string} customerId - Customer ID to validate
 * @returns {boolean} - True if valid
 */
export const isValidCustomerId = (customerId) => {
  if (!customerId || typeof customerId !== 'string') return false;
  return customerId.trim().length > 0;
};

/**
 * Validates amount (must be a positive number)
 * @param {string|number} amount - Amount to validate
 * @returns {boolean} - True if valid
 */
export const isValidAmount = (amount) => {
  const num = Number(amount);
  return isFinite(num) && num > 0;
};

/**
 * Validates required field
 * @param {any} value - Value to validate
 * @returns {boolean} - True if valid (not empty)
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Sanitizes string input by trimming
 * @param {string} input - Input string
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') return String(input || '').trim();
  return input.trim();
};
