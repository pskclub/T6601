import { defineStore } from 'pinia'
import { usePageLoader } from '~/lib/api/loaderPage'
import { IUser } from '~/models/user'
import { useObjectLoader } from '~/lib/api/loaderObject'

export interface IPostItem {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  name: string
  description: string
  vote_count: number
  is_closed: boolean
  is_voted: boolean
  user: IUser
}

export interface IPostPayload {
  name: string
  description: string
}

export const usePostPageLoader = defineStore('posts', () => {
  const options = useRequestOptions()

  return usePageLoader<IPostItem>({
    baseURL: '/posts',
    getBaseRequestOptions: options.getDefaultWithAuth,
  })
})

export const useMyPostPageLoader = defineStore('posts_mine', () => {
  const options = useRequestOptions()

  return usePageLoader<IPostItem>({
    baseURL: '/me/posts',
    getBaseRequestOptions: options.getDefaultWithAuth,
  })
})

export const useVoteLoader = (id: string) => {
  const { getDefaultWithAuth } = useRequestOptions()

  return useObjectLoader<IPostItem>({
    method: 'post',
    url: `/posts/${id}/votes`,
    getRequestOptions: getDefaultWithAuth,
  })
}

export const useVoteToggleCloseLoader = (id: string) => {
  const { getDefaultWithAuth } = useRequestOptions()

  return useObjectLoader<IPostItem, { is_closed: boolean }>({
    method: 'post',
    url: `/posts/${id}/close-toggle`,
    getRequestOptions: getDefaultWithAuth,
  })
}
