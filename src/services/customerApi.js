import axios from 'axios';

const api = axios.create({ 
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000 
});
const AUTH_LOGIN_PATH = '/auth/login';

let loginPromise = null;

const ensureAuthenticated = async (forceRefresh = false) => {
  // If force refresh, clear existing token and login promise
  if (forceRefresh) {
    localStorage.removeItem('token');
    loginPromise = null;
  }
  
  const existingToken = localStorage.getItem('token');
  if (existingToken && !forceRefresh) {
    return existingToken;
  }
  
  if (!loginPromise) {
    // Use a plain axios call to avoid the interceptor recursion
    const loginUrl = `${api.defaults.baseURL}${AUTH_LOGIN_PATH}`;
    loginPromise = axios
      .post(loginUrl, { 
        username: process.env.REACT_APP_AUTH_USERNAME || 'admin', 
        password: process.env.REACT_APP_AUTH_PASSWORD || 'adminpass' 
      })
      .then(({ data }) => {
        const token = data?.token;
        if (token) {
          localStorage.setItem('token', token);
          return token;
        }
        throw new Error('No token received from login');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        throw error;
      })
      .finally(() => {
        loginPromise = null;
      });
  }
  return loginPromise;
};

api.interceptors.request.use(async (cfg) => {
  // Skip auth for the login endpoint itself
  if (cfg.url && (cfg.url === AUTH_LOGIN_PATH || cfg.url.endsWith(AUTH_LOGIN_PATH))) {
    return cfg;
  }
  
  // Always ensure we have a token before making API calls
  let token = localStorage.getItem('token');
  if (!token) {
    token = await ensureAuthenticated();
  }
  
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  
  return cfg;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 (Unauthorized) or 403 (Forbidden) - token expired or invalid
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear invalid token
      localStorage.removeItem('token');
      
      // Don't retry if this is already a retry attempt or if it's a login request
      if (!originalRequest._retry && originalRequest.url !== AUTH_LOGIN_PATH) {
        originalRequest._retry = true;
        
        try {
          // Get a new token
          const newToken = await ensureAuthenticated(true);
          if (newToken) {
            // Update the authorization header with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // Retry the original request
            return api(originalRequest);
          }
        } catch (loginError) {
          console.error('Re-authentication failed:', loginError);
          // If re-authentication fails, reject with the original error
          return Promise.reject(error);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const login = async ({ username, password }) => {
  const { data } = await api.post(AUTH_LOGIN_PATH, { username, password });
  if (data?.token) localStorage.setItem('token', data.token);
  return data;
};

export const createCustomer = (payload) => api.post('/customers', payload);
export const getCustomer = (id) => api.get(`/customers/${id}`);

// Accounts
export const createAccount = ({ customerId, type }) => {
  const form = new FormData();
  form.append('customerId', String(customerId));
  // Backend expects 'accountType' per AccountCreateRequest
  form.append('accountType', String(type));
  return api.post(`/accounts`, form);
};

// Per latest backend: inquire uses POST /accounts/inquire/{accountNumber}
export const inquireAccount = (number) => api.post(`/accounts/inquire/${number}`);

// Per latest backend: deposit uses POST /accounts/deposit with AmountRequest
export const deposit = ({ number, amount }) => {
  return api.post(`/accounts/deposit`, { amount, accountNumber: String(number) });
};

// Per latest backend: withdraw uses POST /accounts/withdraw with AmountRequest
export const withdraw = ({ number, amount }) => {
  return api.post(`/accounts/withdraw`, { amount, accountNumber: String(number) });
};

// PUT /accounts/{accountNumber}/close
export const closeAccount = (number) => api.put(`/accounts/${number}/close`);

// Per latest backend: history is GET /accounts/{accountNumber}
export const getAccountHistory = (number) => api.get(`/accounts/${number}`);

// Customers with accounts
export const getAllCustomersWithAccounts = () => api.get('/customers/all');

export default api;


