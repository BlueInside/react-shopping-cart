import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';
import Cart from '../components/Cart';

import userEvent from '@testing-library/user-event';
let shoppingCart = [];
let removeFromCart = () => {};
let addToCart = () => {};
let updateProductQuantity = () => {};

beforeEach(() => {
  updateProductQuantity = (productId, newQuantity) => {
    shoppingCart = shoppingCart.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
  };
  removeFromCart = (productId) => {
    shoppingCart = shoppingCart.filter((item) => item.id !== productId);
  };
  addToCart = (product) => {
    if (!product.quantity) {
      product = { ...product, quantity: 1 };
    }
    shoppingCart.push({ ...product });
  };

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
    const { container } = render(
      <ShoppingCart
        cartItems={shoppingCart}
        removeFromCart={removeFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('Displays items based on ShoppingCart Array', () => {
    render(
      <ShoppingCart
        cartItems={shoppingCart}
        removeFromCart={removeFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    );

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

    render(
      <ShoppingCart
        cartItems={shoppingCart}
        removeFromCart={removeFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    );

    const qtyControls = screen.getAllByRole('quantityControlsContainer');
    expect(qtyControls).toHaveLength(shoppingCart.length);

    let i = 0;
    for (let container of qtyControls) {
      let add = within(container).getByRole('addQuantity');
      let qty = within(container).getByRole('cartItemQuantity');
      let remove = within(container).getByRole('reduceQuantity');
      let mockQuantity = shoppingCart[i].quantity;

      expect(qty).toHaveTextContent(mockQuantity);

      // Click increase quantity by one
      await user.click(add);
      mockQuantity += 1;
      expect(qty).toHaveTextContent(mockQuantity);

      await user.click(add);
      mockQuantity += 1;
      expect(qty).toHaveTextContent(mockQuantity);

      // Click decrease quantity by one
      await user.click(remove);
      mockQuantity -= 1;
      expect(qty).toHaveTextContent(mockQuantity);

      i += 1;
    }
  });

  it('has delete button that removes item from shopping cart', async () => {
    const user = userEvent.setup();

    render(
      <ShoppingCart
        cartItems={shoppingCart}
        removeFromCart={removeFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    );

    let deleteButtons = screen.getAllByRole('deleteCartItem');
    let cartItems = screen.getAllByRole('cartItem');

    // Displays confirmation modal
    await user.click(deleteButtons[0]);
    let modalConfirmButton = screen.getByRole('confirmButton');
    let modalCancelButton = screen.getByRole('cancelButton');

    // Checks that no item is deleting if user cancel
    await user.click(modalCancelButton);
    cartItems = screen.getAllByRole('cartItem');
    expect(cartItems).toHaveLength(shoppingCart.length);

    await user.click(deleteButtons[0]);
    modalConfirmButton = screen.getByRole('confirmButton');

    // Checks that item is deleted from cart when modal is confirmed
    await user.click(modalConfirmButton);
    cartItems = screen.getAllByRole('cartItem');
    expect(shoppingCart).toHaveLength(cartItems.length - 1);
  });

  it('displays total price of all the products', async () => {
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
    ];
    const user = userEvent.setup();

    render(
      <ShoppingCart
        cartItems={shoppingCart}
        removeFromCart={removeFromCart}
        updateProductQuantity={updateProductQuantity}
      />
    );
    const totalPara = screen.getByRole('totalCartPrice');
    const addQtyBtn = screen.getByRole('addQuantity');
    const reduceQtyBtn = screen.getByRole('reduceQuantity');
    const cartSum = shoppingCart.reduce(
      (sum, obj) => sum + obj.price * obj.quantity,
      0
    );
    const roundedCartSum = parseFloat(cartSum.toFixed(2));

    expect(totalPara).toHaveTextContent(`Total: ${roundedCartSum}`);

    let currentQty = 2;

    // Reduce quantity to check if total price changes accordingly
    await user.click(reduceQtyBtn);
    currentQty = currentQty - 1;

    let newTotal = () =>
      parseFloat((shoppingCart[0].price * currentQty).toFixed(2));

    expect(totalPara).toHaveTextContent(`Total: ${newTotal()}`);

    await user.click(addQtyBtn);
    currentQty = currentQty + 1;
    await user.click(addQtyBtn);
    currentQty = currentQty + 1;

    expect(totalPara).toHaveTextContent(`Total: ${newTotal()}`);
  });
  it.skip('display empty cart message when cart is empty', () => {
    shoppingCart = [];
    render(<ShoppingCart products={shoppingCart} />);
    const emptyCartPara = screen.getByRole('emptyCartInfo');

    expect(emptyCartPara).toBeInTheDocument();
  });

  it.skip('displays confirmation modal for deletion', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart products={shoppingCart} />);

    const deleteFirstItemBtn = screen.getAllByRole('deleteCartItem')[0];
    await user.click(deleteFirstItemBtn);

    const confirmationModal = screen.getByRole('confirmationModal');
    const modalMessage = screen.getByRole('modalMessage');
    expect(modalMessage).toHaveTextContent(
      'Are you sure you want to delete this item?'
    );
    expect(confirmationModal).toBeInTheDocument();

    const modalCancelButton = screen.getByRole('cancelButton');
    await user.click(modalCancelButton);

    expect(confirmationModal).not.toBeInTheDocument();
  });
});
