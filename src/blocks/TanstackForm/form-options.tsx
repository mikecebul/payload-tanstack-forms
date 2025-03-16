import { formOptions } from '@tanstack/react-form'
import type { Form } from '@/payload-types'
import type { FormFields } from '@/plugins/fom-builder-plugin/fields'

export type FormField = NonNullable<Form['fields']>[number]

export const defaultValuesOpts = (fields: Form['fields']) => {
  const defaultValues: Record<string, string | number | boolean | undefined> = {}

  if (fields) {
    fields.forEach((field) => {
      if ('name' in field && field.name) {
        let defaultValue: string | number | boolean

        switch (field.blockType as FormFields) {
          case 'number':
            defaultValue =
              'defaultValue' in field && !!field.defaultValue ? Number(field.defaultValue) : 0
            break
          case 'checkbox':
            defaultValue =
              'defaultValue' in field && !!field.defaultValue ? Boolean(field.defaultValue) : false
            break
          default:
            defaultValue = 'defaultValue' in field && !!field.defaultValue ? field.defaultValue : ''
        }
        defaultValues[field.name] = defaultValue
      }
    })
  }

  console.log('default Values:', defaultValues)
  return formOptions({
    defaultValues,
  })
}
