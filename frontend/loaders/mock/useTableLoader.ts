import { defineStore } from 'pinia'
import { usePageLoader } from '~/lib/api/loaderPage'
import { useListLoader } from '~/lib/api/loaderList'

export interface ITableItem {
  id: string
  name: string
  email: string
  createdAt: string
  createdBy: string | null
}

export const useTableLoader = () => {
  return usePageLoader<ITableItem>({
    baseURL: '/api/mock',
    fetch: {
      getURL: (_page, _query) => '/api/mock/table',
    },
  })
}

export const useSimpleTableLoader = () => {
  return useListLoader<ITableItem>({
    url: '/api/mock/simple-table',
  })
}

export const useTableStore = defineStore('table_loader', useTableLoader)

export const useSimpleTableStore = defineStore('simple_table_loader', useSimpleTableLoader)
