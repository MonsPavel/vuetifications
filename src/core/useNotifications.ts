import { ref } from 'vue';

import type { Notification  } from '../types/notifications'

const notifications = ref<Notification[]>([]);
let seed = 0;

const timeoutMap = new Map<number, number | NodeJS.Timeout>();

export function useNotifications() {
  const add = (options: Omit<Notification, 'id'>) => {
    const id = ++seed;
    const n: Notification = {
      id,
      type: 'info',
      duration: 3000,
      position: 'top-right',
      closable: false,
      animation: options.animation || 'slide-fade',
      ...options
    };
    notifications.value.push(n);

    if (n.duration && n.duration > 0) {
      const timeoutId = setTimeout(() => {
        remove(id);
      }, n.duration);
      
      timeoutMap.set(id, timeoutId);
    }

    return id;
  };

  const remove = (id: number) => {
    if (timeoutMap.has(id)) {
      clearTimeout(timeoutMap.get(id) as number);
      timeoutMap.delete(id);
    }

    const index = notifications.value.findIndex(n => n.id === id);
    
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  return { notifications, add, remove };
}

export const notificationStore = useNotifications();
