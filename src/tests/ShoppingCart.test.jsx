import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ShoppingCart from '../components/ShoppingCart';

describe('ShoppingCart component', () => {
  it('renders ShoppingCart properly', () => {
    const { container } = render(<ShoppingCart />);
    expect(container).toMatchSnapshot();
  });
});
