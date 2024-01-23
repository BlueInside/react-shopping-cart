import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DisplayProductInformation from '../components/DisplayProductInformation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addToCard } from '../utils/cart';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import theme from '../components/styles/theme.';

describe('DisplayProductInformation component', () => {
  let product;
  let getCartSessionStorage;
  let handleAddToCart;

  const customRender = (ui, options) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

  beforeEach(() => {
    handleAddToCart = addToCard;

    getCartSessionStorage = () =>
      JSON.parse(window.sessionStorage.getItem('cart'));

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve(product);
        },
      })
    );

    product = {
      id: 4,
      title: "Women's Classic Trench Coat",
      price: 89.99,
      quantity: 1,
      description:
        'Stay stylish and comfortable with this classic trench coat for women. Perfect for rainy days and a fashionable choice for any season.',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 4.2, count: 150 },
    };
  });
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('displays product details accordingly to product object', async () => {
    await act(async () => {
      customRender(<DisplayProductInformation />);
    });

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
    expect(screen.getByRole('addToCart')).toBeInTheDocument();
  });

  it('let user adjust quantity', async () => {
    const user = userEvent.setup();

    await act(async () => {
      customRender(
        <DisplayProductInformation {...product} handleAddToCart={addToCard} />
      );
    });

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
  it.skip('adds item to cart in session storage', async () => {
    const mockHandleAddToCart = vi.fn();
    const user = userEvent.setup();

    await act(async () => {
      render(
        <DisplayProductInformation
          {...product}
          handleAddToCart={mockHandleAddToCart}
        />
      );
    });

    const quantityInput = screen.getByRole('quantity');
    await user.click(screen.getByRole('add'));
    await user.click(screen.getByRole('addToCart'));
    expect(mockHandleAddToCart).toHaveBeenCalledWith(
      Number(quantityInput.value)
    );
  });
  it.skip('verifies that the addToCart action updates the session storage with the correct quantity', async () => {
    // Check that sessionStorage is empty
    const user = userEvent.setup();
    expect(getCartSessionStorage()).toBeNull();

    render(
      <DisplayProductInformation
        {...product}
        handleAddToCart={(qty) => handleAddToCart(qty)}
      />
    );

    // Add the product to the cart
    await user.click(screen.getByRole('addToCart'));
    let quantity = screen.getByRole('quantity').value;
    expect(getCartSessionStorage()).not.toBeNull();
    expect(getCartSessionStorage()).toContainEqual(product);
    expect(getCartSessionStorage()[0].quantity).toEqual(quantity * 1);

    // Adding same product should increase quantity
    await user.click(screen.getByRole('addToCart'));
    expect(getCartSessionStorage()).toHaveLength(1);
    expect(getCartSessionStorage()[0].quantity).toEqual(quantity * 2);

    // Adding same product should increase current quantity
    await user.click(screen.getByRole('add'));
    await user.click(screen.getByRole('addToCart'));
    expect(getCartSessionStorage()).toHaveLength(1);
    expect(getCartSessionStorage()[0].quantity).toEqual(4);
  });
});
