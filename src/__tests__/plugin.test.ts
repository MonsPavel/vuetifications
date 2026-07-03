import { afterEach, describe, expect, it } from 'vitest';

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
});
