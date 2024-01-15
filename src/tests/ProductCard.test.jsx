import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ProductCard from '../components/ProductCard';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProductCard component', () => {
  let getCartSessionStorage;
  beforeEach(() => {
    getCartSessionStorage = () =>
      JSON.parse(window.sessionStorage.getItem('cart'));
  });

  afterEach(() => {
    window.sessionStorage.clear();
  });

  let product = {
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

  it('renders ProductCard correctly', () => {
    const container = render(<ProductCard {...product} product={product} />);
    expect(container).toMatchSnapshot();
  });

  it('renders ProductCard with correct information from the product object', () => {
    render(<ProductCard {...product} product={product} />);

    const card = screen.getByRole('productCard');
    const image = within(card).getByRole('productImage');
    const title = within(card).getByRole('productTitle');

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', product.image);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(product.title);
  });

  it('Displays full sized product information when image or title clicked', async () => {
    const user = userEvent.setup();

    render(<ProductCard {...product} product={product} />);
    const showModal = screen.getByRole('productImage');

    await user.click(showModal);
    const modal = await screen.findByRole('productModal');

    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText(`${product.title}`)).toBeInTheDocument();
  });

  it('adds items to the cart, and increase quantity if item is in cart already', async () => {
    const user = userEvent.setup();

    render(<ProductCard {...product} product={product} />);

    expect(JSON.parse(getCartSessionStorage())).toBeNull();

    await user.click(screen.getByRole('addToCart'));
    expect(getCartSessionStorage()).toContainEqual(product);

    // Increase quantity if product already is in the cart
    await user.click(screen.getByRole('addToCart'));
    expect(getCartSessionStorage()).toHaveLength(1);
    expect(getCartSessionStorage()[0].quantity).toEqual(2);

    // Increase quantity if product already is in the cart
    await user.click(screen.getByRole('addToCart'));
    expect(getCartSessionStorage()).toHaveLength(1);
    expect(getCartSessionStorage()[0].quantity).toEqual(3);
  });
});
