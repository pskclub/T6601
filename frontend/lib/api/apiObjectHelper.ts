import { IAPIObjectState, IAPIOptions, IStatus } from '~/lib/api/types'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { NewRequester } from '~/lib/Requester'
import { IObjectLoaderOptions, IObjectRunLoaderOptions } from '~/lib/api/loaderTypes'
import { getParams } from '~/lib/api/utils'

export const apiObjectHelper = async <T, B, O>(
  state: () => IAPIObjectState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IAPIOptions) => void,
  onUpdateData: (data: any) => void,
  data: B | undefined,
  opts: IObjectLoaderOptions<T, B, O> & IObjectRunLoaderOptions<T, O>
) => {
  const timestamp = state().options._timestamp

  if (opts.expire && timestamp) {
    if (timestamp + opts.expire > Date.now() && state().data) {
      onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))

      return
    }
  }

  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({})

  const reqOptions = opts.getRequestOptions?.(data, opts) ?? {}

  reqOptions.params = getParams(opts, reqOptions)

  try {
    if (opts.isMock) {
      const res: any = {
        data: opts.mockItem,
      }

      onUpdateData(res.data)
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const { data: item, status } = await NewRequester.create<any>(
        opts.method,
        opts.getURL ? opts.getURL(data, opts) : opts.url,
        data,
        reqOptions
      )

      onUpdateData(item)
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
      onUpdateOptions({
        request: reqOptions,
        _timestamp: Date.now(),
        _status: status,
      })
    }
  } catch (e) {
    onUpdateStatus(ObjectHelper.toErrorStatus(state().status, e))
    onUpdateOptions({
      request: reqOptions,
      _status: e.response?.status,
    })
  }

  onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))
}
