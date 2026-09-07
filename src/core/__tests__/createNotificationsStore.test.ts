import { describe, expect, it, vi } from 'vitest';

import { createNotificationsStore } from '../useNotifications';

describe('createNotificationsStore', () => {
  it('creates isolated stores with independent state', () => {
    const a = createNotificationsStore();
    const b = createNotificationsStore();

    a.add({ message: 'in a', duration: 0 });

    expect(a.notifications.value).toHaveLength(1);
    expect(b.notifications.value).toHaveLength(0);
  });

  it('keeps independent seeds per store', () => {
    const a = createNotificationsStore();
    const b = createNotificationsStore();

    const idA = a.add({ message: 'a', duration: 0 });
    const idB = b.add({ message: 'b', duration: 0 });

    expect(idA).toBe(1);
    expect(idB).toBe(1);
  });

  it('applies custom defaults to every added notification', () => {
    const store = createNotificationsStore({ duration: 100, position: 'bottom-left' });

    store.add({ message: 'x' });

    expect(store.notifications.value[0]).toMatchObject({
      duration: 100,
      position: 'bottom-left',
      type: 'info'
    });
  });

  it('lets explicit options beat custom defaults', () => {
    const store = createNotificationsStore({ duration: 100 });

    store.add({ message: 'x', duration: 5000 });

    expect(store.notifications.value[0].duration).toBe(5000);
  });

  it('runs timers per store without cross-store effects', () => {
    vi.useFakeTimers();
    const a = createNotificationsStore();
    const b = createNotificationsStore();

    a.add({ message: 'a', duration: 1000 });
    b.add({ message: 'b', duration: 1000 });

    vi.advanceTimersByTime(1000);

    expect(a.notifications.value).toHaveLength(0);
    expect(b.notifications.value).toHaveLength(0);

    vi.useRealTimers();
  });
});
