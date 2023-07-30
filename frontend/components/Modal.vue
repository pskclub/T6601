<template>
  <TransitionRoot :show="modelValue" appear as="template">
    <Dialog
      :model-value="modelValue"
      :initial-focus="null"
      as="div"
      class="modal"
      @update:modelValue="emit('update:modelValue', $event)"
      @close="handleCloseModalBackdrop"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="modal-backdrop" />
      </TransitionChild>
      <div class="modal-inner">
        <div class="modal-inner-area">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="['modal-panel', className]">
              <svg
                v-if="!noCloseIcon"
                class="modal-close"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="handleCloseModal"
              >
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <DialogTitle v-if="title" :class="['modal-title', titleClass]" as="h3">
                <span>{{ title }}</span>
              </DialogTitle>
              <div :class="['modal-body', bodyClass]">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { toRefs } from 'vue'

interface IProps {
  modelValue: boolean
  title?: string
  class?: ClassName
  titleClass?: ClassName
  bodyClass?: ClassName
  noBackdropClose?: boolean
  noCloseIcon?: boolean
}

const props = withDefaults(defineProps<IProps>(), { noBackdropClose: false })

const { title, class: className, noBackdropClose } = toRefs(props)

const emit = defineEmits({
  'update:modelValue': (_: boolean) => true,
})

const handleCloseModal = () => {
  emit('update:modelValue', false)
}

const handleCloseModalBackdrop = () => {
  if (!noBackdropClose.value) {
    emit('update:modelValue', false)
  }
}
</script>
