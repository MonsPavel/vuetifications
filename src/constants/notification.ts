import type { NotificationPosition, Notification } from '../types/notifications';

export const POSITIONS: NotificationPosition[] = [
  'top-left', 
  'top-right', 
  'bottom-left', 
  'bottom-right'
];

export const defaultOptions: Omit<Notification, 'id'> = {
  type: 'info',
  duration: 3000,
  position: 'top-right',
  closable: false,
  animation: 'slide-fade',
  title: '',
  message: '',
}