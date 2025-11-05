import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InquireCustomer from '../components/InquireCustomer';
import * as customerApi from '../services/customerApi';

jest.mock('../services/customerApi');

describe('InquireCustomer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders inquire customer form', () => {
    render(<InquireCustomer />);
    expect(screen.getByText(/Inquire Customer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Inquire/i)).toBeInTheDocument();
  });

  test('displays customer details on successful inquiry', async () => {
    const mockCustomer = { customerId: 'CUST-001', name: 'John Doe' };
    customerApi.getCustomer.mockResolvedValue({ data: mockCustomer });

    render(<InquireCustomer />);
    
    const input = screen.getByLabelText(/Customer ID/i);
    const button = screen.getByText(/Inquire/i);

    fireEvent.change(input, { target: { value: 'CUST-001' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/CUST-001/i)).toBeInTheDocument();
    });
  });

  test('shows error on failed inquiry', async () => {
    customerApi.getCustomer.mockRejectedValue(new Error('Customer not found'));

    render(<InquireCustomer />);
    
    const input = screen.getByLabelText(/Customer ID/i);
    const button = screen.getByText(/Inquire/i);

    fireEvent.change(input, { target: { value: 'INVALID' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
