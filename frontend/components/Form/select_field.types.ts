import { IFieldProps, IFormFieldBase, INPUT_TYPES, IOption } from '~/components/Form/types'

export interface ISelectFieldProps extends IFieldProps {
  options?: IOption[]
  initOptions?: IOption[]
  isLoading?: boolean
}

export type ISelectField = IFormFieldBase<
  INPUT_TYPES.SELECT,
  ISelectFieldProps,
  {
    change?: (value: string) => void
  }
>
