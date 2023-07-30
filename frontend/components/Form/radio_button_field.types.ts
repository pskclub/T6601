import { IFieldProps, IFormFieldBase, INPUT_TYPES, IRadioOption } from '~/components/Form/types'

export interface IRadioButtonFieldProps extends IFieldProps {
  options?: IRadioOption[]
  initOptions?: IOption[]
  optionContainerClass?: ClassName
}

export type IRadioButtonField = IFormFieldBase<
  INPUT_TYPES.RADIO_BUTTON,
  IRadioButtonFieldProps,
  {
    change?: (value: string) => void
  }
>
