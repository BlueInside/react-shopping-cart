import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ShopPage from '../components/ShopPage';
describe('ShopPage component', () => {
  it('renders ShopPage correctly', () => {
    const { container } = render(<ShopPage />);
    expect(container).toMatchSnapshot();
  });
});
