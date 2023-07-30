import { AxiosRequestConfig } from 'axios'

export interface IAPIOptions {
  _status?: number
  _timestamp?: number
  request?: Partial<AxiosRequestConfig>
  [key: string]: any
}

export interface IPageOptions extends IAPIOptions {
  currentPageCount: number
  currentPage: number
  totalPage: number
  totalCount: number
  limit: number
  search?: string
  primary?: string
}

export interface IStatus {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoaded: boolean
  errorData: any | null
}

export interface IAPIFetchState<T> {
  items: T[]
  status: IStatus
  options: IPageOptions
}

export interface IAPIFindState<T> {
  data: T
  status: IStatus
  options: IAPIOptions
}

export interface IAPIAddState<T> {
  data: T
  items: T[] | undefined | null
  status: IStatus
  options: IAPIOptions
}

export interface IAPIObjectState<T> {
  data: T | null
  status: IStatus
  options: IAPIOptions
}

export interface IAPIListState<T> {
  items: T[]
  status: IStatus
  options: IAPIOptions
}

export interface IAPIDeleteState<T> {
  data: T
  items: T[] | undefined | null
  status: IStatus
  options: IAPIOptions
}

export interface IAPIUpdateState<T> {
  data: T
  oldData: T
  items: T[] | undefined | null
  status: IStatus
  options: IAPIOptions
}

export interface IPageState<T> {
  deleteStatus: IStatus
  updateStatus: IStatus
  addStatus: IStatus
  findStatus: IStatus
  fetchStatus: IStatus
  fetchItems: T[]
  findItem: null | T
  addItem: null | T
  updateItem: null | T
  deleteItem: null | T | any
  findOptions: object
  addOptions: object
  deleteOptions: object
  updateOptions: object
  fetchOptions: IPageOptions
}

export interface IObjectState<T> {
  data: T | null
  status: IStatus
  options: IAPIOptions
}

export interface IListState<T> {
  items: T[]
  status: IStatus
  options: IAPIOptions
}
