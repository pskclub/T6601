import urlJoin from 'url-join'

export class StringHelper {
  static genString = (length = 5) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  static withComma = (value: number | string = 0): string => {
    return (+(value || 0)).toLocaleString()
  }

  static copyToClipBoard = async (value = '') => {
    return window.navigator.clipboard.writeText(value)
  }

  static split = (str: string | null | undefined, separator: string | RegExp): string[] => {
    return `${str || ''}`
      .split(separator)
      .filter((item: string) => item)
      .map((item: string) => item.trim())
  }

  static joinURL = urlJoin

  static truncate = (str: any, num = 300) => {
    const newStr = str || ''

    if (newStr.length > num) {
      return newStr.slice(0, num) + '...'
    }

    return newStr
  }

  static getError = (
    errorData: { code: string; message: any; fields: object } | any,
    defaultErrorMessage = 'มีบางอย่างผิดพลาด'
  ) => {
    let msg = errorData?.message

    if (!errorData.code || !msg) {
      return defaultErrorMessage
    }

    if (errorData.code !== 'INVALID_PARAMS' && !errorData.fields) {
      return msg
    }

    for (const [key, value] of Object.entries<any>(errorData.fields)) {
      msg = value.message
    }

    return msg
  }

  static maskPassword = (password: string) => {
    return password.replace(/./g, '*')
  }

  static phoneWithCountryCode = (phone: string, countryCode = '66') => {
    if (phone.startsWith('0')) {
      return `+${countryCode}${phone.slice(1)}`
    }

    return phone
  }

  static base64Encode = (str: string): string => {
    return btoa(str)
  }

  static base64Decode = (str: string): string => {
    return atob(str)
  }
}
