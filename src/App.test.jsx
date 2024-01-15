import { describe, it, expect } from 'vitest';
import App from './App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  it('renders Navbar', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
