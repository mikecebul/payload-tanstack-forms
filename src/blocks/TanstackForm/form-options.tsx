'use client'

import { formOptions } from '@tanstack/react-form'
import type { Form } from '@/payload-types'

export type FormField = NonNullable<Form['fields']>[number]
export type DefaultValues = Record<string, string | number | boolean | any[] | undefined>

export const getFormOpts = (fields: Form['fields']) => {
  const defaultValues: DefaultValues = {}

  if (fields) {
    fields.forEach((field) => {
      if ('name' in field && field.name) {
        let defaultValue: string | number | boolean | any[] | undefined

        switch (field.blockType) {
          case 'number':
            defaultValue = !!field.defaultValue ? Number(field.defaultValue) : 0
            break
          case 'checkbox':
            defaultValue = !!field.defaultValue ? Boolean(field.defaultValue) : false
            break
          case 'array':
            const { defaultValues: arrayDefaults } = getFormOpts(field.fields)
            defaultValue = field.fields ? [arrayDefaults] : []
            break
          case 'group':
            getFormOpts(field.fields)
          default:
            defaultValue = 'defaultValue' in field && !!field.defaultValue ? field.defaultValue : ''
        }
        defaultValues[field.name] = defaultValue
      }
    })
  }

  return formOptions({
    defaultValues,
  })
}
