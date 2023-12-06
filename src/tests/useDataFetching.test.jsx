import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useDataFetching from '../hooks/useDataFetching';

describe('useDataFetching', () => {
  it('returns data when correct url provided', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({ data: 'mockData' });
        },
      })
    );

    const { result } = renderHook(useDataFetching);

    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'mockData' });
    });

    console.log(result.current);
  });
});
