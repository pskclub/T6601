<template>
  <div :class="['empty', className]">
    <p>{{ text }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: { type: String, default: 'ยังไม่มีรายการ' },
  className: { type: [String, Object, Array] },
})
</script>
