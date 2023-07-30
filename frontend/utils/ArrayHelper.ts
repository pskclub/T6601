import { _get } from '~/utils/lodash'
import { IOption } from '~/components/Form/types'

export class ArrayHelper {
  static toOptions(data: any[], valueAttr = 'id', labelAttr = 'name'): IOption[] {
    return ArrayHelper.toArray(data).map((item: any) => {
      const value = _get(item, valueAttr, null)

      return {
        value: value || null,
        label: _get(item, labelAttr, value),
      }
    })
  }

  static toArray<T>(value: any): Array<T | any> {
    return Array.from(value || [])
  }

  static isEmpty(value: any): boolean {
    return ArrayHelper.toArray(value).length === 0
  }

  static create = (length: number): any[] => {
    // return Array.apply(null, Array(length))
    return Array(...Array(length))
  }
}
