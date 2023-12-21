import { describe, expect, it, vi } from 'vitest';
import ProductCard from '../components/ProductCard';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProductCard component', () => {
  let product = {
    id: 1,
    image: '#',
    title: 'someTitle',
    description: 'someDescription',
  };

  it('renders ProductCard correctly', () => {
    const container = render(
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('throws error if not description passed', () => {
    const consoleMock = vi.spyOn(console, 'error');

    // Doesn't pass description in props
    render(<ProductCard image={product.image} title={product.title} />);
    expect(consoleMock).toHaveBeenCalled();

    consoleMock.mockReset();
  });
  it('renders ProductCard with correct information from the product object', () => {
    render(
      <ProductCard
        image={product.image}
        title={product.title}
        description={product.description}
      />
    );

    const card = screen.getByRole('productCard');
    const image = within(card).getByRole('productImage');
    const title = within(card).getByRole('productTitle');

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', product.image);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(product.title);
  });
  it('calls clickHandler when image being clicked', async () => {
    const user = userEvent.setup();
    const clickHandler = vi.fn();
    render(<ProductCard {...product} onClick={clickHandler} />);

    const image = screen.getByRole('productImage');

    await user.click(image);

    expect(clickHandler).toHaveBeenCalled();
  });
  it('has buttons remove and add that decrease increase quantity, also has quantity input', async () => {
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

    // // Typing '34' and pressing Enter should set the value to 34
    await user.type(amountInput, '34');
    expect(amountInput).toHaveValue(34);
  });
});
