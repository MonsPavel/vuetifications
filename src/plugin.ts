import { h, render as vueRender } from 'vue';

import type { App, Plugin } from 'vue';

import { ensureMounted } from './core/mount';
import { createNotificationsStore, getActiveStore, notificationStore, notificationsKey, setActiveStore } from './core/useNotifications';
import NotificationContainer from './components/NotificationContainer.vue';

import { defaultOptions } from './constants/notification';

import type { NotificationsStore } from './core/useNotifications';
import type { NotificationHandle, NotificationOptions, NotificationType, PromiseNotificationContent, PromiseNotificationsOptions } from './types/notifications'

export interface VuetificationsPluginOptions {
  /** Дефолты для каждого уведомления приложения */
  defaults?: Partial<NotificationOptions>;
  /** Максимум одновременных уведомлений; лишние ждут в очереди */
  maxVisible?: number;
  /** Готовый стор (иначе создаётся из defaults) */
  store?: NotificationsStore;
}

function addToast(options: NotificationOptions): NotificationHandle {
  // SSR: notify — клиентский API, на сервере безопасно ничего не делает
  if (typeof document === 'undefined') {
    return { id: -1, close: () => {} };
  }

  const store = getActiveStore();

  // Без app.use() уведомления уходят в дефолтный синглтон — монтируем standalone-контейнер
  if (store === notificationStore) {
    ensureMounted();
  }

  const id = store.add(options);
  return { id, close: () => store.remove(id) };
}

function notify(options: NotificationOptions | string): NotificationHandle {
  const normalized =
    typeof options === 'string'
      ? { message: options }
      : options
  return addToast(normalized);
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

const normalizeContent = (content?: PromiseNotificationContent): Partial<NotificationOptions> =>
  typeof content === 'string'
    ? { message: content }
    : (content ?? {})

/**
 * notify.promise(promise, { loading, success, error }): показывает loading-тост,
 * затем заменяет его на success/error. Исходный промис возвращается как есть.
 */
notify.promise = <T>(promise: Promise<T>, options: PromiseNotificationsOptions = {}): Promise<T> => {
  // Фиксируем стор на момент вызова: приложение может размонтироваться до резолва промиса
  const store = getActiveStore();
  const handle = addToast({
    message: '',
    ...normalizeContent(options.loading),
    type: 'info',
    duration: 0,
    closable: false
  });

  const finish = (content: PromiseNotificationContent | undefined, fallbackType: NotificationType) => {
    if (content === undefined) {
      handle.close();
      return;
    }

    store.update(handle.id, {
      type: fallbackType,
      duration: store.defaults.duration ?? defaultOptions.duration,
      ...normalizeContent(content)
    });
  };

  const relay = promise.then(
    data => {
      finish(options.success, 'success');
      return data;
    },
    error => {
      finish(options.error, 'error');
      throw error;
    }
  );
  // Обработчик вешаем на производный промис: ответственность за исходный — на вызывающем
  relay.catch(() => {});

  return promise;
};

export { notify }

/**
 * Настоящий Vue-плагин: стор живёт в контексте хост-приложения
 * (provide/inject, глобальные компоненты, i18n), контейнер рендерится
 * в том же приложении и снимается вместе с app.unmount().
 */
export const Vuetifications: Plugin<[VuetificationsPluginOptions?]> = {
  install(app: App, options: VuetificationsPluginOptions = {}) {
    const ownsStore = !options.store;
    const store = options.store ?? createNotificationsStore({
      defaults: options.defaults,
      maxVisible: options.maxVisible
    });

    setActiveStore(store);
    app.provide(notificationsKey, store);

    if (typeof document === 'undefined') {
      return; // SSR: контейнер рендерится только на клиенте
    }

    const container = document.createElement('div');
    container.dataset.vuetifications = '';
    document.body.appendChild(container);

    const vnode = h(NotificationContainer);
    // Контекст хост-приложения: inject, глобальные компоненты/директивы, devtools
    vnode.appContext = app._context;
    vueRender(vnode, container);

    app.onUnmount(() => {
      vueRender(null, container);
      container.remove();
      // Пользовательский стор не наш — не очищаем его при размонтировании приложения
      if (ownsStore) {
        store.clear();
      }
      if (getActiveStore() === store) {
        setActiveStore(null);
      }
    });
  }
}
