import { defineStore } from 'pinia'
import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios'
import { useObjectLoader } from '~/lib/api/loaderObject'
import { ParamHelper } from '~/utils/ParamHelper'
import { CONFIG } from '~/constants/config'
import { useRequestOptions } from '~/hooks/useRequestOptions'
import { computed, useCookie365Days } from '#imports'
import { IMeItem } from '~/models/me'
import { IUser } from '~/models/user'

export interface ILoginPayload {
  username: string
  password: string
}

export interface IRegisterPayload {
  username: string
  password: string
}

export const useToken = () => {
  return useCookie365Days(CONFIG.COOKIE_TOKEN_KEY_NAME)
}

const useLogin = defineStore('_auth.login', () => {
  const options = useRequestOptions()
  const me = useMe()
  const token = useToken()

  return useObjectLoader<IMeItem, ILoginPayload>({
    method: 'post',
    url: '/auth/login',
    getRequestOptions: () => {
      return {
        ...options.getDefault(),
        transformResponse(
          this: AxiosRequestConfig,
          data: any,
          _headers: AxiosResponseHeaders,
          status?: number
        ) {
          if (status && status < 300) {
            const res = JSON.parse(data)

            token.value = res[CONFIG.ACCESS_TOKEN_KEY_NAME]
            me.setData(res)
          }
        },
      }
    },
  })
})

export const useRegister = () => {
  const options = useRequestOptions()

  return useObjectLoader<IUser, IRegisterPayload>({
    method: 'post',
    url: '/auth/register',
    getRequestOptions: options.getDefault,
  })
}

export const useLogout = defineStore('_auth.logout', () => {
  const options = useRequestOptions()
  const me = useMe()
  const token = useToken()

  return useObjectLoader({
    method: 'post',
    url: '/auth/logout',
    getRequestOptions: () => {
      return {
        ...options.getDefaultWithAuth(),
        transformResponse(this: AxiosRequestConfig) {
          token.value = null
          me.setData(null)
        },
      }
    },
  })
})

export const useMe = defineStore('_auth.me', () => {
  const options = useRequestOptions()

  return useObjectLoader<IMeItem>({
    method: 'get',
    url: '/me',
    getRequestOptions: options.getDefaultWithAuth,
  })
})

export const useAuth = () => {
  const login = useLogin()
  const logout = useLogout()
  const me = useMe()
  const token = useToken()
  const isAuthenticated = computed<boolean>(() => {
    return ParamHelper.getBoolFalse(me.data?.id)
  })

  return {
    login,
    logout,
    me,
    token,
    isAuthenticated,
  }
}
