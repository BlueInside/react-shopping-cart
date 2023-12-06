import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('renders navbar correctly', () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it('renders links prop (array of links)', () => {
    const testLinks = [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'products', label: 'Products', path: '/products' },
      { id: 'about', label: 'About Us', path: '/about' },
    ];

    render(<Navbar links={testLinks} />);
    const navbar = screen.getByRole('navigation');
    const liElements = screen.getAllByRole('listitem');

    expect(navbar).toBeInTheDocument();
    expect(liElements.length).toBe(testLinks.length);
  });
});
