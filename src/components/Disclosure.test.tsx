import { render, screen, fireEvent } from '@testing-library/react';
import { Disclosure } from './Disclosure';
import { describe, it, expect } from 'vitest';

describe('Disclosure Component Accessibility', () => {
  it('toggles visibility and updates aria-expanded correctly', () => {
    render(
      <Disclosure title="Vocational Training Guide">
        <p>Hidden rural career content</p>
      </Disclosure>
    );

    const button = screen.getByRole('button', { name: /Vocational Training Guide/i });
    
    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Hidden rural career content')).not.toBeVisible();

    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Hidden rural career content')).toBeVisible();
  });
});