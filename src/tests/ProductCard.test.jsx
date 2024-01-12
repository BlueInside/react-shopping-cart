import { describe, expect, it, vi } from 'vitest';
import ProductCard from '../components/ProductCard';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProductCard component', () => {
  let product = {
    id: 4,
    title: "Women's Classic Trench Coat",
    price: 89.99,
    description:
      'Stay stylish and comfortable with this classic trench coat for women. Perfect for rainy days and a fashionable choice for any season.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 4.2, count: 150 },
  };

  it('renders ProductCard correctly', () => {
    const container = render(<ProductCard {...product} />);
    expect(container).toMatchSnapshot();
  });

  it('renders ProductCard with correct information from the product object', () => {
    render(<ProductCard {...product} />);

    const card = screen.getByRole('productCard');
    const image = within(card).getByRole('productImage');
    const title = within(card).getByRole('productTitle');

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', product.image);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(product.title);
  });

  it.skip('Calls function on click', async () => {
    const user = userEvent.setup();

    const mockClickHandler = vi.fn();
    render(<ProductCard {...product} onClick={mockClickHandler} />);

    const productImage = screen.getByRole('productImage');
    const productTitle = screen.getByRole('productTitle');

    expect(mockClickHandler).not.toHaveBeenCalled();
    await user.click(productImage);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    await user.click(productTitle);
    expect(mockClickHandler).toHaveBeenCalledTimes(2);
  });

  it('Displays full sized product information when image or title clicked', async () => {
    const user = userEvent.setup();

    render(<ProductCard {...product} />);
    const showModal = screen.getByRole('productImage');

    await user.click(showModal);
    const modal = await screen.findByRole('productModal');

    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText(`${product.title}`)).toBeInTheDocument();
  });

  it.skip('has buttons remove and add that decrease increase quantity, also has quantity input', async () => {
    const user = userEvent.setup();

    render(<ProductCard {...product} />);
    const amountInput = screen.getByRole('quantity');
    const removeBtn = screen.getByRole('remove');
    const addBtn = screen.getByRole('add');

    // Initial quantity is 0
    expect(amountInput).toHaveValue(0);

    // Clicking remove when the quantity is already 0 should not decrease it
    await user.click(removeBtn);
    expect(parseInt(amountInput.value)).toBe(0);

    // Clicking add should increase the quantity to 1
    await user.click(addBtn);
    expect(parseInt(amountInput.value)).toBe(1);

    // Clicking on the input should focus it
    await user.click(amountInput);
    expect(amountInput).toHaveFocus();

    // Clearing the input should set the value to ''
    await user.clear(amountInput);
    expect(amountInput).toHaveValue(0);

    // Clicking add twice should increase the quantity to 2
    await user.click(addBtn);
    await user.click(addBtn);
    expect(amountInput).toHaveValue(2);

    // // Typing '34' and pressing Enter should set the value to 34
    await user.type(amountInput, '{backspace}34');
    expect(amountInput).toHaveValue(34);

    await user.type(amountInput), '3456kkkk';
    expect(amountInput).toHaveValue(3456);
  });
});
