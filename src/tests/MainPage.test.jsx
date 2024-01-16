import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MainPage from '../components/MainPage';
import { MemoryRouter } from 'react-router-dom';

describe('MainPage', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(ui, { wrapper: MemoryRouter });
  };

  it('renders MainPage component correctly', () => {
    const { container } = renderWithRouter(<MainPage />);
    expect(container).toMatchSnapshot();
  });

  it('should have header "Trend Tribe: Join the Fashion Revolution"', async () => {
    renderWithRouter(<MainPage />);

    const header = await screen.findByRole('heading', {
      name: /Trend Tribe: Join the Fashion Revolution/i,
    });
    expect(header).toBeInTheDocument();
  });

  it('contains, "discover more" button', async () => {
    renderWithRouter(<MainPage />);
    const button = await screen.findByRole('button', {
      label: /Discover more/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('displays loading paragraph', () => {
    renderWithRouter(<MainPage />);
    const loadingPara = screen.getByRole('loader', { value: /Loading.../i });
    expect(loadingPara).toBeInTheDocument();
  });

  it('should fetch and display 3 images', async () => {
    renderWithRouter(<MainPage />);
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });
  });

  it('displays error paragraph', async () => {
    globalThis.fetch = vi.fn(async () => {
      Promise.resolve({
        ok: false,
        json: () => {
          return Promise.reject(new Error('Failed to fetch data'));
        },
      });

      renderWithRouter(<MainPage />);

      const errorPara = screen.getByRole('error', {
        value: /Failed to fetch data/i,
      });

      expect(errorPara).toBeInTheDocument();
    });
  });
});
