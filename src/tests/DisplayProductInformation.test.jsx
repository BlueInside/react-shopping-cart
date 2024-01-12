import { beforeEach, describe, expect, it } from 'vitest';
import DisplayProductInformation from '../components/DisplayProductInformation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DisplayProductInformation component', () => {
  let product;
  beforeEach(() => {
    product = {
      id: 4,
      title: "Women's Classic Trench Coat",
      price: 89.99,
      description:
        'Stay stylish and comfortable with this classic trench coat for women. Perfect for rainy days and a fashionable choice for any season.',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 4.2, count: 150 },
    };
  });

  it('renders DisplayProductInformation component correctly', () => {
    const { container } = render(<DisplayProductInformation {...product} />);
    expect(container).toMatchSnapshot();
  });

  it('displays product details accordingly to product object', async () => {
    render(<DisplayProductInformation {...product} />);

    expect(screen.getByRole('productImage')).toHaveAttribute(
      'src',
      product.image
    );
    expect(screen.getByRole('productDescription')).toHaveTextContent(
      product.description
    );
    expect(screen.getByRole('title')).toHaveTextContent(product.title);
    expect(screen.getByRole('price')).toHaveTextContent(product.price);
    expect(screen.getByRole('rating')).toHaveTextContent(product.rating.rate);
    expect(screen.getByRole('category')).toHaveTextContent(product.category);
  });

  it('let user adjust quantity', async () => {
    const user = userEvent.setup();

    render(<DisplayProductInformation {...product} />);
    const quantity = screen.getByRole('quantity');
    const addBtn = screen.getByRole('add');

    // Initial quantity is 0
    expect(quantity).toHaveTextContent('0');

    // Clicking remove when the quantity is already 0 should not decrease it
    await user.click(screen.getByRole('reduce'));
    expect(quantity).toHaveTextContent('0');

    // // Clicking add should increase the quantity to 1
    await user.click(addBtn);
    expect(quantity).toHaveTextContent('1');

    // Clicking add twice should increase the quantity to 3
    await user.click(addBtn);
    await user.click(addBtn);
    expect(quantity).toHaveTextContent('3');
  });
});
