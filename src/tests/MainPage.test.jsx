import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  it('displays loading paragraph', () => {
    render(<MainPage />);
    const loadingPara = screen.getByRole('status', { value: /Loading.../i });
    expect(loadingPara).toBeInTheDocument();
  });

  it('should fetch and display 3 images', async () => {
    render(<MainPage />);
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });
  });

  it('displays error paragraph', () => {
    globalThis.fetch = vi.fn(() => {
      Promise.resolve({
        ok: false,
        json: () => {
          return Promise.reject(new Error('Failed to fetch data'));
        },
      });
      render(<MainPage />);
      const errorPara = screen.getByRole('error', {
        value: /Failed to fetch data/i,
      });
      expect(errorPara).toBeInTheDocument();
    });
  });
});
