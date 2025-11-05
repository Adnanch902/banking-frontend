import { useState } from 'react';
import { getAccountHistory } from '../services/customerApi';
import { getErrorMessage } from '../utils/errorHandler';
import { ERROR_MESSAGES } from '../constants';

export const useAccountHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async (accountNumber) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAccountHistory(accountNumber);
      const historyData = Array.isArray(data) ? data : [];
      setHistory(historyData);
      return historyData;
    } catch (err) {
      const errorMsg = getErrorMessage(err) || ERROR_MESSAGES.FETCH_HISTORY_ERROR;
      setError(errorMsg);
      setHistory([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setHistory([]);
  };

  return { fetchHistory, loading, error, history, reset };
};
