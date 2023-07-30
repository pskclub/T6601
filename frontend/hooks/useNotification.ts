import { NotificationsOptions, notify } from '@kyvg/vue3-notification'
import { markRaw } from '#imports'

export type INotificationType = 'success' | 'error' | 'info' | 'warning'

export interface INotificationsOptions extends NotificationsOptions {
  type?: INotificationType
  title: string
  icon?: VueComponent
  class?: string
}

export const useNotification = () => {
  const run = (options: INotificationsOptions) => {
    notify({
      duration: 5000,
      ...options,
      data: {
        icon: options.icon && markRaw(options.icon),
      },
    })
  }

  const success = (options: INotificationsOptions) => {
    run({
      type: 'success',
      ...options,
    })
  }

  const error = (options: INotificationsOptions) => {
    run({
      type: 'error',
      ...options,
    })
  }

  const info = (options: INotificationsOptions) => {
    run({
      type: 'info',
      ...options,
    })
  }

  const warning = (options: INotificationsOptions) => {
    run({
      type: 'warning',
      ...options,
    })
  }

  return { success, error, info, warning }
}
