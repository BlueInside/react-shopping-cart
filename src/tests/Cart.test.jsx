import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Cart from '../components/Cart';

describe('Cart component', () => {
  it('Renders Cart component correctly', () => {
    const { container } = render(<Cart />);
    expect(container).toMatchSnapshot();
  });
  it('');
});
