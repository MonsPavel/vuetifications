import { ref } from 'vue';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface Notification {
  id: number;
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
}

const notifications = ref<Notification[]>([]);
let seed = 0;

export function useNotifications() {
  const add = (options: Omit<Notification, 'id'>) => {
    const id = ++seed;
    const n: Notification = {
      id,
      type: 'info',
      duration: 3000,
      position: 'top-right',
      ...options
    };
    notifications.value.push(n);

    if (n.duration && n.duration > 0) {
      setTimeout(() => remove(id), n.duration);
    }
  };

  const remove = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };

  return { notifications, add, remove };
}

export const notificationStore = useNotifications();
