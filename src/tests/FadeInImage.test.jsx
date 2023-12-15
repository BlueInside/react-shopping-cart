import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FadeInImage from '../components/FadeInImage';

describe('FadeInImage component', () => {
  it('render FadeInImage correctly', () => {
    const { container } = render(<FadeInImage />);
    expect(container).toMatchSnapshot();
  });
});
