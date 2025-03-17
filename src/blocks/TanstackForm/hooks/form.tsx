'use client'

import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext, useFormContext } from './form-context'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import TextareaField from '../field-components/textarea-field'
import TextField from '../field-components/text-field'
import CheckboxField from '../field-components/checkbox-field'
import NumberField from '../field-components/number-field'
import { ArrayFieldComponent } from '../form-components/array-field'
import EmailField from '../field-components/email-field'
import PhoneField from '../field-components/phone-field'

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
    TextareaField,
    CheckboxField,
    NumberField,
    EmailField,
    PhoneField,
  },
  formComponents: {
    SubscribeButton,
    ArrayFieldComponent,
  },
  fieldContext,
  formContext,
})
