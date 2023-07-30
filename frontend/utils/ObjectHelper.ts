import { AxiosError } from 'axios'
import { _get, _isEmpty } from '~/utils/lodash'
import { ParamHelper } from '~/utils/ParamHelper'
import { IOption, IRadioOption } from '~/components/Form/types'

export interface IStatus {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoaded: boolean
  errorData: any | null
}

export class ObjectHelper {
  static createOption(value: any, label = ''): IOption {
    return {
      value,
      label: label || value,
    }
  }

  static createRadioOption(value: any, label: string | any = ''): IRadioOption {
    return {
      value,
      label: label || value,
    }
  }

  static toOption(data: any, valueAttr = 'id', labelAttr = 'name'): IOption {
    const newData = data || {}
    const value = _get(newData, valueAttr, '')

    return {
      value,
      label: _get(newData, labelAttr, value),
    }
  }

  static toOptions(data: any, valueAttr = 'id', labelAttr = 'name'): IOption[] {
    if (!data) {
      return []
    }

    const value = _get(data, valueAttr, '')

    return [
      {
        value,
        label: _get(data, labelAttr, value),
      },
    ]
  }

  static toStatus(obj: Partial<IStatus> & Record<string, any>): IStatus {
    return {
      isLoaded: ParamHelper.getBoolFalse(obj.isLoaded),
      isLoading: ParamHelper.getBoolFalse(obj.isLoading),
      isError: ParamHelper.getBoolFalse(obj.isError),
      isSuccess: ParamHelper.getBoolFalse(obj.isSuccess),
      errorData: obj.errorData || null,
    }
  }

  static toLoadingStatus(obj: Partial<IStatus> & Record<string, any>): IStatus & any {
    return {
      ...obj,
      isLoaded: false,
      isError: false,
      isLoading: true,
      isSuccess: false,
    }
  }

  static toItemsSuccessStatus(
    obj: Partial<IStatus> & Record<string, any>,
    items: any[]
  ): IStatus & any {
    return {
      ...obj,
      isSuccess: true,
      errorData: null,
      items,
    }
  }

  static toObjectSuccessStatus(
    obj: Partial<IStatus> & Record<string, any>,
    data: any = null
  ): IStatus & any {
    return {
      ...obj,
      isSuccess: true,
      errorData: null,
      data,
    }
  }

  static toErrorStatus(
    obj: Partial<IStatus> & Record<string, any>,
    error: AxiosError | any
  ): IStatus & any {
    let newError = {}

    try {
      newError = JSON.parse(error.response?.request?.response || '{}')
    } catch (e) {}

    if (!error.response?.status) {
      newError = {
        code: 'NETWORK_ERROR',
        message: 'Network error',
      }
    }

    return {
      ...obj,
      isError: true,
      isSuccess: false,
      errorData: newError,
    }
  }

  static toSuccessStatus(obj: Partial<IStatus> & Record<string, any>): IStatus & any {
    return {
      ...obj,
      isSuccess: true,
      errorData: null,
    }
  }

  static toCompleteStatus(obj: Partial<IStatus> & Record<string, any>): IStatus & any {
    return {
      ...obj,
      isLoading: false,
      isLoaded: true,
    }
  }

  static createStatus(): IStatus {
    return {
      isLoaded: false,
      isLoading: false,
      isError: false,
      isSuccess: false,
      errorData: null,
    }
  }

  static isInvalidParams(errorData: any): boolean {
    return errorData.code === 'INVALID_PARAMS'
  }

  static isEmpty = (object: any): boolean => {
    return _isEmpty(object)
  }
}
