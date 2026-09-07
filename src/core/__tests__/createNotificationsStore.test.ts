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
    const store = createNotificationsStore({ defaults: { duration: 100, position: 'bottom-left' } });

    store.add({ message: 'x' });

    expect(store.notifications.value[0]).toMatchObject({
      duration: 100,
      position: 'bottom-left',
      type: 'info'
    });
  });

  it('lets explicit options beat custom defaults', () => {
    const store = createNotificationsStore({ defaults: { duration: 100 } });

    store.add({ message: 'x', duration: 5000 });

    expect(store.notifications.value[0].duration).toBe(5000);
  });

  it('queues notifications beyond maxVisible and shows them as slots free up', () => {
    vi.useFakeTimers();
    const store = createNotificationsStore({ maxVisible: 2 });

    store.add({ message: 'one', duration: 0 });
    store.add({ message: 'two', duration: 0 });
    store.add({ message: 'queued', duration: 0 });
    expect(store.notifications.value.map(n => n.message)).toEqual(['one', 'two']);

    store.remove(store.notifications.value[0].id);
    expect(store.notifications.value.map(n => n.message)).toEqual(['two', 'queued']);

    vi.useRealTimers();
  });

  it('starts the timer of a queued notification only when it becomes visible', () => {
    vi.useFakeTimers();
    const store = createNotificationsStore({ maxVisible: 1 });

    store.add({ message: 'first', duration: 1000 });
    store.add({ message: 'second', duration: 1000 });

    vi.advanceTimersByTime(1000);
    expect(store.notifications.value.map(n => n.message)).toEqual(['second']);

    vi.advanceTimersByTime(1000);
    expect(store.notifications.value).toHaveLength(0);

    vi.useRealTimers();
  });

  it('clear() discards queued notifications too', () => {
    const store = createNotificationsStore({ maxVisible: 1 });

    store.add({ message: 'visible', duration: 0 });
    store.add({ message: 'queued', duration: 0 });

    store.clear();

    expect(store.notifications.value).toHaveLength(0);
    store.add({ message: 'after clear', duration: 0 });
    expect(store.notifications.value.map(n => n.message)).toEqual(['after clear']);
  });

  it('update() merges options into an existing notification', () => {
    const store = createNotificationsStore();
    const id = store.add({ message: 'before', duration: 0 });

    store.update(id, { message: 'after', type: 'error' });

    expect(store.notifications.value[0]).toMatchObject({ id, message: 'after', type: 'error' });
  });

  it('update() restarts the auto-remove timer when duration changes', () => {
    vi.useFakeTimers();
    const store = createNotificationsStore();
    const id = store.add({ message: 'x', duration: 5000 });

    vi.advanceTimersByTime(4000);
    store.update(id, { duration: 100 });

    vi.advanceTimersByTime(100);
    expect(store.notifications.value).toHaveLength(0);

    vi.useRealTimers();
  });

  it('update() stops auto-remove when duration becomes 0', () => {
    vi.useFakeTimers();
    const store = createNotificationsStore();
    const id = store.add({ message: 'x', duration: 1000 });

    store.update(id, { duration: 0 });

    vi.advanceTimersByTime(60_000);
    expect(store.notifications.value).toHaveLength(1);

    vi.useRealTimers();
  });

  it('update() is a no-op for an unknown id', () => {
    const store = createNotificationsStore();

    expect(() => store.update(999_999, { message: 'ghost' })).not.toThrow();
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
