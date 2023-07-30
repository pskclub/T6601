<template>
  <NuxtLayout :name="LAYOUTS.DEFAULT"> <Posts /></NuxtLayout>
</template>
<script lang="tsx" setup>
import { LAYOUTS } from '~/constants/layouts'
import { definePageMeta, MIDDLEWARES, routes, useApp } from '#imports'
import Posts from '~/features/profile/Posts/index.vue'

definePageMeta({
  middleware: [MIDDLEWARES.AUTH],
})

const app = useApp()

app.updateDocMeta({ title: routes.myPosts.name })
</script>
