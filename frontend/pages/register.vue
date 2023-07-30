<template>
  <NuxtLayout :name="LAYOUTS.NONE">
    <Register />
  </NuxtLayout>
</template>
<script lang="ts" setup>
import Register from '~/features/Register/index.vue'
import { definePageMeta } from '#imports'
import { useApp } from '~/hooks/useApp'
import { routes } from '~/constants/routes'
import { LAYOUTS } from '~/constants/layouts'
import { MIDDLEWARES } from '~/constants/middlewares'

definePageMeta({
  middleware: [MIDDLEWARES.NOT_AUTH],
})

const app = useApp()

app.updateDocMeta({ title: routes.register.name })
app.updatePageMeta({
  title: routes.register.name,
})
</script>
