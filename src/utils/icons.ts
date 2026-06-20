import successIcon from '../assets/icons/success.svg'
import errorIcon from '../assets/icons/error.svg'
import infoIcon from '../assets/icons/info.svg'
import warningIcon from '../assets/icons/warning.svg'

import type { Notification, NotificationType } from '../types/notifications'

const defaultIcons: Partial<Record<NotificationType, string>> = {
  success: successIcon,
  error: errorIcon,
  info: infoIcon,
  warning: warningIcon,
}

export const getIcon = (n: Notification): string => {
  const { icon, type } = n

  if (icon) return icon

  if (type) return defaultIcons[type] ?? ''

  return ''
}
