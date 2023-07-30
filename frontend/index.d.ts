import * as Yup from 'Yup'
import { declare } from './.nuxt/types/imports';

declare module 'yup' {
  interface StringSchema extends Yup.StringSchema {
    thai(): StringSchema
    english(): StringSchema
    numeric(): StringSchema
    len(len: number, errorMessage?: string): StringSchema
    phoneLen(len: number, errorMessage?: string): StringSchema
  }
}

declare global {
  declare interface IError {
    code: string
    message: string
  }

  declare interface IOption {
    label: string
    value: any
  }
  declare type VueComponent = defineComponent | any
  declare type ClassName = string | object | any[]
  declare module 'vue2-datepicker'
  declare module 'luxon'
}
