<template>
  <label v-if="label" class="form-label">
    <component :is="label" v-if="isLabelComponent" />
    <template v-else>
      {{ label }}
    </template>
    <FieldRequired :is-required="isRequired" />
  </label>
</template>
<script lang="ts" setup>
import FieldRequired from '~/components/Form/FieldRequired.vue'
import { computed } from '#imports'

const props = defineProps<{
  label?: string | VueComponent
  isRequired?: boolean
}>()

const isLabelComponent = computed<boolean>(() => {
  return props.label?.hasOwnProperty('setup') ?? false
})
</script>
