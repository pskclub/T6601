<template>
  <FieldWrapper v-bind="wrapperProps">
    <textarea
      :class="fieldClassName"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder ?? props.label"
      :rows="rows"
      :value="value"
      :autofocus="autoFocus"
      @input="handleChange"
    />
    <span v-if="max" class="textarea-max-counter"> {{ value?.length || 0 }}/{{ max }} </span>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import { useFieldHOC } from '~/hooks/useForm'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { ITextAreaFieldProps } from '~/components/Form/textarea_field.types'

const props = withDefaults(defineProps<ITextAreaFieldProps>(), {})

const emits = defineEmits<{
  (event: 'change', value: string): void
}>()

const { value, label, wrapperProps, onChange, fieldClassName, disabled, setErrors, validate } =
  useFieldHOC<string>(props)

const handleChange = (e: InputEvent) => {
  onChange(e)
  const target = e.target as HTMLInputElement

  if (props.max && target?.value?.length > props.max) {
    setTimeout(() => {
      setErrors([`Maximum ${props.max} characters`])
    }, 0)
  }

  emits('change', target?.value)
}
</script>
