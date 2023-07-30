<template>
  <thead :class="['table-header', className]">
    <tr>
      <th
        v-if="!status.isLoading && status.isSuccess && isShowCheckbox"
        class="checkbox"
        scope="col"
      >
        <div class="block w-12">
          <input
            v-model="isCheckAll"
            class="checkbox-control"
            type="checkbox"
            :disabled="rowsIndex?.length === 0"
          />
        </div>
      </th>
      <th
        v-for="(column, index) in columnItems"
        :key="index"
        :class="['table-header-column', column.className]"
        scope="col"
      >
        <div class="flex items-center gap-x-3">
          <div>
            <component :is="column.value" v-if="column.isComponent" v-bind="column.props" />
            <p v-else v-html="column.value" />
          </div>
          <div v-if="column.enabledSort" class="cursor-pointer" @click="changeSortStatus(index)">
            <em v-if="column.sortStatus === SORT_STATUS.NONE" class="ic ic-triangle-outline w-3" />
            <em v-if="column.sortStatus === SORT_STATUS.ASC" class="ic ic-triangle-solid w-3" />
            <em
              v-if="column.sortStatus === SORT_STATUS.DESC"
              class="ic ic-triangle-solid rotate-180 w-3"
            />
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IColumn, IStatus, IColumnItem, SORT_STATUS, IColumnSortStatus } from './types'
import { _xor } from '~/utils/lodash'
import { computed } from '#imports'

const props = defineProps({
  className: { type: [String, Object] },
  columns: { type: Array as PropType<IColumn[]> },
  rowsIndex: { type: Array as PropType<number[]>, default: () => [] },
  rowsIndexSelect: { type: Array as PropType<number[]>, default: () => [] },
  status: { type: Object as PropType<IStatus>, required: true },
  isShowCheckbox: { type: Boolean, default: false },
})

const emits = defineEmits(['sortChange'])

const selectedIndex = ref(props.rowsIndexSelect)

const columnItems = ref<IColumnItem[]>()

const isCheckAll = computed<boolean>({
  get() {
    if (props.rowsIndex.length === 0) {
      return false
    }

    return props.rowsIndex.length === props.rowsIndexSelect.length
  },
  set(value) {
    const insertIndex = _xor(props.rowsIndex, props.rowsIndexSelect)

    value
      ? selectedIndex.value.push(...insertIndex)
      : selectedIndex.value.splice(0, props.rowsIndexSelect.length)
  },
})

onMounted(() => {
  columnItems.value = props.columns?.map((col: IColumnItem) => {
    return col.enabledSort ? { ...col, sortStatus: SORT_STATUS.NONE } : col
  })
})

const changeSortStatus = (index: number) => {
  const column = columnItems.value![index]

  const otherSortColumn = columnItems.value!.filter((col) => col.enabledSort && col !== column)

  if (otherSortColumn.length > 0) {
    otherSortColumn.forEach((col) => (col.sortStatus = SORT_STATUS.NONE))
  }

  if (column.sortStatus === SORT_STATUS.NONE) {
    column.sortStatus = SORT_STATUS.ASC
  } else if (column.sortStatus === SORT_STATUS.ASC) {
    column.sortStatus = SORT_STATUS.DESC
  } else {
    column.sortStatus = SORT_STATUS.NONE
  }

  constructSortResponse()
}

const constructSortResponse = () => {
  const sortResponse = columnItems.value!.filter(
    (col) => col.enabledSort && col.sortStatus !== SORT_STATUS.NONE
  )

  const sortResponseMap = sortResponse.map((col) => {
    return {
      value: col.value,
      sortKey: col.sortKey,
      sortStatus: col.sortStatus,
    } as IColumnSortStatus
  })

  emits('sortChange', sortResponseMap)
}
</script>
