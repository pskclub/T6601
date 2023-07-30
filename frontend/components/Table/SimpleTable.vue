<template>
  <div :class="['table-component']">
    <div :class="['table-wrapper', tableWrapperClassName]">
      <table :class="['table', tableClassName]">
        <TableHead
          :class-name="tableHeadClassName"
          :columns="options.columns"
          :is-show-checkbox="options.isShowCheckbox"
          :rows-index="rowsIndex"
          :rows-index-select="rowsIndexSelect"
          :status="options.status"
          @sort-change="options.onSortChange"
        />
        <TableBody
          :is-show-checkbox="options.isShowCheckbox"
          :primary="options.primary"
          :raw-data="options.rawData"
          :rows="options.rows"
          :rows-index-select="rowsIndexSelect"
          :status="options.status"
        />
      </table>
      <TableStatus :rows="props.options.rows" :status="options.status" />
    </div>
    <div v-if="!isHideBottomPagination" class="table-bottom-pagination flex justify-between">
      <p>ผลลัพธ์ {{ options.rows.length }} รายการ</p>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PropType } from 'vue'
import { ISimpleTableOptions } from './types'

import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import TableStatus from './TableStatus.vue'
import { useWatchTrue } from '~/hooks/useWatch'
import { watch } from '#imports'

const props = defineProps({
  tableClassName: { type: [String, Object] },
  tableWrapperClassName: { type: [String, Object] },
  tableHeadClassName: { type: [String, Object] },
  options: { type: Object as PropType<ISimpleTableOptions>, required: true },
})

// Rows Select Checkbox
const rowsIndex = ref<number[]>([])
const rowsIndexSelect = ref<number[]>([])
const isHideBottomPagination = computed(() => props.options.isHideBottomPagination ?? false)

useWatchTrue(
  () => props.options.status.isSuccess,
  () => {
    rowsIndex.value = props.options.rows.map((_, index) => index)
  }
)

watch(rowsIndexSelect.value, (value) => {
  if (props.options.onCheckBoxClick) {
    props.options.onCheckBoxClick(value)
  }
})
</script>
