import { IFieldProps, IFormFieldBase, INPUT_TYPES } from '~/components/Form/types'

export interface ITextFieldProps extends IFieldProps {
  type?: 'text' | 'password' | 'email'
  prependIcon?: VueComponent
  appendIcon?: VueComponent
  isShowConfirmButton?: boolean
  confirmText?: string
}

export type ITextField = IFormFieldBase<
  INPUT_TYPES.TEXT | INPUT_TYPES.PASSWORD,
  ITextFieldProps,
  {
    change?: (value: string) => void
    blur?: (value: string) => void
    submit?: (value: string) => void
  }
>
