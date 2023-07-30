import { defineStore } from 'pinia'
import { CONFIG } from '~/constants/config'
import { computed, getCurrentInstance, ref, useHead } from '#imports'

export interface IDocMeta {
  title?: string
  description?: string
  keywords?: string[]
}

export interface IBreadcrumbItemState {
  name: string
  isActive?: boolean
  icon?: string
  to?: string
}

export interface IPageMeta {
  title?: string
  layout?: string
  sub_title?: string
  isHideBreadcrumbs?: boolean
  breadcrumbs?: IBreadcrumbItemState[]
}

export interface ISidebarItemState {
  type?: string
  name: string
  icon?: string
  to: string
  isHide?: boolean
  isActive?: boolean
  children?: ISidebarItemState[]
}

export interface IApp {
  updateDocMeta: (payload: IDocMeta) => void
  updatePageMeta: (payload: IPageMeta) => void
  updateSidebar: (payload: ISidebarItemState[]) => void
  pageMeta: IPageMeta
  sidebar: ISidebarItemState[]
  breadcrumbs: IBreadcrumbItemState[]
}

export const wrapProperty =
  (property: string, makeComputed = true) =>
  () => {
    const vm: any = getCurrentInstance()?.proxy

    return makeComputed ? computed(() => vm[property]) : vm[property]
  }

export const useScrollTo: () => any = wrapProperty('$scrollTo', false)

export const useApp: () => IApp = defineStore('_app', () => {
  const pageMeta = ref<IPageMeta>({ title: CONFIG.TITLE, isHideBreadcrumbs: false })
  const breadcrumbs = ref<IBreadcrumbItemState[]>([])
  const sidebar = ref<ISidebarItemState[]>([])

  const updateDocMeta = (payload: IDocMeta) => {
    useHead({
      title: `${payload.title} - ${CONFIG.TITLE_POSTFIX}`,
      meta: [
        { name: 'description', content: payload.description },
        { name: 'keywords', content: payload.keywords?.join(', ') },
      ],
    })
  }

  const updatePageMeta = (payload: IPageMeta) => {
    pageMeta.value = {
      ...pageMeta.value,
      ...payload,
      isHideBreadcrumbs: payload.isHideBreadcrumbs ?? false,
    }

    if (Array.isArray(payload.breadcrumbs) && payload.breadcrumbs?.length > 0) {
      breadcrumbs.value = payload.breadcrumbs
    }
  }

  const updateSidebar = (payload: ISidebarItemState[]) => {
    sidebar.value = payload
  }

  return {
    updateDocMeta,
    updatePageMeta,
    updateSidebar,
    pageMeta,
    sidebar,
    breadcrumbs,
  }
})
