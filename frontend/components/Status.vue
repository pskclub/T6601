<template>
  <div :class="['bg-white rounded-xl', className]">
    <Loader :is-loading="status.isLoading" />
    <Error :message="status.errorData" />
    <Empty v-if="status.isSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IStatus } from '~/lib/api/types'

defineProps({
  status: { type: Object as PropType<IStatus>, required: true },
  className: { type: [String, Object, Array] },
})
</script>
