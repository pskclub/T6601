<template>
  <fieldset :class="['form-container', className]">
    <div :class="['form-inner', classInner]">
      <FieldLabel v-if="!isHideLabel" :is-required="isRequired" :label="label" />
      <div :class="['form-inner-body', classInputInner]">
        <slot />
        <div v-if="customErrorMessage">
          <component :is="customErrorMessage" v-if="isCustomErrorComponent" />
          <template v-else>
            {{ customErrorMessage }}
          </template>
        </div>
        <FieldInvalidFeedback v-else :error-message="errorMessage" />
      </div>
    </div>
  </fieldset>
</template>
<script lang="ts" setup>
import FieldInvalidFeedback from '~/components/Form/FieldInvalidFeedback.vue'
import FieldLabel from '~/components/Form/FieldLabel.vue'
import { IFieldWrapperProps } from '~/hooks/useForm'

const props = defineProps<IFieldWrapperProps>()

const isCustomErrorComponent = computed<boolean>(() => {
  return props.customErrorMessage?.hasOwnProperty('setup') ?? false
})
</script>
