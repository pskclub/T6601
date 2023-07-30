<template>
  <img ref="lazyRef" :src="loadingImg" :alt="title" :title="title ?? alt" :class="className" />
</template>

<script lang="tsx" setup>
import { useLazyload } from 'vue3-lazyload'
import { toRef } from '#imports'

const props = defineProps<{
  src: string
  alt: string
  title?: string
  class?: string | Array<string | object>
  lazyImg?: string
  lazyDelay?: number
  errorImg?: string
}>()

const emits = defineEmits<{
  (event: 'loading'): void
  (event: 'error'): void
  (event: 'loaded'): void
}>()

const loadingImg = computed(() => props.lazyImg ?? '/gifs/spinner.gif')
const errorImg = computed(() => props.errorImg ?? '/images/error-image.png')
const delay = computed(() => props.lazyDelay ?? 0)
const className = toRef(props, 'class')

const lazyRef = useLazyload(toRef(props, 'src'), {
  loading: loadingImg.value,
  error: errorImg.value,
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
