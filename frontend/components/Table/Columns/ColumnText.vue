<template>
  <span
    :title="item.title || item.value"
    class="px-4 block whitespace-nowrap"
    v-html="getValue || '-'"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IRowItem } from '../types'
import { StringHelper } from '~/utils/StringHelper'
import { computed } from '#imports'

const props = defineProps({
  item: {
    type: Object as PropType<IRowItem<{ max?: number }>>,
    required: true,
  },
})

const getValue = computed(() => {
  return props.item.props?.max
    ? StringHelper.truncate(props.item.value, props.item.props.max)
    : props.item.value
})
</script>
