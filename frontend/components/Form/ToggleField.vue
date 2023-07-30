<template>
  <FieldWrapper v-bind="wrapperProps">
    <SwitchGroup>
      <div class="flex items-center gap-2">
        <Switch
          v-model="value"
          :class="['switch-control cursor-pointer', value ? 'active' : 'inactive']"
          :disabled="disabled"
        >
          <span
            :class="[
              'switch-control-inner',
              value ? 'translate-x-8 bg-primary' : 'translate-x-1 bg-gray-300',
            ]"
            aria-hidden="true"
          />
        </Switch>
        <SwitchLabel class="font-light text-lg">{{ props.switchLabel }}</SwitchLabel>
      </div>
    </SwitchGroup>
  </FieldWrapper>
</template>
<script lang="ts" setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { useFieldHOC } from '~/hooks/useForm'
import FieldWrapper from '~/components/Form/FieldWrapper.vue'
import { IToggleFieldProps } from '~/components/Form/toggle_field.types'
import { onMounted } from '#imports'

const props = withDefaults(defineProps<IToggleFieldProps>(), {})

const { value, label, wrapperProps, fieldClassName, disabled } = useFieldHOC<boolean>(props)

onMounted(() => {
  if (typeof value.value === 'undefined') {
    value.value = false
  }
})
</script>
