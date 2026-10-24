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

export type NotificationStyle = 'classic' | 'quiet' | 'edge' | 'tinted' | 'inverted';

export interface NotificationOptions {
  title?: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  icon?: string;
  closable?: boolean;
  animation?: AnimationPreset;
  /** Close when clicked (default: false). */
  closeOnClick?: boolean;
  /** Pause auto-dismiss while hovered (default: false). */
  pauseOnHover?: boolean;
  style?: NotificationStyle;
}

export interface Notification extends NotificationOptions {
  id: number;
}

export interface NotificationHandle {
  id: number;
  close: () => void;
}
