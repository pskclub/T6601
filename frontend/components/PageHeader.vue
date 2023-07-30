<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between md:mt-4 md:mb-8">
    <div class="flex items-center justify-center mb-4 md:mb-0">
      <h1 class="page-heading">
        {{ title }}
      </h1>
      <slot />
    </div>
    <div class="text-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>
