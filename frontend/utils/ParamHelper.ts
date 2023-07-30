import { _get } from '~/utils/lodash'
import { IPageOptions } from '~/lib/api/types'

export class ParamHelper {
  static getBoolTrue = (bool: any): boolean => {
    if (bool === 'false') {
      return false
    }

    if (bool === 'true') {
      return true
    }

    return bool === null ? true : !!bool
  }

  static getBoolFalse = (bool: any): boolean => {
    if (bool === 'false') {
      return false
    }

    if (bool === 'true') {
      return true
    }

    return bool === null ? false : !!bool
  }

  static isNotFoundError = (error: IError | any): boolean => {
    return _get(error, 'code', true) === 'NOT_FOUND'
  }

  static isCodeNotFoundError = (options: IPageOptions | any): boolean => {
    return options._status === 404
  }

  static isChangeWithFalse = (value: boolean, oldValue: boolean): boolean => {
    return oldValue !== value && !value
  }

  static isChangeWithTrue = (value: boolean, oldValue: boolean): boolean => {
    return oldValue !== value && value
  }
}
