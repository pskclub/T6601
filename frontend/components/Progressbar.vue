<template>
  <div class="h-[8px] rounded-full bg-gray-border">
    <div class="h-[8px] rounded-full bg-primary" :style="`width: ${percent ?? 0}%`" />
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  percent: number
}>()
</script>
