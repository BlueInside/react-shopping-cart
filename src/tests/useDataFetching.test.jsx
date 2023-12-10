import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useDataFetching from '../hooks/useDataFetching';

describe('useDataFetching', () => {
  it('initializes with correct initial state', () => {
    // Render useDataFetch
    const { result } = renderHook(useDataFetching);

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns data when fetch is successful', async () => {
    // Mock fetch with resolved promise
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({ data: 'mockData' });
        },
      })
    );

    const { result, rerender } = renderHook(useDataFetching);

    //Wait for data to load
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'mockData' });
    });

    // Render it again
    rerender();

    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'mockData' });
    });
  });

  it('return error when fetch fails', async () => {
    // Mock rejected fetch
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error('Failed to fetch data'))
    );

    const { result } = renderHook(useDataFetching);
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.error).toEqual(new Error('Failed to fetch data'));
    });
  });

  it('loading value starts as true, change to false when fetch is successful', async () => {
    // Mock fetch with resolved promise
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({ data: 'mockData' });
        },
      })
    );

    const { result } = renderHook(useDataFetching);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.data).not.toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  it('loading value starts as true, change to false when fetch is unsuccessful', async () => {
    // Mock fetch with resolved promise
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error('Failed to fetch data'))
    );

    const { result } = renderHook(useDataFetching);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.data).toBeNull();
      expect(result.current.error).toEqual(new Error('Failed to fetch data'));
    });
  });
});
