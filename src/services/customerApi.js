import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });
const AUTH_LOGIN_PATH = '/auth/login';

let loginPromise = null;

const ensureAuthenticated = async () => {
  const existingToken = localStorage.getItem('token');
  if (existingToken) return existingToken;
  if (!loginPromise) {
    // Use a plain axios call to avoid the interceptor recursion
    const loginUrl = `${api.defaults.baseURL}${AUTH_LOGIN_PATH}`;
    loginPromise = axios
      .post(loginUrl, { username: 'admin', password: 'adminpass' })
      .then(({ data }) => {
        const token = data?.token;
        if (token) localStorage.setItem('token', token);
        return token;
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
  const token = localStorage.getItem('token') || (await ensureAuthenticated());
  if (token) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

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

// Per latest backend: inquire uses POST /accounts/close/{accountNumber}
export const inquireAccount = (number) => api.post(`/accounts/close/${number}`);

// Per latest backend: deposit uses POST /accounts/deposit with AmountRequest
export const deposit = ({ number, amount }) =>
  api.post(`/accounts/deposit`, { amount, accountNumber: String(number) });

// Per latest backend: withdraw uses POST /accounts/withdraw with AmountRequest
export const withdraw = ({ number, amount }) =>
  api.post(`/accounts/withdraw`, { amount, accountNumber: String(number) });

// Prefer POST /accounts/close/{accountNumber}
export const closeAccount = (number) => api.post(`/accounts/close/${number}`);

// Per latest backend: history is GET /accounts/{accountNumber}
export const getAccountHistory = (number) => api.get(`/accounts/${number}`);

// Customers with accounts
export const getAllCustomersWithAccounts = () => api.get('/customers/all');

export default api;


