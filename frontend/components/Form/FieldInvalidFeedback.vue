<template>
  <p v-if="errorMessage" class="invalid-feedback">
    {{ errorMessage }}
  </p>
</template>
<script lang="ts" setup>
defineProps<{
  errorMessage?: string
}>()
</script>
