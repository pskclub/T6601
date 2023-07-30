<template>
  <NuxtLayout :name="LAYOUTS.NONE">
    <Loader :is-loading="true" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { defineNuxtRouteMiddleware } from '#app'
import { definePageMeta, useAuth } from '#imports'
import { LAYOUTS } from '~/constants/layouts'
import { routes } from '~/constants/routes'

definePageMeta({
  middleware: [
    defineNuxtRouteMiddleware(async () => {
      const auth = useAuth()

      await auth.logout.run()

      return navigateTo(routes.login.to)
    }),
  ],
})
</script>
