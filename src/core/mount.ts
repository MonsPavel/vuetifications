import { createApp, type App } from 'vue';
import NotificationContainer from '../components/NotificationContainer.vue';

let app: App | null = null;
let container: HTMLElement | null = null;

export function ensureMounted() {
  if (app || typeof document === 'undefined') return;

  container = document.createElement('div');
  container.dataset.vuetifications = '';
  document.body.appendChild(container);

  app = createApp(NotificationContainer);
  app.mount(container);
}

export function unmount() {
  app?.unmount();
  container?.remove();
  app = null;
  container = null;
}
