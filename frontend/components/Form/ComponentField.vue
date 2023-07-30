<template>
  <FieldWrapper v-bind="wrapperProps">
    <component :is="props.component" :value="value" v-bind="props" @input="onChange" />
  </FieldWrapper>
</template>
<script lang="ts" setup>
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { useFieldHOC } from '~/hooks/useForm'
import { IComponentFieldProps } from '~/components/Form/component_field.types'

interface IProps extends IComponentFieldProps {
  component: VueComponent
}

const props = withDefaults(defineProps<IProps>(), {})

const { value, label, wrapperProps, disabled, onChange } = useFieldHOC<string>(props)
</script>
