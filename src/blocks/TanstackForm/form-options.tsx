import { formOptions } from '@tanstack/react-form'
import { Form } from '@/payload-types'

export type FormField = NonNullable<Form['fields']>[number]
export type FormBlockType = FormField['blockType']

export const defaultValuesOpts = (fields: Form['fields']) => {
  const defaultValues: Record<string, string | number | true | undefined> = {}

  if (fields) {
    fields.forEach((field) => {
      if ('name' in field && field.name) {
        const defaultValue = 'defaultValue' in field && field.defaultValue ? field.defaultValue : ''
        defaultValues[field.name] = defaultValue ?? undefined
      }
    })
  }

  return formOptions({
    defaultValues,
  })
}
