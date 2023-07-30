<template>
  <Teleport v-if="isShow" :to="target" :disabled="!target || disabled">
    <slot />
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ to: string; disabled?: boolean }>()

const target = ref<Element | null>(null)
const isShow = ref(false)

onBeforeUnmount(() => {
  isShow.value = false
})

onMounted(() => {
  isShow.value = true

  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type !== 'childList') continue
      const el = document.querySelector(props.to)
      if (!el) continue
      target.value = el
      observer.disconnect()

      break
    }
  })

  observer.observe(document, { childList: true, subtree: true })

  return () => observer.disconnect()
})
</script>
