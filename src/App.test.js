import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Banking App', () => {
  render(<App />);
  const brandElement = screen.getByText(/Banking App/i);
  expect(brandElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  // Use getAllByText since these texts appear multiple times (navbar and home page)
  expect(screen.getAllByText(/Create Customer/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Inquire Customer/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Accounts/i).length).toBeGreaterThan(0);
});
