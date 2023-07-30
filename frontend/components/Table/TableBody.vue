<template>
  <tbody v-if="status.isSuccess && !status.isLoading">
    <tr
      v-for="(columns, indexRow) in rows"
      :key="getRowsIndex(indexRow)"
      :class="['table-body', { 'cursor-pointer': isRowClickable }]"
      @click="handleClickRow(indexRow)"
    >
      <td v-if="isShowCheckbox" class="table-body-row text-base font-normal checkbox">
        <input
          v-model="isRowSelect"
          :disabled="disabledCheckIndexes?.includes(indexRow)"
          :value="indexRow"
          class="checkbox-control"
          type="checkbox"
        />
      </td>
      <td
        v-for="(item, index) in columns"
        :key="index"
        :class="['table-body-row text-base font-normal', item.className]"
      >
        <TableColumnText
          v-if="item.type === COLUMN_TYPES.VALUE || !item.type"
          :item="item"
          :data="rawData[indexRow]"
        />
        <TableColumnDatetime
          v-if="item.type === COLUMN_TYPES.DATE_TIME"
          :item="item"
          :data="rawData[indexRow]"
        />
        <TableColumnNumber
          v-if="item.type === COLUMN_TYPES.NUMBER"
          :item="item"
          :data="rawData[indexRow]"
        />
        <TableColumnComponent
          v-if="item.type === COLUMN_TYPES.COMPONENT"
          :item="item"
          :data="rawData[indexRow]"
          v-on="item.on ?? {}"
        />
        <TableColumnAction
          v-if="item.type === COLUMN_TYPES.ACTION"
          :data="rawData[indexRow]"
          :item="item"
          v-on="item.on ?? {}"
        />
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { COLUMN_TYPES, IRow, IStatus } from './types'

import TableColumnText from './Columns/ColumnText.vue'
import TableColumnComponent from './Columns/ColumnComponent.vue'
import TableColumnDatetime from './Columns/ColumnDatetime.vue'
import TableColumnNumber from './Columns/ColumnNumber.vue'
import TableColumnAction from './Columns/ColumnAction.vue'

const props = defineProps({
  status: { type: Object as PropType<IStatus>, required: true },
  rows: { type: Array as PropType<IRow[]>, required: true },
  rawData: { type: Array as PropType<any[]>, required: true },
  primary: { type: String, required: true },
  rowsIndexSelect: { type: Array as PropType<number[]>, default: () => [] },
  isShowCheckbox: { type: Boolean, default: false },
  isRowClickable: { type: Boolean, default: false },
  disabledCheckIndexes: { type: Array as PropType<number[]> },
  onRowClick: {
    type: Function as PropType<(index: number) => void>,
  },
})

const selectedIndex = ref(props.rowsIndexSelect)

const isRowSelect = computed<number[]>({
  get() {
    return props.rowsIndexSelect
  },
  set(value) {
    selectedIndex.value.splice(0, props.rowsIndexSelect.length)
    selectedIndex.value.push(...value)
  },
})

const getRowsIndex = (index: number) => {
  return props.rawData[index][props.primary]
}

const handleClickRow = (index: number) => {
  if (!props.isRowClickable) return

  props.onRowClick?.(index)
}
</script>
