import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => {
  const client = { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() };
  return { __esModule: true, default: { ...client, create: () => client } };
});

test('renders the TechMart storefront', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /discover the latest technology/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /shop now/i })).toBeInTheDocument();
});
