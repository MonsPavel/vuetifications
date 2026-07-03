import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { notificationStore } from '../useNotifications';
import { defaultOptions } from '../../constants/notification';

const { notifications, add, remove } = notificationStore;

const clearStore = () => {
  for (const n of [...notifications.value]) remove(n.id);
};

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  clearStore();
  vi.useRealTimers();
});

describe('add', () => {
  it('returns unique incrementing ids', () => {
    const first = add({ message: 'one' });
    const second = add({ message: 'two' });

    expect(second).toBe(first + 1);
    expect(notifications.value).toHaveLength(2);
  });

  it('applies default options', () => {
    const id = add({ message: 'hello' });
    const n = notifications.value.find(item => item.id === id);

    expect(n).toMatchObject({ ...defaultOptions, message: 'hello' });
  });

  it('keeps explicitly passed options over defaults', () => {
    const id = add({
      message: 'hi',
      type: 'error',
      duration: 5000,
      position: 'bottom-left',
      closable: true,
      animation: 'bounce'
    });
    const n = notifications.value.find(item => item.id === id);

    expect(n).toMatchObject({
      type: 'error',
      duration: 5000,
      position: 'bottom-left',
      closable: true,
      animation: 'bounce'
    });
  });

  it('sets a default icon based on type', () => {
    const id = add({ message: 'x', type: 'success' });
    const n = notifications.value.find(item => item.id === id);

    expect(n?.icon).toBeTruthy();
  });

  it('keeps a custom icon', () => {
    const id = add({ message: 'x', type: 'success', icon: 'custom.svg' });
    const n = notifications.value.find(item => item.id === id);

    expect(n?.icon).toBe('custom.svg');
  });

  it('leaves icon empty for the simple type', () => {
    const id = add({ message: 'x', type: 'simple' });
    const n = notifications.value.find(item => item.id === id);

    expect(n?.icon).toBeFalsy();
  });

  it('auto-removes the notification after its duration', () => {
    add({ message: 'x', duration: 1000 });

    vi.advanceTimersByTime(999);
    expect(notifications.value).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(notifications.value).toHaveLength(0);
  });

  it('does not auto-remove when duration is 0', () => {
    add({ message: 'x', duration: 0 });

    vi.advanceTimersByTime(60_000);
    expect(notifications.value).toHaveLength(1);
  });
});

describe('remove', () => {
  it('removes a notification by id', () => {
    const id = add({ message: 'x', duration: 0 });

    remove(id);
    expect(notifications.value).toHaveLength(0);
  });

  it('is a no-op for an unknown id', () => {
    add({ message: 'x', duration: 0 });

    remove(999_999);
    expect(notifications.value).toHaveLength(1);
  });

  it('is safe to call twice with the same id', () => {
    const keptId = add({ message: 'kept', duration: 0 });
    const removedId = add({ message: 'removed', duration: 0 });

    remove(removedId);
    remove(removedId);

    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0].id).toBe(keptId);
  });

  it('clears the pending auto-remove timeout', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const id = add({ message: 'x', duration: 1000 });

    remove(id);
    expect(clearSpy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(5000);
    expect(notifications.value).toHaveLength(0);
  });
});
