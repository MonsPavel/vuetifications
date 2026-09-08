import type { NotificationPosition, NotificationOptions } from '../types/notifications';

export const POSITIONS: NotificationPosition[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right'
];

export const defaultOptions = {
  type: 'info',
  duration: 3000,
  position: 'top-right',
  closable: false,
  animation: 'slide-fade',
  closeOnClick: false,
  pauseOnHover: false,
} satisfies Partial<NotificationOptions>;