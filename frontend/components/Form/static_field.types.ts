import { IFieldProps, IFormFieldBase, INPUT_TYPES } from '~/components/Form/types'

export interface IStaticFieldProps extends IFieldProps {}

export type IStaticField = IFormFieldBase<INPUT_TYPES.STATIC, IStaticFieldProps>
