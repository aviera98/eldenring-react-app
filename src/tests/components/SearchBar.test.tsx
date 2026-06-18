import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SearchBar } from '@/components/SearchBar';
import { renderWithProviders } from '@/tests/test-utils';

describe('SearchBar', () => {
  it('submits trimmed values and selected category', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    renderWithProviders(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByPlaceholderText(/search the lands between/i), '  maliketh  ');
    await user.selectOptions(screen.getByRole('combobox'), 'bosses');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith({
      category: 'bosses',
      query: 'maliketh',
    });
  });
});
