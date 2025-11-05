import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Account from '../components/Account';
import * as customerApi from '../services/customerApi';

// Mock the API
jest.mock('../services/customerApi');

describe('Account Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders account operations', () => {
    render(<Account />);
    expect(screen.getByText(/Account Operations/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Inquire/i)).toBeInTheDocument();
  });

  test('creates account successfully', async () => {
    const mockData = { accountNumber: 'ACC123', balance: 100 };
    customerApi.createAccount.mockResolvedValue({ data: mockData });

    render(<Account />);
    
    const customerIdInput = screen.getByLabelText(/Customer ID/i);
    const createButton = screen.getByText(/Create/i);

    fireEvent.change(customerIdInput, { target: { value: 'CUST-001' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(customerApi.createAccount).toHaveBeenCalledWith({
        customerId: 'CUST-001',
        type: expect.any(String),
      });
    });
  });

  test('validates required fields', async () => {
    render(<Account />);
    
    const createButton = screen.getByText(/Create/i);
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText(/Provide Customer ID and Account Type/i)).toBeInTheDocument();
    });
  });
});
