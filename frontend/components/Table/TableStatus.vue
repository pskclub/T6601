<template>
  <div class="table-status">
    <Loader :is-loading="status.isLoading" />
    <Error :message="status.errorData" />
    <Empty v-if="ArrayHelper.isEmpty(rows) && status.isSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IRow, IStatus } from './types'
import { ArrayHelper } from '~/utils/ArrayHelper'

defineProps({
  status: { type: Object as PropType<IStatus>, required: true },
  rows: { type: Array as PropType<IRow[]>, required: true },
})
</script>
