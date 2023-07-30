import { defineStore } from 'pinia'
import { usePageLoader } from '~/lib/api/loaderPage'

export interface IUserGroupMock {
  id: string
  group_name: string
  email: string
  member_count: number
}

export interface IUsersListMock {
  id: string
  name: string
  email: string
  role: string
  isHasCompanyRights: boolean
  createdAt: string
  lastLoggedIn: string
}

export const useUserGroupsMockLoader = () => {
  return usePageLoader<IUserGroupMock>({
    baseURL: '/api/mock/user-groups',
  })
}

export const useUsersListMockLoader = () => {
  const { getMock } = useRequestOptions()

  return usePageLoader<IUsersListMock>({
    baseURL: '/admin/users',
    getBaseRequestOptions: getMock,
  })
}

export const useUserGroupsMockStore = defineStore(
  'user_groups_mock_loader',
  useUserGroupsMockLoader
)

export const useUsersListMockStore = defineStore('users_list_mock_loader', useUsersListMockLoader)
