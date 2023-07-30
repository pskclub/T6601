import { useCookie, useState } from '#app'
import { CookieOptions, CookieRef } from '#app/composables/cookie'
import { watch } from '#imports'

export const useStatefulCookie = <T = string>(
  name: string,
  opts?: CookieOptions<T>
): CookieRef<T | null> => {
  const cookie = useCookie<T | null>(name, {
    ...opts,
    path: '/',
  })

  const state = useState<T | null>(`cookie.${name}`, () => cookie.value)

  watch(
    state,
    () => {
      if (cookie.value !== state.value) {
        cookie.value = state.value
      }
    },
    { deep: true }
  )

  return state
}

export const useCookie6Hours = <T = string>(
  name: string,
  opts?: CookieOptions<T>
): CookieRef<T | null> => {
  return useStatefulCookie<T>(name, {
    ...opts,
    expires: new Date(Date.now() + 6 * 60 * 60 * 1000),
  })
}

export const useCookie7Days = <T = string | null>(
  name: string,
  opts?: CookieOptions<T>
): CookieRef<T | null> => {
  return useStatefulCookie<T>(name, {
    ...opts,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
}

export const useCookie365Days = <T = string | null>(
  name: string,
  opts?: CookieOptions<T>
): CookieRef<T | null> => {
  return useStatefulCookie<T | null>(name, {
    ...opts,
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  })
}
