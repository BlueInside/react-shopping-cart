import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';
import userEvent from '@testing-library/user-event';
let shoppingCart = [];
beforeEach(() => {
  shoppingCart = [
    {
      id: 4,
      title: "Women's Classic Trench Coat",
      price: 89.99,
      description:
        'Stay stylish and comfortable with this classic trench coat for women. Perfect for rainy days and a fashionable choice for any season.',
      category: "women's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: { rate: 4.2, count: 150 },
      quantity: 2,
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
      quantity: 1,
    },
  ];
});
describe('ShoppingCart component', () => {
  it('renders ShoppingCart properly', () => {
    const { container } = render(<ShoppingCart products={shoppingCart} />);
    expect(container).toMatchSnapshot();
  });
  it('Displays items based on ShoppingCart Array', () => {
    render(<ShoppingCart products={shoppingCart} />);

    const displayedItems = screen.getAllByRole('cartItem');
    expect(displayedItems).toHaveLength(shoppingCart.length);

    displayedItems.forEach((item, index) => {
      let elementPrice = shoppingCart[index].price;
      let elementQuantity = shoppingCart[index].quantity;

      const image = within(item).getByRole('cartItemImage');
      const title = within(item).getByRole('cartItemTitle');
      const price = within(item).getByRole('cartItemPrice');
      const quantity = within(item).getByRole('cartItemQuantity');

      expect(title).toHaveTextContent(shoppingCart[index].title);
      expect(price).toHaveTextContent(`$${elementPrice * elementQuantity}`);

      expect(quantity).toHaveTextContent(`${shoppingCart[index].quantity}`);
      expect(image).toHaveAttribute('src', shoppingCart[index].image);
    });
  });
  it('Has quantity input field and buttons to add or remove quantities', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart products={shoppingCart} />);

    const qtyControls = screen.getAllByRole('quantityControlsContainer');
    expect(qtyControls).toHaveLength(shoppingCart.length);

    let i = 0;
    for (let container of qtyControls) {
      let add = within(container).getByRole('add');
      let qty = within(container).getByRole('cartItemQuantity');
      let remove = within(container).getByRole('remove');

      expect(qty).toHaveTextContent(shoppingCart[i].quantity);

      if (qty.textContent == 1) {
        // Doesn't go below 0
        await user.click(remove);
        expect(qty).toHaveTextContent(1);
      }

      // Click increase quantity by one
      await user.click(add);
      expect(qty).toHaveTextContent(shoppingCart[i].quantity + 1);

      // Click decrease quantity by one
      await user.click(remove);
      expect(qty).toHaveTextContent(shoppingCart[i].quantity);

      i += 1;
    }
  });

  it('has delete button that removes item from shopping cart', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart products={shoppingCart} />);
    let deleteButtons = screen.getAllByRole('deleteCartItem');
    let cartItems = screen.getAllByRole('cartItem');
    expect(cartItems).toHaveLength(shoppingCart.length);

    await user.click(deleteButtons[0]);
    cartItems = screen.getAllByRole('cartItem');
    expect(cartItems).toHaveLength(shoppingCart.length - 1);
  });

  it('displays total price of all the products', () => {});
  it('display empty cart message when cart is empty', () => {});
});
