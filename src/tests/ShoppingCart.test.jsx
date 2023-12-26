import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';

describe('ShoppingCart component', () => {
  const shoppingCart = [
    {
      id: 4,
      title: "Women's Classic Trench Coat",
      price: 89.99,
      description:
        'Stay stylish and comfortable with this classic trench coat for women. Perfect for rainy days and a fashionable choice for any season.',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 4.2, count: 150 },
    },
    {
      id: 5,
      title: 'Wireless Bluetooth Earbuds',
      price: 34.99,
      description:
        'Enjoy wireless freedom with these Bluetooth earbuds. High-quality sound, comfortable fit, and long battery life make them perfect for music lovers on the go.',
      category: 'electronics',
      image:
        'https://fakestoreapi.com/img/61pHAEJ4NML._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: { rate: 4.5, count: 200 },
      quantity: 4,
    },
    {
      id: 6,
      title: 'Home Office Desk',
      price: 159.95,
      description:
        'Create a productive and comfortable workspace with this home office desk. Spacious design, sturdy construction, and modern style make it a great addition to your home office.',
      category: 'furniture',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 4.0, count: 100 },
    },
  ];

  it('renders ShoppingCart properly', () => {
    const { container } = render(<ShoppingCart />);
    expect(container).toMatchSnapshot();
  });
  it('Displays items based on ShoppingCart Array', () => {
    render(<ShoppingCart products={shoppingCart} />);

    const displayedItems = screen.getAllByRole('cartItem');
    expect(displayedItems).toHaveLength(shoppingCart.length);

    displayedItems.forEach((item, index) => {
      let hasQuantity = !!shoppingCart[index].quantity;
      let elementPrice = shoppingCart[index].price;
      let elementQuantity = shoppingCart[index].quantity;

      const image = within(item).getByRole('cartItemImage');
      const title = within(item).getByRole('cartItemTitle');
      const price = within(item).getByRole('cartItemPrice');
      const quantity = within(item).getByRole('cartItemQuantity');
      expect(title).toHaveTextContent(shoppingCart[index].title);
      expect(price).toHaveTextContent(
        `$${hasQuantity ? elementPrice * elementQuantity : elementPrice * 1}`
      );

      expect(quantity).toHaveTextContent(
        `Quantity: ${hasQuantity ? shoppingCart[index].quantity : 1}`
      );
      expect(image).toHaveAttribute('src', shoppingCart[index].image);
    });
  });
});
