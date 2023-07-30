<template>
  <FieldWrapper v-bind="wrapperProps">
    <Listbox v-model="innerValue" :disabled="disabled" :nullable="!wrapperProps.isRequired">
      <div :class="[fieldClassName, 'select-box']">
        <ListboxButton :class="['select-listbox-button', { disabled: disabled }]">
          <span v-if="innerValue" class="select-label">{{ innerValue?.label }}</span>
          <span v-else class="select-label-disabled">{{ placeholder ?? props.label }}</span>
          <span class="select-icons-box">
            <IconLoading v-if="isLoading" class="select-icons-loading" />
            <i v-else aria-hidden="true" class="ic ic-chevron-down-solid select-icons-down" />
          </span>
        </ListboxButton>
        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions class="select-listbox-options mt-4">
            <div class="my-2">
              <ListboxOption
                v-for="option in options"
                :key="option.value"
                v-slot="{ selected, active }"
                :value="option"
                as="template"
              >
                <li
                  :class="[
                    'select-options',
                    { 'bg-primary-200 text-dark': active || selected, 'text-dark': !active },
                  ]"
                >
                  <span class="select-label">
                    {{ option.label }}
                  </span>
                </li>
              </ListboxOption>
            </div>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { useFieldHOC } from '~/hooks/useForm'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { ref, toRef, watch } from '#imports'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { ISelectFieldProps } from '~/components/Form/select_field.types'

const props = withDefaults(defineProps<ISelectFieldProps>(), {
  options: () => [],
  initOptions: () => [],
})

const emits = defineEmits<{
  (e: 'change', value: string): void
}>()

const { value, label, wrapperProps, fieldClassName, handleChange, disabled } =
  useFieldHOC<IOption | null>(props)

const innerValue = ref<IOption | undefined>(
  props.options.find((option) => option.value === value.value) ||
    props.initOptions.find((option) => option.value === value.value)
)

watch(innerValue, (newValue, oldValue) => {
  if (oldValue?.value !== newValue?.value) {
    handleChange(newValue?.value)
    emits('change', newValue?.value)
  }
})

watch(toRef(props, 'options'), (options) => {
  innerValue.value = options.find((option) => option.value === value.value)
})

watch(value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (typeof newValue === 'undefined') {
      innerValue.value = undefined
    } else {
      innerValue.value =
        props.options.find((option) => option.value === newValue) ||
        props.initOptions.find((option) => option.value === newValue) ||
        ObjectHelper.createOption(newValue)
    }
  }
})
</script>
