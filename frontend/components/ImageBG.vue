<template>
  <div
    ref="lazyRef"
    :title="title"
    :class="className"
    :style="`background-image: url(${loadingImg})`"
  />
</template>

<script lang="tsx" setup>
import { useLazyload } from 'vue3-lazyload'
import { toRef } from '#imports'

const props = defineProps<{
  src: string
  title?: string
  class?: string | Array<string | object>
  lazyImg?: string
  lazyDelay?: number
}>()

const emits = defineEmits<{
  (event: 'loading'): void
  (event: 'error'): void
  (event: 'loaded'): void
}>()

const loadingImg = computed(() => props.lazyImg ?? '/gifs/spinner.gif')
const delay = computed(() => props.lazyDelay ?? 0)
const className = toRef(props, 'class')

const lazyRef = useLazyload(toRef(props, 'src'), {
  loading: loadingImg.value,
  delay: delay.value,
  lifecycle: {
    loading: () => {
      emits('loading')
    },
    error: () => {
      emits('error')
    },
    loaded: () => {
      emits('loaded')
    },
  },
})
</script>
