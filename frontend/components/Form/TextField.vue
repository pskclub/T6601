<template>
  <FieldWrapper v-bind="wrapperProps">
    <div
      :class="[
        fieldClassName,
        'flex flex-row py-0 px-0',
        {
          disabled: disabled,
        },
      ]"
    >
      <div v-if="prependIcon" class="prepend-icon">
        <component :is="prependIcon" />
      </div>
      <input
        :class="[
          fieldClassName,
          'ring-0 w-full',
          {
            'rounded-r-none': type === 'password' || appendIcon || isShowConfirmButton,
          },
          {
            'rounded-l-none': prependIcon,
          },
        ]"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder ?? props.label"
        :type="isShowPassword ? 'text' : props.type || 'text'"
        :value="value"
        :autofocus="autoFocus"
        @input="handleChange"
        @blur="handleBlur"
      />
      <div v-if="type === 'password'" class="append-icon cursor-pointer">
        <i
          :class="[
            'ic text-primary-300 hover:text-primary',
            !isShowPassword ? 'ic-eye-slash-solid' : 'ic-eye-solid',
          ]"
          @click="isShowPassword = !isShowPassword"
        />
      </div>
      <div v-if="appendIcon" class="append-icon">
        <component :is="appendIcon" />
      </div>
      <div
        v-if="isShowConfirmButton"
        class="copy-button"
        @click="emits('submit', value)"
        v-html="confirmText"
      />
    </div>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import { useFieldHOC } from '~/hooks/useForm'
import { ref } from '#imports'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { ITextFieldProps } from '~/components/Form/text_field.types'

const props = withDefaults(defineProps<ITextFieldProps>(), {})
const emits = defineEmits<{
  (event: 'change', value: string): void
  (event: 'submit', value: string): void
  (event: 'blur', value: string): void
}>()

const { value, wrapperProps, onChange, fieldClassName, disabled } = useFieldHOC<string>(props)
const isShowPassword = ref(false)

const handleChange = (e: InputEvent) => {
  onChange(e)
  const target = e.target as HTMLInputElement

  emits('change', target?.value)
}

const handleBlur = (e: FocusEvent) => {
  const target = e.target as HTMLInputElement

  emits('blur', target?.value)
}
</script>
