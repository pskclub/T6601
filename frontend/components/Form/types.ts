import { DefineComponent } from 'vue'
import { FormContext, RuleExpression } from 'vee-validate'
import { IRadioButtonField } from './radio_button_field.types'
import { ITextField } from '~/components/Form/text_field.types'
import { ISelectField } from '~/components/Form/select_field.types'
import { ITextAreaField } from '~/components/Form/textarea_field.types'
import { IToggleField } from '~/components/Form/toggle_field.types'
import { ISelectAutoCompleteField } from '~/components/Form/select_auto_complete_field.types'
import { IStaticField } from '~/components/Form/static_field.types'
import { IComponentField } from '~/components/Form/component_field.types'
import { IDateTimeField } from '~/components/Form/date_time_field.types'

export const enum INPUT_TYPES {
  COMPONENT = 'COMPONENT',
  DATE = 'DATE',
  TIME = 'TIME',
  RADIO_BUTTON = 'RADIO_BUTTON',
  DATE_TIME = 'DATE_TIME',
  DATE_RANGE = 'DATE_RANGE',
  TEXT = 'TEXT',
  TEXT_AREA = 'TEXT_AREA',
  SELECT = 'SELECT',
  SELECT_AUTO_COMPLETE = 'SELECT_AUTO_COMPLETE',
  MULTI_SELECT = 'MULTI_SELECT',
  TAG = 'TAG',
  PASSWORD = 'PASSWORD',
  NUMBER = 'NUMBER',
  TOGGLE_SWITCH = 'TOGGLE_SWITCH',
  CHECK_BOX = 'CHECK_BOX',
  STATIC = 'STATIC',
}

export interface IOption {
  label: string
  value: any
}

export interface IRadioOption {
  label: string | VueComponent
  value: any
}

export interface IFieldProps {
  form?: FormContext
  name: string
  label?: string | VueComponent
  rules?: RuleExpression<any> | any
  autoFocus?: boolean
  class?: ClassName
  classInner?: ClassName
  classInputInner?: ClassName
  placeholder?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  isLoading?: boolean
  help?: string
  isHideLabel?: boolean
  customErrorMessage?: string | VueComponent | DefineComponent
  transform?: (value: any, oldValue: any, e: InputEvent) => any
  getInstance?: (el: HTMLElement) => void
}

export interface IFormFieldBase<
  I extends INPUT_TYPES,
  P extends object = never,
  O extends object = never
> {
  type: I | INPUT_TYPES
  component?: VueComponent
  class?: ClassName
  isHide?: boolean
  props: IFieldProps & P
  on?: O
}

export type IFormField =
  | IComponentField
  | ITextField
  | ISelectField
  | ITextAreaField
  | IToggleField
  | ISelectAutoCompleteField
  | IStaticField
  | IRadioButtonField
  | IDateTimeField
