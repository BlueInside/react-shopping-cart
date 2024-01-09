import { describe, expect, it, vi } from 'vitest';
import FilterDropdown from '../components/FilterDropdown';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FilterDropdown component', () => {
  it('Renders FilterDropdown correctly', () => {
    const { container } = render(<FilterDropdown setSortOption={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  it('Should display FilterDropdown button', () => {
    render(<FilterDropdown setSortOption={() => {}} />);

    const dropdownBtn = screen.getByRole('filter');
    expect(dropdownBtn).toBeInTheDocument();
  });

  it('Display FilterDropdown content on click, hide when user chose option', async () => {
    const user = userEvent.setup();
    const mockSort = vi.fn();
    render(<FilterDropdown setSortOption={mockSort} />);

    const dropdownBtn = screen.getByRole('filter');
    await user.click(dropdownBtn);

    const dropdownOptions = screen.getAllByRole('filterOption');
    expect(dropdownOptions).toHaveLength(4);

    await user.click(dropdownOptions[0]);
    expect(mockSort).toHaveBeenCalled();

    expect(screen.queryByRole('filterOption')).toBeNull();
  });

  it('closes the dropdown when clicked outside', async () => {
    const user = userEvent.setup();
    render(<FilterDropdown setSortOption={() => {}} />);

    // Open the dropdown
    user.click(screen.getByRole('filter'));

    // Click anywhere on the screen
    await user.click(document.body);

    // Check if dropdown is closed
    screen.debug(screen.queryByRole('dropdownOptionsContainer'));
    expect(screen.queryByRole('dropdownOptionsContainer')).toBeNull();
  });
});
