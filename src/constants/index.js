// Account Types
export const ACCOUNT_TYPES = {
  SAVINGS: 'SAVINGS',
  CURRENT: 'CURRENT',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  CUSTOMERS: '/customers',
  CUSTOMERS_ALL: '/customers/all',
  ACCOUNTS: '/accounts',
  ACCOUNTS_DEPOSIT: '/accounts/deposit',
  ACCOUNTS_WITHDRAW: '/accounts/withdraw',
  ACCOUNTS_CLOSE: '/accounts/close',
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
  ACCOUNT_NUMBER: /^[0-9A-Za-z_-]+$/,
  CUSTOMER_ID: /^CUST-\d{4}-\d{6}$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_ACCOUNT_NUMBER: 'Please enter a valid account number',
  INVALID_CUSTOMER_ID: 'Please enter a valid customer ID like CUST-2025-000001',
  INVALID_AMOUNT: 'Please enter a valid positive amount',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please login again.',
  UNEXPECTED_ERROR: 'An unexpected error occurred',
  CREATE_CUSTOMER_ERROR: 'Error creating customer',
  INQUIRE_CUSTOMER_ERROR: 'Error inquiring customer',
  CREATE_ACCOUNT_ERROR: 'Error creating account',
  INQUIRE_ACCOUNT_ERROR: 'Error inquiring account',
  DEPOSIT_ERROR: 'Error depositing',
  WITHDRAW_ERROR: 'Error withdrawing',
  CLOSE_ACCOUNT_ERROR: 'Error closing account',
  FETCH_HISTORY_ERROR: 'Error fetching history',
  LOAD_CUSTOMERS_ERROR: 'Failed to load customers',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CUSTOMER_CREATED: (id) => `Customer created with ID: ${id}`,
  ACCOUNT_CREATED: 'Account created successfully',
  DEPOSIT_SUCCESS: 'Deposit successful',
  WITHDRAW_SUCCESS: 'Withdrawal successful',
  ACCOUNT_CLOSED: 'Account closed successfully',
};

// Default Values
export const DEFAULTS = {
  ACCOUNT_TYPE: ACCOUNT_TYPES.SAVINGS,
  REQUEST_TIMEOUT: 10000,
};
