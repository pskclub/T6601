<template>
  <span :title="item.title || item.value" class="px-4 block" v-html="getValue || '-'" />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IRowItem } from '../types'
import { StringHelper } from '~/utils/StringHelper'
import { computed } from '#imports'

const props = defineProps({
  item: {
    type: Object as PropType<IRowItem>,
    required: true,
  },
})

const getValue = computed(() => {
  return StringHelper.withComma(props.item.value) || '-'
})
</script>
