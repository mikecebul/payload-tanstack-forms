'use client'

import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext, useFormContext } from './form-context'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import TextField from '../components/text-field'
import EmailField from '../components/email-field'

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button className="w-full" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? <Loader className="animate-spin" /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    EmailField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})
