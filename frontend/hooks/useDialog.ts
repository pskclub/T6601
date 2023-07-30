import { defineStore } from 'pinia'
import { ref } from '#imports'
import { useWatchFalse } from '~/hooks/useWatch'

export const enum DialogType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface IDialogMetaItem {
  title: string
  message?: string
  type?: DialogType
  confirmText?: string
  cancelText?: string
  isShowCancelBtn?: boolean
}

export interface IDialog {
  isShow: boolean
  meta: IDialogMetaItem | undefined
  openDialog: (meta: IDialogMetaItem) => void
  closeDialogCancel: () => void
  closeDialogProceed: () => void
  error: (payload: IDialogMetaItem) => Promise<boolean>
  info: (payload: IDialogMetaItem) => Promise<boolean>
  success: (payload: IDialogMetaItem) => Promise<boolean>
  warning: (payload: IDialogMetaItem) => Promise<boolean>
}

export const useDialog: () => IDialog = defineStore('_dialog', () => {
  const isShow = ref(false)
  const meta = ref<IDialogMetaItem | undefined>(undefined)
  const isReject = ref<boolean>(false)
  const proceed = ref<any>(undefined)
  const cancel = ref<any>(undefined)

  const openDialog = async (payload: IDialogMetaItem): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      isShow.value = true
      meta.value = payload
      proceed.value = resolve
      cancel.value = reject
    })
  }

  const closeDialogProceed = () => {
    isShow.value = false
    meta.value = undefined
  }

  const closeDialogCancel = () => {
    isShow.value = false
    meta.value = undefined
    isReject.value = true
  }

  const error = async (payload: IDialogMetaItem) => {
    return openDialog({
      ...payload,
      type: DialogType.ERROR,
    })
  }

  const success = async (payload: IDialogMetaItem) => {
    return openDialog({
      ...payload,
      type: DialogType.SUCCESS,
    })
  }

  const info = async (payload: IDialogMetaItem) => {
    return openDialog({
      ...payload,
      type: DialogType.INFO,
    })
  }

  const warning = async (payload: IDialogMetaItem) => {
    return openDialog({
      ...payload,
      type: DialogType.WARNING,
    })
  }

  useWatchFalse(
    () => isShow.value,
    (val) => {
      if (isReject.value) {
        cancel.value()
      } else {
        proceed.value()
      }

      proceed.value = undefined
      cancel.value = undefined
      isReject.value = false
    }
  )

  return {
    isShow,
    meta,
    openDialog,
    closeDialogCancel,
    closeDialogProceed,
    error,
    success,
    info,
    warning,
  }
})
