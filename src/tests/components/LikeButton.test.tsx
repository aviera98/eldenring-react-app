import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LikeButton } from '@/components/LikeButton';
import { renderWithProviders } from '@/tests/test-utils';

describe('LikeButton', () => {
  it('reflects active state and triggers the handler', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    renderWithProviders(<LikeButton isActive={false} onToggle={onToggle} />);

    const button = screen.getByRole('button', { name: /add to favorites/i });

    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
