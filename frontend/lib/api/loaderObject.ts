import { IObjectLoaderOptions, IObjectRunLoaderOptions, IUseObjectLoader } from './loaderTypes'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { apiObjectHelper } from '~/lib/api/apiObjectHelper'
import { IAPIOptions, IStatus } from '~/lib/api/types'
import { ref } from '#imports'

export const useObjectLoader = <T = any, B = any, O = Record<string, any>>(
  loaderOptions: IObjectLoaderOptions<T, B, O>
): IUseObjectLoader<T, B, O> => {
  const status = ref<IStatus>(ObjectHelper.createStatus())
  const data = ref<T | null>(null)
  const options = ref<IAPIOptions>({})

  const clear = () => {
    status.value = ObjectHelper.createStatus()
    data.value = null
  }

  const run = async (payload?: B, opts: IObjectRunLoaderOptions<T, O> = {}) => {
    return await apiObjectHelper<T, B, O>(
      () => ({
        status: status.value,
        data: data.value as T | null,
        options: options.value,
      }),
      (_data) => {
        status.value = _data
      },
      (_data) => {
        options.value = _data
      },
      (_data) => {
        data.value = _data
      },
      payload,
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  const setLoading = () => {
    status.value = ObjectHelper.toLoadingStatus(status.value)
  }

  const setData = (_data: T | null) => {
    data.value = _data as any
  }

  return {
    data,
    status,
    options,
    run,
    clear,
    setLoading,
    setData,
  }
}
