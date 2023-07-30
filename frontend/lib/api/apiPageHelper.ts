import {
  IAPIAddState,
  IAPIDeleteState,
  IAPIFetchState,
  IAPIFindState,
  IAPIOptions,
  IAPIUpdateState,
  IPageOptions,
  IStatus,
} from '~/lib/api/types'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { NewRequester } from '~/lib/Requester'
import { _findIndex, _get, _shuffle } from '~/utils/lodash'
import {
  IPageDeleteLoaderOptions,
  IPageFetchLoaderOptions,
  IPageFindLoaderOptions,
  IPageLoaderOptions,
  IPageUpdateLoaderOptions,
} from '~/lib/api/loaderTypes'
import { CONFIG } from '~/constants/config'
import { getParams } from '~/lib/api/utils'

export const apiAddHelper = async <T>(
  state: () => IAPIAddState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IAPIOptions) => void,
  onUpdateData: (data: any) => void,
  onUpdateItems: (data: any[]) => void,
  data: any,
  opts: IPageLoaderOptions<any> & IPageFetchLoaderOptions
) => {
  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({})

  const reqOptions = {
    ...(opts.getBaseRequestOptions?.() || {}),
    ...(opts.add?.getRequestOptions?.(data, opts) ?? {}),
  }

  reqOptions.params = getParams(opts, reqOptions)

  try {
    let item = null

    if (opts.isMock) {
      const res: any = {
        data: opts.mockItems![0],
      }

      onUpdateData(res.data)
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const { data: itemm, status } = await NewRequester.post<any>(
        opts.add?.getURL ? opts.add.getURL(data, opts) : opts.baseURL,
        data,
        reqOptions
      )

      onUpdateData(itemm)
      item = itemm
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
      onUpdateOptions({
        _timestamp: Date.now(),
        _status: status,
        request: reqOptions,
      })
    }

    if (state().items) {
      if (Array.isArray(item)) {
        onUpdateItems([...item, ...state().items!])
      } else {
        onUpdateItems([item, ...state().items!])
      }
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

export const apiDeleteHelper = async <T>(
  state: () => IAPIDeleteState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IAPIOptions) => void,
  _onUpdateData: (data: T) => void,
  onUpdateItems: (data: T[]) => void,
  id: string | number,
  opts: IPageLoaderOptions<any> & IPageDeleteLoaderOptions
) => {
  const primaryKey = opts.primary ?? 'id'
  const getPrimaryKey = (item: any): string => _get(item, primaryKey, '')

  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({})

  const reqOptions = {
    ...(opts.getBaseRequestOptions?.() || {}),
    ...(opts.delete?.getRequestOptions?.(id, opts) ?? {}),
  }

  reqOptions.params = getParams(opts, reqOptions)

  try {
    if (opts.isMock) {
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const { status } = await NewRequester.delete<T | undefined>(
        opts.delete?.getURL ? opts.delete.getURL(id, opts) : `${opts.baseURL}/${id}`,
        reqOptions
      )

      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
      onUpdateOptions({
        _timestamp: Date.now(),
        _status: status,
        request: reqOptions,
      })
    }

    if (state().items) {
      onUpdateItems(
        state().items!.filter((item) => {
          return getPrimaryKey(item) !== id
        })
      )
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

export const apiFetchHelper = async <T>(
  state: () => IAPIFetchState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IPageOptions) => void,
  onUpdateItems: (items: T[]) => void,
  page: number,
  query: string,
  opts: IPageLoaderOptions<T> & IPageFetchLoaderOptions<any>
) => {
  const timestamp = state().options._timestamp

  if (opts.expire && timestamp) {
    if (timestamp + opts.expire > Date.now()) {
      onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))

      return
    }
  }

  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({
    ...state().options,
    ...opts,
    currentPage: page,
    search: query,
    primary: opts.primary ?? 'id',
    _status: undefined,
  })

  const getOptions = (data: any) => ({
    ...state().options,
    currentPageCount: state().items?.length || 0,
    currentPage: page,
    totalCount: data.total,
    limit: data.limit,
    search: query,
    totalPage: Math.ceil(data.total / data.limit),
  })

  const reqOptions = {
    ...(opts.getBaseRequestOptions?.() || {}),
    ...(opts.fetch?.getRequestOptions?.(page, query, opts) ?? {}),
  }

  const limit = reqOptions.params?.limit || CONFIG.LIMIT_PER_PAGE

  reqOptions.params = {
    limit,
    page,
    q: (query || '').trim(),
  }

  reqOptions.params = getParams(opts, reqOptions)

  try {
    if (opts.isMock) {
      await new Promise((resolve) => {
        setTimeout(resolve, 500)
      })

      const res: any = {
        data: {
          items: opts.mockItems || [],
          totalCount: (opts.mockItems || []).length,
        },
      }

      onUpdateItems(_shuffle(res.data.items))
      onUpdateOptions(getOptions(res.data))
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const {
        data: { items: itemss, ...moreOptions },
        status,
      } = await NewRequester.get<any>(
        opts.fetch?.getURL ? opts.fetch.getURL(page, query, opts) : opts.baseURL,
        reqOptions
      )

      onUpdateItems(itemss)
      onUpdateOptions({
        ...getOptions(moreOptions),
        _timestamp: Date.now(),
        _status: status,
        request: reqOptions,
      })

      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    }
  } catch (e) {
    onUpdateStatus(ObjectHelper.toErrorStatus(state().status, e))
    onUpdateOptions({
      ...state().options,
      _status: e.response?.status,
      request: reqOptions,
    })
  }

  onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))
}

export const apiFindHelper = async <T>(
  state: () => IAPIFindState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IAPIOptions) => void,
  onUpdateData: (data: any) => void,
  id: string | number,
  opts: IPageLoaderOptions<T> & IPageFindLoaderOptions
) => {
  const timestamp = state().options._timestamp

  if (opts.expire && timestamp) {
    if (timestamp + opts.expire > Date.now()) {
      onUpdateStatus(ObjectHelper.toCompleteStatus(state().status))

      return
    }
  }

  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({})

  const reqOptions = {
    ...(opts.getBaseRequestOptions?.() || {}),
    ...(opts.find?.getRequestOptions?.(id, opts) ?? {}),
  }

  reqOptions.params = getParams(opts, reqOptions)

  try {
    if (opts.isMock) {
      const res: any = {
        data: opts.mockItems![0],
      }

      onUpdateData(res.data)
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const { data, status } = await NewRequester.get<T>(
        opts.find?.getURL ? opts.find.getURL(id, opts) : `${opts.baseURL}/${id}`,
        reqOptions
      )

      onUpdateData(data)
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

export const updateHelper = async <T>(
  state: () => IAPIUpdateState<T>,
  onUpdateStatus: (status: IStatus) => void,
  onUpdateOptions: (options: IAPIOptions) => void,
  onUpdateData: (data: T) => void,
  _onUpdateItems: (data: T[]) => void,
  onUpdateOldData: (data: T) => void,
  id: string | number,
  data: any,
  opts: IPageLoaderOptions<any> & IPageUpdateLoaderOptions
) => {
  onUpdateStatus(ObjectHelper.toLoadingStatus(state().status))
  onUpdateOptions({})

  const reqOptions = {
    ...(opts.getBaseRequestOptions?.() || {}),
    ...(opts.update?.getRequestOptions?.(id, data, opts) ?? {}),
  }

  reqOptions.params = getParams(opts, reqOptions)

  try {
    let finalItem: any

    if (opts.isMock) {
      const res: any = {
        data: opts.mockItems![0],
      }

      onUpdateData(res.data)
      finalItem = res.data
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
    } else {
      const { data: item, status } = await NewRequester.put<T>(
        opts.update?.getURL ? opts.update.getURL(id, data, opts) : `${opts.baseURL}/${id}`,
        data,
        reqOptions
      )

      onUpdateData(item)
      finalItem = item
      onUpdateStatus(ObjectHelper.toSuccessStatus(state().status))
      onUpdateOptions({
        _timestamp: Date.now(),
        _status: status,
        request: reqOptions,
      })
    }

    if (state().oldData) {
      onUpdateOldData(finalItem)
    }

    if (state().items) {
      const index = _findIndex(state().items, (item: any) => item.id === id)

      if (index !== -1) {
        const itemsTemp = state().items

        itemsTemp![index] = finalItem!
        state().items = itemsTemp
      }
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
