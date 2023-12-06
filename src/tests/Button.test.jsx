import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../components/Button';
import userEvent from '@testing-library/user-event';

describe('Button component', () => {
  it('renders correctly', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it('renders correct label', () => {
    const testLabel = 'test';
    render(<Button label={testLabel} />);
    const button = screen.getByRole('button', { name: testLabel });
    expect(button).toBeInTheDocument();
  });

  it('renders default label "button" if label not provided ', () => {
    render(<Button />);
    const button = screen.getByRole('button', { name: 'button' });
    expect(button).toBeInTheDocument();
  });

  it('calls handleClick function provided in props', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button handleClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'button' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('logs a warning when handleClick is not a function', () => {
    const consoleMock = vi.spyOn(console, 'error');

    render(<Button handleClick={'notAFunction'} />);

    expect(consoleMock).toHaveBeenCalled();

    consoleMock.mockReset();
  });
});
