import { IFieldProps, IFormFieldBase, INPUT_TYPES } from '~/components/Form/types'

export interface ITextAreaFieldProps extends IFieldProps {
  rows?: number
  max?: number
}

export type ITextAreaField = IFormFieldBase<
  INPUT_TYPES.TEXT_AREA,
  ITextAreaFieldProps,
  {
    change?: (value: string) => void
  }
>
