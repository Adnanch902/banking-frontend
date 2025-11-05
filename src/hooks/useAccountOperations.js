import { useState } from 'react';
import {
  createAccount,
  inquireAccount,
  deposit,
  withdraw,
  closeAccount,
} from '../services/customerApi';
import { getErrorMessage } from '../utils/errorHandler';
import { ERROR_MESSAGES } from '../constants';

export const useAccountOperations = () => {
  const [loading, setLoading] = useState({
    create: false,
    inquire: false,
    deposit: false,
    withdraw: false,
    close: false,
  });
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const operations = {
    create: async (customerId, type) => {
      setLoading((l) => ({ ...l, create: true }));
      setError(null);
      try {
        const { data } = await createAccount({ customerId, type });
        setResult(data);
        return data;
      } catch (err) {
        const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.CREATE_ACCOUNT_ERROR;
        setError(errorMsg);
        throw err;
      } finally {
        setLoading((l) => ({ ...l, create: false }));
      }
    },

    inquire: async (accountNumber) => {
      setLoading((l) => ({ ...l, inquire: true }));
      setError(null);
      try {
        const { data } = await inquireAccount(accountNumber);
        setResult(data);
        return data;
      } catch (err) {
        const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.INQUIRE_ACCOUNT_ERROR;
        setError(errorMsg);
        throw err;
      } finally {
        setLoading((l) => ({ ...l, inquire: false }));
      }
    },

    deposit: async (accountNumber, amount) => {
      setLoading((l) => ({ ...l, deposit: true }));
      setError(null);
      try {
        const { data } = await deposit({ number: accountNumber, amount });
        setResult(data);
        return data;
      } catch (err) {
        const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.DEPOSIT_ERROR;
        setError(errorMsg);
        throw err;
      } finally {
        setLoading((l) => ({ ...l, deposit: false }));
      }
    },

    withdraw: async (accountNumber, amount) => {
      setLoading((l) => ({ ...l, withdraw: true }));
      setError(null);
      try {
        const { data } = await withdraw({ number: accountNumber, amount });
        setResult(data);
        return data;
      } catch (err) {
        const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.WITHDRAW_ERROR;
        setError(errorMsg);
        throw err;
      } finally {
        setLoading((l) => ({ ...l, withdraw: false }));
      }
    },

    close: async (accountNumber) => {
      setLoading((l) => ({ ...l, close: true }));
      setError(null);
      try {
        const { data } = await closeAccount(accountNumber);
        setResult(data);
        return data;
      } catch (err) {
        const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.CLOSE_ACCOUNT_ERROR;
        setError(errorMsg);
        throw err;
      } finally {
        setLoading((l) => ({ ...l, close: false }));
      }
    },
  };

  const reset = () => {
    setError(null);
    setResult(null);
  };

  return { operations, loading, error, result, reset };
};
