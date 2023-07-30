import { IFieldProps, IFormFieldBase, INPUT_TYPES } from '~/components/Form/types'

export interface IToggleFieldProps extends IFieldProps {
  switchLabel?: string
}

export type IToggleField = IFormFieldBase<INPUT_TYPES.TOGGLE_SWITCH, IToggleFieldProps>
