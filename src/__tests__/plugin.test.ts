import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

import { notify } from '../plugin';
import { notificationStore } from '../core/useNotifications';
import { unmount } from '../core/mount';

const { notifications, remove } = notificationStore;

const clearStore = () => {
  for (const n of [...notifications.value]) remove(n.id);
};

afterEach(() => {
  clearStore();
  unmount();
});

describe('notify', () => {
  it('adds a notification to the store', () => {
    notify({ message: 'hello', type: 'success' });

    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0]).toMatchObject({ message: 'hello', type: 'success' });
  });

  it('accepts a plain string', () => {
    notify('just text');

    expect(notifications.value[0]).toMatchObject({ message: 'just text' });
  });

  it('returns a handle with the notification id', () => {
    const handle = notify({ message: 'hello' });

    expect(handle.id).toBe(notifications.value[0].id);
  });

  it('handle.close() removes the notification', () => {
    const kept = notify({ message: 'kept', duration: 0 });
    const closed = notify({ message: 'closed', duration: 0 });

    closed.close();

    expect(notifications.value).toHaveLength(1);
    expect(notifications.value[0].id).toBe(kept.id);
  });

  it('handle.close() is safe to call twice', () => {
    const handle = notify({ message: 'x', duration: 0 });

    handle.close();
    handle.close();

    expect(notifications.value).toHaveLength(0);
  });

  it('mounts the container into document.body only once', () => {
    notify({ message: 'one' });
    notify({ message: 'two' });

    expect(document.querySelectorAll('[data-vuetifications]')).toHaveLength(1);
  });

  it('remounts the container after unmount', () => {
    notify({ message: 'one' });
    unmount();
    expect(document.querySelector('[data-vuetifications]')).toBeNull();

    notify({ message: 'two' });
    expect(document.querySelectorAll('[data-vuetifications]')).toHaveLength(1);
  });
});

describe('notify.promise', () => {
  it('shows a loading toast, then replaces it with the success message', async () => {
    let resolvePromise: (value: string) => void;
    const promise = new Promise<string>(resolve => { resolvePromise = resolve; });

    notify.promise(promise, {
      loading: 'uploading',
      success: 'done'
    });

    expect(notifications.value[0]).toMatchObject({ message: 'uploading', type: 'info', duration: 0 });

    resolvePromise!('payload');
    await promise;
    await nextTick();

    expect(notifications.value[0]).toMatchObject({ message: 'done', type: 'success' });
  });

  it('replaces the loading toast with the error message on rejection', async () => {
    let rejectPromise: (error: Error) => void;
    const promise = new Promise<string>((_resolve, reject) => { rejectPromise = reject; });
    promise.catch(() => {});

    notify.promise(promise, { loading: 'uploading', error: 'failed' });

    rejectPromise!(new Error('boom'));
    await promise.catch(() => {});
    await nextTick();

    expect(notifications.value[0]).toMatchObject({ message: 'failed', type: 'error' });
  });

  it('passes the resolution value through', async () => {
    const result = await notify.promise(Promise.resolve(42), { loading: 'x', success: 'y' });

    expect(result).toBe(42);
  });

  it('closes the loading toast when no success content is given', async () => {
    const promise = notify.promise(Promise.resolve('data'), { loading: 'working' });

    await promise;
    await nextTick();

    expect(notifications.value).toHaveLength(0);
  });

  it('auto-dismisses the success toast after the default duration', async () => {
    vi.useFakeTimers();

    notify.promise(Promise.resolve('ok'), { loading: 'working', success: 'finished' });
    await Promise.resolve();
    await nextTick();
    expect(notifications.value).toHaveLength(1);

    vi.advanceTimersByTime(3000);
    expect(notifications.value).toHaveLength(0);

    vi.useRealTimers();
  });
});

describe('shortcuts', () => {
  const shortcuts = ['success', 'error', 'info', 'warning', 'simple'] as const;

  it.each(shortcuts)('notify.%s sets the type', (type) => {
    notify[type]({ message: 'typed' });

    expect(notifications.value[0]).toMatchObject({ message: 'typed', type });
  });

  it.each(shortcuts)('notify.%s accepts a plain string', (type) => {
    notify[type]('just a message');

    expect(notifications.value[0]).toMatchObject({ message: 'just a message', type });
  });

  it.each(shortcuts)('notify.%s returns a working handle', (type) => {
    const handle = notify[type]('to be closed');

    handle.close();
    expect(notifications.value).toHaveLength(0);
  });
});
