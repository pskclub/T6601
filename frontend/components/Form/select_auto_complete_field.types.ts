import { IFieldProps, IFormFieldBase, INPUT_TYPES, IOption } from '~/components/Form/types'

export interface ISelectAutoCompleteFieldProps extends IFieldProps {
  options?: IOption[]
  initOptions?: IOption[]
  notFoundText?: string
  isLoading?: boolean
}

export type ISelectAutoCompleteField = IFormFieldBase<
  INPUT_TYPES.SELECT_AUTO_COMPLETE,
  ISelectAutoCompleteFieldProps,
  {
    change?: (value: string) => void
    search?: (value: string) => void
    leave?: (value: string) => void
  }
>
