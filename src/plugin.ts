import { ensureMounted } from './core/mount';
import { notificationStore } from './core/useNotifications';

import type { NotificationHandle, NotificationOptions } from './types/notifications'

function notify(options: NotificationOptions | string): NotificationHandle {
  ensureMounted();
  const normalized =
    typeof options === 'string'
      ? { message: options }
      : options
  const id = notificationStore.add(normalized);
  return { id, close: () => notificationStore.remove(id) };
}

const createShortcut = (type: NotificationOptions['type']) => {
  return (options: Omit<NotificationOptions, 'type'> | string): NotificationHandle => {
    const normalized =
      typeof options === 'string'
        ? { message: options }
        : options
    return notify({ ...normalized, type })
  }
}

notify.success = createShortcut('success')
notify.error = createShortcut('error')
notify.info = createShortcut('info')
notify.warning = createShortcut('warning')
notify.simple = createShortcut('simple')

export { notify }
