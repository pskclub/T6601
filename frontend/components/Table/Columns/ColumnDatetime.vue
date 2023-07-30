<template>
  <p
    :title="item.title || `${getValue.date} ${getValue.time}`"
    class="px-4 whitespace-nowrap flex flex-col"
  >
    <span>
      {{ getValue.date }}
    </span>
    <span class="text-gray text-xs">
      {{ getValue.time }}
    </span>
  </p>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IRowItem } from '../types'
import { TimeHelper } from '~/utils/TimeHelper'
import { computed } from '#imports'

const props = defineProps({
  item: {
    type: Object as PropType<IRowItem>,
    required: true,
  },
})

const getValue = computed<{ date: string; time: string }>(() => {
  return props.item.value
    ? {
        date: TimeHelper.getDateFormTime(props.item.value),
        time: TimeHelper.getTimeFormTime(props.item.value),
      }
    : { date: '-', time: '-' }
})
</script>
