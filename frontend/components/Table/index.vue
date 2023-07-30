<template>
  <div :class="['table-component']">
    <div v-if="!options.isHideToolbar">
      <slot name="toolbar" />
    </div>
    <div :class="['table-wrapper', tableWrapperClassName]">
      <div
        v-if="!options.isHideTopPagination && options.pageOptions.totalCount"
        class="table-top-pagination"
      >
        <div class="w-full">
          <slot name="topPaginationAction" />
        </div>
        <div class="top-pagination">
          <p>{{ pageBetween }} of {{ totalCountWithComma }}</p>
          <Pagination
            :current-page="options.pageOptions.currentPage"
            :page-count="options.pageOptions.totalPage"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
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
          :disabled-check-indexes="options.disabledCheckIndexes"
          :is-show-checkbox="options.isShowCheckbox"
          :is-row-clickable="options.isRowClickable"
          :on-row-click="options.onRowClick"
          :primary="options.primary"
          :raw-data="options.rawData"
          :rows="options.rows"
          :rows-index-select="rowsIndexSelect"
          :status="options.status"
        />
      </table>
      <TableStatus :rows="props.options.rows" :status="options.status" />
    </div>
    <div
      v-if="!options.isHideBottomPagination && options.pageOptions.totalCount"
      class="table-bottom-pagination"
    >
      <p>ผลลัพธ์ {{ pageBetween }} ของ {{ totalCountWithComma }} รายการ</p>
      <Pagination
        :current-page="options.pageOptions.currentPage"
        :page-count="options.pageOptions.totalPage"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PropType } from 'vue'
import Pagination from '../Pagination.vue'
import { ITableOptions } from './types'
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import TableStatus from './TableStatus.vue'
import { StringHelper } from '~/utils/StringHelper'
import { useWatchTrue } from '~/hooks/useWatch'

const props = defineProps({
  tableWrapperClassName: { type: [String, Object] },
  tableClassName: { type: [String, Object] },
  tableHeadClassName: { type: [String, Object] },
  options: { type: Object as PropType<ITableOptions>, required: true },
})

const emit = defineEmits<{
  (event: 'pageChange', value: number): void
}>()

const router = useRouter()

// Rows Select Checkbox
const rowsIndex = ref<number[]>([])
const rowsIndexSelect = ref<number[]>([])

useWatchTrue(
  () => props.options.status.isSuccess,
  () => {
    clearRowIndex()
    rowsIndex.value = props.options.rows
      .map((_, index) => index)
      .filter((index) => {
        const disabledList = props.options.disabledCheckIndexes ?? []

        return !disabledList.includes(index)
      })
  }
)

watch(rowsIndexSelect.value, (value) => {
  if (typeof props.options.onCheckBoxClick === 'function') {
    props.options.onCheckBoxClick(value)
  }
})

// Pagination
const pageBetween = computed((): string => {
  const length = props.options.rows.length

  if (length === 0) {
    return '0'
  }

  const start = (props.options.pageOptions.currentPage - 1) * props.options.pageOptions.limit + 1
  const end = start + length - 1

  return `${start} - ${end}`
})

const totalCountWithComma = computed((): string => {
  return !props.options.pageOptions.totalCount
    ? '0'
    : StringHelper.withComma(props.options.pageOptions.totalCount)
})

const handlePageChange = (page: number) => {
  emit('pageChange', page)

  if (!props.options.isNotChangeRoute) {
    router.push({ query: { page } })
  }
}

const clearRowIndex = () => {
  rowsIndexSelect.value.splice(0, rowsIndexSelect.value.length)
}
</script>
