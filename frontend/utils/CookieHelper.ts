import Cookies from 'cookie-universal'
import { CookieSerializeOptions } from 'cookie'

export class CookieHelper {
  static set(name: string, data: any, opts?: CookieSerializeOptions) {
    const cookies = Cookies()

    cookies.set(name, data, {
      path: '/',
      ...opts,
    })
  }

  static get(
    name: string,
    opts?: {
      fromRes?: boolean
      parseJSON?: boolean
    }
  ): any {
    const cookies = Cookies()

    return cookies.get(name, {
      ...opts,
    })
  }

  static remove(name: string, opts?: CookieSerializeOptions): void {
    const cookies = Cookies()

    cookies.remove(name, {
      path: '/',
      ...opts,
    })
  }
}
