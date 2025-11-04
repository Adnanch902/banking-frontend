import { render, screen, fireEvent } from '@testing-library/react';
import CreateCustomer from '../components/CreateCustomer';

test('renders create customer form', () => {
  render(<CreateCustomer />);
  const inputElement = screen.getByLabelText(/Name/i);
  expect(inputElement).toBeInTheDocument();
});