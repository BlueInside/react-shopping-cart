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
    const { container } = render(
      <DisplayProductInformation {...product} handleAddToCart={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays product details accordingly to product object', async () => {
    render(
      <DisplayProductInformation {...product} handleAddToCart={() => {}} />
    );

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
    expect(screen.getByRole('addToCart')).toBeInTheDocument();
  });

  it('let user adjust quantity', async () => {
    const user = userEvent.setup();

    render(
      <DisplayProductInformation {...product} handleAddToCart={() => {}} />
    );
    const quantityInput = screen.getByRole('quantity');
    const addBtn = screen.getByRole('add');
    const reduceBtn = screen.getByRole('reduce');
    // Initial quantity is 1
    expect(quantityInput).toHaveValue(1);

    // Clicking remove when the quantity is already 0 should not decrease it
    await user.click(reduceBtn);
    expect(quantityInput).toHaveValue(1);

    // // Clicking add should increase the quantity to 1
    await user.click(addBtn);
    expect(quantityInput).toHaveValue(2);

    // Clicking add twice should increase the quantity to 3
    await user.click(addBtn);
    await user.click(addBtn);
    expect(quantityInput).toHaveValue(4);

    // When user clears input it should show 1
    await user.clear(quantityInput);
    expect(quantityInput).toHaveValue(1);

    // Checks if inputs updates value correctly
    await user.type(quantityInput, '234');
    expect(quantityInput).toHaveValue(1234);

    // Checks if input deletes numbers properly
    await user.type(quantityInput, '{backspace}{backspace}{backspace}');
    expect(quantityInput).toHaveValue(1);

    // Ignores letters
    await user.type(quantityInput, '234abc');
    expect(quantityInput).toHaveValue(1234);
  });
});
