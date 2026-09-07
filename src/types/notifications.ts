export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'simple';
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type AnimationPreset =
  | 'slide-fade'
  | 'fade' 
  | 'slide' 
  | 'scale' 
  | 'bounce'
  | 'flip'
  | 'zoom'
  | 'none';

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  icon?: string;
  closable?: boolean;
  animation?: AnimationPreset;
  /** Закрывать уведомление по клику на него */
  closeOnClick?: boolean;
  /** Ставить авто-закрытие на паузу при наведении (по умолчанию true) */
  pauseOnHover?: boolean;
}

/** Контент для notify.promise(): строка или набор опций */
export type PromiseNotificationContent = string | Partial<NotificationOptions>;

export interface PromiseNotificationsOptions {
  loading?: PromiseNotificationContent;
  success?: PromiseNotificationContent;
  error?: PromiseNotificationContent;
}

export interface Notification extends NotificationOptions {
  id: number;
}

export interface NotificationHandle {
  id: number;
  close: () => void;
}