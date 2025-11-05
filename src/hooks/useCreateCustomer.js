import { useState } from 'react';
import { createCustomer } from '../services/customerApi';
import { getErrorMessage } from '../utils/errorHandler';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

export const useCreateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const create = async (customerData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data } = await createCustomer(customerData);
      setSuccess(SUCCESS_MESSAGES.CUSTOMER_CREATED(data.customerId));
      return data;
    } catch (err) {
      const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.CREATE_CUSTOMER_ERROR;
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(null);
  };

  return { create, loading, error, success, reset };
};
