<template>
  <div class="fields">
    <template v-for="(option, index) in options" :key="option.props.name + index + option.type">
      <div v-if="!option.isHide" :class="option.class">
        <StaticField
          v-if="option.type === INPUT_TYPES.STATIC"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <TextField
          v-if="option.type === INPUT_TYPES.TEXT"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <TextField
          v-if="option.type === INPUT_TYPES.PASSWORD"
          :form="form"
          type="password"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <TextAreaField
          v-if="option.type === INPUT_TYPES.TEXT_AREA"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <ToggleField
          v-if="option.type === INPUT_TYPES.TOGGLE_SWITCH"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <FormSelectField
          v-if="option.type === INPUT_TYPES.SELECT"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <FormRadioButtonField
          v-if="option.type === INPUT_TYPES.RADIO_BUTTON"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <FormSelectAutoCompleteField
          v-if="option.type === INPUT_TYPES.SELECT_AUTO_COMPLETE"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <FormDateTimeField
          v-if="option.type === INPUT_TYPES.DATE_TIME"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
        <FormDateTimeField
          v-if="option.type === INPUT_TYPES.DATE"
          :form="form"
          v-bind="option.props"
          :disabled_time="true"
          v-on="option.on ?? {}"
        />
        <FormComponentField
          v-if="option.type === INPUT_TYPES.COMPONENT"
          :component="option.component"
          :form="form"
          v-bind="option.props"
          v-on="option.on ?? {}"
        />
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { FormContext } from 'vee-validate'
import { IFormField, INPUT_TYPES } from '~/components/Form/types'
import TextField from '~/components/Form/TextField.vue'
import StaticField from '~/components/Form/StaticField.vue'
import TextAreaField from '~/components/Form/TextAreaField.vue'
import ToggleField from '~/components/Form/ToggleField.vue'

defineProps<{
  form?: FormContext
  options: IFormField[]
}>()
</script>
