import { describe, expect, it } from 'vitest';
import ProductCard from '../components/ProductCard';
import { render, screen, within } from '@testing-library/react';

describe('ProductCard component', () => {
  const product = {
    id: 1,
    image: '#',
    title: 'someTitle',
    description: 'someDescription',
  };

  it('renders ProductCard correctly', () => {
    const container = render(
      <ProductCard image={product.image} title={product.title} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders ProductCard with correct information from the product object', () => {
    render(<ProductCard image={product.image} title={product.title} />);
    const card = screen.getByRole('productCard');
    const image = within(card).getByRole('productImage');
    const title = within(card).getByRole('productTitle');

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', product.image);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(product.title);
  });
});
