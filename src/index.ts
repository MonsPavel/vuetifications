import './assets/styles/main.css';

export { notify, Vuetifications } from './plugin';
export type { VuetificationsPluginOptions } from './plugin';
export { createNotificationsStore, notificationStore, remove, clear, useNotifications } from './core/useNotifications';
export type { NotificationsStore, NotificationsStoreOptions } from './core/useNotifications';
export type { NotificationType, NotificationOptions, NotificationPosition, NotificationHandle, AnimationPreset } from './types/notifications';
