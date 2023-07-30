<template>
  <span v-if="isRequired" class="required-feedback">*</span>
</template>

<script lang="ts" setup>
defineProps<{
  isRequired?: boolean
}>()
</script>
