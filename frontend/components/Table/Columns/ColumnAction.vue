<template>
  <div class="column-action">
    <Button
      v-if="!view.isHideEdit"
      :is-disabled="view.isDisabledEdit"
      :is-only-icon="!view.editLabel"
      class="btn-primary-plain text-lg disabled:text-gray"
      icon="pen-square-solid"
      @click="$emit('edit')"
    >
      {{ view.editLabel }}
    </Button>
    <Button
      v-if="!view.isHideDelete"
      :is-disabled="view.isDisabledDelete"
      :is-only-icon="!view.deleteLabel"
      class="btn-primary-plain text-lg disabled:text-gray"
      icon="trash-outline"
      @click="handleDelete"
    >
      {{ view.deleteLabel }}
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { IRowItem, IStatus } from '../types'
import { IDialogMetaItem, useDialog } from '~/hooks/useDialog'

interface IProps {
  isHideEdit?: boolean
  isDisabledEdit?: boolean
  isShowView?: boolean
  isHideDelete?: boolean
  isDisabledDelete?: boolean
  deleteDialogItem?: IDialogMetaItem
  deleteStatus?: IStatus
  deleteLabel?: string
  editLabel?: string
}

const props = defineProps({
  item: {
    type: Object as PropType<IRowItem<IProps>>,
    required: true,
  },
  data: { type: Object, required: true },
})

const emit = defineEmits<{
  (event: 'edit', ...args: any[]): void
  (event: 'delete', ...args: any[]): void
}>()

const dialog = useDialog()

const view = computed<IProps>(() => props.item.props ?? {})

const handleDelete = () => {
  dialog
    .error({
      title: view.value.deleteDialogItem?.title || 'Delete',
      message: view.value.deleteDialogItem?.message || 'Are you sure?',
      confirmText: view.value.deleteDialogItem?.confirmText,
      isShowCancelBtn: true,
    })
    .then(() => {
      emit('delete', props.data)
    })
}
</script>
