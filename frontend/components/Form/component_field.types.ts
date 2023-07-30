import { IFieldProps, IFormFieldBase, INPUT_TYPES } from '~/components/Form/types'

export interface IComponentFieldProps extends IFieldProps {}

export type IComponentField = IFormFieldBase<INPUT_TYPES.COMPONENT, IComponentFieldProps>
