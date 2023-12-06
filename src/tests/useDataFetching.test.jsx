import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useDataFetching from '../hooks/useDataFetching';

describe('useDataFetching', () => {
  it('returns data when fetch is successful', async () => {
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
  });

  it('return error when fetch fails', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error('Failed to fetch data'))
    );

    const { result } = renderHook(useDataFetching);
    expect(result.current.error).toBeNull();
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('Failed to fetch data'));
    });
  });
});
