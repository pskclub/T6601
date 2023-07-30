<template>
  <NuxtLayout :name="LAYOUTS.NONE">
    <Login />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import Login from '~/features/Login/index.vue'
import { definePageMeta } from '#imports'
import { useApp } from '~/hooks/useApp'
import { routes } from '~/constants/routes'
import { LAYOUTS } from '~/constants/layouts'
import { MIDDLEWARES } from '~/constants/middlewares'

definePageMeta({
  middleware: [MIDDLEWARES.NOT_AUTH],
})

const app = useApp()

app.updateDocMeta({ title: routes.login.name })
</script>
