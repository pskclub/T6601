<template>
  <div v-if="message" :class="['error', className]">
    {{ messageText }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: { type: [String, Object, Array] },
  className: { type: [String, Object, Array] },
})

const messageText = computed(() => {
  if (typeof props.message === 'string') {
    return props.message
  } else if (Array.isArray(props.message)) {
    return props.message.join(' ')
  } else if (typeof props.message === 'object') {
    return JSON.stringify(props.message)
  }

  return ''
})
</script>
