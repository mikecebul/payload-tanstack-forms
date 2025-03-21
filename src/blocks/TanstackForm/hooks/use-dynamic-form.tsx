'use client'

import { Form } from '@/payload-types'
import { useFormOpts } from './use-form-opts'
import { useAppForm } from './form'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  payloadForm: Form | string
  setPostError: Dispatch<
    SetStateAction<
      | {
          message: string
          status?: string
        }
      | undefined
    >
  >
}

export const useDynamicForm = ({ payloadForm, setPostError }: Props) => {
  const { defaultValues, onSubmit } = useFormOpts({
    payloadForm,
    setPostError,
  })
  const form = useAppForm({
    defaultValues,
    onSubmit,
  })
  return { form, defaultValues }
}

export type DynamicFormType = ReturnType<typeof useDynamicForm>['form']
