import { ComputedRef } from 'vue'
import { get } from '@vueuse/core'
import { Store } from 'pinia'
import { computed } from '#imports'

import {
  IColumn,
  IRow,
  ISimpleTableOptions,
  IStatus,
  ITableOptions,
} from '~/components/Table/types'
import { IUsePageLoader } from '~/lib/api/loaderTypes'
import { CONFIG } from '~/constants/config'
import { ObjectHelper } from '~/utils/ObjectHelper'

export interface IUseTable<T = object> {
  repo: IUsePageLoader<T> | Store<any, any>
  columns: () => IColumn[]
  rows: (items: T[]) => IRow[]
  options?: (() => Partial<ITableOptions<T>>) | Partial<ITableOptions<T>>
}

export interface IUseSimpleTable<T = object> {
  items: () => T[]
  status?: () => IStatus
  columns: () => IColumn[]
  rows: (items: T[]) => IRow[]
  options?: (() => Partial<ISimpleTableOptions<T>>) | Partial<ISimpleTableOptions<T>>
}

export const useTable = <T = object>(options: IUseTable<T>): ComputedRef<ITableOptions<T>> =>
  computed<ITableOptions<T>>(() => {
    return createTableOptions<T>(
      options.repo,
      options.columns(),
      options.rows(get(options.repo.fetchItems)),
      typeof options.options === 'function' ? options.options() : options.options ?? {}
    )
  })

export const useSimpleTable = <T = object>(
  options: IUseSimpleTable<T>
): ComputedRef<ISimpleTableOptions<T>> =>
  computed<ISimpleTableOptions<T>>(() => {
    return {
      items: options.items(),
      columns: options.columns(),
      rows: options.rows(options.items()),
      rawData: options.items(),
      status: options.status ? options.status() : ObjectHelper.createStatus(),
      primary: CONFIG.DEFAULT_PRIMARY,
      ...(typeof options.options === 'function' ? options.options() : options.options ?? {}),
    }
  })

export const createTableOptions = <T = object>(
  repo: IUsePageLoader<T>,
  columns: IColumn[],
  rows: IRow[],
  options: Partial<ITableOptions<T>>
): ITableOptions<T> => {
  return {
    rawData: get(repo.fetchItems) as T[],
    pageOptions: get(repo.fetchOptions),
    columns,
    rows,
    status: get(repo.fetchStatus),
    deleteStatus: get(repo.deleteStatus),
    primary: get(repo.fetchOptions).primary ?? CONFIG.DEFAULT_PRIMARY,
    isNotChangeRoute: false,
    ...options,
  }
}
