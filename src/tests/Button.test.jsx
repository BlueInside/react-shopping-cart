import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../components/Button';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

describe('Button component', () => {
  const customRender = (ui, options) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

  const theme = {
    colors: {
      primaryBlue: '#007BFF',
      primaryGreen: '#28A745',
      primaryYellow: '#FFC107',
      secondaryGrey: '#F8F9FA',
      secondaryDarkGrey: '#6C757D',
      secondaryWhite: '#FFFFFF',
      offWhite: '#F5F5F5',
      black: '#000000',
      errorRed: '#DC3545',
    },
  };
  it('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders correct label', () => {
    const testLabel = 'test';
    render(
      <ThemeProvider theme={theme}>
        <Button label={testLabel} />
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: testLabel });
    expect(button).toBeInTheDocument();
  });

  it('renders default label "button" if label not provided ', () => {
    customRender(<Button />);
    const button = screen.getByRole('button', { name: 'button' });
    expect(button).toBeInTheDocument();
  });

  it('calls handleClick function provided in props', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    customRender(<Button handleClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'button' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('logs a warning when handleClick is not a function', () => {
    const consoleMock = vi.spyOn(console, 'error');

    customRender(<Button handleClick={'notAFunction'} />);

    expect(consoleMock).toHaveBeenCalled();

    consoleMock.mockReset();
  });

  it('should be focused and interact on enter keypress', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    customRender(<Button handleClick={handleClick} />);
    const button = screen.getByRole('button');

    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });
  it('should accept role prop that set up its role', () => {
    customRender(<Button handleClick={() => {}} role="customRole" />);
    const button = screen.getByRole('customRole');

    expect(button).not.toBeUndefined();
  });
});
