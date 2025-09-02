import { notificationManager } from './core/NotificationManager';
import { notificationStore } from './core/useNotifications';

export function notify(options: {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  notificationManager.mount();
  notificationStore.add(options);
}
