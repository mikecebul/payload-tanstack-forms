'use client'

import { Form } from '@/payload-types'
import { useFormOpts } from './use-form-opts'
import { useAppForm } from './form'
import { Dispatch, SetStateAction } from 'react'
import { PostError } from '../tanstack-form-block'

type Props = {
  payloadForm: Form | string
  setPostError: Dispatch<SetStateAction<PostError | undefined>>
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
