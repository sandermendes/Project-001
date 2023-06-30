import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('VitaNexus App', () => {
  render(<App />);
  const linkElement = screen.getByText(/VitaNexus/i);
  expect(linkElement).toBeInTheDocument();
});
