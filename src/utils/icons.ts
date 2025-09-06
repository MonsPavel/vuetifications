import successIcon from '../assets/icons/success.svg'
import errorIcon from '../assets/icons/error.svg'
import infoIcon from '../assets/icons/info.svg'
import warningIcon from '../assets/icons/warning.svg'

import type { Notification } from '../types/notifications'

const defaultIcons: Record<string, string> = {
  success: successIcon,
  error: errorIcon,
  info: infoIcon,
  warning: warningIcon,
}

export const getIcon = (n: Notification) => {
  const { icon, type } = n

  if(icon) return icon

  if(type) return defaultIcons[type]

  return ''
}
