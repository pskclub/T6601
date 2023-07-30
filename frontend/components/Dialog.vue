<template>
  <Modal
    v-if="dialog.meta?.type"
    v-model="dialog.isShow"
    :no-backdrop-close="true"
    :no-close-icon="true"
    class="dialog"
  >
    <div :class="['flex items-center pt-8', { 'flex-col': !dialog.meta.isShowCancelBtn }]">
      <div
        :class="[
          {
            'text-warning': dialog.meta?.type === DialogType.WARNING,
            'text-danger': dialog.meta?.type === DialogType.ERROR,
            'text-info': dialog.meta?.type === DialogType.INFO,
            'text-success': dialog.meta?.type === DialogType.SUCCESS,
            'mr-4': dialog.meta.isShowCancelBtn,
          },
        ]"
      >
        <em v-if="dialog.meta?.type === 'success'" class="ic ic-check-circle-solid dialog-icon" />
        <em v-if="dialog.meta?.type === 'info'" class="ic ic-info-circle-solid dialog-icon" />
        <em
          v-if="dialog.meta?.type === 'warning'"
          class="ic ic-exclamation-triangle-solid dialog-icon"
        />
        <em v-if="dialog.meta?.type === 'error'" class="ic ic-x-circle-solid dialog-icon" />
      </div>
      <div :class="['flex flex-col w-full', { 'text-center mt-4': !dialog.meta.isShowCancelBtn }]">
        <h3 class="dialog-title">
          {{ dialog.meta?.title }}
        </h3>
        <p class="dialog-message">
          {{ dialog.meta?.message }}
        </p>
      </div>
    </div>

    <div :class="['mt-5 flex', dialog.meta.isShowCancelBtn ? 'justify-end' : 'justify-center ']">
      <Button
        v-if="dialog.meta?.isShowCancelBtn"
        class="text-gray mr-4"
        type="button"
        @click="dialog.closeDialogCancel"
      >
        {{ dialog.meta?.cancelText || 'ยกเลิก' }}
      </Button>
      <Button
        :class="[
          {
            'btn-success': dialog.meta?.type === DialogType.SUCCESS,
            'btn-danger': dialog.meta?.type === DialogType.ERROR,
            'btn-info': dialog.meta?.type === DialogType.INFO,
            'btn-warning': dialog.meta?.type === DialogType.WARNING,
            'mr-3': dialog.meta.isShowCancelBtn,
          },
        ]"
        @click="dialog.closeDialogProceed"
      >
        {{ dialog.meta?.confirmText || 'ตกลง' }}
      </Button>
    </div>
  </Modal>
</template>
<script lang="tsx" setup>
import { DialogType, useDialog } from '~/hooks/useDialog'

const dialog = useDialog()
</script>
