<template>
  <div v-if="paginationCal().length > 1" class="pagination-component">
    <div
      :class="{ hide: isFirstPage || isNotTooLong }"
      class="page-btn navigation"
      @click="handlePageChange(currentPage - 1)"
    >
      <em class="ic ic-chevron-left-solid w-4" />
    </div>
    <div
      v-for="(page, index) in paginationCal()"
      :key="index"
      :class="{ active: page === currentPage, disabled: page === '...' }"
      class="page-btn number"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </div>
    <div
      :class="{ hide: isLastPage || isNotTooLong }"
      class="page-btn navigation"
      @click="handlePageChange(currentPage + 1)"
    >
      <em class="ic ic-chevron-right-solid w-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { _concat, _range } from '~/utils/lodash'

const props = defineProps<{
  currentPage: number
  pageCount: number
}>()

const emit = defineEmits<{
  (event: 'pageChange', value: number): void
}>()

const isFirstPage = computed((): boolean => props.currentPage === 1)
const isLastPage = computed((): boolean => props.currentPage === props.pageCount)
const isNotTooLong = computed((): boolean => props.pageCount <= 5)

const paginationCal = (): (string | number)[] => {
  const pages = _range(1, props.pageCount + 1)

  if (pages.length <= 5) {
    return pages
  }

  const left = props.currentPage - 2
  const right = props.currentPage + 2

  if (left <= 2) {
    return _concat<string | number>(pages.slice(0, 5), '...')
  }

  if (right >= props.pageCount - 1) {
    return _concat<string | number>(
      ['...'],
      [
        props.pageCount - 4,
        props.pageCount - 3,
        props.pageCount - 2,
        props.pageCount - 1,
        props.pageCount,
      ]
    )
  }

  return _concat<string | number>(
    ['...'],
    [props.currentPage - 2, props.currentPage - 1, props.currentPage, props.currentPage + 1],
    ['...']
  )
}

const handlePageChange = (page: number | string): void => {
  if (typeof page === 'number') {
    emit('pageChange', page)
  }
}
</script>
