import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FlashMessage from '../components/FlashMessage';

describe('FlashMessage', () => {
  it('Renders flash message correctly', () => {
    render(<FlashMessage message={'Im message'} />);
  });

  it('displays message and then removes it after specified time', async () => {
    const message = 'Hello';
    render(<FlashMessage text={message} timer={500} />);
    expect(screen.getByRole('flashMessage')).toBeInTheDocument();
    expect(screen.getByRole('flashMessage')).toHaveTextContent(message);

    await waitFor(() => {
      expect(screen.getByRole('flashMessage')).not.toHaveTextContent();
    });
  });
});
