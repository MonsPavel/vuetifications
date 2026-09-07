import { getCurrentInstance, inject, ref } from 'vue';

import type { InjectionKey, Ref } from 'vue';
import type { Notification, NotificationOptions } from '../types/notifications'

import { defaultOptions } from '../constants/notification'

export interface NotificationsStoreOptions {
  /** Дефолты, вливаемые в каждое уведомление этого стора */
  defaults?: Partial<NotificationOptions>;
  /** Максимум одновременных уведомлений; лишние ждут в очереди (0 — без лимита) */
  maxVisible?: number;
}

export interface NotificationsStore {
  notifications: Ref<Notification[]>;
  add: (input: NotificationOptions) => number;
  update: (id: number, options: Partial<NotificationOptions>) => void;
  remove: (id: number) => void;
  clear: () => void;
  pause: (id: number) => void;
  resume: (id: number) => void;
}

interface TimerState {
  timeoutId: ReturnType<typeof setTimeout>;
  startedAt: number;
  remaining: number;
  paused: boolean;
}

export function createNotificationsStore(options: NotificationsStoreOptions = {}): NotificationsStore {
  const defaults: Partial<NotificationOptions> = { ...defaultOptions, ...options.defaults };
  const maxVisible = options.maxVisible ?? 0;
  const notifications = ref<Notification[]>([]);
  let seed = 0;
  const timerMap = new Map<number, TimerState>();
  // Уведомления сверх maxVisible: ждут здесь, таймер стартует при показе
  const pendingQueue: Notification[] = [];

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

    if (maxVisible > 0 && notifications.value.length >= maxVisible) {
      pendingQueue.push(n);
      return n.id;
    }

    notifications.value.push(n);

    if (n.duration && n.duration > 0) {
      startTimer(n.id, n.duration);
    }

    return n.id;
  };

  const update = (id: number, updateOptions: Partial<NotificationOptions>) => {
    const index = notifications.value.findIndex(n => n.id === id);

    if (index === -1) return;

    const current = notifications.value[index];
    const updated: Notification = { ...current, ...updateOptions, id };
    notifications.value.splice(index, 1, updated);

    if ((current.duration ?? 0) !== (updated.duration ?? 0)) {
      const timer = timerMap.get(id);
      if (timer) {
        clearTimeout(timer.timeoutId);
        timerMap.delete(id);
      }
      if (updated.duration && updated.duration > 0) {
        startTimer(id, updated.duration);
      }
    }
  };

  const flushPending = () => {
    while (maxVisible > 0 && pendingQueue.length && notifications.value.length < maxVisible) {
      const n = pendingQueue.shift()!;
      notifications.value.push(n);
      if (n.duration && n.duration > 0) {
        startTimer(n.id, n.duration);
      }
    }
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

    flushPending();
  };

  const clear = () => {
    pendingQueue.length = 0;
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

  return { notifications, add, update, remove, clear, pause, resume };
}

// Дефолтный синглтон: fallback для вызова notify() вне setup и для обратной совместимости
export const notificationStore = createNotificationsStore();

const { add, pause, resume } = notificationStore

export {
  add,
  pause,
  resume
}

/**
 * Активный стор: назначается плагином при app.use(),
 * чтобы публичные remove/clear и notify() вне setup работали с ним.
 */
let activeStore: NotificationsStore | null = null;

export function setActiveStore(store: NotificationsStore | null) {
  activeStore = store;
}

export function getActiveStore(): NotificationsStore {
  return activeStore ?? notificationStore;
}

export function remove(id: number) {
  getActiveStore().remove(id);
}

export function clear() {
  getActiveStore().clear();
}

/** Ключ provide/inject для стора внутри хост-приложения */
export const notificationsKey: InjectionKey<NotificationsStore> = Symbol('vuetifications');

/** Стор текущего приложения (через inject) или дефолтный синглтон вне setup */
export function useNotifications(): NotificationsStore {
  return getCurrentInstance()
    ? inject(notificationsKey, notificationStore)
    : notificationStore;
}
