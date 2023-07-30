<template>
  <span class="py-1 px-3 bg-gray rounded-full text-light text-xs font-normal flex w-fit">
    <em v-if="icon" :class="[`ic ic-${icon} text-light w-4 mr-2`]" />
    <slot />
  </span>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string
}>()
</script>
