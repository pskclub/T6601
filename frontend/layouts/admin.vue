<template>
  <div class="flex h-screen bg-admin relative">
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar
        :sidebar-open="sidebarOpen"
        :set-sidebar="(bool) => (sidebarOpen = bool)"
        :is-admin="true"
      />
      <main class="flex-1 overflow-x-hidden overflow-y-auto pb-[80px] lg:pb-0">
        <div class="container mx-auto md:px-6 py-6 xl:py-20">
          <Breadcrumbs v-if="!pageMeta.isHideBreadcrumbs" />
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumbs from './components/Breadcrumbs.vue'
import { ref } from '#imports'
import Navbar from '~/layouts/components/Navbar.vue'

const app = useApp()
const pageMeta = computed(() => app.pageMeta)
const sidebarOpen = ref(false)
</script>
