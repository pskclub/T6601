import { IPageOptions } from '~~/lib/api/types'

export const enum COLUMN_TYPES {
  VALUE = 'VALUE',
  COMPONENT = 'COMPONENT',
  DATE_TIME = 'DATE_TIME',
  NUMBER = 'NUMBER',
  ACTION = 'ACTION',
}

export const enum SORT_STATUS {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'none',
}

export interface IColumn {
  value: string | any
  title?: string
  className?: string
  props?: object
  enabledSort?: boolean
  sortKey?: string
  isComponent?: boolean
}

export interface IColumnItem extends IColumn {
  sortStatus?: SORT_STATUS
}

export interface IColumnSortStatus {
  value: string | any
  sortKey?: string
  sortStatus?: SORT_STATUS
}

export interface IRowItem<T = object> {
  value: string | any
  type?: COLUMN_TYPES
  title?: string
  className?: string
  isSelect?: boolean
  props?: Record<string, any>
  on?: Record<string, any>
}

export interface IRow<T = object> {
  [index: number]: IRowItem<T>
}

export interface IColumnProps<P> {
  item: IRowItem<P>
  data: Record<string, any>
}

export interface IStatus {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoaded: boolean
  errorData: any | null
}

export interface ITableOptions<T = object> {
  rawData: T[]
  primary: string
  isHideBottomPagination?: boolean
  isHideTopPagination?: boolean
  isNotChangeRoute: boolean
  status: IStatus
  pageOptions: IPageOptions
  columns: IColumn[]
  rows: Array<IRow<T>>
  isHideToolbar?: boolean
  isShowCheckbox?: boolean
  isRowClickable?: boolean
  deleteStatus?: IStatus
  onRowClick?: (index: number) => void
  onCheckBoxClick?: (index: number[]) => void
  onSortChange?: (sortStatus: IColumnSortStatus[]) => void
  disabledCheckIndexes?: number[]
}

export interface ISimpleTableOptions<T = object> {
  rawData: T[]
  primary: string
  status: IStatus
  columns: IColumn[]
  rows: Array<IRow<T>>
  isShowCheckbox?: boolean
  isHideBottomPagination?: boolean
  onRowClick?: (index: number, columns: Array<{ value: string }>) => void
  onCheckBoxClick?: (index: number[]) => void
  onSortChange?: (sortStatus: IColumnSortStatus[]) => void
}
