<template>
  <FieldWrapper v-bind="wrapperProps" :is-required="false">
    <p class="form-control-static">
      {{ !value || value.length === 0 ? '-' : value }}
    </p>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { IStaticFieldProps } from '~/components/Form/static_field.types'
import { useFieldHOC } from '~/hooks/useForm'

const props = withDefaults(defineProps<IStaticFieldProps>(), {})

const { value, label, wrapperProps, disabled } = useFieldHOC<string>(props)
</script>
