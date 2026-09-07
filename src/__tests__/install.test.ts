import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp, defineComponent, h, nextTick } from 'vue';

import { notify, Vuetifications } from '../plugin';
import { notificationStore } from '../core/useNotifications';
import { useNotifications } from '../core/useNotifications';
import { createNotificationsStore } from '../core/useNotifications';
import { unmount } from '../core/mount';
import { clear, remove } from '../index';

const { notifications, remove: removeFromDefault } = notificationStore;

const clearDefaultStore = () => {
  for (const n of [...notifications.value]) removeFromDefault(n.id);
};

let hostApp: ReturnType<typeof createApp> | null = null;

const mountHostApp = (options: Parameters<typeof Vuetifications.install>[1] = {}) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  hostApp = createApp({ render: () => h('div', 'host content') });
  hostApp.use(Vuetifications, options);
  hostApp.mount(root);
  return hostApp;
};

afterEach(() => {
  hostApp?.unmount();
  hostApp = null;
  document.body.innerHTML = '';
  unmount();
  clearDefaultStore();
});

describe('Vuetifications plugin (app.use)', () => {
  it('renders the container into document.body on install', () => {
    mountHostApp();

    expect(document.querySelector('[data-vuetifications]')).not.toBeNull();
  });

  it('renders notifications from the plugin store', async () => {
    mountHostApp({ defaults: { duration: 0 } });

    notify({ message: 'from plugin' });
    await nextTick();

    expect(document.body.textContent).toContain('from plugin');
  });

  it('applies defaults passed to app.use', async () => {
    mountHostApp({ defaults: { duration: 0, position: 'bottom-left' } });

    notify({ message: 'positioned' });
    await nextTick();

    const container = document.querySelector('.notifications-container--bottom-left');
    expect(container?.textContent).toContain('positioned');
  });

  it('uses a store instance passed via options', async () => {
    const store = createNotificationsStore();
    mountHostApp({ store });

    store.add({ message: 'external store', duration: 0 });
    await nextTick();

    expect(document.body.textContent).toContain('external store');
  });

  it('exposes the store to host components via inject', async () => {
    let injected: ReturnType<typeof useNotifications> | undefined;

    const Host = defineComponent({
      setup() {
        injected = useNotifications();
        return () => h('div');
      }
    });
    const root = document.createElement('div');
    document.body.appendChild(root);
    const app = createApp(Host);
    app.use(Vuetifications, { defaults: { duration: 0 } });
    app.mount(root);
    hostApp = app;

    expect(injected).toBeDefined();

    injected!.add({ message: 'added via inject' });
    await nextTick();

    expect(document.body.textContent).toContain('added via inject');
  });

  it('removes the container when the host app unmounts', async () => {
    const app = mountHostApp({ defaults: { duration: 0 } });

    notify({ message: 'temporary' });
    await nextTick();
    expect(document.querySelectorAll('[data-vuetifications]')).toHaveLength(1);

    app.unmount();

    expect(document.querySelector('[data-vuetifications]')).toBeNull();
    expect(document.querySelector('.notifications-root')).toBeNull();
  });

  it('falls back to the standalone singleton after host unmount', () => {
    const app = mountHostApp();
    app.unmount();

    notify({ message: 'standalone again' });

    expect(document.querySelectorAll('[data-vuetifications]')).toHaveLength(1);
    expect(notifications.value).toHaveLength(1);
  });

  it('public remove() targets the active plugin store', async () => {
    mountHostApp({ defaults: { duration: 0 } });

    const handle = notify({ message: 'active store target' });
    await nextTick();
    expect(document.body.textContent).toContain('active store target');

    remove(handle.id);
    await nextTick();

    expect(document.body.textContent).not.toContain('active store target');
  });

  it('public clear() targets the active plugin store', async () => {
    mountHostApp({ defaults: { duration: 0 } });

    notify({ message: 'first' });
    notify({ message: 'second' });
    await nextTick();

    clear();
    await nextTick();

    expect(document.querySelector('.notifications-root')!.textContent).not.toContain('first');
    expect(document.querySelector('.notifications-root')!.textContent).not.toContain('second');
  });

  it('is a no-op on the server (no document)', () => {
    vi.stubGlobal('document', undefined);

    try {
      const handle = notify({ message: 'server side' });

      expect(handle.close).toBeTypeOf('function');
      expect(notifications.value).toHaveLength(0);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
