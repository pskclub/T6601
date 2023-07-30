import { defineNuxtRouteMiddleware } from '#app'
import { useAuth, useLogout, useToken } from '~/hooks/useAuth'
import { routes } from '~/constants/routes'

export default defineNuxtRouteMiddleware(async (from) => {
  if (process.client) {
    return
  }

  const token = useToken()

  const auth = useAuth()
  const logout = useLogout()

  if (!token.value) {
    return navigateTo(routes.login.to)
  }

  await auth.me.run()

  if (auth.me.status.isError) {
    await logout.run()

    return navigateTo(routes.login.to)
  }
})
