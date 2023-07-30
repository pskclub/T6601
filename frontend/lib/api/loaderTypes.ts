import { AxiosRequestConfig, Method } from 'axios'
import { Ref, UnwrapRef } from 'vue'
import { IAPIOptions, IPageOptions, IStatus } from '~/lib/api/types'

export interface IPageFetchLoaderOptions<D = Record<string, any>> {
  isMock?: boolean
  params?: Record<string, any>
  expire?: number
  data?: D
}

export interface IPageFindLoaderOptions<D = Record<string, any>> {
  isMock?: boolean
  params?: Record<string, any>
  expire?: number
  data?: D
}

export interface IPageUpdateLoaderOptions<D = Record<string, any>> {
  isMock?: boolean
  params?: Record<string, any>
  data?: D
}

export interface IPageDeleteLoaderOptions<D = Record<string, any>> {
  isMock?: boolean
  params?: Record<string, any>
  data?: D
}

export interface IPageAddLoaderOptions<D = Record<string, any>> {
  isMock?: boolean
  params?: Record<string, any>
  data?: D
}

export interface IObjectRunLoaderOptions<T, D = Record<string, any>> {
  mockItem?: T
  isMock?: boolean
  params?: Record<string, any>
  expire?: number
  data?: D
}

export interface IListRunLoaderOptions<T, D = Record<string, any>> {
  mockItems?: T[]
  isMock?: boolean
  params?: Record<string, any>
  expire?: number
  data?: D
}

export interface IPageLoaderOptions<T> {
  prefix?: string
  baseURL: string
  primary?: string
  isMock?: boolean
  mockItems?: T[]
  getBaseRequestOptions?: () => AxiosRequestConfig
  fetch?: {
    getURL?: (page: number, query: string, opts: IPageFetchLoaderOptions<any>) => string
    getRequestOptions?: (
      page: number,
      query: string,
      opts: IPageFetchLoaderOptions<any>
    ) => AxiosRequestConfig
  }
  find?: {
    getURL?: (id: string | number, opts: IPageFindLoaderOptions<any>) => string
    getRequestOptions?: (
      id: string | number,
      opts: IPageFindLoaderOptions<any>
    ) => AxiosRequestConfig
  }
  update?: {
    getURL?: (id: string | number, data: any, opts: IPageUpdateLoaderOptions<any>) => string
    getRequestOptions?: (
      id: string | number,
      data: any,
      opts: IPageUpdateLoaderOptions<any>
    ) => AxiosRequestConfig
  }
  delete?: {
    getURL?: (id: string | number, opts: IPageDeleteLoaderOptions<any>) => string
    getRequestOptions?: (
      id: string | number,
      opts: IPageDeleteLoaderOptions<any>
    ) => AxiosRequestConfig
  }
  add?: {
    getURL?: (data: any, opts: IPageAddLoaderOptions<any>) => string
    getRequestOptions?: (data: any, opts: IPageAddLoaderOptions<any>) => AxiosRequestConfig
  }
}

export interface IObjectLoaderOptions<T, B, O> {
  prefix?: string
  url: string
  method: Method
  primary?: string
  mockItem?: T
  getURL?: (data: B | undefined, opts: IObjectRunLoaderOptions<T, O>) => string
  getRequestOptions?: (
    data: B | undefined,
    opts: IObjectRunLoaderOptions<T, O>
  ) => AxiosRequestConfig
}

export interface IListLoaderOptions<T, O> {
  prefix?: string
  url: string
  primary?: string
  mockItems?: T[]
  getURL?: (opts: IListRunLoaderOptions<T, O>) => string
  getRequestOptions?: (opts: IListRunLoaderOptions<T, O>) => AxiosRequestConfig
}

export interface IUsePageLoader<T> {
  fetchNextPage: (opts?: IPageFetchLoaderOptions) => Promise<void>
  fetchNextPageStatus: Ref<IStatus>
  fetchNextPageOptions: Ref<IPageOptions>
  fetchStatus: Ref<IStatus>
  findStatus: Ref<IStatus>
  addStatus: Ref<IStatus>
  updateStatus: Ref<IStatus>
  deleteStatus: Ref<IStatus>
  fetchOptions: Ref<IPageOptions>
  deleteOptions: Ref<IAPIOptions>
  addOptions: Ref<IAPIOptions>
  findOptions: Ref<IAPIOptions>
  updateOptions: Ref<IAPIOptions>
  clear: () => void
  fetch: (page?: number, query?: string, opts?: IPageFetchLoaderOptions) => Promise<void>
  search: (query: string, opts?: IPageFetchLoaderOptions) => Promise<void>
  find: (id: string, opts?: any) => Promise<void>
  update: (id: string, data: any, opts?: any) => Promise<void>
  add: (data: any, opts?: IPageAddLoaderOptions) => Promise<void>
  remove: (id: string, opts?: IPageDeleteLoaderOptions) => Promise<void>
  setFetchItems: (items: T[]) => void
  setFetchLoading: () => void
  setFindLoading: () => void
  fetchItems: Ref<UnwrapRef<T[]>>
  findItem: Ref<UnwrapRef<T | null>>
  deleteItem: Ref<UnwrapRef<T | null>>
  addItem: Ref<UnwrapRef<T | null>>
  updateItem: Ref<UnwrapRef<T | null>>
}

export interface IUseObjectLoader<T, B, O> {
  status: Ref<IStatus>
  data: Ref<UnwrapRef<T | null>>
  options: Ref<IAPIOptions>
  run: (data?: B, opts?: IObjectRunLoaderOptions<T, O>) => Promise<void>
  clear: () => void
  setLoading: () => void
  setData: (data: T | null) => void
}

export interface IUseListLoader<T, O> {
  status: Ref<IStatus>
  items: Ref<UnwrapRef<T[]>>
  options: Ref<Record<string, any>>
  run: (opts?: IListRunLoaderOptions<T, O>) => void
  setItems: (items: T[]) => void
  clear: () => void
  setLoading: () => void
}
