<template>
  <component :is="item.value" :item="item" v-on="item.on ?? {}" />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IRowItem } from '../types'

defineProps({
  item: { type: Object as PropType<IRowItem<any>>, required: true },
})
</script>
