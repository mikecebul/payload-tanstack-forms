'use client'

import { formOptions } from '@tanstack/react-form'
import type { Form } from '@/payload-types'
import type { Dispatch, SetStateAction } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import { useRouter } from 'next/navigation'
import { PostError } from '../tanstack-form-block'

export type FormField = NonNullable<Form['fields']>[number]
export type Value = string | number | boolean | any[] | Record<string, any> | undefined
export type DefaultValues = Record<string, Value>

export const useFormOpts = ({
  payloadForm,
  setPostError,
}: {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
}) => {
  const { confirmationType, fields, title, redirect } =
    typeof payloadForm !== 'string' ? payloadForm : {}
  const router = useRouter()
  const defaultValues = getDefaultValues(fields)

  return formOptions({
    defaultValues,
    onSubmit: async ({ value: data, formApi }) => {
      setPostError(undefined)

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: title,
            submissionData: data,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          setPostError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })

          return
        }

        if (confirmationType === 'redirect' && redirect) {
          const { url } = redirect
          const redirectUrl = url

          if (redirectUrl) router.push(redirectUrl)
        }

        formApi.reset()
      } catch (err) {
        console.warn(err)
        setPostError({
          message: 'Something went wrong.',
        })
      }
    },
  })
}

const getDefaultValues = (fields: Form['fields']) => {
  const defaultValues: DefaultValues = {}

  if (fields) {
    fields.forEach((field) => {
      if ('name' in field && field.name) {
        let defaultValue: Value

        switch (field.blockType) {
          case 'number':
            defaultValue = !!field.defaultValue ? Number(field.defaultValue) : 0
            break
          case 'checkbox':
            defaultValue = !!field.defaultValue ? Boolean(field.defaultValue) : false
            break
          case 'array':
            const arrayDefaults = getDefaultValues(field.fields)
            defaultValue = field.fields ? [arrayDefaults] : []
            break
          case 'group':
            defaultValue = getDefaultValues(field.fields)
            break
          default:
            defaultValue = 'defaultValue' in field && !!field.defaultValue ? field.defaultValue : ''
            break
        }
        defaultValues[field.name] = defaultValue
      }
    })
  }
  return defaultValues
}
