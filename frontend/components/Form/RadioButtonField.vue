<template>
  <FieldWrapper v-bind="wrapperProps">
    <label
      v-for="option in options"
      :key="option.value"
      :class="['flex items-center cursor-pointer']"
    >
      <input
        type="radio"
        :name="name"
        :value="option.value"
        class="mr-5"
        :disabled="disabled"
        :checked="value === option.value"
        @change="handleChange"
      />
      <div class="flex">
        <span v-if="typeof option.label === 'string'">
          {{ option.label }}
        </span>
        <component :is="option.label" v-else />
      </div>
    </label>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import { useFieldHOC } from '~/hooks/useForm'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { IRadioButtonFieldProps } from '~/components/Form/radio_button_field.types'

const props = withDefaults(defineProps<IRadioButtonFieldProps>(), {
  options: () => [],
  initOptions: () => [],
})

const emits = defineEmits<{
  (e: 'change', value: string): void
}>()

const handleChange = (e: InputEvent) => {
  onChange(e)
  const target = e.target as HTMLInputElement

  emits('change', target?.value)
}

const { value, wrapperProps, onChange, disabled } = useFieldHOC<string>(props)
</script>
