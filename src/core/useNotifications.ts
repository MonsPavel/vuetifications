import { ref } from 'vue';

import type { Notification, NotificationOptions } from '../types/notifications'

import { defaultOptions } from '../constants/notification'

import { getIcon } from '../utils/icons'

export interface NotificationsStoreOptions {
  /** Дефолты, вливаемые в каждое уведомление этого стора */
  defaults?: Partial<NotificationOptions>;
}

interface TimerState {
  timeoutId: ReturnType<typeof setTimeout>;
  startedAt: number;
  remaining: number;
  paused: boolean;
}

export function createNotificationsStore(options: NotificationsStoreOptions = {}) {
  const defaults: Partial<NotificationOptions> = { ...defaultOptions, ...options.defaults };
  const notifications = ref<Notification[]>([]);
  let seed = 0;
  const timerMap = new Map<number, TimerState>();

  const startTimer = (id: number, duration: number) => {
    const timeoutId = setTimeout(() => {
      timerMap.delete(id);
      remove(id);
    }, duration);

    timerMap.set(id, { timeoutId, startedAt: Date.now(), remaining: duration, paused: false });
  };

  const add = (input: NotificationOptions) => {
    const n: Notification = {
      id: ++seed,
      ...defaults,
      ...input
    };

    if (!n.icon && n.type) {
      n.icon = getIcon(n.type);
    }

    notifications.value.push(n);

    if (n.duration && n.duration > 0) {
      startTimer(n.id, n.duration);
    }

    return n.id;
  };

  const remove = (id: number) => {
    const timer = timerMap.get(id);

    if (timer) {
      clearTimeout(timer.timeoutId);
      timerMap.delete(id);
    }

    const index = notifications.value.findIndex(n => n.id === id);

    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  const clear = () => {
    for (const n of [...notifications.value]) remove(n.id);
  };

  const pause = (id: number) => {
    const timer = timerMap.get(id);

    if (!timer || timer.paused) return;

    clearTimeout(timer.timeoutId);
    timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.startedAt));
    timer.paused = true;
  };

  const resume = (id: number) => {
    const timer = timerMap.get(id);

    if (!timer || !timer.paused) return;

    timer.paused = false;
    timer.startedAt = Date.now();
    timer.timeoutId = setTimeout(() => {
      timerMap.delete(id);
      remove(id);
    }, timer.remaining);
  };

  return { notifications, add, remove, clear, pause, resume };
}

export type NotificationsStore = ReturnType<typeof createNotificationsStore>;

// Дефолтный синглтон: fallback для вызова notify() вне setup и для обратной совместимости
export const notificationStore = createNotificationsStore();

const { add, remove, clear, pause, resume } = notificationStore

export {
  add,
  remove,
  clear,
  pause,
  resume
}
