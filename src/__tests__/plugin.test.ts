import { afterEach, describe, expect, it } from 'vitest';
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

  it('passes the style through to the rendered item', async () => {
    notify({ message: 'styled', style: 'quiet', duration: 0 });

    await nextTick();

    const item = document.querySelector('[data-vuetifications] .notification');
    expect(item?.classList.contains('notification--style-quiet')).toBe(true);
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

describe('notify.loading', () => {
  it('sets loading and defaults duration to 0 for a plain string', () => {
    notify.loading('building');

    expect(notifications.value[0]).toMatchObject({ message: 'building', loading: true, duration: 0 });
  });

  it('sets loading and defaults duration to 0 for options', () => {
    notify.loading({ message: 'building', style: 'quiet' });

    expect(notifications.value[0]).toMatchObject({ message: 'building', style: 'quiet', loading: true, duration: 0 });
  });

  it('keeps an explicit duration from the caller', () => {
    notify.loading({ message: 'building', duration: 5000 });

    expect(notifications.value[0]).toMatchObject({ loading: true, duration: 5000 });
  });

  it('returns a handle that closes the loading toast', () => {
    const handle = notify.loading('working');

    handle.close();

    expect(notifications.value).toHaveLength(0);
  });
});
