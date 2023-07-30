<template>
  <FieldWrapper v-bind="wrapperProps">
    <Combobox v-model="innerValue" :disabled="disabled" :nullable="!wrapperProps.isRequired">
      <div class="select-box">
        <ComboboxInput
          :class="[
            fieldClassName,
            'select-auto-complete-box',
            {
              disabled: disabled,
            },
          ]"
          :disabled="disabled"
          :autofocus="autoFocus"
          :display-value="(option) => option?.label"
          :placeholder="placeholder ?? props.label"
          @change="onQuery"
        />
        <ComboboxButton class="select-icons-button">
          <IconLoading v-if="isLoading" class="select-icons-loading" />
          <i v-else aria-hidden="true" class="ic ic-chevron-down-solid select-icons-down" />
        </ComboboxButton>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="onAfterLeave"
        >
          <ComboboxOptions class="select-listbox-options">
            <div v-if="filteredOptions.length === 0 && query !== ''" class="select-no-options">
              {{ notFoundText || 'Nothing found.' }}
            </div>

            <div :class="{ 'my-2': filteredOptions.length > 0 }">
              <ComboboxOption
                v-for="option in filteredOptions"
                :key="option.value"
                v-slot="{ selected, active }"
                :value="option"
                as="template"
              >
                <li
                  :class="[
                    'select-options',
                    {
                      'bg-primary-200 text-dark': active | selected,
                      'text-dark': !active,
                    },
                  ]"
                >
                  <span class="select-label">
                    {{ option.label }}
                  </span>
                </li>
              </ComboboxOption>
            </div>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from '@headlessui/vue'
import { useFieldHOC } from '~/hooks/useForm'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { computed, ref, toRef, watch } from '#imports'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { ISelectAutoCompleteFieldProps } from '~/components/Form/select_auto_complete_field.types'

const props = withDefaults(defineProps<ISelectAutoCompleteFieldProps>(), {
  options: () => [],
  initOptions: () => [],
})

const emits = defineEmits<{
  (e: 'change', value: string): void
  (e: 'search', value: string): void
  (e: 'leave', value: void): void
}>()

const { value, label, wrapperProps, fieldClassName, handleChange, disabled } =
  useFieldHOC<IOption | null>(props)

const query = ref('')
const innerValue = ref<IOption | undefined>(
  props.options.find((option) => option.value === value.value) ||
    props.initOptions.find((option) => option.value === value.value)
)

const onQuery = ($event: any) => {
  query.value = $event.target?.value ?? ''
  emits('search', $event.target?.value ?? '')
}

const onAfterLeave = () => {
  query.value = ''
  emits('leave')
}

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

const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>
