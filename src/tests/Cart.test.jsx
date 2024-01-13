import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Cart from '../components/Cart';
import userEvent from '@testing-library/user-event';

describe('Cart component', () => {
  let product;
  beforeEach(() => {
    product = product = {
      id: 1,
      title: 'Example Product',
      price: 19.99,
      description: 'A test product',
      category: 'test',
      image: 'example.jpg',
      rating: { rate: 4.5, count: 10 },
    };
  });
  it('Renders Cart component correctly', () => {
    const { container } = render(<Cart />);
    expect(container).toMatchSnapshot();
  });

  it('adds items to the cart', async () => {
    // const user = userEvent.setup();
    // render(<Cart />);
    // expect(screen.getByRole('addToCart')).toBeInTheDocument();
    // user.click(screen.getByRole('addToCart'));
  });
});
