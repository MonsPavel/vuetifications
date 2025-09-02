export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface Notification {
  id: number;
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
}

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
}