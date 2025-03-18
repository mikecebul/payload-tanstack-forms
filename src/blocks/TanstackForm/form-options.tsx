'use client'

import { formOptions } from '@tanstack/react-form'
import type { Form } from '@/payload-types'

export type FormField = NonNullable<Form['fields']>[number]

const getDefaultValuesForArrayItem = (fields: Form['fields']) => {
  const defaultItem: Record<string, string | number | boolean | undefined> = {}

  fields?.forEach((field) => {
    if ('name' in field && field.name) {
      let value: string | number | boolean
      switch (field.blockType) {
        case 'number':
          value = !!field.defaultValue ? Number(field.defaultValue) : 0
          break
        case 'checkbox':
          value = !!field.defaultValue ? Boolean(field.defaultValue) : false
          break
        default:
          value = 'defaultValue' in field && !!field.defaultValue ? field.defaultValue : ''
      }
      defaultItem[field.name] = value
    }
  })

  return defaultItem
}

export const getDefaultValuesOpts = (fields: Form['fields']) => {
  const defaultValues: Record<string, string | number | boolean | any[] | undefined> = {}

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
            defaultValue = field.fields ? [getDefaultValuesForArrayItem(field.fields)] : []
            break
          case 'group':
            getDefaultValuesOpts(field.fields)
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
