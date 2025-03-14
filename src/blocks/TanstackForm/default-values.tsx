import { Form } from '@/payload-types'
import { formOptions } from '@tanstack/react-form'

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
