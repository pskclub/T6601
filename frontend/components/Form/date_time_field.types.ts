import { IFieldProps, IFormFieldBase, INPUT_TYPES } from '~/components/Form/types'

export interface IDateTimeFieldProps extends IFieldProps {
  disabled_time?: boolean
  min_date?: Date | string
  max_date?: Date | string
}

export type IDateTimeField = IFormFieldBase<
  INPUT_TYPES.DATE_TIME | INPUT_TYPES.DATE,
  IDateTimeFieldProps,
  {
    change: (value: string) => void
  }
>
