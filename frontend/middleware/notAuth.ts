import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useToken } from '~/hooks/useAuth'

export default defineNuxtRouteMiddleware(async () => {
  const token = useToken()

  if (token.value) {
    return navigateTo(routes.home.to)
  }
})
