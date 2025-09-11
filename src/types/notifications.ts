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

export interface Notification {
  id: number;
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  icon?: string;
  closable?: boolean;
  animation?: AnimationPreset;
}

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  icon?: string;
  closable?: boolean;
  animation?: AnimationPreset;
}