import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../components/styles/theme.';

import { describe, expect, it } from 'vitest';
import Navbar from '../components/Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  const customRender = (ui, options) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
  const testLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: 'products' },
    { label: 'Cart', path: 'about' },
  ];

  it('renders navbar correctly', () => {
    const { container } = customRender(
      <MemoryRouter>
        <Navbar links={testLinks} />
      </MemoryRouter>
    );
    expect(container.querySelector('nav')).toMatchSnapshot();
  });

  it('renders navbar with links', () => {
    customRender(
      <MemoryRouter>
        <Navbar links={testLinks} />
      </MemoryRouter>
    );
    const navbar = screen.getByRole('navigation');
    const liElements = screen.getAllByRole('listitem');

    expect(navbar).toBeInTheDocument();
    expect(liElements.length).toBe(testLinks.length);
  });

  it('renders links with correct content and attribute', () => {
    customRender(
      <MemoryRouter>
        <Navbar links={testLinks} />
      </MemoryRouter>
    );

    testLinks.forEach((link) => {
      const linkElement = screen.getByRole('link', { name: link.label });
      expect(linkElement).toBeInTheDocument();
    });
  });
});
