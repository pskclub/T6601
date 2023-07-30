<template>
  <NuxtLayout :name="LAYOUTS.DEFAULT"> <Home /></NuxtLayout>
</template>
<script lang="tsx" setup>
import { LAYOUTS } from '~/constants/layouts'
import { definePageMeta, MIDDLEWARES, routes, useApp } from '#imports'
import Home from '~/features/Home/index.vue'

definePageMeta({
  middleware: [MIDDLEWARES.AUTH],
})

const app = useApp()

app.updateDocMeta({ title: routes.home.name })
</script>
