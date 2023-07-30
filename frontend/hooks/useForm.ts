import { ComputedRef, DefineComponent } from 'vue'
import { FieldContext, FieldOptions, useField } from 'vee-validate'

import { computed, toRef } from '#imports'
import { IFieldProps, IFormField } from '~/components/Form/types'

export interface IFieldWrapperProps {
  errorMessage?: string
  label?: string | VueComponent
  className?: ClassName
  classInner?: ClassName
  classInputInner?: ClassName
  isRequired?: boolean
  isHideLabel?: boolean
  customErrorMessage?: string | VueComponent | DefineComponent
  name: string
}

interface IFieldContext<TValue> extends FieldContext<TValue> {
  isRequired: ComputedRef<boolean>
  onChange: (e: InputEvent) => void
  fieldClassName: ComputedRef<any[]>
  disabled: ComputedRef<boolean>
  wrapperProps: ComputedRef<IFieldWrapperProps>
}

export const useFieldHOC = <TValue = unknown>(
  newFormProps: IFieldProps,
  opts?: Partial<FieldOptions<TValue>>
): IFieldContext<TValue> => {
  const field = useField(toRef(newFormProps, 'name'), newFormProps.rules, {
    form: newFormProps.form,
    ...opts,
  })

  const isRequired = computed<boolean>(() => newFormProps.rules?.exclusiveTests?.required ?? false)

  const onChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    const newValue = newFormProps.transform
      ? newFormProps.transform(target.value, field.value, e)
      : target.value

    target.value = newValue
    field.handleChange(newValue)
  }

  const fieldClassName = computed(() => {
    return [
      'form-control peer',
      {
        'input-error': !field.meta.valid && field.meta.dirty,
        'input-success': field.meta.valid && field.meta.dirty,
      },
    ]
  })

  return {
    ...field,
    isRequired,
    onChange,
    fieldClassName,
    disabled: computed<boolean>(() => newFormProps.isDisabled ?? newFormProps.isReadOnly ?? false),
    wrapperProps: computed<IFieldWrapperProps>(() => ({
      label: newFormProps.label,
      errorMessage: field.errorMessage.value,
      className: newFormProps.class,
      classInner: newFormProps.classInner,
      classInputInner: newFormProps.classInputInner,
      isRequired: isRequired.value,
      isHideLabel: newFormProps.isHideLabel,
      customErrorMessage: newFormProps.customErrorMessage,
      name: newFormProps.name,
    })),
  }
}

export const createFormFields = (fields: () => IFormField[]) => computed<IFormField[]>(fields)
