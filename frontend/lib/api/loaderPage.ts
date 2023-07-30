import { UnwrapRef } from 'vue'
import {
  IPageAddLoaderOptions,
  IPageDeleteLoaderOptions,
  IPageFetchLoaderOptions,
  IPageFindLoaderOptions,
  IPageLoaderOptions,
  IPageUpdateLoaderOptions,
  IUsePageLoader,
} from './loaderTypes'
import { ObjectHelper } from '~/utils/ObjectHelper'
import {
  apiAddHelper,
  apiDeleteHelper,
  apiFetchHelper,
  apiFindHelper,
  updateHelper,
} from '~/lib/api/apiPageHelper'
import { CONFIG } from '~/constants/config'
import { IAPIOptions, IPageOptions, IStatus } from '~/lib/api/types'

export const initPageOptions = () => ({
  currentPageCount: 0,
  currentPage: 1,
  totalPage: 0,
  totalCount: 0,
  limit: CONFIG.LIMIT_PER_PAGE,
  search: '',
  primary: CONFIG.DEFAULT_PRIMARY,
})

export const usePageLoader = <T = any>(loaderOptions: IPageLoaderOptions<T>): IUsePageLoader<T> => {
  const fetchNextPageStatus = ref<IStatus>(ObjectHelper.createStatus())
  const fetchNextPageOptions = ref<IPageOptions>(initPageOptions())
  const fetchStatus = ref<IStatus>(ObjectHelper.createStatus())
  const fetchItems = ref<T[]>([])
  const findItem = ref<T | null>(null)
  const deleteItem = ref<T | null>(null)
  const addItem = ref<T | null>(null)
  const updateItem = ref<T | null>(null)
  const findStatus = ref<IStatus>(ObjectHelper.createStatus())
  const addStatus = ref<IStatus>(ObjectHelper.createStatus())
  const updateStatus = ref<IStatus>(ObjectHelper.createStatus())
  const deleteStatus = ref<IStatus>(ObjectHelper.createStatus())
  const fetchOptions = ref<IPageOptions>(initPageOptions())
  const addOptions = ref<IAPIOptions>({})
  const findOptions = ref<IAPIOptions>({})
  const updateOptions = ref<IAPIOptions>({})
  const deleteOptions = ref<IAPIOptions>({})

  const clear = () => {
    findStatus.value = ObjectHelper.createStatus()
    deleteStatus.value = ObjectHelper.createStatus()
    addStatus.value = ObjectHelper.createStatus()
    updateStatus.value = ObjectHelper.createStatus()
    findItem.value = null
    deleteItem.value = null
    updateItem.value = null
    fetchStatus.value = ObjectHelper.createStatus()
    fetchOptions.value = initPageOptions()
    findOptions.value = {}
    addOptions.value = {}
    deleteOptions.value = {}
    fetchItems.value = []
  }

  const setFetchItems = (items: T[]) => {
    fetchItems.value = items as UnwrapRef<T[]>
  }

  const setFetchLoading = () => {
    fetchStatus.value = ObjectHelper.toLoadingStatus(fetchStatus.value)
  }

  const setFindLoading = () => {
    findStatus.value = ObjectHelper.toLoadingStatus(findStatus.value)
  }

  const fetchNextPage = async (opts?: IPageFetchLoaderOptions) => {
    return await apiFetchHelper<T>(
      () => ({
        status: fetchNextPageStatus.value,
        items: fetchItems.value as T[],
        options: fetchNextPageOptions.value,
      }),
      (data) => {
        fetchNextPageStatus.value = data
      },
      (data) => {
        fetchOptions.value = data
        fetchNextPageOptions.value = data
      },
      (data) => {
        fetchItems.value = [...fetchItems.value, ...(data as UnwrapRef<T[]>)]
      },
      fetchOptions.value.currentPage + 1,
      fetchOptions.value.search || '',
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  const fetch = async (page = 1, query = '', opts?: IPageFetchLoaderOptions) => {
    return await apiFetchHelper<T>(
      () => ({
        status: fetchStatus.value,
        items: fetchItems.value as T[],
        options: fetchOptions.value,
      }),
      (data) => {
        fetchStatus.value = data
      },
      (data) => {
        fetchOptions.value = data
      },
      (data) => {
        fetchItems.value = data as UnwrapRef<T[]>
      },
      page,
      query,
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  const find = async (id: string | number, opts?: IPageFindLoaderOptions) => {
    return await apiFindHelper<T>(
      () => ({
        status: findStatus.value,
        data: findItem.value as T,
        options: findOptions.value,
      }),
      (data) => {
        findStatus.value = data
      },
      (data) => {
        findOptions.value = data
      },
      (data) => {
        findItem.value = data
      },
      id,
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  const add = async (data: any, opts?: IPageAddLoaderOptions) => {
    return await apiAddHelper<T>(
      () => ({
        items: fetchItems.value as T[],
        status: addStatus.value,
        data: addItem.value as T,
        options: addOptions.value,
      }),
      (data) => {
        addStatus.value = data
      },
      (data) => {
        addOptions.value = data
      },
      (data) => {
        addItem.value = data
      },
      (data) => {
        fetchItems.value = data
      },
      data,
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  const update = async (id: string, data: any, opts?: IPageUpdateLoaderOptions) => {
    return await updateHelper<T>(
      () => ({
        items: fetchItems.value as T[],
        status: updateStatus.value,
        data: updateItem.value as T,
        oldData: findItem.value as T,
        options: updateOptions.value,
      }),
      (data) => {
        updateStatus.value = data
      },
      (data) => {
        updateOptions.value = data
      },
      (data) => {
        updateItem.value = data as UnwrapRef<T>
      },
      (data) => {
        fetchItems.value = data as UnwrapRef<T[]>
      },
      (data) => {
        findItem.value = data as UnwrapRef<T>
      },
      id,
      data,
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  const search = async (query = '', opts?: IPageFetchLoaderOptions) => {
    return await fetch(1, query, opts)
  }

  const remove = async (id: string, opts?: IPageDeleteLoaderOptions) => {
    return await apiDeleteHelper<T>(
      () => ({
        status: deleteStatus.value,
        data: deleteItem.value as T,
        items: fetchItems.value as T[],
        options: deleteOptions.value,
      }),
      (data) => {
        deleteStatus.value = data
      },
      (data) => {
        deleteOptions.value = data
      },
      (data) => {
        deleteItem.value = data as UnwrapRef<T>
      },
      (data) => {
        fetchItems.value = data as UnwrapRef<T[]>
      },
      id,
      {
        ...loaderOptions,
        ...opts,
      }
    )
  }

  return {
    fetchItems,
    fetchOptions,
    addOptions,
    findOptions,
    deleteOptions,
    updateOptions,
    fetchStatus,
    deleteStatus,
    deleteItem,
    fetch,
    search,
    remove,
    find,
    findItem,
    findStatus,
    add,
    addItem,
    addStatus,
    updateItem,
    updateStatus,
    update,
    setFetchLoading,
    setFindLoading,
    clear,
    fetchNextPage,
    fetchNextPageStatus,
    fetchNextPageOptions,
    setFetchItems,
  }
}
