import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  const testLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'about', label: 'About Us', path: '/about' },
  ];

  it('renders navbar correctly', () => {
    const { container } = render(<Navbar links={testLinks} />);
    expect(container.querySelector('nav')).toMatchSnapshot();
  });

  it('renders navbar with links', () => {
    render(<Navbar links={testLinks} />);
    const navbar = screen.getByRole('navigation');
    const liElements = screen.getAllByRole('listitem');

    expect(navbar).toBeInTheDocument();
    expect(liElements.length).toBe(testLinks.length);
  });

  it('renders links with correct content and attribute', () => {
    render(<Navbar links={testLinks} />);

    testLinks.forEach((link) => {
      const linkElement = screen.getByRole('link', { name: link.label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute('href')).toBe(link.path);
    });
  });

  it('checks error logged into console when no links array provided', () => {
    const consoleMock = vi.spyOn(console, 'error');

    render(<Navbar links={'hello'} />);

    expect(consoleMock).toHaveBeenCalled();

    consoleMock.mockReset();
  });
});
