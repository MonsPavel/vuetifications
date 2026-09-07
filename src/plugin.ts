import { h, render as vueRender } from 'vue';

import type { App, Plugin } from 'vue';

import { ensureMounted } from './core/mount';
import { createNotificationsStore, getActiveStore, notificationStore, notificationsKey, setActiveStore } from './core/useNotifications';
import NotificationContainer from './components/NotificationContainer.vue';

import type { NotificationsStore } from './core/useNotifications';
import type { NotificationHandle, NotificationOptions } from './types/notifications'

export interface VuetificationsPluginOptions {
  /** Дефолты для каждого уведомления приложения */
  defaults?: Partial<NotificationOptions>;
  /** Готовый стор (иначе создаётся из defaults) */
  store?: NotificationsStore;
}

function notify(options: NotificationOptions | string): NotificationHandle {
  // SSR: notify — клиентский API, на сервере безопасно ничего не делает
  if (typeof document === 'undefined') {
    return { id: -1, close: () => {} };
  }

  const store = getActiveStore();

  // Без app.use() уведомления уходят в дефолтный синглтон — монтируем standalone-контейнер
  if (store === notificationStore) {
    ensureMounted();
  }

  const normalized =
    typeof options === 'string'
      ? { message: options }
      : options
  const id = store.add(normalized);
  return { id, close: () => store.remove(id) };
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

/**
 * Настоящий Vue-плагин: стор живёт в контексте хост-приложения
 * (provide/inject, глобальные компоненты, i18n), контейнер рендерится
 * в том же приложении и снимается вместе с app.unmount().
 */
export const Vuetifications: Plugin<[VuetificationsPluginOptions?]> = {
  install(app: App, options: VuetificationsPluginOptions = {}) {
    const store = options.store ?? createNotificationsStore({ defaults: options.defaults });

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
      store.clear();
      if (getActiveStore() === store) {
        setActiveStore(null);
      }
    });
  }
}
