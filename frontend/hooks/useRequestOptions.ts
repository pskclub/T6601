import { AxiosRequestConfig } from 'axios'
import { useRuntimeConfig } from '#app'
import { useToken } from '~/hooks/useAuth'

export const useRequestOptions = () => {
  const config = useRuntimeConfig()

  const getMock = (): Omit<AxiosRequestConfig, 'baseURL'> & { baseURL: string } => {
    return {
      baseURL: config.public.baseAPIMock,
    }
  }

  const getInternalAuth = (): Omit<AxiosRequestConfig, 'baseURL'> & { baseURL: string } => {
    const token = useToken()

    return {
      baseURL: config.public.baseInternalAPI,
      headers: {
        ...(token ? { Authorization: token.value } : {}),
      },
    }
  }

  const getDefault = (): Omit<AxiosRequestConfig, 'baseURL'> & { baseURL: string } => {
    return {
      baseURL: config.public.baseAPI,
    }
  }

  const getDefaultWithAuth = (): Omit<AxiosRequestConfig, 'baseURL'> & { baseURL: string } => {
    const token = useToken()

    return {
      baseURL: config.public.baseAPI,
      headers: {
        ...(token ? { Authorization: token.value } : {}),
      },
    }
  }

  return { getDefault, getDefaultWithAuth, getMock, getInternalAuth }
}
