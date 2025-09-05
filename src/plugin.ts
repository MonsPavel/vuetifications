import { notificationManager } from './core/NotificationManager';
import { notificationStore } from './core/useNotifications';

import type { NotificationOptions } from './types/notifications'

export function notify(options: NotificationOptions) {
  notificationManager.mount();
  notificationStore.add(options);
}
