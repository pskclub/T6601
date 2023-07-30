<template>
  <FieldWrapper v-bind="wrapperProps">
    <Datepicker
      v-model="value"
      :disabled="disabled"
      cancel-text="ยกเลิก"
      select-text="เลือก"
      locale="th"
      :enable-time-picker="!disabled_time"
      :placeholder="placeholder || 'เลือกวันที่'"
      :format="format"
      :min-date="min_date"
      :max-date="max_date"
      :input-class-name="[
        fieldClassName,
        'flex flex-row py-[1px] px-[1px]',
        {
          disabled: disabled,
        },
      ]"
      @change="handleChange"
    />
  </FieldWrapper>
</template>
<script lang="ts" setup>
import { useFieldHOC } from '~/hooks/useForm'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { TimeHelper } from '~/utils/TimeHelper'
import { IDateTimeFieldProps } from '~/components/Form/date_time_field.types'

const props = withDefaults(defineProps<IDateTimeFieldProps>(), {})
const emits = defineEmits<{
  (event: 'change', value: string): void
}>()

const { value, wrapperProps, onChange, fieldClassName, disabled } = useFieldHOC<string>(props)

const format = (date: Date) => {
  if (props.disabled_time) {
    return TimeHelper.getDateFormTime(date as any)
  }

  return TimeHelper.getDateTimeFormTime(date as any)
}

const handleChange = (e: InputEvent) => {
  onChange(e)
  const target = e.target as HTMLInputElement

  emits('change', target?.value)
}
</script>
