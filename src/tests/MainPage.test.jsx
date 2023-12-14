import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainPage from '../components/MainPage';
describe('MainPage', () => {
  it('renders MainPage component correctly', () => {
    const { container } = render(<MainPage />);
    expect(container).toMatchSnapshot();
  });

  it('should have header "Trend Tribe: Join the Fashion Revolution"', () => {
    render(<MainPage />);
    const header = screen.getByRole('heading', {
      name: /Trend Tribe: Join the Fashion Revolution/i,
    });
    expect(header).toBeInTheDocument();
  });

  it('contains, "discover more" button', () => {
    render(<MainPage />);
    const button = screen.getByRole('button', { label: /Discover more/i });
    expect(button).toBeInTheDocument();
  });

  it('should fetch and display 3 images', () => {
    render(<MainPage />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });
});
