import { IAPIListState, IAPIOptions, IStatus } from '~/lib/api/types'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { NewRequester } from '~/lib/Requester'
import { IListLoaderOptions, IListRunLoaderOptions } from '~/lib/api/loaderTypes'
import { getParams } from '~/lib/api/utils'

export const apiListHelper = async <T, O>(
  state: () => IAPIListState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IAPIOptions) => void,
  onUpdateItems: (data: T[]) => void,
  opts: IListLoaderOptions<T, O> & IListRunLoaderOptions<T, O>
) => {
  const timestamp = state().options._timestamp

  if (opts.expire && timestamp) {
    if (timestamp + opts.expire > Date.now() && state().items.length > 0) {
      onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))

      return
    }
  }

  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({})

  const reqOptions = opts.getRequestOptions?.(opts) ?? {}

  reqOptions.params = getParams(opts, reqOptions)

  try {
    if (opts.isMock) {
      const res: any = {
        data: opts.mockItems,
      }

      onUpdateItems(res.data)
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const { data: items, status } = await NewRequester.get<T[]>(
        opts.getURL ? opts.getURL(opts) : opts.url,
        reqOptions
      )

      onUpdateItems(items)
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
      onUpdateOptions({
        _timestamp: Date.now(),
        _status: status,
        request: reqOptions,
      })
    }
  } catch (e) {
    onUpdateStatus(ObjectHelper.toErrorStatus(state().status, e))
    onUpdateOptions({
      _status: e.response?.status,
      request: reqOptions,
    })
  }

  onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))
}
