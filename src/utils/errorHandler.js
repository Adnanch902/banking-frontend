/**
 * Extracts a user-friendly error message from an error object
 * @param {Error|object} error - Error object from axios or other sources
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred';

  // Handle axios response errors
  if (error.response) {
    const { data, status } = error.response;

    // Handle specific status codes
    if (status === 401) {
      return 'You are not authorized. Please login again.';
    }
    if (status === 403) {
      return 'Access forbidden. You don\'t have permission.';
    }
    if (status === 404) {
      return 'Resource not found.';
    }
    if (status >= 500) {
      return 'Server error. Please try again later.';
    }

    // Try to extract message from response data
    if (data) {
      if (typeof data === 'string') return data;
      if (data.message) return data.message;
      if (data.error) return data.error;
      if (Array.isArray(data.errors)) {
        return data.errors.map(e => e.message || e).join(', ');
      }
      // For complex objects, try to stringify
      try {
        const stringified = JSON.stringify(data);
        if (stringified !== '{}') return stringified;
      } catch (e) {
        // Ignore stringify errors
      }
    }
  }

  // Handle network errors
  if (error.request && !error.response) {
    return 'Network error. Please check your connection.';
  }

  // Handle error with message property
  if (error.message) {
    return error.message;
  }

  // Fallback
  return 'An unexpected error occurred';
};

/**
 * Logs error to console in development mode
 * @param {Error|object} error - Error to log
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`Error in ${context}:`, error);
  }
};
