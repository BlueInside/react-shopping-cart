import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Modal from '../components/Modal';

describe('Modal component', () => {
  it('renders Modal correctly', () => {
    const { container } = render(<Modal />);

    expect(container).toMatchSnapshot();
  });
});
