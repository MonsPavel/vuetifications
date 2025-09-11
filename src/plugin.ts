import { notificationManager } from './core/NotificationManager';
import { notificationStore } from './core/useNotifications';

import type { NotificationOptions } from './types/notifications'

function notify(options: NotificationOptions) {
  notificationManager.mount();
  notificationStore.add(options);
}

const createShortcut = (type: NotificationOptions['type']) => {
  return (options: Omit<NotificationOptions, 'type'> | string) => {
    const normalized =
      typeof options === 'string'
        ? { message: options }
        : options
    notify({ ...normalized, type })
  }
}

notify.success = createShortcut('success')
notify.error = createShortcut('error')
notify.info = createShortcut('info')
notify.warning = createShortcut('warning')

export { notify }
